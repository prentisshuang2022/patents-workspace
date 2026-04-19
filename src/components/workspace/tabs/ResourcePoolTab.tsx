import { useState, useRef, useEffect } from "react";
import { Icon, IconName } from "../Icon";

interface Patent {
  id: string;
  title: string;
  tags: string[];
  source: string;
  applicant: string;
  date: string;
  country: string;
  sim: number | null;
  simColor?: string;
  status: string;
}

const POOL_PATENTS: Patent[] = [
  { id: "p1", title: "一种基于深度学习的点云分割方法及系统", tags: ["点云处理", "深度学习", "语义"], source: "查新", applicant: "华为技术有限公司", date: "2023-08-15", country: "CN", sim: 78.5, simColor: "#f97316", status: "重点对比" },
  { id: "p2", title: "激光雷达点云数据处理的装置", tags: ["激光雷达", "实时处理"], source: "查新", applicant: "百度在线网络技术(北京)有限公司", date: "2023-06-20", country: "CN", sim: 72.3, simColor: "#f97316", status: "已纳入分析" },
  { id: "p3", title: "Point cloud segmentation using neural networks", tags: ["神经网络"], source: "查新", applicant: "NVIDIA Corporation", date: "2023-04-10", country: "US", sim: 68.1, simColor: "#f97316", status: "已纳入分析" },
  { id: "p4", title: "一种车载激光雷达点的目标检测方法", tags: ["目标检测", "车载"], source: "检索", applicant: "小鹏汽车有限公司", date: "2023-09-05", country: "CN", sim: 55.2, simColor: "#eab308", status: "待筛选" },
  { id: "p5", title: "多传感器融合的环境感知系统", tags: ["多传感器", "环境感知"], source: "主题库", applicant: "蔚来汽车科技(安徽)有限公司", date: "2023-07-12", country: "CN", sim: null, status: "待筛选" },
  { id: "p6", title: "3D object detection from point cloud data", tags: ["3D检测", "语义"], source: "查新", applicant: "Waymo LLC", date: "2023-03-22", country: "US", sim: 45.8, simColor: "#22c55e", status: "暂不相关" },
];

const STATUS_LIST = ["全部状态", "重点对比", "已纳入分析", "待筛选", "暂不相关", "待复核", "已归档"];
const STATUS_OPTIONS = ["重点对比", "已纳入分析", "待筛选", "待复核", "暂不相关", "已归档"];
const SOURCE_LIST = ["全部来源", "查新", "检索", "主题库"];
const ADD_SOURCES: { id: string; icon: IconName; label: string; desc: string; disabled?: boolean }[] = [
  { id: "novelty", icon: "file", label: "从查新结果添加", desc: "导入最近一次查新的候选专利" },
  { id: "search", icon: "search", label: "从检索结果添加", desc: "从当前检索结果中选择专利" },
  { id: "topic", icon: "database", label: "从专题库添加", desc: "从已有专题库中引入专利" },
  { id: "upload", icon: "doc", label: "上传文件", desc: "上传 PDF 或 Excel（即将支持）", disabled: true },
];

const STATUS_COLOR_MAP: Record<string, string> = {
  "重点对比": "primary",
  "已纳入分析": "success",
  "待筛选": "gray",
  "暂不相关": "gray",
  "待复核": "warning",
  "已归档": "gray",
};

const StatusTag = ({ s }: { s: string }) => (
  <span className={`tag tag-${STATUS_COLOR_MAP[s] || "gray"}`}>{s}</span>
);

