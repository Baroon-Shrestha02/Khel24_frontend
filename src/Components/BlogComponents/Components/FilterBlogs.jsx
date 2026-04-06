import { useState, useEffect, useRef } from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

const CATEGORIES = ["All Blogs", "Football", "Cricket", "Others"];
const SORT_OPTIONS = ["Most Recent", "Oldest First"];

export default function FilterBlogs({
  onSearch,
  onCategoryChange,
  onSortChange,
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Blogs");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    const timeout = setTimeout(() => onSearch?.(search), 300);
    return () => clearTimeout(timeout);
  }, [search, onSearch]);

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    onCategoryChange?.(cat);
  };

  const handleSort = (opt) => {
    setSelectedSort(opt);
    setDropdownOpen(false);
    onSortChange?.(opt);
  };

  return (
    <aside className="w-full flex flex-col gap-7">
      {/* Search */}
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-slate-500">Search</label>
        <div className="relative flex items-center">
          <Search
            size={14}
            className="absolute left-3.5 text-slate-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search article..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-9 pr-4 border border-slate-200 rounded-full text-[13.5px] text-slate-700 placeholder:text-slate-400 bg-white outline-none focus:border-violet-500 transition-colors"
          />
        </div>
      </div>

      {/* Sort dropdown */}
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-slate-500">
          Sort By
        </label>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((p) => !p)}
            className="w-full h-11 px-4 flex items-center gap-2.5 border border-slate-200 rounded-full text-[13.5px] bg-white cursor-pointer hover:border-slate-300 transition-colors"
          >
            <SlidersHorizontal size={14} className="text-slate-500 shrink-0" />
            <span
              className={`flex-1 text-left ${selectedSort ? "text-slate-700" : "text-slate-400"}`}
            >
              {selectedSort || "Sort articles..."}
            </span>
            <ChevronDown
              size={14}
              className={`text-slate-500 shrink-0 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <ul className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-lg z-50 p-1 list-none">
              {SORT_OPTIONS.map((opt) => (
                <li
                  key={opt}
                  onClick={() => handleSort(opt)}
                  className={`px-3.5 py-2.5 rounded-xl text-[13.5px] cursor-pointer transition-colors
                    ${
                      selectedSort === opt
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
