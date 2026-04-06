import React, { useEffect, useState } from "react";
import CategoryWiseBlog from "./CategoryWiseBlog";
import { fetchFootballBlogs } from "../../../Services/BlogServices";
import { blogDetailPath } from "../../../Utils/blogPaths";

export default function FootballBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [_loading, setLoading] = useState(true);
  const [_error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await fetchFootballBlogs();
        setBlogs(data.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <CategoryWiseBlog
        featured={{
          category: "Football",
          title: "Peaks Into The World of Football",
          excerpt: "Your excerpt here...",
          image: "home/football.jpg",
          to: blogDetailPath(blogs[0]),
        }}
        sidePosts={blogs.slice(0, 2).map((blog) => ({
          id: blog._id,
          category: "Football",
          title: blog.title,
          excerpt: blog.summary,
          image: blog.heroImage?.url,
          to: blogDetailPath(blog),
        }))}
      />
    </div>
  );
}
