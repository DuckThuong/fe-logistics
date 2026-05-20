import { RECENT_POSTS } from "../data/content";

export const ServiceSidebar = () => (
  <aside className="service-sidebar">
    <div className="service-sidebar__block">
      <h3 className="service-sidebar__title">Bài viết mới</h3>
      <ul className="service-sidebar__posts">
        {RECENT_POSTS.map((post) => (
          <li key={post.title}>
            <a href={post.href} className="service-sidebar__post-link">
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>

    <div className="service-sidebar__block service-sidebar__block--tool">
      <h3 className="service-sidebar__title">Công cụ mua hàng</h3>
      <p className="service-sidebar__tool-desc">
        Công cụ đặt hàng Taobao, 1688 trên Chrome và Cốc Cốc
      </p>
      <p className="service-sidebar__tool-note">(Lưu ý chỉ sử dụng trên máy tính)</p>
    </div>
  </aside>
);
