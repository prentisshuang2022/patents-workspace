import { useEffect, useRef, useState } from "react";
import { Icon, IconName } from "../Icon";
import { toast } from "@/hooks/use-toast";

interface CardMenuProps {
  inReport: boolean;
  onToggle: () => void;
  onAction: (key: string) => void;
}

const CardMenu = ({ inReport, onToggle, onAction }: CardMenuProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const items: { key: string; label: string; icon: IconName; danger?: boolean; onClick: () => void }[] = [
    { key: "edit", label: "编辑结论", icon: "edit", onClick: () => onAction("编辑结论") },
    { key: "toggle", label: inReport ? "从报告移除" : "加入报告", icon: inReport ? "close" : "checkCircle", onClick: onToggle },
    { key: "source", label: "查看溯源", icon: "link", onClick: () => onAction("查看溯源") },
    { key: "copy", label: "复制内容", icon: "save", onClick: () => onAction("复制内容") },
    { key: "delete", label: "删除结论", icon: "close", danger: true, onClick: () => onAction("删除结论") },
  ];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        className="btn btn-ghost btn-sm"
        style={{ padding: "2px 4px" }}
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        aria-label="更多操作"
      >
        <Icon name="more" size={14} />
      </button>
      {open && (
        <div
          style={{
            position: "absolute", top: "calc(100% + 4px)", right: 0, zIndex: 20,
            minWidth: 148, background: "var(--bg-1, #fff)",
            border: "1px solid var(--border)", borderRadius: 8,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)", padding: 4,
          }}
        >
          {items.map((it, i) => (
            <button
              key={it.key}
              onClick={() => { setOpen(false); it.onClick(); }}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 8,
                padding: "7px 10px", fontSize: 12.5, border: "none", background: "transparent",
                textAlign: "left", cursor: "pointer", borderRadius: 6,
                color: it.danger ? "var(--danger)" : "var(--text-1)",
                borderTop: i === items.length - 1 ? "1px solid var(--border-soft)" : "none",
                marginTop: i === items.length - 1 ? 4 : 0,
                paddingTop: i === items.length - 1 ? 9 : 7,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-2, #f5f5f5)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <Icon name={it.icon} size={13} color={it.danger ? "var(--danger)" : undefined} />
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface ConclusionCard {
  type: string;
  color: string;
  t: string;
  d: string;
  ev: string;
  inReport: boolean;
  source?: "ai" | "manual";
}

const CONCLUSION_CARDS_DEFAULT: ConclusionCard[] = [
  { type: "风险判断", color: "danger", t: "TOP1 专利构成中等侵权风险", d: "多尺度融合与采样策略存在相似，建议替换核心模块。", ev: "CN2023081500", inReport: true, source: "ai" },
  { type: "差异点", color: "success", t: "处理速度显著优于现有技术", d: "本方案端到端 40ms，同类方案普遍 100ms 以上。", ev: "3 篇证据", inReport: true, source: "ai" },
  { type: "创新机会", color: "primary", t: "车载芯片部署方案具差异化潜力", d: "现有 TOP100 仅 3 篇涉及轻量化部署。", ev: "关联启发卡 #4", inReport: false, source: "ai" },
  { type: "调整建议", color: "warning", t: "建议重构融合模块", d: "引入注意力机制替换现有 concat 融合。", ev: "来自 AI 建议", inReport: false, source: "ai" },
];

const SOURCE_META: Record<NonNullable<ConclusionCard["source"]>, { label: string; color: string }> = {
  ai: { label: "AI 生成", color: "primary" },
  manual: { label: "人工新增", color: "gray" },
};

export const ReportTab = () => {
  const [cards, setCards] = useState(CONCLUSION_CARDS_DEFAULT);
  const toggle = (idx: number) =>
    setCards((prev) => prev.map((c, i) => (i === idx ? { ...c, inReport: !c.inReport } : c)));
  const handleAction = (idx: number, action: string) => {
    const card = cards[idx];
    if (action === "删除结论") {
      if (window.confirm(`确认删除结论「${card.t}」？此操作不可撤销。`)) {
        setCards((prev) => prev.filter((_, i) => i !== idx));
        toast({ title: "已删除结论", description: card.t });
      }
      return;
    }
    if (action === "复制内容") {
      navigator.clipboard?.writeText(`${card.t}\n${card.d}`).catch(() => {});
    }
    toast({ title: action, description: card.t });
  };
  const inCount = cards.filter((c) => c.inReport).length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: 18 }}>结论报告</h2>
          <p style={{ margin: 0, color: "var(--text-3)", fontSize: 13 }}>把 AI 输出与人工判断沉淀为结构化项目成果</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-primary">
            <Icon name="report" size={14} color="#fff" /> 生成报告
          </button>
          <button className="btn btn-secondary">
            <Icon name="download" size={14} /> 导出报告（{inCount} 条）
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 14, fontSize: 12.5, color: "var(--text-3)", alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: "var(--success)", display: "inline-block" }}></span>
          已加入报告（{inCount} 条）将进入导出
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: "#e5e7eb", display: "inline-block" }}></span>
          未加入（{cards.length - inCount} 条）不进入导出
        </span>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>报告结构</div>
        {([
          { t: "1. 项目背景", d: "本项目基于自研感知方案，评估在现有技术下的创新性与风险" },
          { t: "2. 查新输入与检索范围", d: "发明：基于深度学习的激光雷达点云分割方法；检索范围：2019-2024，全球" },
          { t: "3. 统计分析指标", d: "TOP1 相似度 78.5%，TOP10 平均 62.7%，TOP100 检出 48 篇" },
          { t: "4. 高相关专利结果", d: "共识别 6 篇对比专利，其中 2 篇进入重点对比" },
          { t: "5. 相似点与差异点分析", d: "相似点集中在基础网络与多尺度特征；差异点在部署与采样策略" },
          { t: "6. 风险判断与建议", d: "整体中风险；建议重设融合策略，强化边缘优化" },
          { t: "7. 创新启发", d: "建议聚焦自适应采样、边缘部署、实时性突破方向" },
          { t: "8. 待人工复核事项", d: "3 条；代理人复核后定稿" },
        ]).map(({ t, d }) => (
          <div key={t} style={{ padding: "10px 0", borderBottom: "1px solid var(--border-soft)", display: "flex", gap: 16 }}>
            <div style={{ fontWeight: 500, fontSize: 13.5, minWidth: 180, color: "var(--text-1)" }}>{t}</div>
            <div style={{ fontSize: 13, color: "var(--text-3)", flex: 1 }}>{d}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 12 }}>
        {cards.map((c, idx) => (
          <div key={c.t} className="card" style={{
            padding: 16,
            borderColor: c.inReport ? "var(--success)" : "var(--border)",
            outline: c.inReport ? "1px solid var(--success)" : "none",
            transition: "border-color 0.2s, outline 0.2s",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <span className={`tag tag-${c.color}`}>{c.type}</span>
                {c.source && (
                  <span className={`tag tag-${SOURCE_META[c.source].color}`} style={{ fontSize: 10.5, padding: "1px 6px" }}>
                    {SOURCE_META[c.source].label}
                  </span>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {c.inReport
                  ? <span style={{ fontSize: 11.5, color: "var(--success)", display: "flex", alignItems: "center", gap: 3 }}>
                      <Icon name="checkCircle" size={12} color="var(--success)" /> 已加入报告
                    </span>
                  : <span style={{ fontSize: 11.5, color: "var(--text-4)" }}>未加入报告</span>}
                <CardMenu inReport={c.inReport} onToggle={() => toggle(idx)} onAction={(a) => handleAction(idx, a)} />
              </div>
            </div>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{c.t}</div>
            <div style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 10, lineHeight: 1.55 }}>{c.d}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 12, color: "var(--text-4)", display: "flex", alignItems: "center", gap: 5 }}>
                <Icon name="link" size={12} /> {c.ev}
              </div>
              <button
                className={`btn btn-sm ${c.inReport ? "btn-secondary" : "btn-primary"}`}
                style={c.inReport ? { color: "var(--danger)", borderColor: "#fca5a5", fontSize: 12 } : { fontSize: 12 }}
                onClick={() => toggle(idx)}
              >
                {c.inReport ? "从报告移除" : "加入报告"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="callout" style={{ marginTop: 16 }}>
        <div style={{ fontSize: 12.5, color: "#92400e" }}>
          <strong>免责声明：</strong>本报告为初筛与分析支持，不替代专利代理人或法律顾问的正式意见。
        </div>
      </div>
    </div>
  );
};
