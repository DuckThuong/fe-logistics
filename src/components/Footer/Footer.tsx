import { Row, Col } from 'antd';
import {
  FacebookOutlined,
  YoutubeOutlined,
  TikTokOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { ROUTER_PATH } from '@/routers/Route';
import './Footer.scss';

const SERVICES_LINKS = [
  { label: 'Đặt hàng Trung Quốc', href: '/dich-vu/dat-hang-trung-quoc' },
  { label: 'Thanh toán hộ', href: '/dich-vu/thanh-toan-ho' },
  { label: 'Vận chuyển hộ', href: '/dich-vu/van-chuyen-ho' },
  { label: 'Uỷ thác nhập khẩu', href: '/dich-vu/uy-thac-nhap-khau' },
];

const SUPPORT_LINKS = [
  { label: 'Hướng dẫn tạo tài khoản', href: ROUTER_PATH.HUONG_DAN },
  { label: 'Hướng dẫn tạo đơn hàng', href: ROUTER_PATH.HUONG_DAN },
  { label: 'Tải tiện ích Chrome', href: '#' },
  { label: 'Bảng giá dịch vụ', href: '/bang-gia' },
];

const POLICY_LINKS = [
  { label: 'Chính sách khiếu nại', href: '/chinh-sach/chinh-sach-khieu-nai' },
  { label: 'Chính sách bảo mật', href: '/chinh-sach/chinh-sach-bao-mat-thong-tin' },
  { label: 'Hàng hoá cấm nhập khẩu', href: '/chinh-sach/danh-muc-hang-hoa-cam-nhap-khau' },
];

const Footer = () => {
  return (
    <footer className="hk-footer">
      <div className="hk-footer__top">
        <div className="container">
          <Row gutter={[40, 40]}>
            {/* Brand */}
            <Col xs={24} sm={24} md={8}>
              <div className="hk-footer__brand">
                <a href="/" className="hk-footer__logo">
                  <div className="hk-footer__logo-icon">HK</div>
                  <div>
                    <div className="hk-footer__logo-name">Công Ty Logistics</div>
                    <div className="hk-footer__logo-tagline">Chuyên hàng Trung Quốc</div>
                  </div>
                </a>

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
                    <a href="tel:0964671688">0964.67.1688</a>
                  </div>
                  <div className="hk-footer__contact-item">
                    <ClockCircleOutlined />
                    <span>09:00 – 18:00 (Thứ 2 – Thứ 7)</span>
                  </div>
                </div>

                <div className="hk-footer__social">
                  {[
                    { icon: <FacebookOutlined />, href: '#', label: 'Facebook' },
                    { icon: <YoutubeOutlined />, href: '#', label: 'Youtube' },
                    { icon: <TikTokOutlined />, href: '#', label: 'TikTok' },
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
            <Col xs={12} sm={8} md={4}>
              <div className="hk-footer__links">
                <h4>Dịch vụ</h4>
                {SERVICES_LINKS.map((l) => (
                  <a key={l.label} href={l.href}>{l.label}</a>
                ))}
              </div>
            </Col>

            <Col xs={12} sm={8} md={4}>
              <div className="hk-footer__links">
                <h4>Hỗ trợ</h4>
                {SUPPORT_LINKS.map((l) => (
                  <a key={l.label} href={l.href}>{l.label}</a>
                ))}
              </div>
            </Col>

            <Col xs={12} sm={8} md={4}>
              <div className="hk-footer__links">
                <h4>Chính sách</h4>
                {POLICY_LINKS.map((l) => (
                  <a key={l.label} href={l.href}>{l.label}</a>
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
