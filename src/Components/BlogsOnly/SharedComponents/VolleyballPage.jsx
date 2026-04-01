// src/Pages/VolleyballPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

import { fetchVolleyballBlogs } from "../../../Services/BlogServices";
import CategoryBlogsView from "./CategoryBlogsView";
import { blogDetailPath } from "../../../Utils/blogPaths";

// No dedicated fetchVolleyballBlogs in services, so we bind fetchBlogsByCategory
export default function VolleyballPage() {
  const navigate = useNavigate();

  return (
    <CategoryBlogsView
      categoryTitle="भलिबल विशेष"
      moreTitle="थप भलिबल समाचार"
      fetchFn={fetchVolleyballBlogs}
      onBlogClick={(blog) => {
        const path = blogDetailPath(blog);
        if (path) navigate(path);
      }}
    />
  );
}
