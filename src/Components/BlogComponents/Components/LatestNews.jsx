import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import SectionTitle from "./shared/SectionTitle";
import { fetchPublishedBlogs } from "../../../Services/BlogServices";
import { useEffect, useState } from "react";
import { blogDetailPath } from "../../../Utils/blogPaths";

export default function LatestNews() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLatestBlogs = async () => {
      try {
        const res = await fetchPublishedBlogs();

        const latest = res.data?.data?.slice(0, 4) || [];
        setBlogs(latest);
      } catch (error) {
        console.error("Failed to fetch latest blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    getLatestBlogs();
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <SectionTitle icon={Zap} label="ताजा समाचार" />

      {loading ? (
        <p className="text-sm text-slate-500 py-4">लोड हुँदैछ...</p>
      ) : (
        blogs.map((item) => {
          const to = blogDetailPath(item);
          const row = (
            <>
              <img
                src={item?.heroImage?.url || "/fallback-news.jpg"}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md shrink-0"
              />

              <div className="flex-1">
                <span className="bg-red-50 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded-sm inline-block mb-1">
                  {item.category}
                </span>

                <p className="text-[13px] font-semibold text-slate-800 leading-snug group-hover:text-red-600 transition-colors">
                  {item.title}
                </p>

                <p className="text-[10px] text-slate-400 mt-1">
                  {item.publishedAt
                    ? new Date(item.publishedAt).toLocaleDateString("ne-NP", {
                        month: "short",
                        day: "numeric",
                      })
                    : ""}
                </p>
              </div>
            </>
          );

          const rowClass =
            "flex items-start gap-3 py-3 w-full no-underline text-inherit group";

          return (
            <div
              key={item._id ?? item.id}
              className="border-b border-dashed border-slate-200 last:border-0"
            >
              {to ? (
                <Link to={to} className={rowClass}>
                  {row}
                </Link>
              ) : (
                <div className={`${rowClass} cursor-default`}>{row}</div>
              )}
            </div>
          );
        })
      )}

      {/* <button className="w-full mt-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1">
        सबै समाचार हेर्नुहोस् <ChevronRight size={13} />
      </button> */}
    </div>
  );
}
