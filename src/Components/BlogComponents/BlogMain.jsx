import { useEffect, useState } from "react";
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
        <div className="grid gird-cols-1 md:grid-cols-[1fr_300px] gap-5">
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
