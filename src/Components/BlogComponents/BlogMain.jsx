import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FeaturedCard from "./Components/FeaturedCard";
import LatestNews from "./Components/LatestNews";
import SpecialSportsNews from "./Components/NewsCard";
import OthersCard from "./Components/OthersSection";
import SportCategories from "./Components/SportCategories";
import SubBar from "./Components/SubBar";
import Ticker from "./Components/Ticker";
import FilterBlogs from "./Components/FilterBlogs";
import { fetchFeaturedBlog } from "../../Services/BlogServices";

export default function BlogMain() {
  const [featuredBlog, setFeaturedBlog] = useState();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Blogs");
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getFeatured = async () => {
      try {
        const res = await fetchFeaturedBlog();
        const blog = res.data?.data?.[0];
        setFeaturedBlog(blog);
      } catch (error) {
        console.error(error);
      }
    };
    getFeatured();
  }, []);

  return (
    <div className="font-[Mukta,sans-serif] bg-slate-100 min-h-screen">
      <SubBar />

      <div className="container mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Featured + Latest News row */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-5">
          <FeaturedCard article={featuredBlog} />
          <LatestNews />
        </div>

        {/* ── Filter sidebar + SpecialSportsNews grid side by side ── */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Browse Articles
            </h2>
            <p className="text-slate-500 text-sm mt-0.5">
              Search, filter, and explore all articles.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left sidebar — sticky on desktop */}
            <div className="w-full md:w-[260px] md:sticky md:top-6 shrink-0 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <FilterBlogs
                onSearch={setSearch}
                onCategoryChange={setCategory}
                onFilterChange={setFilter}
              />
            </div>

            {/* Right: filtered blog grid */}
            <div className="flex-1 min-w-0">
              <SpecialSportsNews
                search={search}
                category={category}
                filter={filter}
              />
            </div>
          </div>
        </div>

        <OthersCard />
        <SportCategories />
      </div>
    </div>
  );
}
