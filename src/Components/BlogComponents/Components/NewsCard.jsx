import { Medal, Clock, User, File } from "lucide-react";
import SectionTitle from "./shared/SectionTitle";
import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPublishedBlogs } from "../../../Services/BlogServices";
import { formatDistanceToNow } from "date-fns";
import { blogDetailPath } from "../../../Utils/blogPaths";

const ACCENTS = [
  { bar: "#16a34a", bg: "rgba(22,163,74,0.1)", text: "#14532d" },
  { bar: "#d97706", bg: "rgba(217,119,6,0.1)", text: "#78350f" },
  { bar: "#7c3aed", bg: "rgba(124,58,237,0.1)", text: "#3b0764" },
  { bar: "#0284c7", bg: "rgba(2,132,199,0.1)", text: "#0c4a6e" },
];

function NewsCardItem({ article, index, visible }) {
  const accent = ACCENTS[index % ACCENTS.length];
  const navigate = useNavigate();

  const handleClick = () => {
    const path = blogDetailPath(article);
    if (path) navigate(path);
  };

  return (
    <div
      onClick={handleClick}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`group bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-slate-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
    >
      <div className="h-[3px] w-full" style={{ background: accent.bar }} />

      <div className="px-4 pt-4 pb-3">
        <h3 className="font-extrabold text-center text-[18px] text-slate-900 leading-snug line-clamp-2">
          {article.title}
        </h3>
      </div>

      <div
        className="mx-4 rounded-lg overflow-hidden"
        style={{ aspectRatio: "16/9", background: "#f1f5f9" }}
      >
        {article.heroImage?.url ? (
          <img
            src={article.heroImage.url}
            alt={article.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Medal size={28} className="text-slate-300" />
          </div>
        )}
      </div>

      <div className="px-4 pt-3 pb-4 flex flex-col gap-2.5">
        <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2">
          {article.summary}
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
                Admin
              </span>
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <Clock size={10} />
              {formatDistanceToNow(new Date(article.createdAt), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
      <div className="h-[3px] w-full bg-slate-100 animate-pulse" />
      <div className="px-4 pt-4 pb-3 space-y-2 animate-pulse">
        <div className="h-3.5 bg-slate-100 rounded w-4/5" />
        <div className="h-3.5 bg-slate-100 rounded w-3/5" />
      </div>
      <div
        className="mx-4 rounded-lg bg-slate-100 animate-pulse"
        style={{ aspectRatio: "16/9" }}
      />
      <div className="px-4 pt-3 pb-4 space-y-2.5 animate-pulse">
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

export default function SpecialSportsNews({
  search = "",
  category = "All Category",
  filter = "",
}) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetchPublishedBlogs()
      .then((res) => setBlogs(res.data?.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ── Apply search, category, and sort filters ── */
  const filtered = useMemo(() => {
    let list = blogs.map((b) => ({
      ...b,
      _createdAt: new Date(b.createdAt).getTime() || 0,
    }));

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.title?.toLowerCase().includes(q) ||
          b.summary?.toLowerCase().includes(q) ||
          b.excerpt?.toLowerCase().includes(q),
      );
    }

    if (category && category !== "All Blogs") {
      list = list.filter(
        (b) => b.category?.toLowerCase() === category.toLowerCase(),
      );
    }

    if (filter === "Most Recent") {
      list.sort((a, b) => b._createdAt - a._createdAt);
    }

    if (filter === "Oldest First") {
      list.sort((a, b) => a._createdAt - b._createdAt);
    }

    return list;
  }, [blogs, search, category, filter]);

  return (
    <div ref={sectionRef}>
      <SectionTitle icon={Medal} label="विशेष समाचार" />

      {/* Result count */}
      {!loading && (
        <p className="text-[13px] text-slate-400 mt-3 mb-1">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}{" "}
          found
          {category !== "All Category" && ` in "${category}"`}
          {search && ` for "${search}"`}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        ) : filtered.length > 0 ? (
          filtered.map((article, index) => (
            <NewsCardItem
              key={article.id}
              article={article}
              index={index}
              visible={visible}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <File size={40} className="text-slate-200 mb-3" />
            <p className="text-slate-400 text-sm">No articles found.</p>
            <p className="text-slate-300 text-xs mt-1">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
