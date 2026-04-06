import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Layout/Sidebar";

export default function ProtectedRoutes() {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F5F8FA]">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
