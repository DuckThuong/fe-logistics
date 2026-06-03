import { PhoneOutlined } from "@ant-design/icons";
import { BRAND } from "@/common/constants/constants";
import "./PhoneFloatButton.scss";

export const PhoneFloatButton = () => (
  <div className="phone-float">
    <span className="phone-float__tooltip">Gọi hotline {BRAND.hotlineDisplay}</span>
    <a
      href={BRAND.telHref}
      className="phone-float__btn"
      aria-label={`Gọi ${BRAND.hotlineDisplay}`}
    >
      <span className="phone-float__pulse" />
      <span className="phone-float__pulse phone-float__pulse--delay" />
      <PhoneOutlined className="phone-float__icon" />
    </a>
  </div>
);
