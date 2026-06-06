import { Row, Col } from 'antd';
import { animateClass, useInView } from '@/hooks/useInView';
import './PlatformsSection.scss';

const PLATFORMS = [
  { name: 'Taobao', emoji: '🛒', desc: 'Mua sắm cá nhân & bán lẻ', color: '#ff6900' },
  { name: '1688', emoji: '🏭', desc: 'Nguồn hàng sỉ tận xưởng', color: '#e4393c' },
  { name: 'Tmall', emoji: '🏪', desc: 'Thương hiệu chính hãng', color: '#ff0036' },
  { name: 'JD.com', emoji: '📦', desc: 'Hàng công nghệ & gia dụng', color: '#c0392b' },
  { name: 'Pinduoduo', emoji: '💰', desc: 'Giá rẻ nhất thị trường', color: '#e02e24' },
  { name: 'WeChat Shop', emoji: '💬', desc: 'Hàng mini-program', color: '#07c160' },
];

const PlatformsSection = () => {
  const { ref, inView } = useInView();

  return (
    <section className="hk-platforms section" ref={ref}>
      <div className="container">
        <div className={`section-header ${animateClass('fade-up', inView, 1)}`}>
          <div className="section-badge">🌏 Đa nền tảng</div>
          <h2>
            Tiếp cận nguồn hàng từ
            <br />
            <span className="text-gradient">các sàn TMĐT lớn nhất thế giới</span>
          </h2>
          <p>
            Chỉ cần một tài khoản Công Ty, bạn có thể đặt hàng từ mọi sàn
            thương mại điện tử nội địa Trung Quốc
          </p>
        </div>

        <Row gutter={[20, 20]}>
          {PLATFORMS.map((platform, index) => (
            <Col key={platform.name} xs={12} sm={8} md={8} lg={4}>
              <div className={`hk-platforms__card ${animateClass('fade-up', inView, index + 2)}`}>
                <div
                  className="hk-platforms__card-icon"
                  style={{ '--platform-color': platform.color } as React.CSSProperties}
                >
                  {platform.emoji}
                </div>
                <h3 className="hk-platforms__card-name">{platform.name}</h3>
                <p className="hk-platforms__card-desc">{platform.desc}</p>
              </div>
            </Col>
          ))}
        </Row>

      </div>
    </section>
  );
};

export default PlatformsSection;
