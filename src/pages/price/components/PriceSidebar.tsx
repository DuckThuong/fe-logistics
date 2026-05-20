import { Link, useLocation } from "react-router-dom";
import { PRICE_SIDEBAR_LINKS } from "../data/pages";

export const PriceSidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="price-sidebar">
      <div className="price-sidebar__block">
        <h3 className="price-sidebar__title">Bảng giá dịch vụ</h3>
        <ul className="price-sidebar__links">
          {PRICE_SIDEBAR_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`price-sidebar__link ${pathname === item.href ? "price-sidebar__link--active" : ""}`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="price-sidebar__block price-sidebar__block--tool">
        <h3 className="price-sidebar__title">Công cụ mua hàng</h3>
        <p className="price-sidebar__tool-desc">
          Công cụ đặt hàng Taobao, 1688 trên Chrome và Cốc Cốc
        </p>
        <p className="price-sidebar__tool-note">(Lưu ý chỉ sử dụng trên máy tính)</p>
      </div>
    </aside>
  );
};
