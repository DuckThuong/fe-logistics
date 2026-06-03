import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import {
  CalendarOutlined,
  HomeOutlined,
  MobileOutlined,
  NotificationOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { ROUTER_PATH } from "@/routers/Route";
import { animateClass } from "@/hooks/useInView";
import { navigateToNewsDetail } from "../../utils/navigateToNews";
import { useLoading } from "@/providers/loadingProvider";
import { useNotification } from "@/providers/notificationProvider";
import { useQuery } from "@tanstack/react-query";
import { CONTENT_ENDPOINTS } from "@/api/endpoints/common.endpoint";
import { getNewsContent } from "@/api/configs/common.config";
import { DEFAULT_MESSAGE, NOTI_ERROR } from "@/common/constants/constants";
import { isAxiosError } from "axios";
import { emptyString, retractTitle } from "@/common/contexts/helper";
import type { NewsChildDto } from "@/api/dtos/new.response";
import type { OtherOptionDto } from "@/api/dtos/priceResponse.dto";

const getNewsCardDate = (child: NewsChildDto): string =>
  child.otherOptions?.find((option: OtherOptionDto) => option.type === "text")?.value ?? "";

export const NewHub = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { setLoading } = useLoading();
  const { showNotification } = useNotification();

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const { data: newsContent, isLoading } = useQuery({
    queryKey: [CONTENT_ENDPOINTS.GET_NEWS_CONTENT],
    queryFn: () => getNewsContent(),
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

  const featuredChild = newsContent?.children?.find((child) => child.sortIndex === 1);
  const gridChildren = newsContent?.children?.filter((child) => child.sortIndex > 1);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const renderCard = (
    child: NewsChildDto,
    className: string,
    animationIndex: number,
  ) => (
    console.log(child),
    <div
      key={child.id}
      role="button"
      tabIndex={0}
      onClick={() => navigateToNewsDetail(navigate, child)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          navigateToNewsDetail(navigate, child);
        }
      }}
      className={`${className} ${animateClass("fade-up", visible, animationIndex)}`}
    >
      <div className="new-hub__card-image-wrap">
        <img src={child.image} alt={child.shortDescription} className="new-hub__card-image" />
      </div>
      <div className="new-hub__card-info">
        <span className="new-hub__card-tag">{child.name}</span>
        <p className="new-hub__card-title">{child.shortDescription}</p>
        <time className="new-hub__card-date" dateTime={getNewsCardDate(child)}>
          <CalendarOutlined aria-hidden /> {getNewsCardDate(child)}
        </time>
      </div>
    </div>
  );

  return (
    <div className="new-hub">
      <section className="new-hub__hero" aria-labelledby="new-hub-heading">
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
              { title: "Tin tức" },
            ]}
          />

          <div className={animateClass("fade-down", visible, 2)}>
            <div className="new-hub__hero-badge">
              <StarFilled className="new-hub__hero-badge-icon" />
              <span>{emptyString(newsContent?.shortDescription ?? "")}</span>
            </div>
          </div>

          <h1 id="new-hub-heading" className={`new-hub__hero-title ${animateClass("fade-up", visible, 3)}`}>
            {emptyString(
              (newsContent?.description?.[0] ?? "")
                .trim()
                .split(/\s+/)
                .filter(Boolean)
                .slice(0, 2)
                .join(" "),
            )}{" "}
            <span className="new-hub__hero-title-highlight">
              {(newsContent?.description?.[0] ?? "")
                .trim()
                .split(/\s+/)
                .filter(Boolean)
                .slice(2)
                .join(" ")}
            </span>
          </h1>

          <p className={`new-hub__hero-subtitle ${animateClass("fade-in", visible, 4)}`}>
            <NotificationOutlined className="new-hub__hero-subtitle-icon" />
            {retractTitle(newsContent?.otherOptions?.[0]?.value || "")[0]?.text || ""}
          </p>
        </div>
      </section>

      <div className="container new-hub__content">
        <a
          href="https://hongkylogistics.vn/app.html"
          target="_blank"
          rel="noopener noreferrer"
          className={`new-hub__app-banner ${animateClass("fade-up", visible, 5)}`}
        >
          <img
            src="https://hongkylogistics.vn/img/icontvt.png"
            alt="Hồng Kỳ Logistics"
            className="new-hub__app-icon"
          />
          <div className="new-hub__app-text">
            <strong>Hồng Kỳ Logistics</strong>
            <span>
              <MobileOutlined /> Tải App — App Mobile cho khách đặt hàng
            </span>
          </div>
        </a>

        {featuredChild
          ? renderCard(featuredChild, "new-hub__card new-hub__card--featured", 6)
          : null}
        <div className={`new-hub__grid ${animateClass("fade-up", visible, 7)}`}>
          {gridChildren?.map((child, index) =>
            renderCard(child, "new-hub__card", index + 8),
          )}
        </div>
      </div>
    </div>
  );
};