const StatusMenu = ({ current, onPick, onClose, anchorRect }: {
  current: string; onPick: (s: string) => void; onClose: () => void; anchorRect: DOMRect | null;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);
  if (!anchorRect) return null;
  const top = anchorRect.bottom + 6;
  const left = Math.min(anchorRect.left, window.innerWidth - 180);
  return (
    <div ref={ref} style={{
      position: "fixed", top, left, zIndex: 50,
      background: "#fff", border: "1px solid var(--border)", borderRadius: 10,
      boxShadow: "var(--shadow)", minWidth: 160, padding: "6px 0",
    }}>
      <div style={{ padding: "6px 12px 4px", fontSize: 11.5, color: "var(--text-4)", fontWeight: 500 }}>修改状态为</div>
      {STATUS_OPTIONS.map((opt) => (
        <div
          key={opt}
          onClick={() => { onPick(opt); onClose(); }}
          style={{
            padding: "8px 12px", fontSize: 13, cursor: "pointer",
            color: opt === current ? "var(--primary-700)" : "var(--text-2)",
            background: opt === current ? "var(--primary-50)" : "transparent",
            display: "flex", alignItems: "center", gap: 8,
          }}
        >
          {opt === current
            ? <Icon name="check" size={13} color="var(--primary-700)" />
            : <span style={{ width: 13, display: "inline-block" }} />}
          <StatusTag s={opt} />
        </div>
      ))}
    </div>
  );
};

const NoteDialog = ({ patent, value, onSave, onClose }: {
  patent: Patent; value: string; onSave: (v: string) => void; onClose: () => void;
}) => {
  const [text, setText] = useState(value);
  return (
    <div className="dialog-mask" onClick={onClose}>
      <div className="dialog" style={{ width: 460 }} onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3>添加备注</h3>
          <div className="subtitle" style={{ marginTop: 4, color: "var(--text-3)" }}>{patent.title}</div>
          <button className="dialog-close" onClick={onClose}><Icon name="close" size={18} /></button>
        </div>
        <div className="dialog-body">
          <textarea
            className="input"
            placeholder="记录这篇专利的对比要点、风险判断或后续动作…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: "100%", minHeight: 120, padding: 10, resize: "vertical", fontFamily: "inherit" }}
          />
        </div>
        <div className="dialog-footer">
          <button className="btn btn-ghost" onClick={onClose}>取消</button>
          <button className="btn btn-primary" onClick={() => { onSave(text); onClose(); }}>保存备注</button>
        </div>
      </div>
    </div>
  );
};

const BatchStatusDialog = ({ count, onPick, onClose }: {
  count: number; onPick: (s: string) => void; onClose: () => void;
}) => {
  const [picked, setPicked] = useState("已纳入分析");
  return (
    <div className="dialog-mask" onClick={onClose}>
      <div className="dialog" style={{ width: 420 }} onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3>批量标记状态</h3>
          <div className="subtitle">将为已选 {count} 篇专利统一更新状态</div>
          <button className="dialog-close" onClick={onClose}><Icon name="close" size={18} /></button>
        </div>
        <div className="dialog-body">
          {STATUS_OPTIONS.map((opt) => (
            <div
              key={opt}
              className={`option-row ${picked === opt ? "active" : ""}`}
              onClick={() => setPicked(opt)}
            >
              <div className="radio"></div>
              <StatusTag s={opt} />
            </div>
          ))}
        </div>
        <div className="dialog-footer">
          <button className="btn btn-ghost" onClick={onClose}>取消</button>
          <button className="btn btn-primary" onClick={() => { onPick(picked); onClose(); }}>确认更新</button>
        </div>
      </div>
    </div>
  );
};

