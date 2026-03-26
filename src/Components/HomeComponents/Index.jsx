// src/Pages/HomePage.jsx
import React from "react";
import HeroSection from "./HeroSection";
import LiveScoreSidebar from "./LiveScore";

import WhatWeWrite from "./WhatWeWrite";
import LatestBlog from "./LatestBlog";

export default function Index() {
  return (
    // Outer wrapper: side-by-side on md+, sidebar stays on the right
    <div className="flex flex-col md:flex-row gap-6 min-h-screen items-start max-w-7xl mx-auto">
      {/* ── Left / main column ─────────────────────────────────────── */}
      <main className="flex-1 flex flex-col gap-6 min-w-0 mt-3">
        <HeroSection />
        <WhatWeWrite />
        <LatestBlog />
      </main>

      {/* ── Right / sticky sidebar ─────────────────────────────────── */}
      <LiveScoreSidebar />
    </div>
  );
}
