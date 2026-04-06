import { Link } from "react-router-dom";
import { Eye, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchPublishedBlogs } from "../../../Services/BlogServices";

export default function TrendingSidebar({ items }) {
  const [blogs, setBlogs] = useState();

  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await fetchPublishedBlogs();
        setBlogs(data.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  console.log();

  if (!items?.length) return null;

  return (
    <aside className="hidden xl:flex flex-col gap-3 w-60 shrink-0 sticky top-4 self-start">
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 text-white">
          <TrendingUp size={13} />
          <span className="font-bold text-[11px] tracking-widest uppercase">
            Trending Now
          </span>
        </div>
        <div className="divide-y divide-slate-100">
          {items.map((t, i) => (
            <Link
              key={t.blogId ?? i}
              to={`/blog/${t.blogId}`}
              className="flex gap-2.5 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span
                className={`text-xl font-black leading-none shrink-0 pt-0.5 ${i < 3 ? "text-red-600" : "text-slate-200"}`}
              >
                {String(t.n).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">
                  {t.tag}
                </p>
                <p className="lc2 text-xs font-semibold text-slate-800 leading-snug">
                  {t.title}
                </p>
                <p className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                  {t.content}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
