import React, { useState } from "react";
import DashIndex from "../Components/AdminDashboard/DashIndex";
import Sidebar from "../Components/Layout/Sidebar";

export default function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  return (
    <div>
      {/* <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
      <DashIndex />
    </div>
  );
}
