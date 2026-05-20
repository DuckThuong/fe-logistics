import { useEffect, useState } from "react";
import { Breadcrumb, Tag } from "antd";
import { HomeOutlined, MobileOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTER_PATH } from "@/routers/Route";
import { animateClass } from "@/hooks/useInView";
import { SERVICE_HUB_ITEMS } from "../../data/content";

export const ServiceHub = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  const [featured, ...others] = SERVICE_HUB_ITEMS;

  return (
    <div className="service-hub">
      <div className="service-hub__header">
        <div
          className={`service-hub__header-bg ${animateClass("fade-in", visible, 0)}`}
          aria-hidden
        />
        <div className="container service-hub__header-inner">
          <Breadcrumb
            className={`service-hub__breadcrumb ${animateClass("fade-down", visible, 1)}`}
            items={[
              {
                title: (
                  <Link to={ROUTER_PATH.MAIN_PAGE}>
                    <HomeOutlined /> Trang chủ
                  </Link>
                ),
              },
              { title: "Dịch vụ" },
            ]}
          />
          <Tag
            className={`service-hub__badge ${animateClass("fade-down", visible, 2)}`}
            icon={<AppstoreOutlined />}
          >
            Dịch vụ Công Ty Logistics
          </Tag>
          <h1 className={`service-hub__title ${animateClass("fade-up", visible, 3)}`}>
            Dịch vụ
          </h1>
          <p className={`service-hub__subtitle ${animateClass("fade-in", visible, 4)}`}>
            Đặt hàng, thanh toán hộ và vận chuyển hàng hóa từ Trung Quốc về Việt Nam.
          </p>
        </div>
      </div>

      <div className="container service-hub__content">
        <a
          href="https://hongkylogistics.vn/app.html"
          target="_blank"
          rel="noopener noreferrer"
          className={`service-hub__app-banner ${animateClass("fade-up", visible, 2)}`}
        >
          <img
            src="https://hongkylogistics.vn/img/icontvt.png"
            alt="Công Ty Logistics"
            className="service-hub__app-icon"
          />
          <div className="service-hub__app-text">
            <strong>Công Ty Logistics</strong>
            <span>
              <MobileOutlined /> Tải App — App Mobile cho khách đặt hàng
            </span>
          </div>
        </a>

        {featured && (
          <Link
            to={featured.href}
            className={`service-hub__card service-hub__card--featured ${animateClass("fade-up", visible, 3)}`}
          >
            <img src={featured.image} alt={featured.title} className="service-hub__card-image" />
            <div className="service-hub__card-overlay">
              <span className="service-hub__card-tag">{featured.tag}</span>
              <h2 className="service-hub__card-title">{featured.title}</h2>
            </div>
          </Link>
        )}

        {others.length > 0 && (
          <div className="service-hub__grid">
            {others.map((item, index) => (
              <Link
                key={item.title}
                to={item.href}
                className={`service-hub__card ${animateClass("fade-up", visible, index + 4)}`}
              >
                <img src={item.image} alt={item.title} className="service-hub__card-image" />
                <div className="service-hub__card-overlay">
                  <span className="service-hub__card-tag">{item.tag}</span>
                  <h2 className="service-hub__card-title">{item.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
