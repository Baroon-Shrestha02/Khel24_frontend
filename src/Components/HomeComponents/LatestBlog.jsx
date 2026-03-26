// src/components/LatestNews.jsx
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3000/api`, // http://localhost:3000/api
});

// Tag color map
const tagColors = {
  Tech: "bg-blue-100 text-blue-700",
  Cities: "bg-emerald-100 text-emerald-700",
  Sports: "bg-orange-100 text-orange-700",
  Football: "bg-red-100 text-red-700",
  Cricket: "bg-yellow-100 text-yellow-700",
};

function NewsCard({
  title,
  summary,
  url,
  heroImage,
  createdAt,
  category,
  index,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        href={url || "#"}
        className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        {/* Image */}
        <div className="relative overflow-hidden h-52">
          <img
            src={heroImage?.url}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {category && (
            <span
              className={`absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                tagColors[category] || "bg-gray-100 text-gray-600"
              }`}
            >
              {category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-2.5">
          <h2 className="text-[1.05rem] font-extrabold text-gray-900 leading-snug group-hover:text-[#00569e] transition-colors duration-200 line-clamp-2">
            {title}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
            {summary}
          </p>

          {/* Footer meta */}
          <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A8.966 8.966 0 0112 15c2.21 0 4.232.797 5.879 2.104M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Admin</span>
            </div>

            <span className="flex items-center gap-1 text-xs font-semibold text-[#00569e] group-hover:gap-2 transition-all duration-200">
              Read
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      <div className="h-52 bg-gray-200" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
        <div className="mt-2 pt-3 border-t border-gray-100 flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-16" />
          <div className="h-3 bg-gray-200 rounded w-12" />
          <div className="h-3 bg-gray-200 rounded w-10" />
        </div>
      </div>
    </div>
  );
}

export default function LatestBlog() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await api.get("/blogs", {
          params: { status: "published" },
        });
        console.log(data);
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
    <section id="news" className="container mx-auto px-4 py-10">
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="w-1 h-8 bg-[#00569e] rounded-full" />
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Latest News
        </h2>
      </motion.div>

      {error && (
        <div className="text-center py-10 text-red-500 text-sm">
          Failed to load blogs: {error}
        </div>
      )}

      {!loading && !error && blogs.length === 0 && (
        <div className="text-center py-10 text-gray-400 text-sm">
          No blogs published yet.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading &&
          Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}

        {!loading &&
          !error &&
          blogs.map((blog, index) => (
            <NewsCard
              key={blog._id}
              index={index}
              title={blog.title}
              summary={blog.summary}
              heroImage={blog.heroImage}
              category={blog.category}
              createdAt={blog.createdAt}
              url={`/blogs/${blog._id}`}
            />
          ))}
      </div>
    </section>
  );
}
