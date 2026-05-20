import { useEffect, useRef, useState } from 'react';
import { animateClass, useInView } from '@/hooks/useInView';
import './StatsSection.scss';

const STATS = [
  { value: 10, suffix: '+', label: 'Năm kinh nghiệm', icon: '🏆' },
  { value: 7, suffix: '', label: 'Kho hàng Việt – Trung', icon: '🏭' },
  { value: 800, suffix: '+', label: 'Đơn hàng mỗi ngày', icon: '📦' },
  { value: 10000, suffix: '+', label: 'Khách hàng tin tưởng', icon: '👥' },
];

const GOODS_TYPES = [
  'Thực phẩm',
  'Thiết bị công nghệ',
  'Thời trang',
  'Mỹ phẩm',
  'Nông sản, thủy sản',
  'Đồ gia dụng',
  'Mặt hàng y tế',
  'Thủ công, mỹ nghệ',
  'Giấy tờ, thư từ',
  'Đồ dùng cá nhân',
];

const useCountUp = (target: number, duration = 1500, start = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [target, duration, start]);

  return count;
};

const StatItem = ({
  stat,
  animate,
  delay,
}: {
  stat: (typeof STATS)[0];
  animate: boolean;
  delay: number;
}) => {
  const count = useCountUp(stat.value, 1500, animate);
  const display = animate ? count : 0;

  return (
    <div className={`hk-stats__item ${animateClass('fade-up', animate, delay)}`}>
      <div className="hk-stats__item-icon">{stat.icon}</div>
      <div className="hk-stats__item-value">
        {display.toLocaleString()}{stat.suffix}
      </div>
      <div className="hk-stats__item-label">{stat.label}</div>
    </div>
  );
};

const StatsSection = () => {
  const { ref, inView } = useInView();
  const [animate, setAnimate] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.3 }
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hk-stats section section--dark" ref={ref}>
      <div className="hk-stats__bg-pattern" />
      <div className="container">
        <div className="hk-stats__layout">
          <div className={`hk-stats__numbers ${animateClass('fade-right', inView, 1)}`} ref={countRef}>
            <div
              className={`section-badge ${animateClass('fade-up', inView, 1)}`}
              style={{ background: 'rgba(255,106,0,0.2)', color: '#ffb380' }}
            >
              Con số ấn tượng
            </div>
            <h2 className={`hk-stats__title ${animateClass('fade-up', inView, 2)}`}>
              Đối tác vận chuyển uy tín
              <br />
              <span className="text-gradient">của nhiều doanh nghiệp VN</span>
            </h2>
            <div className="hk-stats__grid">
              {STATS.map((stat, index) => (
                <StatItem key={stat.label} stat={stat} animate={animate} delay={index + 3} />
              ))}
            </div>
          </div>

          <div className={`hk-stats__goods ${animateClass('fade-left', inView, 2)}`}>
            <h3 className={`hk-stats__goods-title ${animateClass('fade-up', inView, 3)}`}>
              Mặt hàng chúng tôi thường vận chuyển
            </h3>
            <div className="hk-stats__goods-grid">
              {GOODS_TYPES.map((type, index) => (
                <div key={type} className={`hk-stats__good-tag ${animateClass('fade-up', inView, index + 4)}`}>
                  {type}
                </div>
              ))}
            </div>
            <p className={`hk-stats__goods-note ${animateClass('fade-in', inView, 6)}`}>
              * Xem danh mục hàng hoá cấm nhập khẩu trước khi đặt hàng
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
