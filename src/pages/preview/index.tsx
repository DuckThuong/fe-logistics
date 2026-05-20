import React from 'react';
import { Breadcrumb, Tag } from 'antd';
import {
  HomeOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  RocketOutlined,
  ReadOutlined,
  UnorderedListOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './style.scss';
import { ROUTER_PATH } from '@/routers/Route';

const PAGE_HIGHLIGHTS = [
  { icon: <TeamOutlined />, label: '10+ năm kinh nghiệm' },
  { icon: <RocketOutlined />, label: '800+ đơn/ngày' },
  { icon: <SafetyCertificateOutlined />, label: '10K+ khách hàng' },
];

const QUICK_LINKS = [
  { href: '#gioi-thieu', label: 'Tổng quan', icon: <ReadOutlined /> },
  { href: '#dich-vu', label: 'Dịch vụ cung cấp', icon: <UnorderedListOutlined /> },
  { href: '#tu-choi', label: 'Chính sách từ chối', icon: <StopOutlined /> },
];

const services = [
  'Tư vấn tìm kiếm nguồn hàng trên các website bán buôn, bán lẻ hàng đầu Trung Quốc: alibaba.com, 1688.com, taobao.com, tmall.com…',
  'Mua hàng hộ và Kiểm tra hàng hóa',
  'Thanh toán hộ đơn hàng theo ủy thác, ký gửi hàng hóa theo yêu cầu',
  'Đóng gói và Vận chuyển hàng hóa về Việt Nam',
  'Đổi trả hàng hóa (đối với Khách hàng order của Công Ty Logistics)',
];

const refusals = [
  'Phát tán, chia sẻ, đăng tải thông tin sai sự thật/sai bản chất các tình huống/thông tin với mục đích xấu, gây ảnh hưởng đến uy tín của Công Ty Logistics.',
  'Gian lận trong giao dịch: nhận đủ hàng nhưng báo thiếu, nhận nhầm hàng của khách khác nhưng cố tình không trả, thiếu công nợ nhưng không thanh toán.',
  'Sử dụng lời lẽ khiếm nhã, có thái độ coi thường, thiếu tôn trọng và thể hiện sự bất hợp tác với nhân viên Công Ty Logistics.',
  'Cố ý mua bán sản phẩm là hàng Quốc cấm, hàng không được phép nhập và vận chuyển về Việt Nam.',
  'Có những yêu cầu không chính đáng, vượt ra ngoài phạm vi quản lý và cung cấp dịch vụ của Công Ty Logistics.',
];

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <div className="about-page__header">
        <div className="about-page__header-bg" aria-hidden />
        <div className="container about-page__header-inner">
          <Breadcrumb
            className="about-page__breadcrumb"
            items={[
              { title: <Link to={ROUTER_PATH.MAIN_PAGE}><HomeOutlined /> Trang chủ</Link> },
              { title: <span>Về chúng tôi</span> },
              { title: 'Giới thiệu' },
            ]}
          />

          <div className="about-page__header-main">
            <div className="about-page__header-copy">
              <Tag className="about-page__badge" icon={<InfoCircleOutlined />}>
                Về Công Ty Logistics
              </Tag>
              <h1 className="about-page__title">Giới Thiệu</h1>
              <p className="about-page__subtitle">
                Đơn vị trung gian uy tín trong lĩnh vực đặt hàng, thanh toán ủy thác và vận chuyển
                hàng hóa từ Trung Quốc về Việt Nam.
              </p>

              <ul className="about-page__highlights">
                {PAGE_HIGHLIGHTS.map((item) => (
                  <li key={item.label} className="about-page__highlight">
                    <span className="about-page__highlight-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <nav className="about-page__quick-nav" aria-label="Điều hướng nhanh trong trang">
              <span className="about-page__quick-nav-label">Xem nhanh</span>
              <ul className="about-page__quick-links">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="about-page__quick-link">
                      {link.icon}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container about-page__content">
        <div id="gioi-thieu" className="about-page__intro">
          <div className="about-page__intro-text">
            <p>
              <strong>Công Ty Logistics</strong> là đơn vị trung gian cung cấp các dịch vụ:
              Đặt hàng, Thanh toán Ủy thác, Vận chuyển hàng hóa từ Trung Quốc về Việt Nam.
              Với đội ngũ nhân viên trẻ trung, năng động, sáng tạo và tận tâm, Công Ty Logistics
              đã và đang hoàn thiện để trở thành đơn vị cung cấp dịch vụ với chất lượng vượt
              trội, có tiêu chuẩn và bản sắc riêng; hỗ trợ tối đa và đáp ứng nhu cầu ngày càng
              cao của Đối tác và Khách hàng.
            </p>
          </div>
          <div className="about-page__intro-image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrR3pcB_D8iLltcq5xMFJYLF3oPNZVeirC9Q&s"
              alt="Công Ty Logistics"
            />
          </div>
        </div>

        {/* Services Provided */}
        <div id="dich-vu" className="about-page__section">
          <h2 className="about-page__section-title">
            I. Các dịch vụ do Công Ty Logistics cung cấp:
          </h2>
          <ul className="about-page__list">
            {services.map((item, index) => (
              <li key={index} className="about-page__list-item">
                <span className="about-page__list-icon">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Refusal Section */}
        <div id="tu-choi" className="about-page__section about-page__section--warning">
          <h2 className="about-page__section-title">
            II. Công Ty Logistics từ chối cung cấp dịch vụ khi khách hàng có hành vi sau:
          </h2>
          <ul className="about-page__list">
            {refusals.map((item, index) => (
              <li key={index} className="about-page__list-item about-page__list-item--warning">
                <span className="about-page__list-icon">–</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Closing */}
        <div className="about-page__closing">
          <p>
            <strong>Công Ty Logistics</strong> xin chân thành cảm ơn và mong muốn được đồng
            hành cùng Quý Khách hàng!
          </p>
          <p>
            <strong>Trân trọng!</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
