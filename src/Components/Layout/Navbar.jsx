// src/Components/Layout/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import TimeDisplay from "../../Utils/TimeDisplay";
import { FaSun, FaMoon } from "react-icons/fa"; // Icons for theme buttons
import StoryModal from "../StoryComponents/StoryModel";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Blogs", to: "/blogs" },
    { label: "About Us", to: "/about" },
    { label: "Contact Us", to: "/contact" },
  ];

  const isActive = (to) => location.pathname === to;

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className={`w-full shadow-lg ${darkMode ? "bg-gray-900" : "bg-white"}`}>
      {/* Top Row: Logo + Time + Theme Buttons */}
      <div
        className={`flex items-center justify-between px-8 border-b ${
          darkMode ? "border-gray-700" : "border-gray-100"
        } container mx-auto`}
      >
        <Link to="/" className="flex items-center">
          <img
            src="main/logo.png"
            alt="KhelLive24"
            className="h-24 mix-blend-multiply"
          />
        </Link>

        <div className="flex items-center gap-3">
          {/* Clock */}
          <div
            className={`flex items-center gap-3 px-5 py-2 rounded-full shadow-sm ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-blue-50 border-blue-100"
            } border`}
          >
            <svg
              className={`w-4 h-4 ${darkMode ? "text-white" : "text-[#00569e]"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6l4 2"
              />
            </svg>
            <span
              className={`text-sm font-semibold tracking-wide ${
                darkMode ? "text-white" : "text-[#00569e]"
              }`}
            >
              <TimeDisplay />
            </span>
          </div>

          {/* Theme Buttons — only show on Home page */}
          {location.pathname === "/" && (
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => setDarkMode(false)}
                className={`p-2 rounded-full shadow-sm transition-colors ${
                  !darkMode
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-300 text-gray-800 hover:bg-yellow-400 hover:text-white"
                }`}
                title="Light Mode"
              >
                <FaSun size={18} />
              </button>

              <button
                onClick={() => setDarkMode(true)}
                className={`p-2 rounded-full shadow-sm transition-colors ${
                  darkMode
                    ? "bg-blue-800 text-white"
                    : "bg-gray-300 text-gray-800 hover:bg-blue-800 hover:text-white"
                }`}
                title="Dark Mode"
              >
                <FaMoon size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row: Nav + Search */}
      <div className={`${darkMode ? "bg-gray-800" : "bg-[#00569e]"}`}>
        <div className="flex items-center justify-between container mx-auto py-1">
          <div className="h-8 w-8 bg-red-500"> for stor</div>

      {/* ── Bottom Row: Nav + Search ── */}
      <div className="bg-[#00569e]">
        <div className="flex items-center justify-between container mx-auto">
          {/* <div className="h-8 w-8 bg-red-500"> for stor</div> */}
          <StoryModal />
          {/* Nav Links — desktop */}
          <ul className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`
                    relative inline-block text-sm font-semibold uppercase tracking-widest
                    px-5 py-5 transition-all duration-200
                    ${isActive(link.to)
                      ? darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-[#00569e]"
                      : darkMode
                      ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "text-white hover:bg-white/15 hover:text-white"
                    }
                  `}
                >
                  {link.label}
                  {isActive(link.to) && (
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                        darkMode ? "bg-white" : "bg-[#0569e]"
                      }`}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Search Bar — desktop */}
          <div
            className={`hidden md:flex items-center rounded-lg px-4 py-2 gap-2 my-3 mr-2 transition-all duration-200 shadow-sm ${
              darkMode
                ? "bg-gray-700 text-white ring-1 ring-gray-600"
                : "bg-white"
            } ${searchFocused ? "ring-2 ring-white/60 shadow-md" : ""}`}
            style={{ minWidth: "220px" }}
          >
            <svg
              className={`w-4 h-4 shrink-0 ${darkMode ? "text-white" : "text-[#00569e]"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`bg-transparent text-sm placeholder-gray-400 outline-none w-40 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden ml-auto text-white focus:outline-none p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className={`${darkMode ? "bg-gray-800" : "bg-[#00569e]"} md:hidden border-t px-6 pb-4`}>
          {/* Mobile Search */}
          <div
            className={`flex items-center rounded-lg px-4 py-2.5 gap-2 mt-3 mb-3 shadow-sm ${
              darkMode ? "bg-gray-700 text-white" : "bg-white"
            }`}
          >
            <svg
              className={`w-4 h-4 shrink-0 ${darkMode ? "text-white" : "text-[#00569e]"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`bg-transparent text-sm placeholder-gray-400 outline-none w-full ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            />
          </div>

          {/* Mobile Nav Links */}
          <ul className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-sm font-semibold uppercase tracking-widest py-2.5 px-3 rounded-md transition-colors duration-200 ${
                    isActive(link.to)
                      ? darkMode
                        ? "bg-gray-700 text-white"
                        : "bg-white text-[#00569e]"
                      : darkMode
                      ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "text-white hover:bg-white/15"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}