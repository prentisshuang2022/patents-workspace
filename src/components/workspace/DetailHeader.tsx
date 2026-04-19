import { useState } from "react";
import { Icon } from "./Icon";
import { Workspace } from "./data";
import { AIAnalysisDialog } from "./AIAnalysisDialog";

interface Props {
  ws: Workspace;
  onBack: () => void;
  onAnalysisStart?: () => void;
}

export const DetailHeader = ({ ws, onBack, onAnalysisStart }: Props) => {
  const [showAI, setShowAI] = useState(false);
  return (
  <>
    <div className="breadcrumb">
      <Icon name="chevronLeft" size={14} />
      <a onClick={onBack}>专利工作空间</a>
      <span className="sep">/</span>
      <span className="current">{ws.name}</span>
    </div>
    <div className="detail-title-row">
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 className="page-title" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          {ws.name}
          <span className="tag tag-violet">{ws.status}</span>
        </h1>
        <div className="detail-meta" style={{ marginTop: 6, marginBottom: 0 }}>
          <span>{ws.type}</span>
          <span><span className="mk">来源：</span>{ws.source}</span>
          <span>
            <span className="mk">关联主题库：</span>
            <a style={{ color: "var(--primary-700)", cursor: "pointer" }}>{ws.topic}</a>
          </span>
          <span><span className="mk">创建：</span>{ws.created}</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
        <button className="btn btn-primary btn-sm" onClick={() => setShowAI(true)}>
          <Icon name="report" size={13} color="#fff" /> 生成报告
        </button>
      </div>
    </div>

    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "7px 12px",
      background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8,
      marginBottom: 16, fontSize: 12.5, color: "#92400e",
    }}>
      <Icon name="warn" size={14} color="#d97706" />
      本工作空间分析结论仅用于初筛参考，不替代专利代理人或法律顾问的正式意见
    </div>

    {showAI && (
      <AIAnalysisDialog
        patentCount={ws.patents}
        onClose={() => setShowAI(false)}
        onConfirm={() => { setShowAI(false); onAnalysisStart?.(); }}
      />
    )}
  </>
  );
};
