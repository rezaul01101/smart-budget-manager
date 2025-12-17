import { Outlet } from "react-router-dom";
import Sidebar from "./partials/Sidebar";
import Topbar from "./partials/Topbar";


const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 bg-gray-100 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