const PoolDropdown = ({ options, value, onChange, minWidth = 130 }: {
  options: string[]; value: string; onChange: (v: string) => void; minWidth?: number;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button className="btn btn-secondary" onClick={() => setOpen((o) => !o)}>
        {value} <Icon name="chevronDown" size={12} />
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 30,
          background: "#fff", border: "1px solid var(--border)", borderRadius: 10,
          boxShadow: "var(--shadow)", minWidth, padding: "6px 0",
        }}>
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                padding: "9px 14px", fontSize: 13.5, cursor: "pointer",
                color: opt === value ? "var(--primary-700)" : "var(--text-2)",
                background: opt === value ? "var(--primary-50)" : "transparent",
                fontWeight: opt === value ? 500 : 400,
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              {opt === value && <Icon name="check" size={13} color="var(--primary-700)" />}
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AddSourceDialog = ({ onClose }: { onClose: () => void }) => {
  const [selected, setSelected] = useState("novelty");
  return (
    <div className="dialog-mask" onClick={onClose}>
      <div className="dialog" style={{ width: 480 }} onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3>添加来源</h3>
          <div className="subtitle">选择专利来源，将其纳入当前工作空间资料池</div>
          <button className="dialog-close" onClick={onClose}><Icon name="close" size={18} /></button>
        </div>
        <div className="dialog-body">
          {ADD_SOURCES.map((s) => (
            <div
              key={s.id}
              className={`option-row ${selected === s.id ? "active" : ""}`}
              style={s.disabled ? { opacity: 0.45, cursor: "not-allowed" } : undefined}
              onClick={() => !s.disabled && setSelected(s.id)}
            >
              <div className="radio"></div>
              <Icon name={s.icon} size={16} className="option-icon" />
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span className="option-label">{s.label}</span>
                  {s.disabled && <span className="tag tag-gray" style={{ fontSize: 10.5, padding: "1px 6px" }}>即将支持</span>}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>{s.desc}</div>
              </div>
            </div>
          ))}

          {selected === "novelty" && (
            <div className="option-detail">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>智能驾驶感知系统查新 - 20260415</div>
                <span className="tag tag-orange">查新</span>
              </div>
              <div style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 4 }}>
                TOP1 相似度 78.5% · 风险等级：中 · 候选专利 6 篇
              </div>
              <div style={{ marginTop: 10, display: "flex", gap: 8, alignItems: "center" }}>
                <input type="checkbox" defaultChecked id="all_novelty" />
                <label htmlFor="all_novelty" style={{ fontSize: 13, cursor: "pointer" }}>导入全部 6 篇候选专利</label>
              </div>
            </div>
          )}
          {selected === "search" && (
            <div className="option-detail">
              <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 6 }}>智能驾驶点云分割检索 - 20260410</div>
              <div style={{ fontSize: 12.5, color: "var(--text-3)", marginBottom: 10 }}>128 篇检索结果 · 检索式：点云 AND 分割 AND 深度学习</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-secondary btn-sm" style={{ background: "var(--primary-50)", borderColor: "var(--primary)", color: "var(--primary-700)" }}>TOP 20</button>
                <button className="btn btn-secondary btn-sm">TOP 50</button>
                <button className="btn btn-secondary btn-sm">全部</button>
              </div>
            </div>
          )}
          {selected === "topic" && (
            <div className="option-detail">
              <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 8 }}>自动驾驶感知技术</div>
              <div style={{ fontSize: 12.5, color: "var(--text-3)", marginBottom: 10 }}>共 89 篇专利 · 最后更新 2026-04-10</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-secondary btn-sm" style={{ background: "var(--primary-50)", borderColor: "var(--primary)", color: "var(--primary-700)" }}>仅导入重点专利 (12 篇)</button>
                <button className="btn btn-secondary btn-sm">全部导入</button>
              </div>
            </div>
          )}
        </div>
        <div className="dialog-footer">
          <button className="btn btn-ghost" onClick={onClose}>取消</button>
          <button className="btn btn-primary" onClick={onClose}>确认添加</button>
        </div>
      </div>
    </div>
  );
};

