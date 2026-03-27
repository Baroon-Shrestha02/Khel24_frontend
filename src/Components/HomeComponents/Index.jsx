import React from "react";
import HeroSection from "./HeroSection";
import LiveScoreSidebar from "./LiveScore";
import WhatWeWrite from "./WhatWeWrite";
import LatestBlog from "./LatestBlog";
import CategoryWiseBlog from "./BlogCateogories/CategoryWiseBlog";
import FootballBlogs from "./BlogCateogories/FootballBlogs";
import CricketBlogs from "./BlogCateogories/CricketBlogs";

export default function Index() {
  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Live score on top on mobile */}
      <div className="block md:hidden mt-3">
        <LiveScoreSidebar />
      </div>

      {/* Side-by-side on md+ */}
      <div className="flex flex-col md:flex-row gap-6 min-h-screen items-start">
        {/* Main column */}
        <main className="flex-1 flex flex-col gap-6 min-w-0 mt-3">
          <HeroSection />
          <WhatWeWrite />
          <LatestBlog />
          <FootballBlogs />
          <CricketBlogs />
        </main>

        {/* Sidebar — hidden on mobile since shown above */}
        <div className="hidden md:block w-80 shrink-0 sticky top-8 self-start">
          <LiveScoreSidebar />
        </div>
      </div>
    </div>
  );
}
