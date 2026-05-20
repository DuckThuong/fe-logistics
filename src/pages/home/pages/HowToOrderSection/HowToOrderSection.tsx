import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { animateClass, useInView } from '@/hooks/useInView';
import './HowToOrderSection.scss';

const STEPS = [
  {
    step: '01',
    icon: '🔍',
    title: 'Tìm sản phẩm',
    desc: 'Tìm kiếm sản phẩm trên Taobao, 1688 hoặc Tmall. Dán link vào hệ thống Công Ty.',
  },
  {
    step: '02',
    icon: '📋',
    title: 'Tạo đơn hàng',
    desc: 'Điền thông tin sản phẩm, số lượng, màu sắc, kích thước. Hệ thống tự báo giá tức thì.',
  },
  {
    step: '03',
    icon: '💳',
    title: 'Thanh toán',
    desc: 'Nạp tiền vào ví Công Ty và xác nhận thanh toán. Chúng tôi thanh toán hộ cho nhà cung cấp.',
  },
  {
    step: '04',
    icon: '🏭',
    title: 'Hàng về kho TQ',
    desc: 'Hàng giao đến kho của chúng tôi tại Quảng Châu. Kiểm tra hàng hóa, đóng gói cẩn thận.',
  },
  {
    step: '05',
    icon: '✈️',
    title: 'Vận chuyển về VN',
    desc: 'Hàng được vận chuyển qua cửa khẩu chính ngạch, thông quan, giao kho Hà Nội / TP.HCM.',
  },
];

const HowToOrderSection = () => {
  const { ref, inView } = useInView();

  return (
    <section className="hk-how section" ref={ref}>
      <div className="container">
        <div className="hk-how__layout">
          {/* Left: Sticky Text */}
          <div className={`hk-how__header ${animateClass('fade-right', inView, 1)}`}>
            <div className="section-badge">5 bước đơn giản</div>
            <h2 className={`hk-how__title ${animateClass('fade-up', inView, 2)}`}>
              Mua hàng nội địa Trung
              <br />
              <span className="text-gradient">với vài bước đơn giản</span>
            </h2>
            <p className={`hk-how__desc ${animateClass('fade-up', inView, 3)}`}>
              Bạn đang tìm nguồn hàng nội địa Trung, hay muốn mua những mặt
              hàng độc đáo chỉ có ở Trung Quốc? Công Ty giúp bạn làm điều đó
              dễ dàng hơn bao giờ hết.
            </p>
            <Button type="primary" size="large" className={`hk-how__cta ${animateClass('fade-up', inView, 4)}`} href="/dang-ky">
              Bắt đầu ngay
              <ArrowRightOutlined />
            </Button>
          </div>

          {/* Right: Steps */}
          <div className={`hk-how__steps ${animateClass('fade-left', inView, 2)}`}>
            {STEPS.map((step, index) => (
              <div key={step.step} className={`hk-how__step ${animateClass('fade-up', inView, index + 3)}`}>
                <div className="hk-how__step-left">
                  <div className="hk-how__step-number">{step.step}</div>
                  {index < STEPS.length - 1 && <div className="hk-how__step-line" />}
                </div>
                <div className="hk-how__step-content">
                  <div className="hk-how__step-icon">{step.icon}</div>
                  <div className="hk-how__step-body">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToOrderSection;
