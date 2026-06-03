import { useEffect, useMemo, useState } from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTER_PATH } from "@/routers/Route";
import { animateClass } from "@/hooks/useInView";
import { getServiceById } from "@/api/configs/common.config";
import { renderServiceSectionDescriptions } from "@/pages/service/utils/renderSectionDescriptions";
import { CONTENT_ENDPOINTS } from "@/api/endpoints/common.endpoint";
import { DEFAULT_MESSAGE, NOTI_ERROR } from "@/common/constants/constants";
import { useLoading } from "@/providers/loadingProvider";
import { useNotification } from "@/providers/notificationProvider";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { emptyString, retractTitle } from "@/common/contexts/helper";
type ServiceDetailPageProps = {
  id?: number;
};

export const ServiceDetailPage = ({ id }: ServiceDetailPageProps) => {
  const [visible, setVisible] = useState(false);
  const { setLoading } = useLoading();
  const { showNotification } = useNotification();

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const { data: serviceContent, isLoading } = useQuery({
    queryKey: [CONTENT_ENDPOINTS.GET_SERVICE_BY_ID, id],
    queryFn: () => getServiceById(id!),
    enabled: Boolean(id),
    throwOnError: (error) => {
      let message = DEFAULT_MESSAGE;
      if (isAxiosError(error)) {
        const apiMessage = error.response?.data?.message;
        if (typeof apiMessage === "string") {
          message = apiMessage;
        } else if (Array.isArray(apiMessage) && apiMessage[0]) {
          message = apiMessage[0];
        }
      }
      showNotification(message, NOTI_ERROR);
      return false;
    },
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const sections = useMemo(
    () =>
      [...(serviceContent?.sections ?? [])]
        .filter((section) => section.active)
        .sort((a, b) => a.sortIndex - b.sortIndex),
    [serviceContent?.sections],
  );

  return (
    <div className="service-page">
      <div className="service-page__header">
        <div
          className={`service-page__header-bg ${animateClass("fade-in", visible, 0)}`}
          aria-hidden
        />
        <div className="container service-page__header-inner">
          <Breadcrumb
            className={`service-page__breadcrumb ${animateClass("fade-down", visible, 1)}`}
            items={[
              {
                title: (
                  <Link to={ROUTER_PATH.MAIN_PAGE}>
                    <HomeOutlined /> Trang chủ
                  </Link>
                ),
              },
              { title: <Link to={ROUTER_PATH.SERVICE}>Dịch vụ</Link> },
              { title: emptyString(serviceContent?.name) },
            ]}
          />
          <h1
            className={`service-page__title ${animateClass("fade-up", visible, 2)}`}
          >
            {emptyString(serviceContent?.name)}
          </h1>
        </div>
      </div>

      <div className="container service-page__body">
        <article
          className={`service-page__article ${animateClass("fade-up", visible, 3)}`}
        >
          {sections.map((item) => (
            <section key={item.id} className="service-article__section">
              <h3 className="service-article__heading">
                {retractTitle(item.title)[0]?.text || ""}
              </h3>
              <div className="service-article__body">
                {renderServiceSectionDescriptions(item.description, visible)}
              </div>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
};
