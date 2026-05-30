import { getPriceContent } from "@/api/configs/common.config";
import { CONTENT_ENDPOINTS } from "@/api/endpoints/common.endpoint";
import { DEFAULT_MESSAGE, NOTI_ERROR } from "@/common/constants/constants";
import { animateClass } from "@/hooks/useInView";
import { useLoading } from "@/providers/loadingProvider";
import { useNotification } from "@/providers/notificationProvider";
import { ROUTER_PATH } from "@/routers/Route";
import { CalendarOutlined, HomeOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb } from "antd";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const PriceDetailPage = () => {
  const [visible, setVisible] = useState(false);
  const { setLoading } = useLoading();
  const { showNotification } = useNotification();

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const { data: data, isLoading } = useQuery({
    queryKey: [CONTENT_ENDPOINTS.GET_PRICE_CONTENT],
    queryFn: () => getPriceContent(),
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
    <div className="price-page">
      <section
        className="price-hub__hero price-page__hero"
        aria-labelledby="price-detail-heading"
      >
        <div className="price-hub__hero-bg">
          <div
            className={`price-hub__hero-bg-gradient ${animateClass("fade-in", visible, 0)}`}
          />
          <div
            className={`price-hub__hero-bg-grid ${animateClass("fade-out", visible, 0)}`}
          />
          <div className="price-hub__hero-bg-blob price-hub__hero-bg-blob--1" />
          <div className="price-hub__hero-bg-blob price-hub__hero-bg-blob--2" />
          <div className="price-hub__hero-bg-blob price-hub__hero-bg-blob--3" />
        </div>

        <div className="price-hub__hero-inner container">
          <Breadcrumb
            className={`price-hub__hero-breadcrumb ${animateClass("fade-down", visible, 1)}`}
            items={[
              {
                title: (
                  <Link to={ROUTER_PATH.MAIN_PAGE}>
                    <HomeOutlined /> Trang chủ
                  </Link>
                ),
              },
              { title: <Link to={ROUTER_PATH.PRICE}>Bảng giá</Link> },
              { title: data?.shortDescription },
            ]}
          />

          <h1
            id="price-detail-heading"
            className={`price-hub__hero-title price-page__hero-title ${animateClass("fade-up", visible, 2)}`}
          >
            {data?.shortDescription}
          </h1>

          <p
            className={`price-hub__hero-subtitle ${animateClass("fade-in", visible, 3)}`}
          >
            <CalendarOutlined
              className="price-hub__hero-subtitle-icon"
              aria-hidden
            />
            <time dateTime={data?.updatedAt}>Cập nhật: {data?.updatedAt}</time>
          </p>
        </div>
      </section>

      <div className="container price-page__body">
        <article
          className={`price-page__article ${animateClass("fade-up", visible, 4)}`}
        >
          <h1 style={{ textAlign: "justify" }}>
            <span style={{ fontSize: "16px" }}>
              <span style={{ color: "#000000" }}>
                <span
                  style={{
                    fontFamily: "Times New Roman, Times, serif",
                  }}
                >
                  <span style={{ backgroundColor: "white" }}>
                    <strong></strong>
                  </span>
                </span>
              </span>
            </span>
          </h1>
        </article>
      </div>
    </div>
  );
};
