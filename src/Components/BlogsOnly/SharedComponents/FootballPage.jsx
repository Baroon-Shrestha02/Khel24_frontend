// src/Pages/FootballPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

import CategoryBlogsView from "./CategoryBlogsView";
import { fetchFootballBlogs } from "../../../Services/BlogServices";
import { blogDetailPath } from "../../../Utils/blogPaths";

export default function FootballPage() {
  const navigate = useNavigate();

  return (
    <CategoryBlogsView
      categoryTitle="फुटबल विशेष"
      moreTitle="थप फुटबल समाचार"
      fetchFn={fetchFootballBlogs}
      onBlogClick={(blog) => {
        const path = blogDetailPath(blog);
        if (path) navigate(path);
      }}
    />
  );
}
