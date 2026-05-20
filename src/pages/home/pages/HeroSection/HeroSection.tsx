import { useEffect, useState } from 'react';
import { Button, Tag } from 'antd';
import { ArrowRightOutlined, ChromeOutlined, StarFilled } from '@ant-design/icons';
import { animateClass } from '@/hooks/useInView';
import './HeroSection.scss';

const PLATFORMS = [
  { name: 'Taobao', color: '#ff6900' },
  { name: '1688', color: '#e4393c' },
  { name: 'Tmall', color: '#ff0036' },
  { name: 'JD.com', color: '#c0392b' },
  { name: 'Pinduoduo', color: '#e02e24' },
];

const TRUST_BADGES = [
  { value: '10+', label: 'Năm kinh nghiệm' },
  { value: '800+', label: 'Đơn/ngày' },
  { value: '10K+', label: 'Khách hàng' },
];

export const HeroSection = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <section className="hk-hero">
      <div className="hk-hero__bg">
        <div className={`hk-hero__bg-gradient ${animateClass('fade-in', visible, 0)}`} />
        <div className={`hk-hero__bg-grid ${animateClass('fade-out', visible, 0)}`} />
        <div className="hk-hero__bg-blob hk-hero__bg-blob--1" />
        <div className="hk-hero__bg-blob hk-hero__bg-blob--2" />
        <div className="hk-hero__bg-blob hk-hero__bg-blob--3" />
      </div>

      <div className="hk-hero__inner container">
        <div className="hk-hero__content">
          <div className={animateClass('fade-down', visible, 1)}>
            <div className="hk-hero__badge">
              <StarFilled className="hk-hero__badge-icon" />
              <span>Đơn vị nhập hàng Trung Quốc uy tín #1 Việt Nam</span>
            </div>
          </div>

          <h1 className={`hk-hero__title ${animateClass('fade-up', visible, 2)}`}>
            Hệ thống vận hành
            <br />
            <span className="hk-hero__title-highlight">giao dịch thương mại</span>
            <br />
            Trung Quốc – Việt Nam
          </h1>

          <p className={`hk-hero__subtitle ${animateClass('fade-in', visible, 3)}`}>
            Giải pháp mua hàng nội địa Trung nhanh chóng và uy tín. Đặt hàng
            Taobao, 1688, Tmall với chi phí tối ưu, giao hàng tận nơi.
          </p>

          <div className={`hk-hero__platforms ${animateClass('fade-out', visible, 4)}`}>
            <span className="hk-hero__platforms-label">Hỗ trợ:</span>
            {PLATFORMS.map((p) => (
              <Tag key={p.name} className="hk-hero__platform-tag">
                {p.name}
              </Tag>
            ))}
          </div>

          <div className={`hk-hero__actions ${animateClass('fade-down', visible, 5)}`}>
            <Button type="primary" size="large" className="hk-hero__btn-primary" href="/dang-ky">
              Tạo đơn hàng ngay
              <ArrowRightOutlined />
            </Button>
            <Button size="large" className="hk-hero__btn-secondary" href="/bang-gia">
              Xem bảng giá
            </Button>
          </div>

          <div className={`hk-hero__extension ${animateClass('fade-in', visible, 6)}`}>
            <ChromeOutlined className="hk-hero__extension-icon" />
            <span>Tải tiện ích đặt hàng cho</span>
            <a href="#chrome" className="hk-hero__extension-link">
              Chrome / Cốc Cốc
            </a>
          </div>
        </div>

        <div className={`hk-hero__stats ${animateClass('fade-up', visible, 3)}`}>
          {TRUST_BADGES.map((badge, i) => (
            <div
              key={badge.value}
              className={`hk-hero__stat ${animateClass(i === 1 ? 'fade-out' : 'fade-up', visible, 4 + i)}`}
            >
              <div className="hk-hero__stat-value">{badge.value}</div>
              <div className="hk-hero__stat-label">{badge.label}</div>
            </div>
          ))}
        </div>

        <div className={`hk-hero__float-card hk-hero__float-card--order ${animateClass('fade-up', visible, 5)}`}>
          <div className="hk-hero__float-card-dot" />
          <div className="hk-hero__float-card-content">
            <strong>Đơn hàng mới</strong>
            <span>DHTQ0384585 · Đang vận chuyển</span>
          </div>
        </div>

        <div className={`hk-hero__float-card hk-hero__float-card--delivery ${animateClass('fade-down', visible, 6)}`}>
          <div className="hk-hero__float-card-icon">🚀</div>
          <div className="hk-hero__float-card-content">
            <strong>Giao hàng siêu tốc</strong>
            <span>7–10 ngày về Việt Nam</span>
          </div>
        </div>
      </div>

      <div className={`hk-hero__scroll ${animateClass('fade-in', visible, 8)}`}>
        <div className="hk-hero__scroll-dot" />
      </div>
    </section>
  );
};
