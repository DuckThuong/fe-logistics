import { BRAND } from "@/common/constants/constants";
import "./ZaloFloatButton.scss";
import zalo from "../../assets/icons/zalo.svg";

export const ZaloFloatButton = () => (
  <div className="zalo-float">
    <span className="zalo-float__tooltip">Liên hệ qua Zalo</span>
    <a
      href={BRAND.zaloUrl}
      className="zalo-float__btn"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Liên hệ qua Zalo"
    >
      <span className="zalo-float__pulse" />
      <span className="zalo-float__pulse zalo-float__pulse--delay" />
      <img
        className="zalo-float__logo"
        src={zalo}
        alt=""
        width={56}
        height={56}
        decoding="async"
        draggable={false}
      />
    </a>
  </div>
);
