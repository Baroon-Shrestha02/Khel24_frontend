import React from "react";
import FeaturedBlog from "./FeaturedBlog";
import LatestBlog from "./LatestBlog";
import Blog from "./Blog";

export default function Index() {
  return (
    <>
      <FeaturedBlog />
      <LatestBlog />
      {/* <Blog /> */}
    </>
  );
}
