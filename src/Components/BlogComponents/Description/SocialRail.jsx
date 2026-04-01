import { ThumbsUp, Bookmark } from "lucide-react";
import { socialBtns } from "./constants";
import SocialBtn from "./SocialBtn";

export default function SocialRail({ liked, saved, onToggleLike, onToggleSave }) {
  return (
    <aside className="hidden lg:flex flex-col items-center gap-2 w-10 flex-shrink-0 sticky top-4 self-start">
      {socialBtns.map((b) => (
        <SocialBtn key={b.label} {...b} />
      ))}

      <div className="w-7 border-t border-slate-300 my-0.5" />

      <button
        type="button"
        onClick={onToggleLike}
        className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-150 hover:scale-105 ${liked ? "bg-red-50 border-red-300 text-red-500" : "bg-white border-slate-200 text-slate-400 hover:text-red-400 hover:border-red-200"}`}
      >
        <ThumbsUp size={15} />
      </button>
      <button
        type="button"
        onClick={onToggleSave}
        className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-150 hover:scale-105 ${saved ? "bg-amber-50 border-amber-300 text-amber-500" : "bg-white border-slate-200 text-slate-400 hover:text-amber-400 hover:border-amber-200"}`}
      >
        <Bookmark size={15} />
      </button>
    </aside>
  );
}
