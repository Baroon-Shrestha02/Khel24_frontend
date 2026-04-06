import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import FeaturedCard from "./Components/FeaturedCard";
import LatestNews from "./Components/LatestNews";
import SpecialSportsNews from "./Components/NewsCard";
import OthersCard from "./Components/OthersSection";
import SportCategories from "./Components/SportCategories";
import SubBar from "./Components/SubBar";
import Ticker from "./Components/Ticker";
import { fetchFeaturedBlog } from "../../Services/BlogServices";

export default function BlogMain() {
  const [blogs, setBlogs] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getFeatured = async () => {
      try {
        const res = await fetchFeaturedBlog();
        const blog = res.data?.data?.[0];
        setBlogs(blog);
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
        {/* Browse button row */}
        <div className="flex items-center justify-between">
          <div />
          <button
            onClick={() => navigate("/browse")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-[13px] font-medium text-slate-600 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50 transition-all duration-200 shadow-sm"
          >
            <Search size={13} />
            Browse & Filter Articles
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-5">
          <FeaturedCard article={blogs} />
          <LatestNews />
        </div>

        <SpecialSportsNews />
        <OthersCard />
        <SportCategories />
      </div>
    </div>
  );
}
