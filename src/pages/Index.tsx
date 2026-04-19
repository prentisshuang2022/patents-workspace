import { useState } from "react";
import { Sidebar } from "@/components/workspace/Sidebar";
import { WorkspaceHome } from "@/components/workspace/WorkspaceHome";
import { WorkspaceDetail } from "@/components/workspace/tabs/WorkspaceDetail";
import { CreateDialog } from "@/components/workspace/CreateDialog";
import { WORKSPACES, Workspace } from "@/components/workspace/data";

const Index = () => {
  // 与原型一致：默认进入详情页
  const [view, setView] = useState<"home" | "detail">("detail");
  const [selected, setSelected] = useState<Workspace>(WORKSPACES[0]);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div className="app">
      <Sidebar active="专利工作空间" />
      <main className="main">
        {view === "home" && (
          <WorkspaceHome
            onOpen={(w) => { setSelected(w); setView("detail"); }}
            onCreate={() => setShowCreate(true)}
          />
        )}
        {view === "detail" && (
          <WorkspaceDetail ws={selected} onBack={() => setView("home")} />
        )}
      </main>

      {showCreate && (
        <CreateDialog
          onClose={() => setShowCreate(false)}
          onDone={() => { setShowCreate(false); setSelected(WORKSPACES[0]); setView("detail"); }}
        />
      )}
    </div>
  );
};

export default Index;
