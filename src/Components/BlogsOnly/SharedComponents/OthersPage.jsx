// src/Pages/OthersPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryBlogsView from "./CategoryBlogsView";
import { fetchOthersBlogs } from "../../../Services/BlogServices";

export default function OthersPage() {
  const navigate = useNavigate();

  return (
    <CategoryBlogsView
      categoryTitle="अन्य समाचार"
      moreTitle="थप समाचार"
      fetchFn={fetchOthersBlogs}
      onBlogClick={(blog) => navigate(`/blogs/${blog.id}`)}
    />
  );
}
