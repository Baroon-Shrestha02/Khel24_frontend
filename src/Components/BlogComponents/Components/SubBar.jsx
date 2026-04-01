import { TrendingUp } from "lucide-react";

const TRENDING = [
  "#क्रिकेट",
  "#एसियाकप",
  "#Nepal",
  "#Football",
  "#ANFA",
  "#SAG",
  "#भलिबल",
];

const SPORT_CATS = [
  { emoji: "🏏", name: "क्रिकेट", count: "२४५+" },
  { emoji: "⚽", name: "फुटबल", count: "१८३+" },
  { emoji: "🏐", name: "भलिबल", count: "९७+" },
  { emoji: "🌏", name: "अन्तर्राष्ट्रिय", count: "३१२+" },
];

export default function SubBar({
  trending = TRENDING,
  sportCats = SPORT_CATS,
}) {
  return (
    <div className="bg-white border-b border-slate-100 shadow-sm">
      <div className="container mx-auto px-4 py-2 flex items-center gap-6 flex-wrap">
        {/* Trending label */}
        <div className="flex items-center gap-2 shrink-0">
          <TrendingUp size={14} className="text-red-600" />
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            ट्रेन्डिङ
          </span>
        </div>

        {/* Trending tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {trending.map((t) => (
            <span
              key={t}
              className="bg-red-50 text-red-600 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-red-100 cursor-pointer hover:bg-red-100 transition-colors whitespace-nowrap"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-slate-200 shrink-0 hidden sm:block" />

        {/* Sport category pills */}
        <div className="flex items-center gap-1 flex-wrap">
          {sportCats.map((cat, i) => (
            <button
              key={i}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors whitespace-nowrap"
            >
              <span className="text-sm">{cat.emoji}</span>
              {cat.name}
              <span className="text-[10px] text-slate-400 font-normal">
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
