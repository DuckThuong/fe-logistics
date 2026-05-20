import React, { useEffect, useState } from 'react';
import { Breadcrumb, Tag } from 'antd';
import { animateClass, useInView } from '@/hooks/useInView';
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
import { ROUTER_PATH } from '@/routers/Route';
import './style.scss';

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
  'Đổi trả hàng hóa (đối với Khách hàng order của Hồng Kỳ Logistics)',
];

const refusals = [
  'Phát tán, chia sẻ, đăng tải thông tin sai sự thật/sai bản chất các tình huống/thông tin với mục đích xấu, gây ảnh hưởng đến uy tín của Hồng Kỳ Logistics.',
  'Gian lận trong giao dịch: nhận đủ hàng nhưng báo thiếu, nhận nhầm hàng của khách khác nhưng cố tình không trả, thiếu công nợ nhưng không thanh toán.',
  'Sử dụng lời lẽ khiếm nhã, có thái độ coi thường, thiếu tôn trọng và thể hiện sự bất hợp tác với nhân viên Hồng Kỳ Logistics.',
  'Cố ý mua bán sản phẩm là hàng Quốc cấm, hàng không được phép nhập và vận chuyển về Việt Nam.',
  'Có những yêu cầu không chính đáng, vượt ra ngoài phạm vi quản lý và cung cấp dịch vụ của Hồng Kỳ Logistics.',
];

const AboutPage: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const { ref: introRef, inView: introInView } = useInView();
  const { ref: servicesRef, inView: servicesInView } = useInView();
  const { ref: refusalRef, inView: refusalInView } = useInView();
  const { ref: closingRef, inView: closingInView } = useInView();

  useEffect(() => {
    const timer = requestAnimationFrame(() => setHeaderVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div className="about-page">
      <div className="about-page__header">
        <div
          className={`about-page__header-bg ${animateClass('fade-in', headerVisible, 0)}`}
          aria-hidden
        />
        <div className="container about-page__header-inner">
          <Breadcrumb
            className={`about-page__breadcrumb ${animateClass('fade-down', headerVisible, 1)}`}
            items={[
              { title: <Link to={ROUTER_PATH.MAIN_PAGE}><HomeOutlined /> Trang chủ</Link> },
              { title: <span>Về chúng tôi</span> },
              { title: 'Giới thiệu' },
            ]}
          />

          <div className="about-page__header-main">
            <div className="about-page__header-copy">
              <Tag
                className={`about-page__badge ${animateClass('fade-down', headerVisible, 2)}`}
                icon={<InfoCircleOutlined />}
              >
                Về Hồng Kỳ Logistics
              </Tag>
              <h1 className={`about-page__title ${animateClass('fade-up', headerVisible, 3)}`}>
                Giới Thiệu
              </h1>
              <p className={`about-page__subtitle ${animateClass('fade-in', headerVisible, 4)}`}>
                Đơn vị trung gian uy tín trong lĩnh vực đặt hàng, thanh toán ủy thác và vận chuyển
                hàng hóa từ Trung Quốc về Việt Nam.
              </p>

              <ul className="about-page__highlights">
                {PAGE_HIGHLIGHTS.map((item, index) => (
                  <li
                    key={item.label}
                    className={`about-page__highlight ${animateClass('fade-up', headerVisible, index + 5)}`}
                  >
                    <span className="about-page__highlight-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <nav
              className={`about-page__quick-nav ${animateClass('fade-left', headerVisible, 3)}`}
              aria-label="Điều hướng nhanh trong trang"
            >
              <span className="about-page__quick-nav-label">Xem nhanh</span>
              <ul className="about-page__quick-links">
                {QUICK_LINKS.map((link, index) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`about-page__quick-link ${animateClass('fade-left', headerVisible, index + 4)}`}
                    >
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
        <div id="gioi-thieu" className="about-page__intro" ref={introRef as React.Ref<HTMLDivElement>}>
          <div className={`about-page__intro-text ${animateClass('fade-right', introInView, 1)}`}>
            <p>
              <strong>Hồng Kỳ Logistics</strong> là đơn vị trung gian cung cấp các dịch vụ:
              Đặt hàng, Thanh toán Ủy thác, Vận chuyển hàng hóa từ Trung Quốc về Việt Nam.
              Với đội ngũ nhân viên trẻ trung, năng động, sáng tạo và tận tâm, Hồng Kỳ Logistics
              đã và đang hoàn thiện để trở thành đơn vị cung cấp dịch vụ với chất lượng vượt
              trội, có tiêu chuẩn và bản sắc riêng; hỗ trợ tối đa và đáp ứng nhu cầu ngày càng
              cao của Đối tác và Khách hàng.
            </p>
          </div>
          <div className={`about-page__intro-image ${animateClass('fade-left', introInView, 2)}`}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrR3pcB_D8iLltcq5xMFJYLF3oPNZVeirC9Q&s"
              alt="Hồng Kỳ Logistics"
            />
          </div>
        </div>

        {/* Services Provided */}
        <div id="dich-vu" className="about-page__section" ref={servicesRef as React.Ref<HTMLDivElement>}>
          <h2 className={`about-page__section-title ${animateClass('fade-up', servicesInView, 1)}`}>
            I. Các dịch vụ do Hồng Kỳ Logistics cung cấp:
          </h2>
          <ul className="about-page__list">
            {services.map((item, index) => (
              <li
                key={index}
                className={`about-page__list-item ${animateClass('fade-up', servicesInView, index + 2)}`}
              >
                <span className="about-page__list-icon">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Refusal Section */}
        <div
          id="tu-choi"
          className="about-page__section about-page__section--warning"
          ref={refusalRef as React.Ref<HTMLDivElement>}
        >
          <h2 className={`about-page__section-title ${animateClass('fade-up', refusalInView, 1)}`}>
            II. Hồng Kỳ Logistics từ chối cung cấp dịch vụ khi khách hàng có hành vi sau:
          </h2>
          <ul className="about-page__list">
            {refusals.map((item, index) => (
              <li
                key={index}
                className={`about-page__list-item about-page__list-item--warning ${animateClass('fade-up', refusalInView, index + 2)}`}
              >
                <span className="about-page__list-icon">–</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Closing */}
        <div
          className={`about-page__closing ${animateClass('fade-up', closingInView, 1)}`}
          ref={closingRef as React.Ref<HTMLDivElement>}
        >
          <p className={animateClass('fade-in', closingInView, 2)}>
            <strong>Hồng Kỳ Logistics</strong> xin chân thành cảm ơn và mong muốn được đồng
            hành cùng Quý Khách hàng!
          </p>
          <p className={animateClass('fade-in', closingInView, 3)}>
            <strong>Trân trọng!</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
