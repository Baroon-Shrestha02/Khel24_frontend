import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { fetchSideBlogs } from "../../Services/BlogServices";

// category icons
import { IoFootball } from "react-icons/io5";
import { MdSportsCricket, MdBusiness, MdInsertDriveFile } from "react-icons/md";

// meta icons
import { FiCalendar, FiUser, FiArrowRight } from "react-icons/fi";
import BlogCard from "../SharedComponents/BlogCard";
import { blogDetailPath } from "../../Utils/blogPaths";

// ---------------- CATEGORY CONFIG ----------------
const categoryConfig = {
  Football: {
    icon: <IoFootball className="w-3.5 h-3.5" />,
    bg: "bg-green-50",
    text: "text-green-700",
  },
  Cricket: {
    icon: <MdSportsCricket className="w-3.5 h-3.5" />,
    bg: "bg-yellow-50",
    text: "text-yellow-700",
  },
  org: {
    icon: <MdBusiness className="w-3.5 h-3.5" />,
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  other: {
    icon: <MdInsertDriveFile className="w-3.5 h-3.5" />,
    bg: "bg-gray-50",
    text: "text-gray-600",
  },
};

// normalize category safely
const getCategoryConfig = (category) => {
  const key = category?.toLowerCase();

  if (key === "football") return categoryConfig.Football;
  if (key === "cricket") return categoryConfig.Cricket;
  if (key === "org") return categoryConfig.org;

  return categoryConfig.other;
};

// ---------------- NEWS CARD ----------------
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
  const config = getCategoryConfig(category);

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      })
    : "Unknown";

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
      <Link
        to={url || "#"}
        className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        {/* Image */}
        <div className="relative overflow-hidden h-52">
          <img
            src={heroImage?.url || "/fallback.jpg"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {category && (
            <span
              className={`absolute top-3 left-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${config.bg} ${config.text}`}
            >
              {config.icon}
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

          {/* Footer */}
          <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <FiCalendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <FiUser className="w-3.5 h-3.5" />
              <span>Admin</span>
            </div>

            <span className="flex items-center gap-1 text-xs font-semibold text-[#00569e] group-hover:gap-2 transition-all duration-200">
              Read
              <FiArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ---------------- SKELETON ----------------
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <Skeleton height={208} />
      <div className="p-5 flex flex-col gap-3">
        <Skeleton height={18} width="75%" />
        <Skeleton height={14} count={3} />
        <div className="mt-2 pt-3 border-t border-gray-100 flex justify-between">
          <Skeleton height={12} width={64} />
          <Skeleton height={12} width={48} />
          <Skeleton height={12} width={40} />
        </div>
      </div>
    </div>
  );
}

// ---------------- MAIN COMPONENT ----------------
export default function LatestBlog() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetchSideBlogs();
        setBlogs(res?.data?.data || []);
      } catch (err) {
        setError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  //   console.log(blogs[0].heroImage.url);
  return (
    <section id="news" className="container mx-auto px-3 sm:px-4 py-10">
      {/* Heading */}
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
      >
        <div className="w-1 h-8 bg-[#00569e] rounded-full" />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Latest News
        </h2>
      </motion.div>

      {/* Error */}
      {error && (
        <div className="text-center py-10 text-red-500 text-sm">
          Failed to load blogs: {error}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && blogs.length === 0 && (
        <div className="text-center py-10 text-gray-400 text-sm">
          No blogs published yet.
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Skeleton */}
        {loading &&
          Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}

        {/* Blogs */}
        {!loading &&
          !error &&
          blogs
            .slice(0, 3)
            .map((blog, index) => (
              <BlogCard
                key={blog._id}
                index={index}
                title={blog.title}
                summary={blog.summary}
                heroImage={blog.heroImage?.url}
                category={blog.category}
                createdAt={blog.createdAt}
                url={`/blogs/${blog._id}`}
              />
            ))}
      </div>
    </section>
  );
}
