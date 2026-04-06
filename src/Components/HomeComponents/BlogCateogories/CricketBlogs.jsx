import React, { useEffect, useState } from "react";
import CategoryWiseBlog from "./CategoryWiseBlog";
import { fetchCricketBlogs } from "../../../Services/BlogServices";
import { blogDetailPath } from "../../../Utils/blogPaths";

export default function CricketBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [_loading, setLoading] = useState(true);
  const [_error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await fetchCricketBlogs();
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
    <div className=" rounded-3xl">
      <CategoryWiseBlog
        featured={{
          category: "Cricket",
          title: "Peaks Into The World of Cricket",
          excerpt: "Your excerpt here...",
          image: "home/cricket.jpg",
          to: blogDetailPath(blogs[0]),
        }}
        sidePosts={blogs.slice(0, 2).map((blog) => ({
          id: blog._id,
          category: "Cricket",
          title: blog.title,
          excerpt: blog.summary,
          image: blog.heroImage?.url,
          to: blogDetailPath(blog),
        }))}
      />
    </div>
  );
}
