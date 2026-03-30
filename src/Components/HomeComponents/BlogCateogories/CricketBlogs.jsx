import React, { useEffect, useState } from "react";
import CategoryWiseBlog from "./CategoryWiseBlog";
import {
  fetchCricketBlogs,
  fetchFootballBlogs,
} from "../../../Services/BlogServices";

export default function CricketBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          slug: "/blog/post-slug",
        }}
        sidePosts={[
          {
            id: 1,
            category: "Cricket",
            title: blogs[0]?.title,
            excerpt: blogs[0]?.summary,
            image: blogs[0]?.heroImage.url,
            slug: "#",
          },
          {
            id: 2,
            category: "Cricket",
            title: blogs[1]?.title,
            excerpt: blogs[2]?.summary,
            image: blogs[1]?.heroImage.url,
            slug: "#",
          },
        ].filter(Boolean)}
      />
    </div>
  );
}
