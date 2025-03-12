import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} onToggle={handleToggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main
          className={cn(
            "flex-1 overflow-y-auto p-6 transition-all duration-300",
            sidebarCollapsed ? "ml-[70px]" : "ml-[280px]",
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
