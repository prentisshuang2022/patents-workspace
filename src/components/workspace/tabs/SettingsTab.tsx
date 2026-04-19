import { Icon } from "../Icon";

export const SettingsTab = () => (
  <div style={{ maxWidth: 560 }}>
    <h2 style={{ margin: "0 0 4px", fontSize: 18 }}>设置</h2>
    <p style={{ margin: "0 0 24px", color: "var(--text-3)", fontSize: 13 }}>管理工作空间的基础信息与边界配置</p>

    {[
      { label: "工作空间名称", type: "input" as const, value: "智能驾驶感知系统专利查新分析" },
      { label: "项目目标", type: "textarea" as const, value: "评估本方感知方案的创新性，识别可能构成风险的高相似专利，为立项决策提供参考依据。" },
    ].map((f) => (
      <div key={f.label} style={{ marginBottom: 16 }}>
        <label className="form-label" style={{ marginTop: 0 }}>{f.label}</label>
        {f.type === "input"
          ? <input className="input" defaultValue={f.value} />
          : <textarea className="textarea" defaultValue={f.value} />}
      </div>
    ))}

    <label className="form-label">分析类型</label>
    <select className="select" defaultValue="novelty">
      <option value="novelty">查新结果分析</option>
    </select>

    <label className="form-label">关联主题库</label>
    <input className="input" defaultValue="智能驾驶技术" />

    <label className="form-label">标签模板</label>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "10px 12px", border: "1px solid var(--border)", borderRadius: 8 }}>
      {["高风险", "中风险", "低风险", "可规避", "待核实", "创新点"].map((t) => (
        <span key={t} className="tag tag-gray" style={{ cursor: "pointer" }}>{t} ×</span>
      ))}
      <span className="tag tag-primary" style={{ cursor: "pointer" }}>+ 添加</span>
    </div>

    <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
      <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 12, color: "var(--text-1)" }}>危险操作</div>
      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btn-secondary" style={{ color: "var(--warning)", borderColor: "#fcd34d" }}>
          <Icon name="bookmark" size={13} /> 归档工作空间
        </button>
        <button className="btn btn-secondary" style={{ color: "var(--danger)", borderColor: "#fca5a5" }}>
          <Icon name="close" size={13} /> 删除工作空间
        </button>
      </div>
      <div style={{ fontSize: 12, color: "var(--text-4)", marginTop: 10, lineHeight: 1.6 }}>
        归档后空间只读，可恢复。删除操作不可撤销，但不删除底层专利数据。
      </div>
    </div>

    <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end", gap: 10 }}>
      <button className="btn btn-secondary">取消</button>
      <button className="btn btn-primary">保存设置</button>
    </div>
  </div>
);
