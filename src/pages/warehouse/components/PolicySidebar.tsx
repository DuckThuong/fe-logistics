import { Link, useLocation } from "react-router-dom";
import { POLICY_SIDEBAR_LINKS } from "../data/content";

export const PolicySidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="warehouse-sidebar">
      <div className="warehouse-sidebar__block">
        <h3 className="warehouse-sidebar__title">Danh mục chính sách</h3>
        <ul className="warehouse-sidebar__links">
          {POLICY_SIDEBAR_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`warehouse-sidebar__link ${
                  pathname === item.href ? "warehouse-sidebar__link--active" : ""
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="warehouse-sidebar__block warehouse-sidebar__block--tool">
        <h3 className="warehouse-sidebar__title">Lưu ý thực thi</h3>
        <p className="warehouse-sidebar__tool-desc">
          Mọi chính sách được áp dụng minh bạch theo từng loại dịch vụ và từng thời điểm cập nhật.
        </p>
        <p className="warehouse-sidebar__tool-note">
          Nếu có điểm chưa rõ, vui lòng liên hệ CSKH để được giải thích trước khi tạo đơn.
        </p>
      </div>
    </aside>
  );
};
