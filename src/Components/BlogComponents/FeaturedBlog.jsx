import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { FiCalendar, FiArrowRight, FiTag } from "react-icons/fi";
import { IoFootball } from "react-icons/io5";
import { MdSportsCricket, MdBusiness, MdInsertDriveFile } from "react-icons/md";
import { fetchFeaturedBlog, fetchSideBlogs } from "../../Services/BlogServices";

const categoryConfig = {
  Football: {
    icon: <IoFootball />,
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
  },
  Cricket: {
    icon: <MdSportsCricket />,
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },
  org: {
    icon: <MdBusiness />,
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  other: {
    icon: <MdInsertDriveFile />,
    bg: "bg-gray-50",
    text: "text-gray-500",
    border: "border-gray-200",
  },
};
const getCategoryConfig = (cat) => categoryConfig[cat] || categoryConfig.other;

const FALLBACK_BG =
  "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg?semt=ais_hybrid&w=740&q=80";

export default function FeaturedBlog() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "0px 0px -80px 0px",
  });

  const [featured, setFeatured] = useState(null);
  const [sideBlogs, setSideBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [featuredRes, sideRes] = await Promise.all([
          fetchFeaturedBlog(),
          fetchSideBlogs(),
        ]);

        const featuredBlog = featuredRes.data.data[0] ?? null;
        // exclude featured from side list if it appears
        const side = sideRes.data.data
          .filter((b) => b._id !== featuredBlog?._id)
          .slice(0, 3);

        setFeatured(featuredBlog);
        setSideBlogs(side);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const featuredCat = getCategoryConfig(featured?.category);
  const bgImage = featured?.heroImage?.url || FALLBACK_BG;

  const formattedDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] flex flex-col justify-center py-14 px-4 overflow-hidden"
    >
      {/* Full bleed background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110 transition-all duration-700"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gray-600/70 backdrop-blur-sm" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-1 h-8 bg-[#00569e] rounded-full" />
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Featured
          </h2>
        </motion.div>

        {error && (
          <div className="text-center py-10 text-red-300 text-sm">
            Failed to load: {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {/* ── Main Featured Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            {loading ? (
              <SkeletonTheme baseColor="#ffffff20" highlightColor="#ffffff35">
                <div className="rounded-3xl overflow-hidden min-h-[480px]">
                  <Skeleton height={480} borderRadius={24} />
                </div>
              </SkeletonTheme>
            ) : featured ? (
              <Link
                to={`/blogs/${featured._id}`}
                className="group relative rounded-3xl overflow-hidden shadow-2xl block h-full min-h-[480px]"
              >
                <img
                  src={featured.heroImage?.url}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-900/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-950/30" />

                <span className="absolute top-5 left-5 bg-[#00569e] text-white text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                  ★ Featured
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4 border backdrop-blur-sm ${featuredCat.bg} ${featuredCat.text} ${featuredCat.border}`}
                  >
                    {featuredCat.icon}
                    {featured.category}
                  </span>

                  <h3 className="text-[1.75rem] font-extrabold text-white leading-tight group-hover:text-blue-200 transition-colors duration-300 max-w-xl">
                    {featured.title}
                  </h3>

                  <p className="text-gray-300 text-sm mt-3 leading-relaxed line-clamp-2 max-w-lg">
                    {featured.summary}
                  </p>

                  <div className="w-12 h-0.5 bg-[#00569e] mt-4 mb-4 rounded-full" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <FiCalendar className="w-3.5 h-3.5" />
                      <span>{formattedDate(featured.createdAt)}</span>
                    </div>
                    <span className="flex items-center gap-2 text-sm font-bold text-white bg-[#00569e] px-4 py-2 rounded-full group-hover:bg-blue-500 transition-colors duration-300">
                      Read more
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </span>
                  </div>
                </div>
              </Link>
            ) : null}
          </motion.div>

          {/* ── Side Blogs ── */}
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="flex items-center gap-2 mb-1"
            >
              <FiTag className="text-blue-300 w-4 h-4" />
              <h3 className="text-base font-extrabold text-white tracking-tight">
                Latest Blogs
              </h3>
            </motion.div>

            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <SkeletonTheme
                    key={i}
                    baseColor="#ffffff20"
                    highlightColor="#ffffff35"
                  >
                    <Skeleton height={96} borderRadius={16} />
                  </SkeletonTheme>
                ))
              : sideBlogs.map((blog, index) => {
                  const cat = getCategoryConfig(blog.category);
                  return (
                    <motion.div
                      key={blog._id}
                      initial={{ opacity: 0, x: 24 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        duration: 0.45,
                        delay: 0.15 + index * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        to={`/blogs/${blog._id}`}
                        className="group flex gap-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl overflow-hidden hover:bg-white/20 hover:border-white/30 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                      >
                        <div className="relative w-28 shrink-0 overflow-hidden">
                          <img
                            src={blog.heroImage?.url}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-gray-900/0 transition-colors duration-300" />
                        </div>

                        <div className="py-3 pr-3 flex flex-col justify-between flex-1 min-w-0">
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full w-fit border ${cat.bg} ${cat.text} ${cat.border}`}
                          >
                            {cat.icon}
                            {blog.category === "other"
                              ? "General"
                              : blog.category}
                          </span>

                          <h4 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-blue-200 transition-colors duration-200 mt-1.5">
                            {blog.title}
                          </h4>

                          <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-1.5">
                            <FiCalendar className="w-3 h-3 shrink-0" />
                            <span>{formattedDate(blog.createdAt)}</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.55 }}
            >
              <Link
                to="/blogs"
                className="mt-1 flex items-center justify-center gap-2 text-sm font-semibold text-white border border-white/20 backdrop-blur-sm rounded-xl py-3 hover:bg-white hover:text-[#00569e] transition-all duration-300"
              >
                View all blogs <FiArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
