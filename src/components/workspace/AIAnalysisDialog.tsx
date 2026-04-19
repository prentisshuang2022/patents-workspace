import { useState } from "react";
import { Icon } from "./Icon";

interface Props {
  onClose: () => void;
  onConfirm: () => void;
  patentCount: number;
}

const SCOPE_OPTIONS = [
  { id: "all", label: "全部资料池", desc: "基于资料池中所有专利生成报告" },
  { id: "key", label: "仅重点专利", desc: "仅基于标记为「重点对比」与「已纳入分析」的专利" },
  { id: "new", label: "仅新增专利", desc: "仅基于自上次分析以来新增的专利" },
];

const DIMENSIONS = [
  { id: "novelty", label: "查新对比", desc: "技术点相似度对比与差异提炼" },
  { id: "risk", label: "风险点识别", desc: "识别可能构成侵权风险的权利要求" },
  { id: "innovation", label: "创新启发", desc: "提取技术差异并生成创新建议" },
  { id: "landscape", label: "技术布局", desc: "申请人/技术分支聚类（即将支持）", disabled: true },
];

export const AIAnalysisDialog = ({ onClose, onConfirm, patentCount }: Props) => {
  const [scope, setScope] = useState("all");
  const [dims, setDims] = useState<string[]>(["novelty", "risk", "innovation"]);

  const toggleDim = (id: string) => {
    setDims((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="dialog-mask" onClick={onClose}>
      <div className="dialog" style={{ width: 520 }} onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3>生成报告</h3>
          <div className="subtitle">配置分析范围与维度，AI 将基于资料池生成结构化结论报告</div>
          <button className="dialog-close" onClick={onClose}><Icon name="close" size={18} /></button>
        </div>
        <div className="dialog-body">
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)", marginBottom: 8 }}>分析范围</div>
          {SCOPE_OPTIONS.map((s) => (
            <div
              key={s.id}
              className={`option-row ${scope === s.id ? "active" : ""}`}
              onClick={() => setScope(s.id)}
            >
              <div className="radio"></div>
              <div>
                <div className="option-label">{s.label}</div>
                <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>{s.desc}</div>
              </div>
            </div>
          ))}

          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-2)", margin: "16px 0 8px" }}>报告维度</div>
          {DIMENSIONS.map((d) => {
            const checked = dims.includes(d.id);
            return (
              <div
                key={d.id}
                className={`option-row ${checked ? "active" : ""}`}
                style={d.disabled ? { opacity: 0.45, cursor: "not-allowed" } : undefined}
                onClick={() => !d.disabled && toggleDim(d.id)}
              >
                <input type="checkbox" checked={checked} readOnly style={{ marginRight: 4 }} />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span className="option-label">{d.label}</span>
                    {d.disabled && <span className="tag tag-gray" style={{ fontSize: 10.5, padding: "1px 6px" }}>即将支持</span>}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>{d.desc}</div>
                </div>
              </div>
            );
          })}

          <div style={{
            marginTop: 14, padding: "10px 12px",
            background: "var(--primary-50)", border: "1px solid var(--primary-100)",
            borderRadius: 8, fontSize: 12.5, color: "var(--primary-700)",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <Icon name="sparkles" size={14} color="var(--primary-700)" />
            预计处理 {scope === "all" ? patentCount : scope === "key" ? Math.min(4, patentCount) : 2} 篇专利，耗时约 2-3 分钟，完成后自动生成结论报告
          </div>
        </div>
        <div className="dialog-footer">
          <button className="btn btn-ghost" onClick={onClose}>取消</button>
          <button
            className="btn btn-primary"
            disabled={dims.length === 0}
            style={dims.length === 0 ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
            onClick={onConfirm}
          >
            <Icon name="report" size={13} color="#fff" /> 生成报告
          </button>
        </div>
      </div>
    </div>
  );
};
