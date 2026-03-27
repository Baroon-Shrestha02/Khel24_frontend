import React, { useState } from "react";

const NewsSection = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All News");

  const newsData = [
    {
      title: "Nepal defeats India in thrilling cricket match",
      category: "Sports",
      date: "March 26, 2026",
      images: ["https://images.unsplash.com/photo-1601758123927-24e6d4d1c788"],
      desc: "Exciting match between Nepal and India.",
    },
    {
      title: "Government announces new education policy for 2026",
      category: "Politics",
      date: "March 25, 2026",
      images: ["https://images.unsplash.com/photo-1605902711622-cfb43c44360b"],
      desc: "New education reforms introduced.",
    },
  ];

  const categories = ["All News", "Sports", "Politics", "Technology", "Health"];

  // ✅ Filter logic
  const filteredNews = newsData.filter((news) => {
    const matchesSearch = news.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All News" || news.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="bg-white text-gray-900 py-16 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Search */}
        <div className="text-center mb-16">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-4 px-4 py-3 rounded-lg w-full md:w-96 shadow-md"
          />
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center">Latest News</h2>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 border-b pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-semibold ${
                activeCategory === cat
                  ? "text-blue-500 underline"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Image */}
              <div className="overflow-hidden rounded-xl mb-5">
                <img
                  src={news.images[0]}
                  alt={news.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition"
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold group-hover:text-blue-500">
                {news.title}
              </h3>

              <p className="text-gray-500 text-sm line-clamp-3">{news.desc}</p>

              <p className="text-gray-400 text-xs mt-2">{news.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
