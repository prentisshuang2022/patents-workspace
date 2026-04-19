import { Icon, IconName } from "./Icon";

interface SidebarProps {
  active?: string;
}

const items: { label: string; icon: IconName }[] = [
  { label: "智能检索", icon: "search" },
  { label: "创建新对话", icon: "edit" },
  { label: "我的订阅", icon: "bookmark" },
  { label: "专利专题库", icon: "book" },
  { label: "专利工作空间", icon: "grid" },
  { label: "历史对话", icon: "history" },
];

export const Sidebar = ({ active = "专利工作空间" }: SidebarProps) => (
  <aside className="sidebar">
    <div className="logo">
      <div className="logo-mark">P</div>
      <span>AI 专利创新空间</span>
    </div>
    <nav>
      {items.map((it) => (
        <div key={it.label} className={`nav-item ${active === it.label ? "active" : ""}`}>
          <Icon name={it.icon} size={16} />
          <span>{it.label}</span>
        </div>
      ))}
    </nav>
    <div className="footer">武汉数为科技有限公司</div>
  </aside>
);
