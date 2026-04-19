import { useState } from "react";
import { Icon } from "../Icon";

const DIFF_SUGGESTIONS = [
  { t: "实时性能突破", n: "关联 5 篇专利", d: "在保持精度的前提下，将处理延迟降低到 30ms 以下", f: "可行性：高  影响力：高", id: "s1" },
  { t: "自适应采样创新", n: "关联 2 篇专利", d: "开发基于场景感知的智能采样算法", f: "可行性：高  影响力：高", id: "s2" },
  { t: "边缘部署方案", n: "关联 3 篇专利", d: "设计专门针对车载芯片的优化部署方案", f: "可行性：中  影响力：中", id: "s3" },
];

interface Card { id: string; title: string; desc: string; source: string; type: string; }

// 模块级共享，保证 tab 切换不丢
const cardStore: { items: Card[] } = { items: [] };

export const InnovationTab = () => {
  const [saved, setSaved] = useState<string[]>(() => cardStore.items.map((c) => c.id));
  const [cards, setCards] = useState<Card[]>(() => cardStore.items);
  const [toast, setToast] = useState<string | null>(null);
  const [inReport, setInReport] = useState<Record<string, boolean>>({});

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const saveCard = (s: typeof DIFF_SUGGESTIONS[number]) => {
    if (saved.includes(s.id)) return;
    const newCard: Card = { id: s.id, title: s.t, desc: s.d, source: s.n, type: "创新启发" };
    const updated = [...cards, newCard];
    setCards(updated);
    setSaved((prev) => [...prev, s.id]);
    setInReport((prev) => ({ ...prev, [s.id]: true }));
    cardStore.items = updated;
    showToast(`「${s.t}」已加入结论报告`);
  };

  const removeCard = (id: string) => {
    const updated = cards.filter((c) => c.id !== id);
    setCards(updated);
    setSaved((prev) => prev.filter((x) => x !== id));
    cardStore.items = updated;
  };

  const toggleReport = (id: string) => {
    setInReport((prev) => ({ ...prev, [id]: !prev[id] }));
    showToast(inReport[id] ? "已从报告移除" : "已加入结论报告");
  };

  return (
    <div>
      {toast && (
        <div style={{
          position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)",
          background: "#1f2937", color: "#fff", padding: "10px 18px",
          borderRadius: 10, fontSize: 13.5, zIndex: 100,
          boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
          display: "flex", alignItems: "center", gap: 8,
          animation: "popIn 0.2s ease",
        }}>
          <Icon name="checkCircle" size={15} color="#10b981" /> {toast}
        </div>
      )}

      <h2 style={{ margin: "0 0 4px", fontSize: 18 }}>创新启发</h2>
      <p style={{ margin: "0 0 16px", color: "var(--text-3)", fontSize: 13 }}>基于当前资料池和查新输入，识别创新机会与差异化方向</p>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <button className="btn btn-primary">
          <Icon name="sparkles" size={14} color="#fff" /> AI 生成创新启发
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div className="card">
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="sparkles" size={16} color="#f59e0b" /> 高覆盖技术方向
          </div>
          {[
            { k: "深度学习基础架构", v: 55, c: "#6366f1" },
            { k: "多尺度特征提取", v: 72, c: "#f59e0b" },
            { k: "数据预处理", v: 68, c: "#6366f1" },
          ].map((it) => (
            <div key={it.k} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13 }}>
                <span>{it.k}</span><span style={{ color: it.c, fontWeight: 600 }}>{it.v}%</span>
              </div>
              <div className="progress"><span style={{ width: `${it.v}%`, background: it.c }} /></div>
            </div>
          ))}
          <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 10 }}>这些方向已有较多专利覆盖，创新难度较大</div>
        </div>
        <div className="card">
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="checkCircle" size={16} color="var(--success)" /> 低覆盖技术方向
          </div>
          {[
            { k: "边缘设备部署优化", v: 25 },
            { k: "自适应采样策略", v: 18 },
            { k: "实时性能优化", v: 32 },
          ].map((it) => (
            <div key={it.k} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13 }}>
                <span>{it.k}</span><span style={{ color: "var(--success)", fontWeight: 600 }}>{it.v}%</span>
              </div>
              <div className="progress"><span style={{ width: `${it.v}%`, background: "var(--success)" }} /></div>
            </div>
          ))}
          <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 10 }}>这些方向覆盖率低，存在创新空间</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="light" size={16} color="#f59e0b" /> 空白点识别
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { t: "轻量化网络架构", tag: "高机会", color: "success", d1: "现有技术多为大模型网络，针对边缘设备的轻量化设计较少", d2: "TOP100 中仅 3 篇涉及轻量化设计" },
            { t: "动态场景自适应", tag: "中机会", color: "warning", d1: "根据场景复杂度动态调整处理策略的技术尚未充分覆盖", d2: "相关专利主要集中在静态场景处理" },
            { t: "多传感器协同处理", tag: "高机会", color: "success", d1: "激光雷达与其他传感器的深度融合处理存在创新空间", d2: "现有方案多为简单拼接，缺乏深度融合" },
          ].map((b) => (
            <div key={b.t}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{b.t}</div>
                <span className={`tag tag-${b.color}`}>{b.tag}</span>
              </div>
              <div style={{ fontSize: 12.5, color: "var(--text-3)", lineHeight: 1.6, marginBottom: 8 }}>{b.d1}</div>
              <div style={{ fontSize: 12, color: "var(--text-4)" }}>{b.d2}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="light" size={16} color="#f59e0b" /> 差异化建议
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {DIFF_SUGGESTIONS.map((it) => (
            <div key={it.id} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "12px 14px",
              background: saved.includes(it.id) ? "#f0fdf4" : "#fbfbfd",
              border: `1px solid ${saved.includes(it.id) ? "#86efac" : "var(--border)"}`,
              borderRadius: 10,
              transition: "all 0.2s",
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 13.5 }}>{it.t}</span>
                  <span className="tag tag-success">{it.n}</span>
                  {saved.includes(it.id) && (
                    <span style={{ fontSize: 11.5, color: "var(--success)", display: "flex", alignItems: "center", gap: 3 }}>
                      <Icon name="checkCircle" size={12} color="var(--success)" /> 已加入报告
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12.5, color: "var(--text-3)" }}>{it.d}</div>
                <div style={{ fontSize: 12, color: "var(--text-4)", marginTop: 4 }}>{it.f}</div>
              </div>
              <button
                className={`btn btn-sm ${saved.includes(it.id) ? "btn-secondary" : "btn-primary"}`}
                style={{ marginLeft: 12, flexShrink: 0, opacity: saved.includes(it.id) ? 0.6 : 1 }}
                onClick={() => saveCard(it)}
                disabled={saved.includes(it.id)}
              >
                {saved.includes(it.id) ? "已加入报告" : "加入报告"}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="doc" size={16} /> 技术组合建议
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { t: "轻量化网络 + 自适应采样", c: "#ecfdf5", b: "#86efac", tag: "高匹配", tagColor: "success", d: "组合轻量化架构与自适应采样策略，在保持精度前提下大幅降低推理延迟", p: ["CN2023190xxx", "CN2023190xx"] },
            { t: "多传感器融合 + 实时优化", c: "#fffbeb", b: "#fcd34d", tag: "中匹配", tagColor: "warning", d: "将多传感器协同感知与实时性优化结合，适合复杂城市道路场景", p: ["US2023xxx", "CN2023230xx"] },
          ].map((it) => (
            <div key={it.t} style={{ padding: 14, background: it.c, border: `1px solid ${it.b}`, borderRadius: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontWeight: 600, fontSize: 13.5 }}>{it.t}</span>
                <span className={`tag tag-${it.tagColor}`}>{it.tag}</span>
              </div>
              <div style={{ fontSize: 12.5, color: "var(--text-3)", marginBottom: 10 }}>{it.d}</div>
              <div style={{ display: "flex", gap: 6 }}>
                {it.p.map((p) => <span key={p} className="tag tag-gray" style={{ background: "#fff", border: "1px solid var(--border)" }}>{p}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <Icon name="bookmark" size={15} color="var(--primary)" />
            启发卡片列表
            {cards.length > 0 && <span className="tag tag-primary">{cards.length}</span>}
          </div>
          {cards.length > 0 && (
            <span style={{ fontSize: 12.5, color: "var(--text-3)" }}>可将卡片加入结论报告，一并导出</span>
          )}
        </div>

        {cards.length === 0 ? (
          <div style={{ textAlign: "center", padding: "36px 0", color: "var(--text-4)" }}>
            <Icon name="bookmark" size={28} color="var(--text-4)" />
            <div style={{ marginTop: 10, fontSize: 13.5 }}>暂无启发卡片</div>
            <div style={{ fontSize: 12.5, marginTop: 4 }}>点击上方「保存为启发卡片」将分析结论沉淀到这里</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {cards.map((c) => (
              <div key={c.id} style={{
                padding: 14,
                border: `1px solid ${inReport[c.id] ? "var(--success)" : "var(--border)"}`,
                borderRadius: 10,
                background: inReport[c.id] ? "#f0fdf4" : "#fafbfd",
                transition: "all 0.2s",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <span className="tag tag-primary">{c.type}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    {inReport[c.id] && (
                      <span style={{ fontSize: 11.5, color: "var(--success)", display: "flex", alignItems: "center", gap: 3 }}>
                        <Icon name="checkCircle" size={12} color="var(--success)" /> 已入报告
                      </span>
                    )}
                    <button
                      className="btn btn-ghost btn-sm"
                      style={{ padding: "2px 4px", color: "var(--text-4)" }}
                      title="移除卡片"
                      onClick={() => removeCard(c.id)}
                    >
                      <Icon name="close" size={13} />
                    </button>
                  </div>
                </div>
                <div style={{ fontWeight: 600, fontSize: 13.5, marginBottom: 5 }}>{c.title}</div>
                <div style={{ fontSize: 12.5, color: "var(--text-3)", marginBottom: 10, lineHeight: 1.55 }}>{c.desc}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "var(--text-4)" }}>来源：{c.source}</span>
                  <button
                    className={`btn btn-sm ${inReport[c.id] ? "btn-secondary" : "btn-primary"}`}
                    style={inReport[c.id] ? { fontSize: 12, color: "var(--danger)", borderColor: "#fca5a5" } : { fontSize: 12 }}
                    onClick={() => toggleReport(c.id)}
                  >
                    {inReport[c.id] ? "从报告移除" : "加入报告"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
