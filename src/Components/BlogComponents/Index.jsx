import React from "react";
import FeaturedBlog from "./FeaturedBlog";
import LatestBlog from "./LatestBlog";
import Blog from "./Blog";
import CategoryWiseBlog from "../HomeComponents/BlogCateogories/CategoryWiseBlog";
import CategoryBlogs from "./CategoryBlogs";

export default function Index() {
  return (
    <>
      <FeaturedBlog />
      <LatestBlog />
      <CategoryBlogs />
      <Blog />
    </>
  );
}
