import { Row, Col, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { animateClass, useInView } from "@/hooks/useInView";
import { ROUTER_PATH } from "@/routers/Route";
import "./ServicesSection.scss";

const SERVICES = [
  // {
  //   icon: "🛒",
  //   title: "Đặt hàng Trung Quốc",
  //   desc: "Order hàng từ Taobao, 1688, Tmall và các sàn nội địa Trung Quốc. Kiểm tra hàng trước khi gửi về.",
  //   features: [
  //     "Order nhanh bằng link",
  //     "Kiểm tra hàng miễn phí",
  //     "Hỗ trợ mặc cả với seller",
  //   ],
  //   href: ROUTER_PATH.SERVICE_ORDER,
  //   highlight: true,
  // },
  {
    icon: "💳",
    title: "Thanh toán hộ",
    desc: "Nạp tiền vào Alipay, WeChat, thanh toán Taobao, 1688, Tmall khi mua hàng. Không phí dịch vụ.",
    features: [
      "Nạp Alipay / WeChat",
      "Thanh toán Taobao, 1688",
      "Tỉ giá cạnh tranh",
    ],
    href: ROUTER_PATH.SERVICE_PAYMENT,
    highlight: true,
  },
  {
    icon: "🚚",
    title: "Ký gửi vận chuyển",
    desc: "Bạn đã có hàng bên Trung Quốc? Ký gửi để chúng tôi vận chuyển về Việt Nam nhanh, an toàn.",
    features: [
      "Nhận hàng tại kho TQ",
      "Bảo hiểm hàng hoá",
      "Tra cứu đơn thời gian thực",
    ],
    href: ROUTER_PATH.SERVICE_SHIPPING,
  },
  {
    icon: "🏢",
    title: "Gửi hàng Trung Quốc",
    desc: "Gửi hàng từ Việt Nam sang Trung Quốc cho đối tác, khách hàng với chi phí tối ưu nhất.",
    features: [
      "Giao tận địa chỉ TQ",
      "Theo dõi đơn online",
      "Hỗ trợ khai báo hải quan",
    ],
    href: "/dich-vu/gui-hang-tq",
  },
  {
    icon: "📋",
    title: "Uỷ thác nhập khẩu",
    desc: "Nhập khẩu chính ngạch số lượng lớn qua cửa khẩu. Đầy đủ thủ tục, thuế quan minh bạch.",
    features: [
      "Nhập chính ngạch",
      "Thủ tục hải quan trọn gói",
      "Tư vấn thuế nhập khẩu",
    ],
    href: "/dich-vu/uy-thac-nhap-khau",
  },
];

const ServicesSection = () => {
  const { ref, inView } = useInView();

  return (
    <section className="hk-services section" ref={ref}>
      <div className="container">
        <div className={`section-header ${animateClass("fade-up", inView, 1)}`}>
          <div className="section-badge">Dịch vụ toàn diện</div>
          <h2>
            Một hệ thống duy nhất
            <br />
            <span className="text-gradient">cho tất cả những gì bạn cần</span>
          </h2>
          <p>Từ đặt hàng, thanh toán đến vận chuyển — Công Ty lo trọn gói</p>
        </div>

        <Row gutter={[20, 20]}>
          {SERVICES.map((service, index) => (
            <Col
              key={service.title}
              xs={24}
              sm={24}
              md={12}
              lg={service.highlight ? 12 : 6}
            >
              <div
                className={`hk-services__card ${service.highlight ? "hk-services__card--highlight" : ""} ${animateClass("fade-up", inView, index + 2)}`}
              >
                <div className="hk-services__card-icon">{service.icon}</div>
                <h3 className="hk-services__card-title">{service.title}</h3>
                <p className="hk-services__card-desc">{service.desc}</p>
                <ul className="hk-services__card-features">
                  {service.features.map((f) => (
                    <li key={f}>
                      <span className="hk-services__check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={service.href} className="hk-services__card-link">
                  Tìm hiểu thêm <ArrowRightOutlined />
                </a>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default ServicesSection;
