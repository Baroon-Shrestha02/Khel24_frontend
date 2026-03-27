// src/Components/Layout/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import TimeDisplay from "../../Utils/TimeDisplay";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Blogs", to: "/Blogs" },
    { label: "About Us", to: "/technology" },
    { label: "Contact Us", to: "/contact" },
  ];

  const isActive = (to) => location.pathname === to;

  return (
    <header className="w-full shadow-lg">
      {/* ── Top Row: Logo + Time ── */}
      <div className="flex items-center justify-between px-8 border-b border-gray-100 bg-white container mx-auto">
        <Link to="/" className="flex items-center">
          <img
            src="main/logo.png"
            alt="KhelLive24"
            className="h-24 mix-blend-multiply"
          />
        </Link>

        <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-full px-5 py-2 shadow-sm">
          {/* Clock icon */}
          <svg
            className="w-4 h-4 text-[#00569e]"
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
          <span className="text-sm font-semibold text-[#00569e] tracking-wide">
            <TimeDisplay />
          </span>
        </div>
      </div>

      {/* ── Bottom Row: Nav + Search ── */}
      <div className="bg-[#00569e]">
        <div className="flex items-center justify-between container mx-auto">
          <div className="h-8 w-8 bg-red-500"> for stor</div>
          {/* Nav Links — desktop */}
          <ul className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`
                    relative inline-block text-sm font-semibold uppercase tracking-widest
                    px-5 py-5 transition-all duration-200
                    ${
                      isActive(link.to)
                        ? "bg-white text-[#00569e]"
                        : "text-white hover:bg-white/15 hover:text-white"
                    }
                  `}
                >
                  {link.label}
                  {/* Active bottom indicator */}
                  {isActive(link.to) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0569e]" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Search Bar — desktop */}
          <div
            className={`
              hidden md:flex items-center bg-white rounded-lg px-4 py-2 gap-2 my-3 mr-2
              transition-all duration-200 shadow-sm
              ${searchFocused ? "ring-2 ring-white/60 shadow-md" : ""}
            `}
            style={{ minWidth: "220px" }}
          >
            <svg
              className="w-4 h-4 text-[#00569e] shrink-0"
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
              className="bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none w-40"
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

      {/* ── Mobile Dropdown Menu ── */}
      {menuOpen && (
        <div className="md:hidden bg-[#00569e] border-t border-blue-700 px-6 pb-4">
          {/* Mobile Search */}
          <div className="flex items-center bg-white rounded-lg px-4 py-2.5 gap-2 mt-3 mb-3 shadow-sm">
            <svg
              className="w-4 h-4 text-[#00569e] shrink-0"
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
              className="bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none w-full"
            />
          </div>

          {/* Mobile Nav Links */}
          <ul className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`
                    block text-sm font-semibold uppercase tracking-widest py-2.5 px-3 rounded-md
                    transition-colors duration-200
                    ${
                      isActive(link.to)
                        ? "bg-white text-[#00569e]"
                        : "text-white hover:bg-white/15"
                    }
                  `}
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
