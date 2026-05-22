import { Link, useLocation } from "react-router-dom";
import { TATIC_SIDEBAR_LINKS } from "../data/pages";

export const TaticSidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="tatic-sidebar">
      <div className="tatic-sidebar__block">
        <h3 className="tatic-sidebar__title">Hướng dẫn sử dụng</h3>
        <ul className="tatic-sidebar__links">
          {TATIC_SIDEBAR_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`tatic-sidebar__link ${pathname === item.href ? "tatic-sidebar__link--active" : ""}`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="tatic-sidebar__block tatic-sidebar__block--tool">
        <h3 className="tatic-sidebar__title">Công cụ mua hàng</h3>
        <p className="tatic-sidebar__tool-desc">
          Công cụ đặt hàng Taobao, 1688 trên Chrome và Cốc Cốc
        </p>
        <p className="tatic-sidebar__tool-note">(Lưu ý chỉ sử dụng trên máy tính)</p>
      </div>
    </aside>
  );
};
