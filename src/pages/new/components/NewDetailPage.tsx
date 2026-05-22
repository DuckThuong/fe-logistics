import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { CalendarOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTER_PATH } from "@/routers/Route";
import { animateClass } from "@/hooks/useInView";
import type { NewPageMeta } from "../data/pages";
import { NewSidebar } from "./NewSidebar";

type NewDetailPageProps = {
  page: NewPageMeta;
};

export const NewDetailPage = ({ page }: NewDetailPageProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

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
              { title: <Link to={ROUTER_PATH.TIN_TUC}>Tin tức</Link> },
              { title: page.title },
            ]}
          />

          <h1
            id="new-detail-heading"
            className={`new-hub__hero-title new-page__hero-title ${animateClass("fade-up", visible, 2)}`}
          >
            {page.title}
          </h1>

          <p className={`new-hub__hero-subtitle ${animateClass("fade-in", visible, 3)}`}>
            <CalendarOutlined className="new-hub__hero-subtitle-icon" aria-hidden />
            <time dateTime={page.date}>Cập nhật: {page.date}</time>
          </p>
        </div>
      </section>

      <div className="container new-page__body">
        <article className={`new-page__article ${animateClass("fade-up", visible, 4)}`}>
          <div
            className="new-page__content entry-content"
            dangerouslySetInnerHTML={{ __html: page.contentHtml }}
          />
        </article>
        <NewSidebar />
      </div>
    </div>
  );
};
