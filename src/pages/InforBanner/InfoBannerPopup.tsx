import { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { BRAND } from "@/common/constants/constants";
import "./style.scss";

const INFO_BANNER_DISMISS_KEY = "fe.info-banner.dismissed";

export const InfoBannerPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(INFO_BANNER_DISMISS_KEY) !== "1") {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem(INFO_BANNER_DISMISS_KEY, "1");
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      closable={false}
      width={400}
      centered
      className="mvl-popup"
    >
      {/* ── HEADER ── */}
      <div className="mvl-popup__header">
        <div className="mvl-popup__header-decor mvl-popup__header-decor--a" />
        <div className="mvl-popup__header-decor mvl-popup__header-decor--b" />

        <button
          className="mvl-popup__close"
          onClick={handleClose}
          aria-label="Đóng popup"
        >
          ✕
        </button>

        <div className="mvl-popup__logo-row">
          <img
            src={BRAND.logoSrc}
            alt={BRAND.name}
            className="mvl-popup__logo-img"
          />
          <div>
            <p className="mvl-popup__company-name">{BRAND.name}</p>
            <p className="mvl-popup__company-sub">
              Giải pháp vận tải &amp; chuỗi cung ứng toàn diện
            </p>
          </div>
        </div>
      </div>

      {/* ── HOTLINE ── */}
      <div className="mvl-popup__hotline" style={{ padding: "24px 16px" }}>
        <p className="mvl-popup__hotline-label">Hotline hỗ trợ</p>
        <a href={BRAND.telHref} className="mvl-popup__hotline-num">
          {BRAND.hotlineDisplay}
        </a>
        <p className="mvl-popup__hotline-hint">Miễn phí · T2–T7: 7:30–17:30</p>
      </div>

      {/* ── FOOTER ── */}
      <div className="mvl-popup__footer">
        <Button
          type="primary"
          className="mvl-popup__btn-primary"
          block
          href={BRAND.telHref}
          onClick={handleClose}
        >
          📞 Gọi ngay
        </Button>
        {/* <Button className="mvl-popup__btn-secondary" onClick={handleClose}>
          Bỏ qua
        </Button> */}
      </div>
    </Modal>
  );
};