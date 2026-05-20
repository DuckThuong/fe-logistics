import { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined, LayoutOutlined, SafetyCertificateFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTER_PATH } from "@/routers/Route";
import { animateClass } from "@/hooks/useInView";
import { WAREHOUSE_HUB_ITEMS } from "../../data/content";

export const WarehouseHub = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div className="warehouse-hub">
      <section className="warehouse-hub__hero" aria-labelledby="warehouse-hub-heading">
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
              { title: "Chính sách" },
            ]}
          />

          <div className={animateClass("fade-down", visible, 2)}>
            <div className="warehouse-hub__hero-badge">
              <SafetyCertificateFilled className="warehouse-hub__hero-badge-icon" />
              <span>Minh bạch điều khoản, an tâm sử dụng dịch vụ</span>
            </div>
          </div>

          <h1 id="warehouse-hub-heading" className={`warehouse-hub__hero-title ${animateClass("fade-up", visible, 3)}`}>
            Trung tâm{" "}
            <span className="warehouse-hub__hero-title-highlight">
              chính sách dịch vụ
            </span>
          </h1>

          <p className={`warehouse-hub__hero-subtitle ${animateClass("fade-in", visible, 4)}`}>
            <LayoutOutlined className="warehouse-hub__hero-subtitle-icon" />
            Tổng hợp các quy định quan trọng về lưu kho, khiếu nại, bảo mật và hàng cấm để
            <strong>&nbsp;bạn chủ động vận hành đơn hàng đúng chuẩn ngay từ đầu</strong>.
          </p>
        </div>
      </section>

      <div className="container warehouse-hub__content">
        <div className={`warehouse-hub__grid ${animateClass("fade-up", visible, 5)}`}>
          {WAREHOUSE_HUB_ITEMS.map((item, index) => (
            <Link
              key={item.title}
              to={item.href}
              className={`warehouse-hub__card ${animateClass("fade-up", visible, index + 6)}`}
            >
              <div className="warehouse-hub__card-image-wrap">
                <img src={item.image} alt={item.title} className="warehouse-hub__card-image" />
              </div>
              <div className="warehouse-hub__card-info">
                <span className="warehouse-hub__card-tag">{item.tag}</span>
                <p className="warehouse-hub__card-title">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

