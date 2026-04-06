import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, User, Medal, ArrowLeft } from "lucide-react";
import FilterBlogs from "./FilterBlogs";
import { fetchPublishedBlogs } from "../../../Services/BlogServices";
import SubBar from "./SubBar";

const ACCENTS = [
  { bar: "#16a34a", bg: "rgba(22,163,74,0.1)", text: "#14532d" },
  { bar: "#d97706", bg: "rgba(217,119,6,0.1)", text: "#78350f" },
  { bar: "#7c3aed", bg: "rgba(124,58,237,0.1)", text: "#3b0764" },
  { bar: "#0284c7", bg: "rgba(2,132,199,0.1)", text: "#0c4a6e" },
];

function BlogCard({ article, index }) {
  const accent = ACCENTS[index % ACCENTS.length];
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
      <div className="h-[3px] w-full" style={{ background: accent.bar }} />
      <div className="px-4 pt-4 pb-3">
        <h3 className="font-medium text-[14px] text-slate-900 leading-snug line-clamp-2">
          {article.title}
        </h3>
      </div>
      <div
        className="mx-4 rounded-lg overflow-hidden bg-slate-100"
        style={{ aspectRatio: "16/9" }}
      >
        {article.heroImage?.url ? (
          <img
            src={article.heroImage.url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Medal size={28} className="text-slate-300" />
          </div>
        )}
      </div>
      <div className="px-4 pt-3 pb-4 flex flex-col gap-2.5">
        <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2">
          {article.summary || article.excerpt}
        </p>
        <div className="border-t border-slate-100" />
        <div className="flex items-center justify-between flex-wrap gap-1.5">
          <span
            className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ background: accent.bg, color: accent.text }}
          >
            {article.category || article.tag || "समाचार"}
          </span>
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <User size={10} />
              <span className="font-medium text-slate-600 max-w-[80px] truncate">
                {article.author}
              </span>
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <Clock size={10} />
              {article.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden animate-pulse">
      <div className="h-[3px] w-full bg-slate-100" />
      <div className="px-4 pt-4 pb-3 space-y-2">
        <div className="h-3.5 bg-slate-100 rounded w-4/5" />
        <div className="h-3.5 bg-slate-100 rounded w-3/5" />
      </div>
      <div
        className="mx-4 rounded-lg bg-slate-100"
        style={{ aspectRatio: "16/9" }}
      />
      <div className="px-4 pt-3 pb-4 space-y-2.5">
        <div className="h-3 bg-slate-100 rounded w-full" />
        <div className="h-3 bg-slate-100 rounded w-2/3" />
        <div className="border-t border-slate-100" />
        <div className="flex items-center justify-between">
          <div className="h-5 w-14 bg-slate-100 rounded-full" />
          <div className="h-3 w-28 bg-slate-100 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function BlogsBrowse() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Category");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchPublishedBlogs()
      .then((res) => setBlogs(res.data?.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = [...blogs];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.title?.toLowerCase().includes(q) ||
          b.summary?.toLowerCase().includes(q) ||
          b.excerpt?.toLowerCase().includes(q),
      );
    }

    if (category && category !== "All Category") {
      list = list.filter(
        (b) => b.category?.toLowerCase() === category.toLowerCase(),
      );
    }

    if (filter === "Most Recent")
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (filter === "Oldest First")
      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (filter === "A–Z") list.sort((a, b) => a.title?.localeCompare(b.title));
    if (filter === "Most Popular")
      list.sort((a, b) => (b.views || 0) - (a.views || 0));

    return list;
  }, [blogs, search, category, filter]);

  return (
    <div className="font-[Mukta,sans-serif] bg-slate-100 min-h-screen">
      <SubBar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[13px] text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={15} />
            Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Browse</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              We provide tips and resources to help you grow.
            </p>
          </div>
        </div>

        {/* Layout: sidebar + content */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left sidebar — sticky on desktop */}
          <div className="w-full md:w-[260px] md:sticky md:top-6 shrink-0 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <FilterBlogs
              onSearch={setSearch}
              onCategoryChange={setCategory}
              onFilterChange={setFilter}
            />
          </div>

          {/* Right: blog grid */}
          <div className="flex-1 min-w-0">
            {!loading && (
              <p className="text-[13px] text-slate-400 mb-4">
                {filtered.length}{" "}
                {filtered.length === 1 ? "article" : "articles"} found
                {category !== "All Category" && ` in "${category}"`}
                {search && ` for "${search}"`}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              ) : filtered.length > 0 ? (
                filtered.map((article, index) => (
                  <BlogCard key={article.id} article={article} index={index} />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                  <Medal size={40} className="text-slate-200 mb-3" />
                  <p className="text-slate-400 text-sm">No articles found.</p>
                  <p className="text-slate-300 text-xs mt-1">
                    Try adjusting your search or filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