export const ResourcePoolTab = () => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("全部状态");
  const [sourceFilter, setSourceFilter] = useState("全部来源");
  const [showAdd, setShowAdd] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);
  const [patents, setPatents] = useState<Patent[]>(POOL_PATENTS);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [statusMenu, setStatusMenu] = useState<{ id: string; rect: DOMRect } | null>(null);
  const [noteTarget, setNoteTarget] = useState<Patent | null>(null);
  const [batchOpen, setBatchOpen] = useState(false);
  const [toast, setToast] = useState<string>("");

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(""), 2000);
  };

  const updateStatus = (ids: string[], next: string) => {
    setPatents((prev) => prev.map((p) => (ids.includes(p.id) ? { ...p, status: next } : p)));
    showToast(`已将 ${ids.length} 篇专利状态更新为「${next}」`);
  };

  const removePatent = (id: string) => {
    setPatents((prev) => prev.filter((p) => p.id !== id));
    setChecked((prev) => prev.filter((x) => x !== id));
    showToast("已移出资料池");
  };

  const filtered = patents.filter((p) => {
    const matchQ = !query || p.title.toLowerCase().includes(query.toLowerCase());
    const matchS = statusFilter === "全部状态" || p.status === statusFilter;
    const matchSrc = sourceFilter === "全部来源" || p.source === sourceFilter;
    return matchQ && matchS && matchSrc;
  });

  const allChecked = filtered.length > 0 && checked.length === filtered.length;
  const toggleAll = () => setChecked(allChecked ? [] : filtered.map((p) => p.id));
  const toggleOne = (id: string) =>
    setChecked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const openStatusMenu = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setStatusMenu({ id, rect: (e.currentTarget as HTMLElement).getBoundingClientRect() });
  };

  return (
    <>
      {showAdd && <AddSourceDialog onClose={() => setShowAdd(false)} />}
      {noteTarget && (
        <NoteDialog
          patent={noteTarget}
          value={notes[noteTarget.id] || ""}
          onSave={(v) => { setNotes((prev) => ({ ...prev, [noteTarget.id]: v })); showToast("备注已保存"); }}
          onClose={() => setNoteTarget(null)}
        />
      )}
      {batchOpen && (
        <BatchStatusDialog
          count={checked.length}
          onClose={() => setBatchOpen(false)}
          onPick={(s) => updateStatus(checked, s)}
        />
      )}
      {statusMenu && (
        <StatusMenu
          current={patents.find((p) => p.id === statusMenu.id)?.status || ""}
          anchorRect={statusMenu.rect}
          onPick={(s) => updateStatus([statusMenu.id], s)}
          onClose={() => setStatusMenu(null)}
        />
      )}
      {toast && (
        <div style={{
          position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)",
          background: "var(--text-1)", color: "#fff", padding: "10px 18px",
          borderRadius: 8, fontSize: 13, zIndex: 100, boxShadow: "var(--shadow)",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <Icon name="checkCircle" size={14} color="#fff" /> {toast}
        </div>
      )}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ display: "flex", gap: 12, padding: 20, alignItems: "center" }}>
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
            <Icon name="plus" size={14} color="#fff" /> 添加来源
          </button>
          <div className="search-wrap">
            <Icon name="search" size={14} className="search-icon" />
            <input className="input" placeholder="搜索专利..." value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <PoolDropdown options={STATUS_LIST} value={statusFilter} onChange={setStatusFilter} minWidth={140} />
          <PoolDropdown options={SOURCE_LIST} value={sourceFilter} onChange={setSourceFilter} minWidth={120} />
        </div>

        <div style={{ display: "flex", gap: 8, padding: "8px 20px", background: "var(--primary-50)", borderTop: "1px solid var(--primary-100)", alignItems: "center" }}>
          <input type="checkbox" checked={allChecked} onChange={toggleAll} style={{ marginRight: 4 }} />
          <span style={{ fontSize: 12.5, color: "var(--text-3)", marginRight: 8 }}>
            {checked.length > 0 ? `已选 ${checked.length} 篇` : "批量操作："}
          </span>
          <button
            className="btn btn-ghost btn-sm"
            style={{ opacity: checked.length ? 1 : 0.5, cursor: checked.length ? "pointer" : "not-allowed" }}
            disabled={!checked.length}
            onClick={() => setBatchOpen(true)}
          >
            标记状态
          </button>
          <button
            className="btn btn-ghost btn-sm"
            style={{ opacity: checked.length ? 1 : 0.5, cursor: checked.length ? "pointer" : "not-allowed" }}
            disabled={!checked.length}
            onClick={() => updateStatus(checked, "重点对比")}
          >
            加入重点对比
          </button>
          <button
            className="btn btn-ghost btn-sm"
            style={{ opacity: checked.length ? 1 : 0.5, cursor: checked.length ? "pointer" : "not-allowed" }}
            disabled={!checked.length}
            onClick={() => showToast(`已导出 ${checked.length} 篇专利清单`)}
          >
            <Icon name="download" size={13} /> 导出清单
          </button>
          {checked.length > 0 && (
            <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto", color: "var(--text-4)" }} onClick={() => setChecked([])}>
              取消选择
            </button>
          )}
        </div>

        <table className="t-table">
          <thead>
            <tr>
              <th style={{ width: 36 }}></th>
              <th>专利标题</th>
              <th style={{ width: 70 }}>来源</th>
              <th style={{ width: 180 }}>申请人</th>
              <th style={{ width: 100 }}>申请日期</th>
              <th style={{ width: 55 }}>国家</th>
              <th style={{ width: 80 }}>相似度</th>
              <th style={{ width: 96 }}>状态</th>
              <th style={{ width: 130 }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ textAlign: "center", padding: "40px 0", color: "var(--text-3)" }}>
                  没有符合条件的专利，请调整筛选条件
                </td>
              </tr>
            ) : filtered.map((p) => (
              <tr key={p.id} style={{ background: checked.includes(p.id) ? "var(--primary-50)" : undefined }}>
                <td><input type="checkbox" checked={checked.includes(p.id)} onChange={() => toggleOne(p.id)} /></td>
                <td>
                  <div style={{ color: "var(--text-1)", fontWeight: 500 }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text-4)", marginTop: 4 }}>{p.tags.join(" · ")}</div>
                  {notes[p.id] && (
                    <div style={{
                      fontSize: 12, color: "var(--text-3)", marginTop: 6,
                      padding: "4px 8px", background: "#f7f8fa",
                      borderLeft: "2px solid var(--primary)", borderRadius: 3,
                      display: "flex", alignItems: "center", gap: 4,
                    }}>
                      <Icon name="edit" size={11} /> {notes[p.id]}
                    </div>
                  )}
                </td>
                <td><span className="tag tag-gray">{p.source}</span></td>
                <td style={{ fontSize: 12.5 }}>{p.applicant}</td>
                <td style={{ fontSize: 12.5 }}>{p.date}</td>
                <td>{p.country}</td>
                <td>
                  {p.sim != null
                    ? <span style={{ color: p.simColor, fontWeight: 600 }}>{p.sim}%</span>
                    : <span style={{ color: "var(--text-4)" }}>-</span>}
                </td>
                <td>
                  <button
                    onClick={(e) => openStatusMenu(e, p.id)}
                    style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 3 }}
                    title="点击修改状态"
                  >
                    <StatusTag s={p.status} />
                    <Icon name="chevronDown" size={10} color="var(--text-4)" />
                  </button>
                </td>
                <td>
                  <div style={{ display: "flex", gap: 2 }}>
                    <button className="btn btn-ghost btn-sm" title="查看详情" style={{ padding: "4px 6px" }}><Icon name="eye" size={13} /></button>
                    <button className="btn btn-ghost btn-sm" title="修改状态" style={{ padding: "4px 6px" }} onClick={(e) => openStatusMenu(e, p.id)}><Icon name="tag" size={13} /></button>
                    <button className="btn btn-ghost btn-sm" title={notes[p.id] ? "编辑备注" : "添加备注"} style={{ padding: "4px 6px", color: notes[p.id] ? "var(--primary-700)" : undefined }} onClick={() => setNoteTarget(p)}><Icon name="edit" size={13} /></button>
                    <button className="btn btn-ghost btn-sm" title="移出资料池" style={{ padding: "4px 6px", color: "var(--text-4)" }} onClick={() => removePatent(p.id)}><Icon name="close" size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 20px", color: "var(--text-3)", fontSize: 12.5, borderTop: "1px solid var(--border-soft)" }}>
          <span>共 {filtered.length} 篇专利{filtered.length !== patents.length ? `（已筛选，共 ${patents.length} 篇）` : "，其中查新对比 4 篇"}</span>
          <span>已纳入分析 {patents.filter((p) => p.status === "已纳入分析" || p.status === "重点对比").length} 篇</span>
        </div>
      </div>
    </>
  );
};
