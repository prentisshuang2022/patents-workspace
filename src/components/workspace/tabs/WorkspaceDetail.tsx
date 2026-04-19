import { useState } from "react";
import { Icon, IconName } from "../Icon";
import { Workspace } from "../data";
import { DetailHeader } from "../DetailHeader";
import { OverviewTab } from "./OverviewTab";
import { ResourcePoolTab } from "./ResourcePoolTab";
import { AnalysisViewTab } from "./AnalysisViewTab";
import { InnovationTab } from "./InnovationTab";
import { ReportTab } from "./ReportTab";
import { SettingsTab } from "./SettingsTab";

interface Props {
  ws: Workspace;
  onBack: () => void;
}

const TABS: { id: string; label: string; icon: IconName }[] = [
  { id: "overview", label: "任务概览", icon: "target" },
  { id: "pool", label: "资料池", icon: "doc" },
  { id: "analysis", label: "分析视图", icon: "layers" },
  { id: "innovation", label: "创新启发", icon: "light" },
  { id: "report", label: "结论报告", icon: "report" },
  { id: "settings", label: "设置", icon: "edit" },
];

export const WorkspaceDetail = ({ ws, onBack }: Props) => {
  const [tab, setTab] = useState("pool");
  return (
    <div>
      <DetailHeader ws={ws} onBack={onBack} onAnalysisStart={() => setTab("report")} />
      <div className="tabs">
        {TABS.map((t) => (
          <div key={t.id} className={`tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
            <Icon name={t.icon} size={14} /> {t.label}
          </div>
        ))}
      </div>
      {tab === "overview" && <OverviewTab />}
      {tab === "pool" && <ResourcePoolTab />}
      {tab === "analysis" && <AnalysisViewTab />}
      {tab === "innovation" && <InnovationTab />}
      {tab === "report" && <ReportTab />}
      {tab === "settings" && <SettingsTab />}
    </div>
  );
};
