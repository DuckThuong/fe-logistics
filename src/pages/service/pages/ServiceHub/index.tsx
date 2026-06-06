import { getServiceContent } from "@/api/configs/common.config";
import { CONTENT_ENDPOINTS } from "@/api/endpoints/common.endpoint";
import { BRAND, DEFAULT_MESSAGE, NOTI_ERROR } from "@/common/constants/constants";
import { emptyString } from "@/common/contexts/helper";
import { animateClass } from "@/hooks/useInView";
import { useLoading } from "@/providers/loadingProvider";
import { useNotification } from "@/providers/notificationProvider";
import { ROUTER_PATH } from "@/routers/Route";
import { navigateToServiceDetail } from "@/pages/service/utils/navigateToService";
import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Tag } from "antd";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const ServiceHub = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { showNotification } = useNotification();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const { data: serviceContent, isLoading } = useQuery({
    queryKey: [CONTENT_ENDPOINTS.GET_SERIVICE_CONTENT],
    queryFn: () => getServiceContent(),
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

  return (
    <div className="service-hub">
      <div className="service-hub__header">
        <div
          className={`service-hub__header-bg ${animateClass("fade-in", visible, 0)}`}
          aria-hidden
        />
        <div className="container service-hub__header-inner">
          <Breadcrumb
            className={`service-hub__breadcrumb ${animateClass("fade-down", visible, 1)}`}
            items={[
              {
                title: (
                  <Link to={ROUTER_PATH.MAIN_PAGE}>
                    <HomeOutlined /> Trang chủ
                  </Link>
                ),
              },
              { title: emptyString(serviceContent?.name) },
            ]}
          />
          <Tag
            className={`service-hub__badge ${animateClass("fade-down", visible, 2)}`}
            icon={<AppstoreOutlined />}
          >
            {emptyString(serviceContent?.shortDescription)}
          </Tag>
          <h1
            className={`service-hub__title ${animateClass("fade-up", visible, 3)}`}
          >
            {emptyString(serviceContent?.name)}
          </h1>
          <p
            className={`service-hub__subtitle ${animateClass("fade-in", visible, 4)}`}
          >
            {emptyString(serviceContent?.content)}
          </p>
        </div>
      </div>

      <div className="container service-hub__content">
        <a
          href="https://hongkylogistics.vn/app.html"
          target="_blank"
          rel="noopener noreferrer"
          className={`service-hub__app-banner ${animateClass("fade-up", visible, 2)}`}
        >
          <img
            src="https://hongkylogistics.vn/img/icontvt.png"
            alt={BRAND.name}
            className="service-hub__app-icon"
          />
          <div className="service-hub__app-text">
            <strong>{BRAND.name}</strong>
          </div>
        </a>
        {serviceContent?.children
          ?.filter((item) => item.sortIndex == 1)
          ?.map((child) => (
            <div
              role="button"
              tabIndex={0}
              onClick={() => navigateToServiceDetail(navigate, child)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  navigateToServiceDetail(navigate, child);
                }
              }}
              className={`service-hub__card service-hub__card--featured ${animateClass("fade-up", visible, 3)}`}
            >
              <img
                src={child.image}
                alt={child.type}
                className="service-hub__card-image"
              />
              <div className="service-hub__card-overlay">
                <span className="service-hub__card-tag">{child.name}</span>
                <h2 className="service-hub__card-title">
                  {child.shortDescription}
                </h2>
              </div>
            </div>
          ))}

        <div className="service-hub__grid">
          {serviceContent?.children
            ?.filter((item) => item.sortIndex > 1)
            ?.map((child, index) => (
              <div
                key={index}
                role="button"
                tabIndex={0}
                onClick={() => navigateToServiceDetail(navigate, child)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    navigateToServiceDetail(navigate, child);
                  }
                }}
                className={`service-hub__card ${animateClass("fade-up", visible, index + 4)}`}
              >
                <img
                  src={child.image}
                  alt={child.type}
                  className="service-hub__card-image"
                />
                <div className="service-hub__card-overlay">
                  <span className="service-hub__card-tag">{child.name}</span>
                  <h2 className="service-hub__card-title">
                    {child.shortDescription}
                  </h2>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
