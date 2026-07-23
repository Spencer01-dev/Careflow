"use client";
import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = collapsed ? 64 : 256;

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div 
        className="transition-all duration-300 min-w-0 flex-1 flex flex-col min-h-screen"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <Topbar collapsed={collapsed} onToggleSidebar={() => setCollapsed(!collapsed)} />
        <main className="pt-16 p-4 md:p-6 flex-1 bg-slate-50 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
