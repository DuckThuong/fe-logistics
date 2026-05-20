import {
  AppstoreOutlined,
  UnorderedListOutlined,
  BellOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import { animateClass, useInView } from '@/hooks/useInView';
import './DashboardSection.scss';

const FEATURES = [
  {
    icon: <AppstoreOutlined />,
    title: 'Giao diện trực quan',
    desc: 'Dễ dàng lựa chọn và khởi tạo đơn hàng đúng với từng nhu cầu sử dụng mỗi khi lên đơn hàng mới.',
  },
  {
    icon: <UnorderedListOutlined />,
    title: 'Danh sách đơn hàng',
    desc: 'Danh sách đơn hàng được sắp xếp và quản lý riêng biệt giúp dễ dàng truy cập. Không còn lo bỏ sót lô hàng nào.',
  },
  {
    icon: <BellOutlined />,
    title: 'Cập nhật trạng thái',
    desc: 'Trạng thái và thông báo hệ thống hiển thị thân thiện, bạn sẽ không bỏ lỡ bất kỳ thông tin nào.',
  },
  {
    icon: <CustomerServiceOutlined />,
    title: 'Chat hỗ trợ 24/7',
    desc: 'Kênh hỗ trợ gộp thành duy nhất, giúp bạn ngay lập tức được giải đáp các vấn đề trong quá trình đặt hàng.',
  },
];

const MOCK_ORDERS = [
  { id: 'DHTQ0384585', status: 'Đang vận chuyển', amount: '2.500.000đ', color: '#3b82f6' },
  { id: 'DHTQ0384423', status: 'Đã về kho VN', amount: '1.800.000đ', color: '#10b981' },
  { id: 'DHTQ0384201', status: 'Chờ xác nhận', amount: '890.000đ', color: '#f59e0b' },
];

const DashboardSection = () => {
  const { ref, inView } = useInView();

  return (
    <section className="hk-dashboard section section--gray" ref={ref}>
      <div className="container">
        <div className="hk-dashboard__layout">
          {/* Left: Features */}
          <div className={`hk-dashboard__features ${animateClass('fade-right', inView, 1)}`}>
            <div className={`section-badge ${animateClass('fade-up', inView, 1)}`}>Dashboard thông minh</div>
            <h2 className={`hk-dashboard__title ${animateClass('fade-up', inView, 2)}`}>
              Quản lý đơn hàng
              <br />
              <span className="text-gradient">nhanh chóng</span>
            </h2>
            <div className="hk-dashboard__feature-list">
              {FEATURES.map((f, index) => (
                <div key={f.title} className={`hk-dashboard__feature ${animateClass('fade-up', inView, index + 3)}`}>
                  <div className="hk-dashboard__feature-icon">{f.icon}</div>
                  <div className="hk-dashboard__feature-body">
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className={`hk-dashboard__mockup ${animateClass('fade-left', inView, 2)}`}>
            <div className="hk-dashboard__mockup-inner">
              {/* Wallet Card */}
              <div className="hk-dashboard__wallet">
                <div className="hk-dashboard__wallet-label">Số dư ví</div>
                <div className="hk-dashboard__wallet-amount">10,234,000 <span>VNĐ</span></div>
                <div className="hk-dashboard__wallet-actions">
                  {['Nạp tiền', 'Rút tiền', 'Lịch sử GD'].map((a) => (
                    <button key={a} className="hk-dashboard__wallet-action">{a}</button>
                  ))}
                </div>
              </div>

              {/* Order List */}
              <div className="hk-dashboard__orders">
                <div className="hk-dashboard__orders-header">
                  <span>Đơn hàng gần đây</span>
                  <a href="#" className="hk-dashboard__orders-view-all">Xem tất cả →</a>
                </div>
                {MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="hk-dashboard__order-item">
                    <div className="hk-dashboard__order-left">
                      <div
                        className="hk-dashboard__order-dot"
                        style={{ background: order.color }}
                      />
                      <div>
                        <div className="hk-dashboard__order-id">{order.id}</div>
                        <div
                          className="hk-dashboard__order-status"
                          style={{ color: order.color }}
                        >
                          {order.status}
                        </div>
                      </div>
                    </div>
                    <div className="hk-dashboard__order-amount">{order.amount}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Glow Effect */}
            <div className="hk-dashboard__mockup-glow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
