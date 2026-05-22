import { Link, useLocation } from "react-router-dom";
import { NEW_SIDEBAR_LINKS } from "../data/pages";

export const NewSidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="new-sidebar">
      <div className="new-sidebar__block">
        <h3 className="new-sidebar__title">Tin tức mới</h3>
        <ul className="new-sidebar__links">
          {NEW_SIDEBAR_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={`new-sidebar__link ${pathname === item.href ? "new-sidebar__link--active" : ""}`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
