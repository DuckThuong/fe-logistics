import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { CalendarOutlined, HomeOutlined, MobileOutlined, NotificationOutlined, StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTER_PATH } from "@/routers/Route";
import { animateClass } from "@/hooks/useInView";
import { NEW_HUB_ITEMS } from "../../data/content";

export const NewHub = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

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
              <span>Cập nhật khuyến mãi, bảng giá và thị trường nhập hàng</span>
            </div>
          </div>

          <h1 id="new-hub-heading" className={`new-hub__hero-title ${animateClass("fade-up", visible, 3)}`}>
            Tin{" "}
            <span className="new-hub__hero-title-highlight">tức &amp; ưu đãi</span>
          </h1>

          <p className={`new-hub__hero-subtitle ${animateClass("fade-in", visible, 4)}`}>
            <NotificationOutlined className="new-hub__hero-subtitle-icon" />
            Theo dõi chương trình sale Tmall, bảng giá vận chuyển và mẹo tìm nguồn hàng Trung Quốc.
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

        <div className={`new-hub__grid ${animateClass("fade-up", visible, 6)}`}>
          {NEW_HUB_ITEMS.map((item, index) => (
            <Link
              key={item.href}
              to={item.href}
              className={`new-hub__card ${animateClass("fade-up", visible, index + 7)}`}
            >
              <div className="new-hub__card-image-wrap">
                <img src={item.image} alt={item.title} className="new-hub__card-image" />
              </div>
              <div className="new-hub__card-info">
                <span className="new-hub__card-tag">{item.tag}</span>
                <p className="new-hub__card-title">{item.title}</p>
                <time className="new-hub__card-date" dateTime={item.date}>
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
