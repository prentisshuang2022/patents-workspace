import { Icon } from "../Icon";

export const OverviewTab = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <div className="card">
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
        <Icon name="target" size={15} color="var(--primary)" /> 项目基础信息
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 4 }}>项目目标</div>
          <div style={{ fontSize: 13.5, color: "var(--text-1)", lineHeight: 1.6 }}>
            评估本方感知方案的创新性，识别可能构成风险的高相似专利，为立项决策提供参考依据。
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { k: "分析类型", v: "查新结果分析" },
            { k: "创建时间", v: "2026-04-15" },
            { k: "关联主题库", v: "智能驾驶技术" },
          ].map((it) => (
            <div key={it.k} style={{ display: "flex", gap: 12 }}>
              <span style={{ fontSize: 12.5, color: "var(--text-3)", minWidth: 70 }}>{it.k}</span>
              <span style={{ fontSize: 13, color: "var(--text-1)", fontWeight: 500 }}>{it.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="card">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24 }}>
        {[
          { k: "当前专利数", v: "6", sub: "来自查新 + 检索" },
          { k: "已纳入分析", v: "4", sub: "占比 66.7%" },
          { k: "重点对比", v: "2", sub: "高相似专利" },
          { k: "已保存结论", v: "4", sub: "风险 1 · 差异 2 · 机会 1" },
          { k: "启发卡片", v: "3", sub: "可加入报告" },
        ].map((s) => (
          <div key={s.k}>
            <div style={{ fontSize: 12, color: "var(--text-3)", marginBottom: 6 }}>{s.k}</div>
            <div style={{ fontSize: 26, fontWeight: 600, color: "var(--text-1)" }}>{s.v}</div>
            <div style={{ fontSize: 12, color: "var(--text-4)", marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16 }}>
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, fontWeight: 600, fontSize: 14 }}>
          <Icon name="doc" size={16} color="var(--primary)" /> 查新摘要
        </div>
        <div style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 6 }}>发明名称</div>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>基于深度学习的激光雷达点云突时分割方法</div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 14 }}>
          {[
            { k: "TOP1 相似度", v: "78.5%", c: "#f97316" },
            { k: "TOP10 平均", v: "62.7%", c: "#eab308" },
            { k: "TOP100 检出", v: "48 篇", c: "var(--text-1)" },
          ].map((m) => (
            <div key={m.k} style={{ padding: 12, background: "#fbfbfd", border: "1px solid var(--border)", borderRadius: 8 }}>
              <div style={{ fontSize: 12, color: "var(--text-3)" }}>{m.k}</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: m.c, marginTop: 4 }}>{m.v}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 4 }}>风险等级</div>
        <span className="risk-chip risk-mid">中风险</span>

        <div style={{ fontSize: 13, color: "var(--text-3)", marginTop: 14, marginBottom: 6 }}>系统结论摘要</div>
        <div style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7, padding: 12, background: "#fbfbfd", borderRadius: 8 }}>
          本方案在处理速度与边缘部署上显著优于现有技术；但与华为 CN2023081500 在基础网络与多尺度融合上高度相似，存在中等侵权风险。建议重构融合模块，并在权利要求中突出自适应采样差异。
        </div>
        <button className="btn btn-secondary btn-sm" style={{ marginTop: 12 }}>
          <Icon name="save" size={13} /> 保存为结论卡片
        </button>
      </div>

      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, fontWeight: 600, fontSize: 14 }}>
          <Icon name="history" size={16} /> 最近动作
        </div>
        {[
          { t: "15:32", d: "AI 生成了 TOP3 聚合差异点", tag: "分析" },
          { t: "14:12", d: "将 3 篇专利标记为「已纳入分析」", tag: "资料池" },
          { t: "11:05", d: "从查新结果导入 6 篇对比专利", tag: "导入" },
          { t: "昨天", d: "创建工作空间", tag: "创建" },
        ].map((a) => (
          <div key={a.d} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--border-soft)" }}>
            <div style={{ fontSize: 12, color: "var(--text-4)", width: 40, flexShrink: 0 }}>{a.t}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: "var(--text-2)" }}>{a.d}</div>
              <span className="tag tag-gray" style={{ marginTop: 4, display: "inline-block" }}>{a.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
