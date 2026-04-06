import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  HelpCircle,
} from "lucide-react";

const CATEGORIES = [
  "All Category",
  "UI/UX Design",
  "Machine Learning",
  "Marketing",
  "Gaming",
  "Design",
  "Janitor",
  "Another One",
  "Thing",
  "Human Resources",
];

const FILTER_OPTIONS = ["Most Recent", "Most Popular", "Oldest First", "A–Z"];

export default function FilterBlogs({
  onSearch,
  onCategoryChange,
  onFilterChange,
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Category");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearch?.(e.target.value);
  };

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    onCategoryChange?.(cat);
  };

  const handleFilter = (opt) => {
    setSelectedFilter(opt);
    setFilterOpen(false);
    onFilterChange?.(opt);
  };

  return (
    <aside className="w-full flex flex-col gap-7">
      {/* Search */}
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-slate-500">Label</label>
        <div className="relative flex items-center">
          <Search
            size={14}
            className="absolute left-3.5 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search article..."
            value={search}
            onChange={handleSearch}
            className="w-full h-11 pl-9 pr-9 border border-slate-200 rounded-full text-[13.5px] text-slate-700 placeholder:text-slate-400 bg-white outline-none focus:border-violet-500 transition-colors"
          />
          <HelpCircle
            size={14}
            className="absolute right-3.5 text-slate-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Filter dropdown */}
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-slate-500">Filter</label>
        <div className="relative">
          <button
            onClick={() => setFilterOpen((p) => !p)}
            className="w-full h-11 px-4 flex items-center gap-2.5 border border-slate-200 rounded-full text-[13.5px] bg-white cursor-pointer hover:border-slate-300 transition-colors"
          >
            <SlidersHorizontal size={14} className="text-slate-500 shrink-0" />
            <span className="flex-1 text-left text-slate-400">
              {selectedFilter || "Filter article..."}
            </span>
            <ChevronDown
              size={14}
              className={`text-slate-500 shrink-0 transition-transform duration-200 ${filterOpen ? "rotate-180" : ""}`}
            />
          </button>

          {filterOpen && (
            <ul className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-lg z-50 p-1 list-none">
              {FILTER_OPTIONS.map((opt) => (
                <li
                  key={opt}
                  onClick={() => handleFilter(opt)}
                  className={`px-3.5 py-2.5 rounded-xl text-[13.5px] cursor-pointer transition-colors
                    ${
                      selectedFilter === opt
                        ? "bg-violet-50 text-violet-700 font-medium"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                >
                  {opt}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-3">
        <p className="text-[13px] font-semibold text-violet-700">
          Browse By Categories
        </p>
        <ul className="border-l-2 border-slate-200 list-none p-0 m-0 flex flex-col">
          {CATEGORIES.map((cat) => (
            <li
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`-ml-[2px] pl-3.5 py-2 text-[14px] cursor-pointer transition-colors border-l-2
                ${
                  activeCategory === cat
                    ? "border-violet-600 text-slate-800 font-semibold"
                    : "border-transparent text-slate-600 hover:text-violet-600 font-normal"
                }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
