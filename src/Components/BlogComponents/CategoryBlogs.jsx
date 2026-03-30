import React from "react";
import CricketBlogs from "../HomeComponents/BlogCateogories/CricketBlogs";
import FootballBlogs from "../HomeComponents/BlogCateogories/FootballBlogs";

export default function CategoryBlogs() {
  return (
    <div>
      <FootballBlogs />
      <CricketBlogs />
    </div>
  );
}
