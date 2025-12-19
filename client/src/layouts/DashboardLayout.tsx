import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './partials/Sidebar';
import Topbar from './partials/Topbar';
import MobileNav from './partials/MobileNav';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0f1419] overflow-hidden">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto p-4 md:p-6 pb-20 md:pb-6">
          <Outlet />
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
