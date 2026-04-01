// src/Pages/CricketPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

import CategoryBlogsView from "./CategoryBlogsView";
import { fetchCricketBlogs } from "../../../Services/BlogServices";
import { blogDetailPath } from "../../../Utils/blogPaths";

export default function CricketPage() {
  const navigate = useNavigate();

  return (
    <CategoryBlogsView
      categoryTitle="क्रिकेट विशेष"
      moreTitle="थप क्रिकेट समाचार"
      fetchFn={fetchCricketBlogs}
      onBlogClick={(blog) => {
        const path = blogDetailPath(blog);
        if (path) navigate(path);
      }}
    />
  );
}
