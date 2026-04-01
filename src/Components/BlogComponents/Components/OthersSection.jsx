import { PenLine } from "lucide-react";
import { Link } from "react-router-dom";
import Tag from "./shared/Tag";
import SectionTitle from "./shared/SectionTitle";
import { fetchOthersBlogs } from "../../../Services/BlogServices";
import { useEffect, useState } from "react";
import { blogDetailPath } from "../../../Utils/blogPaths";

function OtherCard({ article }) {
  const to = blogDetailPath(article);

  const inner = (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 cursor-pointer group">
      {/* image */}
      <div className="overflow-hidden">
        <img
          src={article?.heroImage?.url || "/fallback-news.jpg"}
          alt={article.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* content */}
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <Tag label={article.category} />
          <span className="text-[11px] text-slate-400">
            {new Date(article.publishedAt).toLocaleDateString("ne-NP", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <h3 className="font-bold text-lg text-slate-900 leading-snug mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
          {article.title}
        </h3>

        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
          {article.summary}
        </p>
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block no-underline text-inherit">
        {inner}
      </Link>
    );
  }

  return inner;
}

export default function OthersCard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOtherBlogs = async () => {
      try {
        const res = await fetchOthersBlogs();
        setBlogs(res.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch other blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    getOtherBlogs();
  }, []);

  return (
    <div>
      <SectionTitle icon={PenLine} label="अन्य ब्लगहरू / Other Blogs" />

      {loading ? (
        <p className="text-sm text-slate-500">लोड हुँदैछ...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {blogs.map((a) => (
            <OtherCard key={a._id} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
