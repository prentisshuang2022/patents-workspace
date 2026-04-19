import { useState } from "react";
import { Icon, IconName } from "./Icon";

interface Props {
  onClose: () => void;
  onDone: (data: { name: string; goal: string; type: string; source: string }) => void;
}

const ANALYSIS_TYPES: { id: string; icon: IconName; title: string; desc: string; disabled?: boolean }[] = [
  { id: "novelty", icon: "doc", title: "查新结果分析", desc: "对查新结果进行深入分析" },
  { id: "tech", icon: "search", title: "技术调研", desc: "围绕某个技术领域进行专利调研", disabled: true },
  { id: "comp", icon: "building", title: "竞品分析", desc: "分析竞争对手的专利布局", disabled: true },
  { id: "fto", icon: "scan", title: "FTO 初步排查", desc: "自由实施分析，识别潜在风险", disabled: true },
  { id: "draft", icon: "edit", title: "专利撰写准备", desc: "为专利撰写做技术背景研究", disabled: true },
  { id: "rnd", icon: "light", title: "研发立项支持", desc: "支持研发项目的立项决策", disabled: true },
];

const SOURCES: { id: string; icon: IconName; label: string }[] = [
  { id: "search", icon: "search", label: "从当前检索结果导入" },
  { id: "novelty", icon: "file", label: "从当前查新结果导入" },
  { id: "topic", icon: "database", label: "从专题库导入" },
  { id: "empty", icon: "folder", label: "暂不导入，创建空空间" },
];

export const CreateDialog = ({ onClose, onDone }: Props) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [type, setType] = useState("novelty");
  const [source, setSource] = useState("novelty");

  const canNext = name.trim() && goal.trim() && type;

  return (
    <div className="dialog-mask" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <div className="dialog-header">
          <h3>新建工作空间</h3>
          <div className="subtitle">
            {step === 1 ? "创建一个项目分析容器，进行深入分析" : "创建一个项目分析容器，承接查询结果并进行深入分析"}
          </div>
          <button className="dialog-close" onClick={onClose}><Icon name="close" size={18} /></button>
        </div>

        <div className="dialog-body">
          {step === 1 && (
            <>
              <label className="form-label">工作空间名称 <span className="req">*</span></label>
              <input
                className="input"
                placeholder="例如：智能驾驶感知系统专利查新分析"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label className="form-label">项目目标 <span className="req">*</span></label>
              <textarea
                className="textarea"
                placeholder="请描述本次分析的主要目标，例如：评估智能驾驶感知系统的技术方案创新性，识别潜在风险专利..."
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />

              <label className="form-label">分析类型 <span className="req">*</span></label>
              <div className="analysis-grid">
                {ANALYSIS_TYPES.map((t) => (
                  <div
                    key={t.id}
                    className={`analysis-type ${type === t.id ? "active" : ""}`}
                    onClick={() => !t.disabled && setType(t.id)}
                    style={t.disabled ? { opacity: 0.45, cursor: "not-allowed", background: "#f4f5f8" } : undefined}
                  >
                    <div className="at-icon"><Icon name={t.icon} size={16} /></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div className="at-title">{t.title}</div>
                        {t.disabled && <span className="tag tag-gray" style={{ fontSize: 10.5, padding: "1px 6px" }}>即将上线</span>}
                      </div>
                      <div className="at-desc">{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <label className="form-label" style={{ marginTop: 4 }}>初始资料来源</label>
              {SOURCES.map((s) => (
                <div key={s.id}>
                  <div
                    className={`option-row ${source === s.id ? "active" : ""}`}
                    onClick={() => setSource(s.id)}
                    style={
                      source === s.id && (s.id === "novelty" || s.id === "search" || s.id === "topic")
                        ? { marginBottom: 6 } : undefined
                    }
                  >
                    <div className="radio"></div>
                    <Icon name={s.icon} size={16} className="option-icon" />
                    <span className="option-label">{s.label}</span>
                  </div>

                  {source === "novelty" && s.id === "novelty" && (
                    <div className="option-detail">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ fontWeight: 600, fontSize: 13.5 }}>智能驾驶感知系统查新 - 20260415</div>
                        <span style={{ fontSize: 12.5, color: "var(--text-3)" }}>相关对比文献 6 篇</span>
                      </div>
                      <div style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 4 }}>
                        TOP1 相似度 78.5% · 风险等级: 中
                      </div>
                    </div>
                  )}

                  {source === "search" && s.id === "search" && (
                    <div className="option-detail">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ fontWeight: 600, fontSize: 13.5 }}>智能驾驶点云分割检索-20260410</div>
                        <span style={{ fontSize: 12.5, color: "var(--text-3)" }}>128 篇</span>
                      </div>
                      <div style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 4 }}>
                        检索式：点云 AND 分割 AND 深度学习...
                      </div>
                    </div>
                  )}

                  {source === "topic" && s.id === "topic" && (
                    <div className="option-detail">
                      <div className="search-wrap" style={{ marginBottom: 10 }}>
                        <Icon name="search" size={14} className="search-icon" />
                        <input className="input" placeholder="搜索检索条件..." />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 12px", border: "1px solid var(--border)", borderRadius: 8 }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13.5 }}>自动驾驶感知技术</div>
                          <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>
                            围绕自动驾驶多传感器感知的技术专利研究，包括激光雷达、视觉、毫米波雷达等
                          </div>
                        </div>
                        <span style={{ fontSize: 12.5, color: "var(--text-3)", whiteSpace: "nowrap" }}>89 篇</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {(source === "search" || source === "novelty") && (
                <div className="nested-card" style={{ marginTop: 8 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10 }}>待查方案</div>
                  <label className="form-label" style={{ marginTop: 0 }}><span className="req">*</span> 发明名称：</label>
                  <input className="input" placeholder="请输入" defaultValue="基于深度学习的激光雷达点云突时分割方法" />
                  <label className="form-label"><span className="req">*</span> 技术方案或全部技术交底：</label>
                  <textarea
                    className="textarea"
                    placeholder="请输入技术方案，建议不要输入敏感技术、工作原理、参考资料等内容..."
                    defaultValue="采用改进的 PointNet++ 网络架构，结合多尺度特征融合与自适应采样策略，实现激光雷达点云的实时目标分割与检测（< 50ms），适用于车载边缘设备部署。"
                    style={{ minHeight: 96 }}
                  />
                  <div style={{ marginTop: 8 }}>
                    <button className="btn btn-secondary btn-sm">
                      发明专利 <Icon name="chevronDown" size={12} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="dialog-footer">
          {step === 1 && <>
            <button className="btn btn-ghost" onClick={onClose}>取消</button>
            <button
              className="btn btn-primary"
              disabled={!canNext}
              style={{ opacity: canNext ? 1 : 0.5 }}
              onClick={() => canNext && setStep(2)}
            >下一步</button>
          </>}
          {step === 2 && <>
            <button className="btn btn-secondary" onClick={() => setStep(1)}>上一步</button>
            <button className="btn btn-primary" onClick={() => onDone({ name, goal, type, source })}>创建工作空间</button>
          </>}
        </div>
      </div>
    </div>
  );
};
