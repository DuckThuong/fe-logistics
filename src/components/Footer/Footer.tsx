import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import {
  FacebookOutlined,
  YoutubeOutlined,
  TikTokOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { BRAND } from "@/common/constants/constants";
import { ROUTER_PATH } from "@/routers/Route";
import { useFooterLinks } from "@/hooks/useFooterLinks";
import "./Footer.scss";

const isInternalPath = (href: string) => href?.startsWith("/");

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) =>
  isInternalPath(href) ? (
    <Link to={href}>{children}</Link>
  ) : (
    <a href={href}>{children}</a>
  );

const Footer = () => {
  const { serviceLinks, newsLinks, priceLinks, policyLinks } = useFooterLinks();

  return (
    <footer className="hk-footer">
      <div className="hk-footer__top">
        <div className="container">
          <Row gutter={[40, 40]}>
            {/* Brand */}
            <Col xs={24} sm={24} md={8}>
              <div className="hk-footer__brand">
                <Link to={ROUTER_PATH.MAIN_PAGE} className="hk-footer__logo">
                  <img
                    src={BRAND.logoSrc}
                    alt={BRAND.name}
                    className="hk-footer__logo-img"
                  />
                </Link>

                <p className="hk-footer__brand-desc">
                  Hơn 10 năm kinh nghiệm nhập hàng Trung Quốc. Uy tín, nhanh
                  chóng, minh bạch. Đối tác tin cậy của 10.000+ doanh nghiệp
                  Việt Nam.
                </p>

                <div className="hk-footer__contact">
                  <div className="hk-footer__contact-item">
                    <EnvironmentOutlined />
                    <span>Nguyễn Khang, Yên Hòa, Cầu Giấy, Hà Nội</span>
                  </div>
                  <div className="hk-footer__contact-item">
                    <EnvironmentOutlined />
                    <span>Lê Văn Khương, Hiệp Thành, Q.12, TP.HCM</span>
                  </div>
                  <div className="hk-footer__contact-item">
                    <PhoneOutlined />
                    <a href={BRAND.telHref}>Hotline: {BRAND.hotlineDisplay}</a>
                  </div>
                  <div className="hk-footer__contact-item">
                    <PhoneOutlined />
                    <a
                      href={BRAND.zaloUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Zalo: {BRAND.hotlineDisplay}
                    </a>
                  </div>
                  <div className="hk-footer__contact-item">
                    <ClockCircleOutlined />
                    <span>09:00 – 18:00 (Thứ 2 – Thứ 7)</span>
                  </div>
                </div>

                <div className="hk-footer__social">
                  {[
                    {
                      icon: <FacebookOutlined />,
                      href: "#",
                      label: "Facebook",
                    },
                    { icon: <YoutubeOutlined />, href: "#", label: "Youtube" },
                    { icon: <TikTokOutlined />, href: "#", label: "TikTok" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="hk-footer__social-btn"
                      aria-label={s.label}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </Col>

            {/* Links */}
            <Col xs={12} sm={6} md={4}>
              <div className="hk-footer__links">
                <h4>Dịch vụ</h4>
                {serviceLinks.map((l) => (
                  <FooterLink key={l.href} href={l.href}>
                    {l.label}
                  </FooterLink>
                ))}
              </div>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <div className="hk-footer__links">
                <h4>Tin tức</h4>
                {newsLinks.map((l) => (
                  <FooterLink key={l.href} href={l.href}>
                    {l.label}
                  </FooterLink>
                ))}
              </div>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <div className="hk-footer__links">
                <h4>Bảng giá</h4>
                {priceLinks.map((l) => (
                  <FooterLink key={l.href} href={l.href}>
                    {l.label}
                  </FooterLink>
                ))}
              </div>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <div className="hk-footer__links">
                <h4>Chính sách</h4>
                {policyLinks.map((l) => (
                  <FooterLink key={l.href} href={l.href}>
                    {l.label}
                  </FooterLink>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* <div className="hk-footer__bottom">
        <div className="container">
          <div className="hk-footer__bottom-inner">
            <p>© 2024 <strong>Công Ty Logistics</strong>. Đã thông báo Bộ Công Thương.</p>
            <div className="hk-footer__bottom-links">
              <a href="/chinh-sach/chinh-sach-bao-mat-thong-tin">Bảo mật</a>
              <a href="/chinh-sach">Điều khoản</a>
            </div>
          </div>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;
