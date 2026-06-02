import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { CalendarOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTER_PATH } from "@/routers/Route";
import { animateClass } from "@/hooks/useInView";
import { NewSidebar } from "./NewSidebar";
import { CONTENT_ENDPOINTS } from "@/api/endpoints/common.endpoint";
import { useQuery } from "@tanstack/react-query";
import { getNewsById } from "@/api/configs/common.config";
import { DEFAULT_MESSAGE, NOTI_ERROR } from "@/common/constants/constants";
import { isAxiosError } from "axios";
import { useNotification } from "@/providers/notificationProvider";
import { useLoading } from "@/providers/loadingProvider";
import { emptyString } from "@/common/contexts/helper";
import { formatDateDDMMYYYY } from "@/common/contexts/format";
import { resolveNewsPageById } from "../data/content";

type NewDetailPageProps = {
  id?: number;
};

export const NewDetailPage = ({ id }: NewDetailPageProps) => {
  const [visible, setVisible] = useState(false);
  const { setLoading } = useLoading();
  const { showNotification } = useNotification();

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const { data: newsContent, isLoading } = useQuery({
    queryKey: [CONTENT_ENDPOINTS.GET_NEWS_BY_ID, id],
    queryFn: () => getNewsById(id!),
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

  const staticPage = resolveNewsPageById(id);
  const contentHtml = newsContent?.content || staticPage?.contentHtml || "";
  const displayDate =
    newsContent?.otherOptions?.find((option) => option.type === "options")?.value ??
    (newsContent?.updatedAt
      ? `Cập nhật: ${formatDateDDMMYYYY(newsContent.updatedAt)}`
      : staticPage?.date
        ? `Cập nhật: ${staticPage.date}`
        : "");

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return (
    <div className="new-page">
      <section className="new-hub__hero new-page__hero" aria-labelledby="new-detail-heading">
        <div className="new-hub__hero-bg">
          <div className={`new-hub__hero-bg-gradient ${animateClass("fade-in", visible, 0)}`} />
          <div className={`new-hub__hero-bg-grid ${animateClass("fade-out", visible, 0)}`} />
          <div className="new-hub__hero-bg-blob new-hub__hero-bg-blob--1" />
          <div className="new-hub__hero-bg-blob new-hub__hero-bg-blob--2" />
          <div className="new-hub__hero-bg-blob new-hub__hero-bg-blob--3" />
        </div>

        <div className="new-hub__hero-inner container">
          <Breadcrumb
            className={`new-hub__hero-breadcrumb ${animateClass("fade-down", visible, 1)}`}
            items={[
              {
                title: (
                  <Link to={ROUTER_PATH.MAIN_PAGE}>
                    <HomeOutlined /> Trang chủ
                  </Link>
                ),
              },
              {
                title: <Link to={ROUTER_PATH.TIN_TUC}>{emptyString(newsContent?.name ?? "Tin tức")}</Link>,
              },
              { title: emptyString(newsContent?.shortDescription ?? staticPage?.title ?? "") },
            ]}
          />

          <h1
            id="new-detail-heading"
            className={`new-hub__hero-title new-page__hero-title ${animateClass("fade-up", visible, 2)}`}
          >
            {emptyString(newsContent?.shortDescription ?? staticPage?.title ?? "")}
          </h1>

          <p className={`new-hub__hero-subtitle ${animateClass("fade-in", visible, 3)}`}>
            <CalendarOutlined className="new-hub__hero-subtitle-icon" aria-hidden />
            <time dateTime={newsContent?.updatedAt ?? staticPage?.date}>{displayDate}</time>
          </p>
        </div>
      </section>

      <div className="container new-page__body">
        <article className={`new-page__article ${animateClass("fade-up", visible, 4)}`}>
          <div
            className="new-page__content entry-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>
        <NewSidebar />
      </div>
    </div>
  );
};
