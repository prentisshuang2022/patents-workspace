import { SVGProps } from "react";

export type IconName =
  | "search" | "plus" | "close" | "chevronRight" | "chevronLeft" | "chevronDown"
  | "download" | "doc" | "file" | "folder" | "database" | "bookmark" | "history"
  | "book" | "chat" | "calendar" | "sparkles" | "check" | "checkCircle" | "warn"
  | "light" | "layers" | "building" | "scan" | "edit" | "more" | "save" | "tag"
  | "funnel" | "eye" | "send" | "report" | "brain" | "target" | "grid" | "link";

const PATHS: Record<IconName, JSX.Element> = {
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
  close: <path d="M18 6 6 18M6 6l12 12"/>,
  chevronRight: <path d="m9 6 6 6-6 6"/>,
  chevronLeft: <path d="m15 6-6 6 6 6"/>,
  chevronDown: <path d="m6 9 6 6 6-6"/>,
  download: <path d="M12 3v13m-5-5 5 5 5-5M5 21h14"/>,
  doc: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></>,
  file: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></>,
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></>,
  bookmark: <path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>,
  history: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/></>,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>,
  chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
  sparkles: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>,
  check: <path d="m5 12 5 5L20 7"/>,
  checkCircle: <><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></>,
  warn: <><path d="M10.3 3.7 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></>,
  light: <><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 1 4 12.7c-.6.4-1 1-1 1.7V17H9v-.6c0-.7-.4-1.3-1-1.7A7 7 0 0 1 12 2z"/></>,
  layers: <><path d="m12 2 10 6-10 6L2 8z"/><path d="m2 17 10 6 10-6"/><path d="m2 12 10 6 10-6"/></>,
  building: <><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M9 6h.01M15 6h.01M9 10h.01M15 10h.01M9 14h.01M15 14h.01"/></>,
  scan: <><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/></>,
  edit: <><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4z"/></>,
  more: <><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></>,
  save: <><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/></>,
  tag: <><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.3-7.3a2 2 0 0 1-.5-2l1.4-6a2 2 0 0 1 1.5-1.5l6-1.4a2 2 0 0 1 2 .5l7.3 7.3a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/></>,
  funnel: <path d="M3 5h18l-7 8v6l-4 2v-8z"/>,
  eye: <><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></>,
  send: <><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></>,
  report: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></>,
  brain: <><path d="M9.5 2A2.5 2.5 0 0 0 7 4.5v0a2.5 2.5 0 0 0 0 4.9v.1A2.5 2.5 0 0 0 7 14.5v0A2.5 2.5 0 0 0 9.5 17H12V2z"/><path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v0a2.5 2.5 0 0 1 0 4.9v.1a2.5 2.5 0 0 1 0 5v0a2.5 2.5 0 0 1-2.5 2.5H12V2z"/></>,
  target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/></>,
  grid: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>,
  link: <><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></>,
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
  color?: string;
}

export const Icon = ({ name, size = 16, color = "currentColor", className, ...rest }: IconProps) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
    className={className} {...rest}
  >
    {PATHS[name]}
  </svg>
);
