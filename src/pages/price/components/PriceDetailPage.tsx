import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { CalendarOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTER_PATH } from "@/routers/Route";
import { animateClass } from "@/hooks/useInView";
import type { PricePageMeta } from "../data/pages";
import { PriceSidebar } from "./PriceSidebar";

type PriceDetailPageProps = {
  page: PricePageMeta;
};

export const PriceDetailPage = ({ page }: PriceDetailPageProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div className="price-page">
      <section className="price-hub__hero price-page__hero" aria-labelledby="price-detail-heading">
        <div className="price-hub__hero-bg">
          <div className={`price-hub__hero-bg-gradient ${animateClass("fade-in", visible, 0)}`} />
          <div className={`price-hub__hero-bg-grid ${animateClass("fade-out", visible, 0)}`} />
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
              { title: page.title },
            ]}
          />

          <h1
            id="price-detail-heading"
            className={`price-hub__hero-title price-page__hero-title ${animateClass("fade-up", visible, 2)}`}
          >
            {page.title}
          </h1>

          <p className={`price-hub__hero-subtitle ${animateClass("fade-in", visible, 3)}`}>
            <CalendarOutlined className="price-hub__hero-subtitle-icon" aria-hidden />
            <time dateTime={page.date}>Cập nhật: {page.date}</time>
          </p>
        </div>
      </section>

      <div className="container price-page__body">
        <article className={`price-page__article ${animateClass("fade-up", visible, 4)}`}>
          <div
            className="price-page__content entry-content"
            dangerouslySetInnerHTML={{ __html: page.contentHtml }}
          />
        </article>
        <PriceSidebar />
      </div>
    </div>
  );
};
