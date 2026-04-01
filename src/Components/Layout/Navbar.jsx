// src/Components/Layout/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import TimeDisplay from "../../Utils/TimeDisplay";
import { FaSun, FaMoon } from "react-icons/fa";
import { Search, User, X } from "lucide-react";

import { useAuth } from "../../Utils/AuthContext";

import StoryModal from "../StoryComponents/StoryModel";
import AuthModal from "../SharedComponents/AuthModal";
import Ticker from "../BlogComponents/Components/Ticker";

const sportsLinks = [
  { label: "फुटबल", to: "/football" },
  { label: "क्रिकेट", to: "/cricket" },
  { label: "भलिबल", to: "/volleyball" },
  { label: "अन्य", to: "/others" },
];

export default function Navbar() {
  const { user, isLoggedIn, logout, loading } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const location = useLocation();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Blogs", to: "/blogs" },
    ...sportsLinks,
  ];

  const isActive = (to) => location.pathname === to;

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    document.body.classList.toggle("light", !darkMode);
  }, [darkMode]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target))
        setSearchOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchRef.current?.querySelector("input")?.focus(), 100);
    }
  }, [searchOpen]);

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      setAuthOpen(true);
    } else {
      setProfileOpen((p) => !p);
    }
  };

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
  };

  return (
    <>
      <header
        className={`w-full shadow-lg ${darkMode ? "bg-gray-900" : "bg-white"}`}
      >
        {/* ── Top Row ── */}
        <div
          className={`flex items-center justify-between px-6 border-b ${darkMode ? "border-gray-700" : "border-gray-100"} container mx-auto`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="main/logo.png"
              alt="KhelLive24"
              className="h-20 mix-blend-multiply"
            />
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Clock */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full">
              <span
                className={`text-sm font-semibold tracking-wide ${darkMode ? "text-white" : "text-[#00569e]"}`}
              >
                <TimeDisplay />
              </span>
            </div>

            <div
              className={`w-px h-6 mx-1 ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
            />

            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setSearchOpen((p) => !p)}
                className={`p-2 rounded-full transition-colors duration-150 ${
                  searchOpen
                    ? darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-[#00569e] text-white"
                    : darkMode
                      ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-[#00569e]"
                }`}
                title="Search"
              >
                <Search size={18} />
              </button>

              {searchOpen && (
                <div
                  className={`absolute right-0 top-full mt-2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl shadow-lg border
                    ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
                  style={{ width: "280px" }}
                >
                  <Search size={15} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`bg-transparent text-sm outline-none flex-1 placeholder-gray-400 ${darkMode ? "text-white" : "text-gray-800"}`}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode((p) => !p)}
              className={`p-2 rounded-full transition-colors duration-150 ${
                darkMode
                  ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-[#00569e]"
              }`}
              title={darkMode ? "Light Mode" : "Dark Mode"}
            >
              {darkMode ? <FaSun size={17} /> : <FaMoon size={17} />}
            </button>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={handleProfileClick}
                disabled={loading}
                className={`p-2 rounded-full transition-colors duration-150 ${
                  profileOpen
                    ? darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-[#00569e] text-white"
                    : darkMode
                      ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-[#00569e]"
                }`}
                title={isLoggedIn ? "Profile" : "Login"}
              >
                <User size={18} />
              </button>

              {/* Dropdown — only when logged in */}
              {isLoggedIn && profileOpen && (
                <div
                  className={`absolute right-0 top-full mt-2 z-50 rounded-xl shadow-lg border overflow-hidden
                    ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
                  style={{ minWidth: "180px" }}
                >
                  <div
                    className={`px-4 py-3 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}
                  >
                    <p
                      className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}
                    >
                      {user?.firstname} {user?.lastname}
                    </p>
                    <p className="text-xs mt-0.5 text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                  {[
                    { label: "प्रोफाइल", to: "/profile" },
                    { label: "सेटिङ्स", to: "/settings" },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setProfileOpen(false)}
                      className={`block px-4 py-2.5 text-sm transition-colors duration-150 ${
                        darkMode
                          ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#00569e]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div
                    className={`border-t ${darkMode ? "border-gray-700" : "border-gray-100"}`}
                  >
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                        darkMode
                          ? "text-red-400 hover:bg-gray-700"
                          : "text-red-500 hover:bg-red-50"
                      }`}
                    >
                      लग आउट
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Bottom Nav Row ── */}
        <div className={darkMode ? "bg-gray-800" : "bg-[#00569e]"}>
          <div className="container mx-auto flex items-center justify-around">
            <div className="shrink-0 mr-10">
              <StoryModal />
            </div>

            <ul className="hidden md:flex items-center flex-1 flex-wrap">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`inline-block text-sm font-semibold uppercase tracking-widest px-5 py-5 transition-all duration-200 whitespace-nowrap
                      ${
                        isActive(link.to)
                          ? darkMode
                            ? "bg-gray-700 text-white"
                            : "bg-white text-[#00569e]"
                          : darkMode
                            ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                            : "text-white hover:bg-white/15 hover:text-white"
                      }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden ml-auto text-white focus:outline-none p-2 mr-2"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col justify-center items-center w-6 h-6 gap-[5px]">
                <span
                  className={`block h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"}`}
                />
                <span
                  className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-5"}`}
                />
                <span
                  className={`block h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-4"}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"} ${darkMode ? "bg-gray-900" : "bg-[#003d75]"}`}
        >
          <div className="px-5 pb-6 pt-3 flex flex-col gap-1">
            {/* Mobile Search */}
            <div
              className={`flex items-center rounded-xl px-4 py-3 gap-2 mb-3 ${darkMode ? "bg-gray-800" : "bg-[#00469e]"}`}
            >
              <Search size={15} className="text-white/50 shrink-0" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm placeholder-white/40 outline-none w-full text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-white/50 hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <p
              className={`text-xs font-bold uppercase tracking-widest px-1 mb-1 ${darkMode ? "text-gray-500" : "text-white/40"}`}
            >
              Navigation
            </p>

            {[
              { label: "Home", to: "/" },
              { label: "Blogs", to: "/blogs" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center text-sm font-semibold uppercase tracking-widest py-3 px-4 rounded-xl transition-colors duration-200
                  ${isActive(link.to) ? "bg-white text-[#00569e]" : "text-white/90 hover:bg-white/10 hover:text-white"}`}
              >
                {link.label}
              </Link>
            ))}

            <p
              className={`text-xs font-bold uppercase tracking-widest px-1 mt-3 mb-1 ${darkMode ? "text-gray-500" : "text-white/40"}`}
            >
              खेलकुद
            </p>

            <div className="grid grid-cols-2 gap-2">
              {sportsLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center justify-center text-sm font-semibold py-3 px-4 rounded-xl transition-colors duration-200
                    ${
                      isActive(link.to)
                        ? "bg-white text-[#00569e]"
                        : darkMode
                          ? "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                          : "bg-white/10 text-white/90 hover:bg-white/20 hover:text-white"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Auth / Logout */}
            {!isLoggedIn ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setAuthOpen(true);
                }}
                className="mt-4 w-full py-3 bg-red-600 hover:bg-red-800 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                लगइन / साइन अप
              </button>
            ) : (
              <div className="mt-4 flex flex-col gap-2">
                <div
                  className={`px-4 py-3 rounded-xl text-sm ${darkMode ? "bg-gray-800 text-gray-200" : "bg-white/10 text-white"}`}
                >
                  <p className="font-semibold">
                    {user?.firstname} {user?.lastname}
                  </p>
                  <p className="text-xs opacity-60 mt-0.5">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  लग आउट
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="font-[Mukta,sans-serif] bg-slate-100 ">
          <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Mukta:wght@400;600;700;800&display=swap');
        @keyframes ticker { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
      `}</style>

          <Ticker />
        </div>
      </header>

      {/* Auth Modal */}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </>
  );
}
