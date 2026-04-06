// src/Components/Shared/CategoryBlogsView.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  List,
  Loader2,
  AlertCircle,
  ArrowRight,
  Clock,
} from "lucide-react";
import { blogDetailPath } from "../../../Utils/blogPaths";

export default function CategoryBlogsView({
  categoryTitle = "विशेष",
  moreTitle = "थप समाचार",
  fetchFn,
  onBlogClick,
}) {
  const navigate = useNavigate();
  const goToBlog =
    onBlogClick ??
    ((blog) => {
      const path = blogDetailPath(blog);
      if (path) navigate(path);
    });

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("grid");

  useEffect(() => {
    if (!fetchFn) return;
    const fetchBlogs = async () => {
      try {
        const { data } = await fetchFn();
        setBlogs(data.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [fetchFn]);

  /* ── States ── */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={32} className="animate-spin text-[#e01a22]" />
          <p className="text-xs font-mono tracking-widest uppercase text-gray-400">
            लोड हुँदैछ...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3 text-red-500">
          <AlertCircle size={32} />
          <p className="text-sm font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <p className="text-xs font-mono tracking-widest uppercase text-gray-400">
          कुनै समाचार भेटिएन।
        </p>
      </div>
    );
  }

  const featured = blogs[0];
  const restBlogs = blogs.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* ── Category Header ── */}
        <div className="pt-8 pb-6">
          <div className="flex items-center gap-4">
            {/* Red accent bar */}
            <div className="w-1 h-8 bg-[#e01a22] rounded-full shrink-0" />
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-none">
              {categoryTitle}
            </h1>
          </div>
          {/* Full-width rule */}
          <div className="mt-4 h-px bg-gray-200" />
        </div>

        {/* ── Featured Blog ── */}
        <div
          onClick={() => goToBlog(featured)}
          className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer mb-10 transition-shadow duration-300 hover:shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-[58%_42%]">
            {/* Image */}
            <div className="relative h-64 sm:h-80 md:h-[440px] overflow-hidden bg-gray-100">
              <img
                src={featured.heroImage?.url}
                alt={featured.title}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle gradient overlay on image */}
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

              {/* Featured badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 bg-[#e01a22] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full">
                  ✦ मुख्य समाचार
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between p-6 sm:p-8 md:p-10">
              <div className="flex flex-col gap-5">
                {/* Meta */}
                <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400 uppercase tracking-widest">
                  <Clock size={11} />
                  <span>ताजा समाचार</span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-[1.75rem] font-black text-gray-900 leading-snug tracking-tight">
                  {featured.title}
                </h2>

                {featured.summary && (
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-4 border-l-2 border-gray-200 pl-4">
                    {featured.summary}
                  </p>
                )}
              </div>

              {/* CTA */}
              <div className="mt-8">
                {/* Thin rule before button */}
                <div className="h-px bg-gray-100 mb-6" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToBlog(featured);
                  }}
                  className="group/btn inline-flex items-center gap-2.5 bg-[#e01a22] hover:bg-[#c01020] text-white text-sm font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:gap-4"
                >
                  थप पढ्नुहोस्
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover/btn:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Rest of blogs ── */}
        {restBlogs.length > 0 && (
          <>
            {/* Sub-header + toggle */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-gray-300 rounded-full shrink-0" />
                <span className="text-lg sm:text-xl font-black text-gray-800 tracking-tight">
                  {moreTitle}
                </span>
              </div>
              <div className="flex-1 h-px bg-gray-200" />

              {/* View toggle */}
              <div className="flex items-center gap-1 shrink-0 bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setView("grid")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                    view === "grid"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <LayoutGrid size={13} />
                  <span className="hidden sm:inline">Grid</span>
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                    view === "list"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <List size={13} />
                  <span className="hidden sm:inline">List</span>
                </button>
              </div>
            </div>

            {/* Grid view */}
            {view === "grid" ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {restBlogs.map((blog, i) => (
                  <div
                    key={blog._id ?? blog.id}
                    onClick={() => goToBlog(blog)}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    {/* Image */}
                    <div className="relative h-40 sm:h-44 overflow-hidden bg-gray-100 shrink-0">
                      <img
                        src={blog?.heroImage?.url}
                        alt={blog?.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Bottom gradient for text contrast */}
                      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>

                    <div className="p-4 flex flex-col gap-2 flex-1">
                      <p className="text-sm font-bold text-gray-900 leading-snug line-clamp-3">
                        {blog?.title}
                      </p>
                      {blog?.summary && (
                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mt-0.5">
                          {blog.summary}
                        </p>
                      )}
                      {/* Read indicator */}
                      <div className="mt-auto pt-3 flex items-center gap-1 text-[#e01a22] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="text-xs font-bold">पढ्नुहोस्</span>
                        <ArrowRight size={11} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List view */
              <div className="flex flex-col divide-y divide-gray-100 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {restBlogs.map((blog, i) => (
                  <div
                    key={blog._id ?? blog.id}
                    onClick={() => goToBlog(blog)}
                    className="group flex cursor-pointer transition-all duration-200 hover:bg-gray-50"
                  >
                    {/* Image */}
                    <div className="w-32 sm:w-44 h-24 sm:h-28 shrink-0 overflow-hidden bg-gray-100">
                      <img
                        src={blog?.heroImage?.url}
                        alt={blog?.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center gap-1.5 px-4 sm:px-5 py-3 flex-1 min-w-0">
                      {/* Index number */}
                      <span className="text-[10px] font-mono text-gray-300 font-black">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm sm:text-base font-bold text-gray-900 leading-snug line-clamp-2">
                        {blog.title}
                      </p>
                      {blog?.summary && (
                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-1 hidden sm:block">
                          {blog.summary}
                        </p>
                      )}
                    </div>

                    {/* Arrow */}
                    <div className="hidden sm:flex items-center pr-5 text-gray-200 group-hover:text-[#e01a22] transition-colors duration-200">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
