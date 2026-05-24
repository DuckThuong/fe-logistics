import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTER_PATH } from "@/routers/Route";
import { animateClass } from "@/hooks/useInView";
import type { ServiceSection } from "../data/content";
import { ServiceSidebar } from "./ServiceSidebar";

type ServiceDetailPageProps = {
  title: string;
  sections: ServiceSection[];
};

export const ServiceDetailPage = ({
  title,
  sections,
}: ServiceDetailPageProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

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
              { title },
            ]}
          />
          <h1
            className={`service-page__title ${animateClass("fade-up", visible, 2)}`}
          >
            {title}
          </h1>
        </div>
      </div>

      <div className="container service-page__body">
        <article
          className={`service-page__article ${animateClass("fade-up", visible, 3)}`}
        >
          {sections.map((section) => (
            <section key={section.title} className="service-article__section">
              <h3 className="service-article__heading">{section.title}</h3>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="service-article__paragraph">
                  {paragraph}
                </p>
              ))}
              {section.quote && (
                <blockquote className="service-article__quote">
                  {section.quote}
                </blockquote>
              )}
              {section.bullets && (
                <ul className="service-article__list">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
        {/* <ServiceSidebar /> */}
      </div>
    </div>
  );
};
