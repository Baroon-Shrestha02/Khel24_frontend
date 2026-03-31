// src/Components/Shared/CategoryBlogsView.jsx
import React, { useState, useEffect } from "react";
import {
  LayoutGrid,
  List,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export default function CategoryBlogsView({
  categoryTitle = "विशेष",
  moreTitle = "थप समाचार",
  fetchFn,
  onBlogClick,
}) {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={36} className="animate-spin text-[#e01a22]" />
          <p className="text-sm font-medium text-gray-400">लोड हुँदैछ...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-red-500">
          <AlertCircle size={36} />
          <p className="text-sm font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-400 text-sm font-medium">कुनै समाचार भेटिएन।</p>
      </div>
    );
  }

  const featured = blogs[0];
  const restBlogs = blogs.slice(1);

  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Category Header */}
        <div className="flex items-center gap-4 py-7">
          <span className="text-2xl font-black text-[#e01a22] whitespace-nowrap tracking-tight">
            {categoryTitle}
          </span>
          <div className="flex-1 h-0.5 bg-[#e01a22] opacity-25" />
        </div>

        {/* Featured Blog */}
        <div
          className="grid grid-cols-1 md:grid-cols-[55%_45%] bg-white rounded-xl overflow-hidden shadow-md mb-7 cursor-pointer"
          onClick={() => onBlogClick?.(featured)}
        >
          {/* Fixed height featured image */}
          <div className="h-[300px] md:h-[420px] overflow-hidden">
            <img
              src={featured.heroImage.url}
              alt={featured.title}
              className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="flex flex-col justify-center gap-4 p-7 md:p-8">
            <h2 className="text-2xl lg:text-[1.9rem] font-extrabold text-gray-900 leading-snug tracking-tight">
              {featured.title}
            </h2>
            {featured.summary && (
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-4">
                {featured.summary}
              </p>
            )}
            {/* Read More Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBlogClick?.(featured);
              }}
              className="self-start flex items-center gap-2 px-5 py-2.5 bg-[#e01a22] text-white text-sm font-semibold rounded-lg hover:bg-[#c01020] transition-colors duration-150 mt-1"
            >
              थप पढ्नुहोस्
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        {/* Sub-section + Toggle */}
        {restBlogs.length > 0 && (
          <>
            <div className="flex items-center gap-4 mb-5">
              <span className="text-2xl font-black text-[#e01a22] whitespace-nowrap tracking-tight">
                {moreTitle}
              </span>
              <div className="flex-1 h-0.5 bg-[#e01a22] opacity-25" />
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setView("grid")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors duration-150 ${
                    view === "grid"
                      ? "bg-[#e01a22] text-white"
                      : "bg-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                  }`}
                >
                  <LayoutGrid size={15} />
                  Grid View
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold transition-colors duration-150 ${
                    view === "list"
                      ? "bg-[#e01a22] text-white"
                      : "bg-transparent text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                  }`}
                >
                  <List size={15} />
                  List View
                </button>
              </div>
            </div>

            {view === "grid" ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {restBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    onClick={() => onBlogClick?.(blog)}
                    className="bg-white rounded-xl overflow-hidden shadow-sm cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col"
                  >
                    {/* Fixed height grid card image */}
                    <div className="h-44 overflow-hidden shrink-0">
                      <img
                        src={blog?.heroImage.url}
                        alt={blog?.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-3.5 pb-5 flex flex-col gap-1.5 flex-1">
                      <p className="text-sm font-bold text-gray-900 leading-snug">
                        {blog?.title}
                      </p>
                      {blog?.summary && (
                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mt-0.5">
                          {blog.summary}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3.5">
                {restBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    onClick={() => onBlogClick?.(blog)}
                    className="bg-white rounded-xl overflow-hidden shadow-sm flex cursor-pointer transition-all duration-200 hover:translate-x-1 hover:shadow-md"
                  >
                    {/* Fixed height list card image */}
                    <div className="w-36 sm:w-48 h-28 sm:h-32 shrink-0 overflow-hidden">
                      <img
                        src={blog?.heroImage.url}
                        alt={blog?.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col justify-center gap-1.5 px-4 py-3 flex-1 min-w-0">
                      <p className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                        {blog.title}
                      </p>
                      {blog?.summary && (
                        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-2">
                          {blog.summary}
                        </p>
                      )}
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
