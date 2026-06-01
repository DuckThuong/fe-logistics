import { useState } from "react";
import { Modal, Tag, Button, Space } from "antd";
import "./style.scss";

const STATS = [
  { num: "18+", label: "Năm kinh nghiệm" },
  { num: "5.000+", label: "Khách hàng" },
  { num: "63", label: "Tỉnh thành" },
];

const CONTACTS = [
  { icon: "📍", label: "Trụ sở chính", value: "123 Nguyễn Văn Linh, Q.7, TP.HCM" },
  { icon: "📞", label: "Hotline", value: "1800 1234" },
  { icon: "✉️", label: "Email", value: "contact@mvl.com.vn" },
  { icon: "🕐", label: "Giờ làm việc", value: "T2–T7: 7:30 – 17:30" },
];

const SERVICES = [
  "🚚 Vận tải nội địa",
  "🚢 Xuất nhập khẩu",
  "🏭 Kho bãi",
  "✈️ Hàng không",
  "📦 Đóng gói",
];

const BADGES = ["ISO 9001:2015", "Top 10 Logistics VN", "Quốc tế"];

export const InfoBannerPopup = () => {
  const [open, setOpen] = useState(true);

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      closable={false}
      width={580}
      centered
      className="mvl-popup"
    >
      {/* ── HEADER ── */}
      <div className="mvl-popup__header">
        <div className="mvl-popup__header-decor mvl-popup__header-decor--a" />
        <div className="mvl-popup__header-decor mvl-popup__header-decor--b" />

        <button
          className="mvl-popup__close"
          onClick={() => setOpen(false)}
          aria-label="Đóng popup"
        >
          ✕
        </button>

        <div className="mvl-popup__logo-row">
          <div className="mvl-popup__logo-box">
            <span className="mvl-popup__logo-text">MVL</span>
          </div>
          <div>
            <p className="mvl-popup__company-name">MVL Logistics</p>
            <p className="mvl-popup__company-sub">
              Giải pháp vận tải &amp; chuỗi cung ứng toàn diện
            </p>
          </div>
        </div>

        <Space size={8} wrap>
          {BADGES.map((b) => (
            <Tag key={b} className="mvl-popup__badge">
              {b}
            </Tag>
          ))}
        </Space>
      </div>

      {/* ── STATS ── */}
      <div className="mvl-popup__stats">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`mvl-popup__stat${
              i < STATS.length - 1 ? " mvl-popup__stat--bordered" : ""
            }`}
          >
            <span className="mvl-popup__stat-num">{s.num}</span>
            <span className="mvl-popup__stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── BODY ── */}
      <div className="mvl-popup__body">
        <p className="mvl-popup__desc">
          MVL Logistics cung cấp dịch vụ vận chuyển hàng hóa, kho bãi và quản
          lý chuỗi cung ứng hiệu quả — kết nối doanh nghiệp Việt Nam với thị
          trường toàn cầu.
        </p>

        <p className="mvl-popup__section-title">Thông tin liên hệ</p>
        <div className="mvl-popup__info-grid">
          {CONTACTS.map((item) => (
            <div key={item.label} className="mvl-popup__info-item">
              <div className="mvl-popup__icon-wrap">
                <span>{item.icon}</span>
              </div>
              <div>
                <span className="mvl-popup__info-label">{item.label}</span>
                <span className="mvl-popup__info-value">{item.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mvl-popup__divider" />

        <p className="mvl-popup__section-title">Dịch vụ cung cấp</p>
        <Space size={8} wrap className="mvl-popup__services">
          {SERVICES.map((svc) => (
            <Tag key={svc} className="mvl-popup__service-tag">
              {svc}
            </Tag>
          ))}
        </Space>
      </div>

      {/* ── FOOTER ── */}
      <div className="mvl-popup__footer">
        <Button
          type="primary"
          className="mvl-popup__btn-primary"
          block
          onClick={() => setOpen(false)}
        >
          📞 Liên hệ tư vấn
        </Button>
        <Button
          className="mvl-popup__btn-secondary"
          onClick={() => setOpen(false)}
        >
          📄 Bảng giá
        </Button>
      </div>
    </Modal>
  );
};