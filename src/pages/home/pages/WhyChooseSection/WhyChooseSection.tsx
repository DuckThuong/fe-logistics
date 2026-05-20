import { Row, Col } from 'antd';
import { animateClass, useInView } from '@/hooks/useInView';
import './WhyChooseSection.scss';

const REASONS = [
  {
    icon: '🎯',
    title: 'Chăm sóc khách hàng',
    desc: 'Hệ thống CSKH gồm 6 kênh fanpage Facebook, mỗi fanpage có 3–6 nhân viên hỗ trợ liên tục. Thường xuyên tăng ca hỗ trợ khách hàng săn sale quan trọng.',
  },
  {
    icon: '🛠️',
    title: 'Hệ thống công cụ tiện lợi',
    desc: 'Danh sách đơn hàng được sắp xếp và quản lý riêng biệt. Extension Chrome giúp đặt hàng nhanh chóng chỉ với một click trực tiếp trên trang sản phẩm.',
  },
  {
    icon: '⚙️',
    title: 'Vận hành chính xác & ổn định',
    desc: 'Trạng thái tài khoản và thông báo hệ thống hiển thị thân thiện, nổi bật. Bạn sẽ không bỏ lỡ bất kỳ thông tin nào trong suốt quá trình đặt hàng.',
  },
  {
    icon: '🤝',
    title: 'Trách nhiệm và uy tín',
    desc: 'Hơn 10 năm hoạt động, 10.000+ khách hàng tin tưởng. Cam kết bảo hộ hàng hóa, không phát sinh chi phí sau báo giá, minh bạch từng giao dịch.',
  },
  {
    icon: '✈️',
    title: 'Vận chuyển siêu tốc',
    desc: 'Đối tác độc quyền của ZTO – đơn vị chuyển phát hàng đầu Trung Quốc. Tối ưu quy trình thông quan, hàng về nhanh nhất trong ngành.',
  },
  {
    icon: '🛡️',
    title: 'Bảo hiểm hàng hóa',
    desc: '"Hàng của bạn cũng là hàng của chúng tôi." Hồng Kỳ cam kết bảo hộ toàn bộ hàng hóa từ kho Trung Quốc về đến tay khách hàng tại Việt Nam.',
  },
];

const WhyChooseSection = () => {
  const { ref, inView } = useInView();

  return (
    <section className="hk-why section" ref={ref}>
      <div className="container">
        <div className={`section-header ${animateClass('fade-up', inView, 1)}`}>
          <div className="section-badge">Tại sao chọn chúng tôi?</div>
          <h2>
            Lý do chọn
            <br />
            <span className="text-gradient">Hồng Kỳ Logistics</span>
          </h2>
          <p>
            Chúng tôi không chỉ là đơn vị vận chuyển — chúng tôi là đối tác
            tin cậy đồng hành cùng doanh nghiệp của bạn
          </p>
        </div>

        <Row gutter={[24, 24]}>
          {REASONS.map((reason, index) => (
            <Col key={reason.title} xs={24} sm={12} lg={8}>
              <div className={`hk-why__card ${animateClass('fade-up', inView, index + 2)}`}>
                <div className="hk-why__card-icon">{reason.icon}</div>
                <h3 className="hk-why__card-title">{reason.title}</h3>
                <p className="hk-why__card-desc">{reason.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default WhyChooseSection;
