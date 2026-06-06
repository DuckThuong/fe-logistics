import { getServiceContent } from "@/api/configs/common.config";
import { CONTENT_ENDPOINTS } from "@/api/endpoints/common.endpoint";
import { animateClass, useInView } from "@/hooks/useInView";
import { getServiceDetailPath } from "@/routers/Route";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Col, Row } from "antd";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import "./ServicesSection.scss";

const SERVICE_HOME_ICONS: Record<string, string> = {
  "dat-hang-trung-quoc": "🛒",
  "thanh-toan-ho": "💳",
  "van-chuyen-ho": "🚚",
  "ky-gui-van-chuyen": "🚚",
  "gui-hang-tq": "🏢",
  "uy-thac-nhap-khau": "📋",
};

type HomeServiceCard = {
  id: number;
  icon: string;
  title: string;
  desc: string;
  features: string[];
  href: string;
  highlight: boolean;
};

const ServicesSection = () => {
  const { ref, inView } = useInView();

  const { data: serviceContent } = useQuery({
    queryKey: [CONTENT_ENDPOINTS.GET_SERIVICE_CONTENT],
    queryFn: getServiceContent,
    staleTime: 5 * 60 * 1000,
  });

  const services = useMemo((): HomeServiceCard[] => {
    return [...(serviceContent?.children ?? [])]
      .filter((item) => item.active)
      .sort((a, b) => a.sortIndex - b.sortIndex)
      .map((child) => ({
        id: child.id,
        icon: SERVICE_HOME_ICONS[child.url] ?? "📦",
        title: child.shortDescription || child.name,
        desc: child.content || "",
        features: (Array.isArray(child.description) ? child.description : [])
          .map((feature) => String(feature).trim())
          .filter(Boolean),
        href: getServiceDetailPath(child.url),
        highlight: child.sortIndex === 1,
      }));
  }, [serviceContent?.children]);

  return (
    <section className="hk-services section" ref={ref}>
      <div className="container">
        <div className={`section-header ${animateClass("fade-up", inView, 1)}`}>
          <div className="section-badge">Dịch vụ toàn diện</div>
          <h2>
            Một hệ thống duy nhất
            <br />
            <span className="text-gradient">cho tất cả những gì bạn cần</span>
          </h2>
          <p>Từ đặt hàng, thanh toán đến vận chuyển — Công Ty lo trọn gói</p>
        </div>

        <Row gutter={[20, 20]}>
          {services.map((service, index) => (
            <Col
              key={service.id}
              xs={24}
              sm={24}
              md={12}
              lg={service.highlight ? 12 : 6}
            >
              <div
                className={`hk-services__card ${service.highlight ? "hk-services__card--highlight" : ""} ${animateClass("fade-up", inView, index + 2)}`}
              >
                <div className="hk-services__card-icon">{service.icon}</div>
                <h3 className="hk-services__card-title">{service.title}</h3>
                <p className="hk-services__card-desc">{service.desc}</p>
                {service.features.length > 0 ? (
                  <ul className="hk-services__card-features">
                    {service.features.map((feature) => (
                      <li key={feature}>
                        <span className="hk-services__check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : null}
                <Link to={service.href} className="hk-services__card-link">
                  Tìm hiểu thêm <ArrowRightOutlined />
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default ServicesSection;
