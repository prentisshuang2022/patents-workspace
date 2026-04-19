import { useState } from "react";
import { Icon } from "../Icon";

const SUB_VIEWS = [
  { id: "novelty", label: "查新对比" },
  { id: "list", label: "列表分析", disabled: true },
  { id: "branch", label: "技术分支", disabled: true },
  { id: "applicant", label: "申请人分析", disabled: true },
  { id: "timeline", label: "时间线", disabled: true },
];

export const AnalysisViewTab = () => {
  const [subView, setSubView] = useState("novelty");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 6 }}>
        {SUB_VIEWS.map((v) => (
          <button
            key={v.id}
            onClick={() => !v.disabled && setSubView(v.id)}
            className={`btn ${subView === v.id ? "btn-primary" : "btn-secondary"} btn-sm`}
            style={v.disabled ? { opacity: 0.45, cursor: "not-allowed" } : undefined}
          >
            {v.label}
            {v.disabled && <span style={{ fontSize: 10, marginLeft: 4, opacity: 0.8 }}>即将上线</span>}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)" }}></span>
            <span style={{ fontWeight: 600, fontSize: 14 }}>待查方案</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 16, lineHeight: 1.55 }}>
            基于深度学习的激光雷达点云突时分割方法
          </div>
          <div style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 8 }}>关键技术点：</div>
          <ul className="kv-list">
            <li>改进的 PointNet++ 网络架构</li>
            <li>实时目标检测速度力（&lt;50ms）</li>
            <li>多尺度特征融合模块</li>
            <li>自适应点云采样策略</li>
            <li>边缘设备部署优化</li>
          </ul>
        </div>

        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f97316" }}></span>
              <span style={{ fontWeight: 600, fontSize: 14 }}>最接近专利 TOP1</span>
            </div>
            <span className="risk-chip risk-high">相似度 78.5%</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, lineHeight: 1.55 }}>
            一种基于深度学习的点云分割方法及系统
          </div>
          <div style={{ fontSize: 12.5, color: "var(--text-3)", marginBottom: 16 }}>华为技术有限公司</div>
          <div style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 8 }}>对应技术点：</div>
          <ul className="kv-list">
            <li>PointNet++ 基础网络架构</li>
            <li>目标检测处理时间约 100ms</li>
            <li>多尺度特征提取</li>
            <li>随机点云采样</li>
            <li>服务器端部署</li>
          </ul>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Icon name="link" size={16} color="var(--primary)" />
            <span style={{ fontWeight: 600, fontSize: 14 }}>相似点</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["深度学习方法", "点云分割任务", "多尺度特征"].map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--primary)" }}></span>
                {s}
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Icon name="checkCircle" size={16} color="var(--success)" />
            <span style={{ fontWeight: 600, fontSize: 14 }}>差异点</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["处理速度整体提升", "采样策略不同", "部署环境不同"].map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)" }}></span>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>TOP3/TOP10 聚合差异点</div>
          <button className="btn btn-ghost btn-sm" style={{ color: "var(--text-3)" }}>
            <Icon name="sparkles" size={14} /> AI 生成差异点总结
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            { label: "性能差异", items: ["本方案处理速度提升（<50ms vs 100ms+）", "支持边缘设备部署", "内存占用更低"] },
            { label: "架构差异", items: ["采用改进的网络架构", "自适应采样策略", "轻量化设计"] },
            { label: "应用差异", items: ["针对车载场景优化", "支持多传感器融合", "实时性要求高"] },
          ].map((g) => (
            <div key={g.label}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>{g.label}</div>
              <ul className="kv-list">
                {g.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: 14 }}>
            <Icon name="warn" size={16} color="var(--warning)" />
            风险点分析
          </div>
          <button className="btn btn-primary btn-sm">
            <Icon name="save" size={13} color="#fff" /> 保存为结论
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { level: "高风险", color: "high", title: "多尺度特征融合方法与专利高度相似可能构成侵权", sug: "建议：建议重新设计差异性的融合方式" },
            { level: "中风险", color: "mid", title: "基础网络结构选择相同", sug: "建议：可考虑在网络结构上做部署改进" },
            { level: "低风险", color: "low", title: "点云预处理方案有显著差异", sug: "建议：属于通用技术，风险可控" },
          ].map((r) => (
            <div key={r.title} style={{ display: "flex", gap: 12, padding: "12px 14px", background: "#fbfbfd", border: "1px solid var(--border)", borderRadius: 10 }}>
              <span className={`risk-chip risk-${r.color}`} style={{ height: "fit-content", flexShrink: 0 }}>{r.level}</span>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text-1)" }}>{r.title}</div>
                <div style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 4 }}>{r.sug}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
