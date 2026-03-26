import React from "react";
import HeroSection from "./HeroSection";
import LatestBlog from "./LatestBlog";
import LiveScore from "./LiveScore";

export default function Index() {
  return (
    <>
      <HeroSection />
      <LatestBlog />
      <LiveScore />
    </>
  );
}
