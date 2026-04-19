export interface WorkspaceTag {
  text: string;
  color: "orange" | "gray" | "violet" | "primary" | "success" | "warning" | "danger" | "info";
}

export interface Workspace {
  id: string;
  name: string;
  desc: string;
  patents: number;
  conclusions: number;
  status: string;
  type: string;
  typeTag: WorkspaceTag;
  statusTag?: WorkspaceTag;
  date: string;
  fromNovelty?: boolean;
  disabled?: boolean;
  // legacy fields kept for compatibility with existing tabs
  source?: string;
  topic?: string;
  created?: string;
}

export const WORKSPACES: Workspace[] = [
  {
    id: "w5",
    name: "智能驾驶感知系统专利查新分析",
    desc: "评估本方感知方案的创新性，识别可能构成风险的高相似专利",
    patents: 6,
    conclusions: 4,
    status: "进行中",
    type: "查新结果分析",
    typeTag: { text: "查新", color: "orange" },
    statusTag: { text: "进行中", color: "violet" },
    date: "2026-04-15",
    fromNovelty: true,
  },
  {
    id: "w1",
    name: "柔性显示封装工艺研究",
    desc: "梳理柔性 OLED 封装相关的现有技术，为新专利撰写提供参考",
    patents: 48,
    conclusions: 12,
    status: "进行中",
    type: "专利自动分类",
    typeTag: { text: "查新", color: "orange" },
    statusTag: { text: "进行中", color: "violet" },
    date: "2026-04-12",
  },
  {
    id: "w2",
    name: "自动驾驶感知算法 FTO 排查",
    desc: "排查自动驾驶多传感器融合方案的潜在侵权风险",
    patents: 32,
    conclusions: 8,
    status: "FTO 排查",
    type: "专利自动分类",
    typeTag: { text: "FTO 排查", color: "gray" },
    date: "2026-04-10",
  },
  {
    id: "w3",
    name: "AI 大模型推理加速技术调研",
    desc: "调研大模型推理加速领域的现有技术方案和创新空间",
    patents: 62,
    conclusions: 21,
    status: "技术调研",
    type: "AI 增强筛选",
    typeTag: { text: "技术调研", color: "gray" },
    date: "2026-04-08",
  },
  {
    id: "w4",
    name: "固态电池技术竞品分析",
    desc: "分析宁德时代、比亚迪在固态电池方向的专利布局差异",
    patents: 27,
    conclusions: 6,
    status: "竞品分析",
    type: "专利自动分类",
    typeTag: { text: "竞品分析", color: "gray" },
    date: "2026-03-28",
  },
];

export const TYPE_OPTIONS = ["全部空间", "查新结果分析", "FTO 排查", "技术调研", "竞品分析"];
export const STATUS_OPTIONS = ["全部状态", "进行中", "已完成", "已归档"];
