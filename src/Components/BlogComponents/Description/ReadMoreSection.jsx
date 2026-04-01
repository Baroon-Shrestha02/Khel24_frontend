import { Link } from "react-router-dom";
import { Eye, Clock, ChevronRight, TrendingUp } from "lucide-react";

export default function ReadMoreSection({ items }) {
  if (!items?.length) return null;

  return (
    <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-5 py-3 bg-slate-800 text-white">
        <TrendingUp size={14} />
        <span className="font-bold text-sm tracking-wide uppercase">
          थप पढ्नुहोस्
        </span>
      </div>
      <div className="divide-y divide-slate-100">
        {items.map((item) => (
          <Link
            key={item.id}
            to={`/blog/${item.id}`}
            className="flex gap-3 p-4 hover:bg-slate-50 transition-colors cursor-pointer group"
          >
            <div className="relative flex-shrink-0">
              <img
                src={item.img}
                alt={item.title}
                className="w-24 h-[70px] object-cover rounded-lg"
              />
              <div className="absolute bottom-1.5 right-1.5 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
                <Eye size={9} /> {item.views}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={`${item.tagBg} text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide`}
                >
                  {item.tag}
                </span>
                <span className="flex items-center gap-1 text-slate-400 text-xs">
                  <Clock size={10} /> {item.time}
                </span>
              </div>
              <h3 className="lc2 text-sm font-bold text-slate-800 leading-snug group-hover:text-red-600 transition-colors">
                {item.title}
              </h3>
            </div>
            <ChevronRight
              size={15}
              className="text-slate-300 flex-shrink-0 self-center group-hover:text-red-400 transition-colors"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
