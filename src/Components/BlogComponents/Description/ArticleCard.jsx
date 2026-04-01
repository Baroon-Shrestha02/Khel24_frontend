import { createElement } from "react";
import {
  Clock,
  ThumbsUp,
  MessageCircle,
  Bookmark,
  Archive,
  Sparkles,
  Info,
} from "lucide-react";
import { socialBtns } from "./constants";
import SocialBtn from "./SocialBtn";

export default function ArticleCard({
  article,
  liked,
  saved,
  onToggleLike,
  onToggleSave,
}) {
  if (!article) return null;

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-red-700 flex items-center justify-center text-white font-black text-sm shrink-0">
            {article.authorInitials}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 leading-none">
              {article.author}
            </p>
            <p className="flex items-center gap-1 text-slate-400 text-xs mt-1">
              <Clock size={10} /> {article.time}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 border border-slate-200 rounded-lg px-2.5 py-1.5 hover:bg-slate-50 transition-colors"
          >
            <Archive size={12} /> संग्रह
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs text-slate-500 border border-slate-200 rounded-lg px-2.5 py-1.5 hover:bg-slate-50 transition-colors"
          >
            <MessageCircle size={12} />
          </button>

          <div className="w-px h-8 bg-slate-200" />

          <div className="text-center leading-none">
            <p className="text-xl font-black text-slate-800">
              {typeof article.shares === "number"
                ? article.shares.toLocaleString("ne-NP")
                : article.shares}
            </p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Shares</p>
          </div>

          {socialBtns.map((b) => (
            <SocialBtn key={b.label} {...b} />
          ))}
        </div>
      </div>

      <img
        src={article.img}
        alt={article.title}
        className="w-full object-cover block max-h-[480px]"
      />

      <div className="px-5 pt-5 pb-6">
        <h1 className="text-[22px] font-extrabold text-slate-900 leading-snug mb-4">
          {article.title}
        </h1>

        {article.summary.length > 0 && (
          <div className="border border-red-200 rounded-xl overflow-hidden mb-5">
            <div className="flex items-center justify-between bg-red-700 px-4 py-2.5">
              <span className="flex items-center gap-2 text-white font-bold text-sm">
                <Sparkles size={13} /> सारांश
              </span>
              <Info size={13} className="text-white/50" />
            </div>
            <ul className="bg-white px-4 py-3 flex flex-col gap-2.5">
              {article.summary.map((pt, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-600 shrink-0 mt-1.5" />
                  <p className="text-sm text-slate-700 leading-relaxed">{pt}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {article.body.map((block, i) =>
          block.type === "html" ? (
            <div
              key={i}
              className="article-html-body text-[15px] text-slate-800 mb-4"
              dangerouslySetInnerHTML={{ __html: block.html }}
            />
          ) : (
            <p
              key={i}
              className="text-[15px] text-slate-800 leading-[2.1] mb-4"
            >
              {block.text}
            </p>
          ),
        )}

        {article.quote ? (
          <blockquote className="border-l-4 border-red-600 bg-red-50 rounded-r-xl px-5 py-4 my-5 italic text-slate-600 text-sm leading-relaxed">
            {article.quote}
          </blockquote>
        ) : null}

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 flex-wrap gap-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onToggleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${liked ? "bg-red-50 text-red-600 border-red-200" : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-red-50 hover:text-red-500 hover:border-red-200"}`}
            >
              <ThumbsUp size={12} /> {liked ? "Liked" : "Like"}
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border bg-slate-50 text-slate-500 border-slate-200 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200 transition-all"
            >
              <MessageCircle size={12} /> Comment
            </button>
            <button
              type="button"
              onClick={onToggleSave}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${saved ? "bg-amber-50 text-amber-600 border-amber-200" : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-amber-50 hover:text-amber-500 hover:border-amber-200"}`}
            >
              <Bookmark size={12} /> {saved ? "Saved" : "Save"}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Share:</span>
            {socialBtns.map(({ icon, cls, label }) => (
              <button
                key={label}
                type="button"
                title={label}
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-white transition-all hover:scale-105 ${cls}`}
              >
                {createElement(icon, { size: 12 })}
              </button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
