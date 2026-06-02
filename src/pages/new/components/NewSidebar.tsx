type NewSidebarSection = {
  id: string;
  title: string;
};

type NewSidebarProps = {
  sections: NewSidebarSection[];
};

export const NewSidebar = ({ sections }: NewSidebarProps) => {
  const handleFocusSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    target.focus();
  };

  return (
    <aside className="new-sidebar">
      <div className="new-sidebar__block">
        <h3 className="new-sidebar__title">Nội dung bài viết</h3>
        <ul className="new-sidebar__links">
          {sections.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                style={{border: "none", textAlign: "left", cursor: "pointer"}}
                className="new-sidebar__link"
                onClick={() => handleFocusSection(item.id)}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
