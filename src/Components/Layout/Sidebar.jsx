import { Link, useLocation } from "react-router-dom";
import { HiChartPie, HiUser, HiHome } from "react-icons/hi";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

// import PropTypes from "prop-types";
import { useAuth } from "../../Utils/AuthContext";
import { FilesIcon } from "lucide-react";
import { SiStoryblok } from "react-icons/si";

export default function Sidebar({ isSidebarOpen, setSidebarOpen }) {
  const { user, role, loggedin } = useAuth();

  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { to: "/dashboard", icon: HiChartPie, label: "Dashboard" },
    { to: "/dashboard-users", icon: HiUser, label: "Users" },
    { to: "/dashboard-blogs", icon: FilesIcon, label: "Blogs" },
    { to: "/dashboard-stories", icon: SiStoryblok, label: "Stories" },
    { to: "/", icon: HiHome, label: "Back to Home" },
  ];

  return (
    <div
      className={`bg-linear-to-b from-white to-gray-50 text-[#0D105A] h-screen transition-all duration-300 fixed left-0 top-0 bottom-0 z-10 ${
        isSidebarOpen ? "w-64" : "w-16"
      } shadow-xl border-r border-gray-100`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-6 top-4 bg-[#0D105A] rounded-full p-1 focus:outline-none border-2 border-white shadow-lg z-20 hover:bg-[#1e2280] transition-colors"
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? (
          <FaChevronLeft className="w-5 h-5 text-white" />
        ) : (
          <FaChevronRight className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Sidebar Title with Logo */}
      <div className="p-4 flex items-center justify-center border-b border-gray-100">
        <div className="flex items-center">
          {/* <div className="bg-[#0D105A] text-white rounded-lg w-10 h-10 flex items-center justify-center text-lg font-bold m2"></div> */}
          {/* {isSidebarOpen && (
            <span className="font-bold text-xl bg-linear-to-r from-[#0D105A] to-[#4B50BE] bg-clip-text text-transparent">
            Khel 24 <br /> Live
            </span>
            )} */}
        </div>
        <img src="main/favicon.jpeg" alt="" className="h-10" />
      </div>
      {/* Navigation Links */}
      <nav className="mt-6">
        <ul className="w-full px-2 space-y-1">
          {navItems.map(({ to, icon: Icon, label }, index) => {
            const isActive = location.pathname === to;
            return (
              <li key={index}>
                <Link
                  to={to}
                  className={`flex items-center p-3 rounded-lg w-full transition-all ${
                    isActive
                      ? "bg-[#0D105A] text-white shadow-md"
                      : "text-[#0D105A] hover:bg-[#0D105A]/10"
                  } ${isSidebarOpen ? "" : "justify-center"}`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? "text-white" : ""}`} />
                  {isSidebarOpen && (
                    <span className="ml-3 font-medium">{label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

// Sidebar.propTypes = {
//   isSidebarOpen: PropTypes.bool.isRequired,
//   setSidebarOpen: PropTypes.func.isRequired,
// };
