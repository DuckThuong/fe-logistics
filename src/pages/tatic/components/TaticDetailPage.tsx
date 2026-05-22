import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { CalendarOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTER_PATH } from "@/routers/Route";
import { animateClass } from "@/hooks/useInView";
import type { TaticPageMeta } from "../data/pages";
import { TaticSidebar } from "./TaticSidebar";

type TaticDetailPageProps = {
  page: TaticPageMeta;
};

export const TaticDetailPage = ({ page }: TaticDetailPageProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div className="tatic-page">
      <section className="tatic-hub__hero tatic-page__hero" aria-labelledby="tatic-detail-heading">
        <div className="tatic-hub__hero-bg">
          <div className={`tatic-hub__hero-bg-gradient ${animateClass("fade-in", visible, 0)}`} />
          <div className={`tatic-hub__hero-bg-grid ${animateClass("fade-out", visible, 0)}`} />
          <div className="tatic-hub__hero-bg-blob tatic-hub__hero-bg-blob--1" />
          <div className="tatic-hub__hero-bg-blob tatic-hub__hero-bg-blob--2" />
          <div className="tatic-hub__hero-bg-blob tatic-hub__hero-bg-blob--3" />
        </div>

        <div className="tatic-hub__hero-inner container">
          <Breadcrumb
            className={`tatic-hub__hero-breadcrumb ${animateClass("fade-down", visible, 1)}`}
            items={[
              {
                title: (
                  <Link to={ROUTER_PATH.MAIN_PAGE}>
                    <HomeOutlined /> Trang chủ
                  </Link>
                ),
              },
              { title: <Link to={ROUTER_PATH.HUONG_DAN}>Hướng dẫn</Link> },
              { title: page.title },
            ]}
          />

          <h1
            id="tatic-detail-heading"
            className={`tatic-hub__hero-title tatic-page__hero-title ${animateClass("fade-up", visible, 2)}`}
          >
            {page.title}
          </h1>

          <p className={`tatic-hub__hero-subtitle ${animateClass("fade-in", visible, 3)}`}>
            <CalendarOutlined className="tatic-hub__hero-subtitle-icon" aria-hidden />
            <time dateTime={page.date}>Cập nhật: {page.date}</time>
          </p>
        </div>
      </section>

      <div className="container tatic-page__body">
        <article className={`tatic-page__article ${animateClass("fade-up", visible, 4)}`}>
          <div
            className="tatic-page__content entry-content"
            dangerouslySetInnerHTML={{ __html: page.contentHtml }}
          />
        </article>
        <TaticSidebar />
      </div>
    </div>
  );
};
