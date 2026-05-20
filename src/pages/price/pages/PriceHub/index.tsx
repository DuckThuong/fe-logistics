import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { DollarCircleOutlined, HomeOutlined, MobileOutlined, StarFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTER_PATH } from "@/routers/Route";
import { animateClass } from "@/hooks/useInView";
import { PRICE_HUB_ITEMS } from "../../data/content";

export const PriceHub = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div className="price-hub">
      <section className="price-hub__hero" aria-labelledby="price-hub-heading">
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
              { title: "Bảng giá" },
            ]}
          />

          <div className={animateClass("fade-down", visible, 2)}>
            <div className="price-hub__hero-badge">
              <StarFilled className="price-hub__hero-badge-icon" />
              <span>Tra cứu cước vận chuyển và phụ phí minh bạch</span>
            </div>
          </div>

          <h1 id="price-hub-heading" className={`price-hub__hero-title ${animateClass("fade-up", visible, 3)}`}>
            Bảng{" "}
            <span className="price-hub__hero-title-highlight">giá dịch vụ</span>
          </h1>

          <p className={`price-hub__hero-subtitle ${animateClass("fade-in", visible, 4)}`}>
            <DollarCircleOutlined className="price-hub__hero-subtitle-icon" />
            Chọn hình thức nhập hàng phù hợp — cập nhật theo từng tuyến và thời điểm thị trường.
          </p>
        </div>
      </section>

      <div className="container price-hub__content">
        <a
          href="https://hongkylogistics.vn/app.html"
          target="_blank"
          rel="noopener noreferrer"
          className={`price-hub__app-banner ${animateClass("fade-up", visible, 5)}`}
        >
          <img
            src="https://hongkylogistics.vn/img/icontvt.png"
            alt="Công Ty Logistics"
            className="price-hub__app-icon"
          />
          <div className="price-hub__app-text">
            <strong>Công Ty Logistics</strong>
            <span>
              <MobileOutlined /> Tải App — App Mobile cho khách đặt hàng
            </span>
          </div>
        </a>

        <div className={`price-hub__grid ${animateClass("fade-up", visible, 6)}`}>
          {PRICE_HUB_ITEMS.map((item, index) => (
            <Link
              key={item.title}
              to={item.href}
              className={`price-hub__card ${animateClass("fade-up", visible, index + 7)}`}
            >
              <div className="price-hub__card-image-wrap">
                <img src={item.image} alt={item.title} className="price-hub__card-image" />
              </div>
              <div className="price-hub__card-info">
                <span className="price-hub__card-tag">{item.tag}</span>
                <p className="price-hub__card-title">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
