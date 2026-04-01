import React, { useEffect, useState } from "react";
import CategoryWiseBlog from "./CategoryWiseBlog";
import { fetchFootballBlogs } from "../../../Services/BlogServices";

export default function FootballBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  console.log(blogs);

  return (
    <div>
      <CategoryWiseBlog
        featured={{
          category: "Football",
          title: "Peaks Into The World of Football",
          excerpt: "Your excerpt here...",
          image: "home/football.jpg",
        }}
        sidePosts={[
          {
            id: 1,
            category: "Football",
            title: blogs[0]?.title,
            excerpt: blogs[0]?.summary,
            image: blogs[0]?.heroImage.url,
            to: `/blog/${blogs.id}`,
          },
          {
            id: 2,
            category: "Football",
            title: blogs[1]?.title,
            excerpt: blogs[2]?.summary,
            image: blogs[1]?.heroImage.url,
            to: `/blog/${blogs.id}`,
          },
        ].filter(Boolean)}
      />
    </div>
  );
}
