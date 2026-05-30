import { getPriceContent } from "@/api/configs/common.config";
import type { OtherOptionDto } from "@/api/dtos/priceResponse.dto";
import { CONTENT_ENDPOINTS } from "@/api/endpoints/common.endpoint";
import { DEFAULT_MESSAGE, NOTI_ERROR } from "@/common/constants/constants";
import { formatDateDDMMYYYY } from "@/common/contexts/format";
import { animateClass } from "@/hooks/useInView";
import { useLoading } from "@/providers/loadingProvider";
import { useNotification } from "@/providers/notificationProvider";
import { ROUTER_PATH } from "@/routers/Route";
import { CalendarOutlined, HomeOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Alert, Breadcrumb, Card, Space, Typography } from "antd";
import { isAxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PriceSectionBlock } from "./PriceSectionBlock";
import "./style.scss";

const { Paragraph, Text } = Typography;

export const PriceDetailPage = () => {
  const [visible, setVisible] = useState(false);
  const { setLoading } = useLoading();
  const { showNotification } = useNotification();

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const { data, isLoading } = useQuery({
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

  const sections = useMemo(
    () =>
      [...(data?.sections ?? [])]
        .filter((section) => section.active)
        .sort((a, b) => a.sortIndex - b.sortIndex),
    [data?.sections],
  );

  const updatedLabel = formatDateDDMMYYYY(data?.updatedAt);

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
              { title: data?.shortDescription ?? data?.name },
            ]}
          />

          <Typography.Title
            id="price-detail-heading"
            level={1}
            className={`price-hub__hero-title price-page__hero-title ${animateClass("fade-up", visible, 2)}`}
          >
            {data?.shortDescription ?? data?.name}
          </Typography.Title>

          {updatedLabel && (
            <Typography.Paragraph
              className={`price-hub__hero-subtitle ${animateClass("fade-in", visible, 3)}`}
            >
              <CalendarOutlined
                className="price-hub__hero-subtitle-icon"
                aria-hidden
              />
              <time dateTime={data?.updatedAt}>Cập nhật: {updatedLabel}</time>
            </Typography.Paragraph>
          )}
        </div>
      </section>

      <div className="container price-page__body">
        <article
          className={`price-page__article ${animateClass("fade-up", visible, 4)}`}
        >
          <div className="price-page__content">
            {data?.otherOptions?.map((option: OtherOptionDto) => (
              <Alert
                key={option.value}
                type="info"
                showIcon
                className="price-page__option-banner"
                icon={
                  option.icon ? (
                    <img src={option.icon} alt="" width={24} height={24} />
                  ) : undefined
                }
                message={<Text>{option.value}</Text>}
              />
            ))}

            {data?.description?.map((line: string) => (
              <Paragraph key={line} type="secondary" className="price-page__intro">
                {line}
              </Paragraph>
            ))}

            <Space direction="vertical" size="large" className="price-page__sections">
              {sections.map((section) => (
                <Card
                  key={section.id}
                  variant="borderless"
                  className="price-page__section-card"
                  styles={{ body: { padding: 0 } }}
                >
                  <PriceSectionBlock section={section} />
                </Card>
              ))}
            </Space>
          </div>
        </article>
      </div>
    </div>
  );
};
