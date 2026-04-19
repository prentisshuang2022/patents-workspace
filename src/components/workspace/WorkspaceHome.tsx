import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { Workspace, WORKSPACES, TYPE_OPTIONS, STATUS_OPTIONS } from "./data";

interface Props {
  onOpen: (ws: Workspace) => void;
  onCreate: () => void;
}

const Dropdown = ({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button className="btn btn-secondary" onClick={() => setOpen((o) => !o)}>
        {value} <Icon name="chevronDown" size={14} />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            background: "#fff",
            border: "1px solid var(--border)",
            borderRadius: 10,
            boxShadow: "var(--shadow)",
            zIndex: 20,
            minWidth: 150,
            padding: "6px 0",
          }}
        >
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              style={{
                padding: "9px 14px",
                fontSize: 13.5,
                cursor: "pointer",
                color: opt === value ? "var(--primary-700)" : "var(--text-2)",
                background: opt === value ? "var(--primary-50)" : "transparent",
                fontWeight: opt === value ? 500 : 400,
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                if (opt !== value) e.currentTarget.style.background = "var(--surface-muted)";
              }}
              onMouseLeave={(e) => {
                if (opt !== value) e.currentTarget.style.background = "transparent";
              }}
            >
              {opt === value && (
                <span style={{ marginRight: 6, display: "inline-flex" }}>
                  <Icon name="check" size={13} color="var(--primary-700)" />
                </span>
              )}
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const WorkspaceHome = ({ onOpen, onCreate }: Props) => {
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState("全部空间");
  const [statusFilter, setStatusFilter] = useState("全部状态");

  const filtered = WORKSPACES.filter((w) => {
    const matchQ = !q || w.name.includes(q) || w.desc.includes(q);
    const matchType =
      typeFilter === "全部空间" || w.type === typeFilter || w.typeTag.text === typeFilter;
    const matchStatus =
      statusFilter === "全部状态" ||
      (w.statusTag && w.statusTag.text === statusFilter) ||
      w.status === statusFilter;
    return matchQ && matchType && matchStatus;
  });

  return (
    <div>
      <h1 className="page-title">专利工作空间</h1>
      <p className="page-subtitle">围绕具体任务承接查新结果、组织分析过程、沉淀结论与输出结果</p>

      <div style={{ display: "flex", gap: 12, marginTop: 22, marginBottom: 22 }}>
        <div className="search-wrap">
          <Icon name="search" size={16} className="search-icon" />
          <input
            className="input"
            placeholder="搜索工作空间..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <Dropdown options={TYPE_OPTIONS} value={typeFilter} onChange={setTypeFilter} />
        <Dropdown options={STATUS_OPTIONS} value={statusFilter} onChange={setStatusFilter} />
        <button className="btn btn-primary" onClick={onCreate}>
          <Icon name="plus" size={14} color="#fff" /> 新建工作空间
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
          gap: 16,
        }}
      >
        {filtered.length === 0 ? (
          <div
            style={{
              gridColumn: "1/-1",
              textAlign: "center",
              padding: "60px 0",
              color: "var(--text-3)",
            }}
          >
            <Icon name="search" size={32} color="var(--text-4)" />
            <div style={{ marginTop: 12, fontSize: 14 }}>没有符合条件的工作空间</div>
            <div style={{ fontSize: 12.5, marginTop: 4 }}>尝试调整筛选条件或搜索关键词</div>
          </div>
        ) : (
          filtered.map((w) => (
            <div
              key={w.id}
              className="card card-hover"
              style={{
                cursor: w.disabled ? "not-allowed" : "pointer",
                opacity: w.disabled ? 0.45 : 1,
                pointerEvents: w.disabled ? "none" : "auto",
              }}
              onClick={() => !w.disabled && onOpen(w)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 8,
                }}
              >
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>{w.name}</h3>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  {w.statusTag && (
                    <span className={`tag tag-${w.statusTag.color}`}>{w.statusTag.text}</span>
                  )}
                  <span className={`tag tag-${w.typeTag.color}`}>{w.typeTag.text}</span>
                </div>
              </div>
              <p
                style={{
                  margin: "0 0 22px",
                  color: "var(--text-3)",
                  fontSize: 13,
                  lineHeight: 1.55,
                }}
              >
                {w.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: 12.5,
                  color: "var(--text-3)",
                }}
              >
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <span>
                    <strong style={{ color: "var(--text-1)" }}>{w.patents}</strong> 个专利
                  </span>
                  <span style={{ color: "var(--border-strong)" }}>·</span>
                  <span>
                    <strong style={{ color: "var(--text-1)" }}>{w.conclusions ?? 0}</strong> 条结论
                  </span>
                  <span style={{ color: "var(--border-strong)" }}>·</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <Icon name="calendar" size={12} /> {w.date}
                  </span>
                </div>
                <span
                  style={{
                    color: "var(--primary-700)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  进入空间 <Icon name="chevronRight" size={12} />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
