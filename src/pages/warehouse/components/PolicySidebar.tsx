import { emptyString, retractTitle } from "@/common/contexts/helper";
import type { PolicySectionDto } from "@/api/dtos/policy.response";

type PolicySidebarProps = {
  sections?: PolicySectionDto[];
};

const buildSectionAnchorId = (sectionId: number) =>
  `policy-section-${sectionId}`;

export const PolicySidebar = ({ sections }: PolicySidebarProps) => {
  const sidebarLinks =
    sections
      ?.filter((child) => child.active)
      ?.sort((a, b) => a.sortIndex - b.sortIndex)
      ?.map((section) => ({
        id: buildSectionAnchorId(section.id),
        title:
          retractTitle(section.title)[0]?.text || emptyString(section.title),
      })) ?? [];

  const handleFocusSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    target.focus();
  };

  return (
    <aside className="warehouse-sidebar">
      <div className="warehouse-sidebar__block">
        <h3 className="warehouse-sidebar__title">Danh mục chính sách</h3>
        <ul className="warehouse-sidebar__links">
          {sidebarLinks.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                style={{ border: "none" }}
                className="warehouse-sidebar__link"
                onClick={() => handleFocusSection(item.id)}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="warehouse-sidebar__block warehouse-sidebar__block--tool">
        <h3 className="warehouse-sidebar__title">Lưu ý thực thi</h3>
        <p className="warehouse-sidebar__tool-desc">
          Mọi chính sách được áp dụng minh bạch theo từng loại dịch vụ và từng
          thời điểm cập nhật.
        </p>
        <p className="warehouse-sidebar__tool-note">
          Nếu có điểm chưa rõ, vui lòng liên hệ CSKH để được giải thích trước
          khi tạo đơn.
        </p>
      </div>
    </aside>
  );
};
