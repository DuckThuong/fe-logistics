import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { BookOutlined, CalendarOutlined, HomeOutlined, MobileOutlined, StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTER_PATH } from "@/routers/Route";
import { animateClass } from "@/hooks/useInView";
import { TATIC_HUB_ITEMS } from "../../data/content";

export const TaticHub = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div className="tatic-hub">
      <section className="tatic-hub__hero" aria-labelledby="tatic-hub-heading">
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
              { title: "Hướng dẫn" },
            ]}
          />

          <div className={animateClass("fade-down", visible, 2)}>
            <div className="tatic-hub__hero-badge">
              <StarFilled className="tatic-hub__hero-badge-icon" />
              <span>Hướng dẫn sử dụng dịch vụ từng bước, dễ làm theo</span>
            </div>
          </div>

          <h1 id="tatic-hub-heading" className={`tatic-hub__hero-title ${animateClass("fade-up", visible, 3)}`}>
            Trung tâm{" "}
            <span className="tatic-hub__hero-title-highlight">hướng dẫn</span>
          </h1>

          <p className={`tatic-hub__hero-subtitle ${animateClass("fade-in", visible, 4)}`}>
            <BookOutlined className="tatic-hub__hero-subtitle-icon" />
            Tài liệu hỗ trợ đặt hàng, nạp ví, tính phí ship và order Taobao — 1688 — Tmall.
          </p>
        </div>
      </section>

      <div className="container tatic-hub__content">
        <a
          href="https://hongkylogistics.vn/app.html"
          target="_blank"
          rel="noopener noreferrer"
          className={`tatic-hub__app-banner ${animateClass("fade-up", visible, 5)}`}
        >
          <img
            src="https://hongkylogistics.vn/img/icontvt.png"
            alt="Hồng Kỳ Logistics"
            className="tatic-hub__app-icon"
          />
          <div className="tatic-hub__app-text">
            <strong>Hồng Kỳ Logistics</strong>
            <span>
              <MobileOutlined /> Tải App — App Mobile cho khách đặt hàng
            </span>
          </div>
        </a>

        <div className={`tatic-hub__grid ${animateClass("fade-up", visible, 6)}`}>
          {TATIC_HUB_ITEMS.map((item, index) => (
            <Link
              key={item.href}
              to={item.href}
              className={`tatic-hub__card ${animateClass("fade-up", visible, index + 7)}`}
            >
              <div className="tatic-hub__card-image-wrap">
                <img src={item.image} alt={item.title} className="tatic-hub__card-image" />
              </div>
              <div className="tatic-hub__card-info">
                <span className="tatic-hub__card-tag">{item.tag}</span>
                <p className="tatic-hub__card-title">{item.title}</p>
                <time className="tatic-hub__card-date" dateTime={item.date}>
                  <CalendarOutlined aria-hidden /> {item.date}
                </time>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
