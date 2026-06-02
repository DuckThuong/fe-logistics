import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { CalendarOutlined, HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTER_PATH } from "@/routers/Route";
import { animateClass } from "@/hooks/useInView";
import type { PolicyPageMeta } from "../data/content";
import { resolvePolicyPageById } from "../data/content";
import { PolicySidebar } from "./PolicySidebar";

type PolicyDetailPageProps = {
  id?: number;
  /** Dữ liệu tĩnh tạm; bỏ khi đã có API getPolicyById. */
  staticPage?: PolicyPageMeta;
};

export const PolicyDetailPage = ({ id, staticPage }: PolicyDetailPageProps) => {
  const [visible, setVisible] = useState(false);
  const page = staticPage ?? resolvePolicyPageById(id);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  if (!page) {
    return null;
  }

  return (
    <div className="warehouse-page">
      <section
        className="warehouse-hub__hero warehouse-page__hero"
        aria-labelledby="warehouse-detail-heading"
      >
        <div className="warehouse-hub__hero-bg">
          <div className={`warehouse-hub__hero-bg-gradient ${animateClass("fade-in", visible, 0)}`} />
          <div className={`warehouse-hub__hero-bg-grid ${animateClass("fade-out", visible, 0)}`} />
          <div className="warehouse-hub__hero-bg-blob warehouse-hub__hero-bg-blob--1" />
          <div className="warehouse-hub__hero-bg-blob warehouse-hub__hero-bg-blob--2" />
          <div className="warehouse-hub__hero-bg-blob warehouse-hub__hero-bg-blob--3" />
        </div>

        <div className="warehouse-hub__hero-inner container">
          <Breadcrumb
            className={`warehouse-hub__hero-breadcrumb ${animateClass("fade-down", visible, 1)}`}
            items={[
              {
                title: (
                  <Link to={ROUTER_PATH.MAIN_PAGE}>
                    <HomeOutlined /> Trang chủ
                  </Link>
                ),
              },
              { title: <Link to={ROUTER_PATH.POLICY}>Chính sách</Link> },
              { title: page.title },
            ]}
          />

          <h1
            id="warehouse-detail-heading"
            className={`warehouse-hub__hero-title warehouse-page__hero-title ${animateClass("fade-up", visible, 2)}`}
          >
            {page.title}
          </h1>

          <p className={`warehouse-hub__hero-subtitle ${animateClass("fade-in", visible, 3)}`}>
            <CalendarOutlined className="warehouse-hub__hero-subtitle-icon" aria-hidden />
            <time dateTime={page.date}>Cập nhật: {page.date}</time>
          </p>
        </div>
      </section>

      <div className="container warehouse-page__body">
        <article className={`warehouse-page__article ${animateClass("fade-up", visible, 4)}`}>
          <div
            className="warehouse-page__content entry-content"
            dangerouslySetInnerHTML={{ __html: page.contentHtml }}
          />
        </article>
        <PolicySidebar />
      </div>
    </div>
  );
};
