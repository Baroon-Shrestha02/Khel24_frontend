import React, { useState } from "react";

const NewsSection = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All News");
// News data with dummy images
const newsData = [
  {
    title: "Nepal defeats India in thrilling cricket match",
    category: "Sports",
    date: "March 26, 2026",
    images: [
      "https://picsum.photos/seed/sports1/600/400",
      "https://picsum.photos/seed/sports2/600/400",
      "https://picsum.photos/seed/sports3/600/400",
    ],
    desc: "Nepal won the cricket match against India in a nail-biting finish that left fans ecstatic.",
  },
  {
    title: "Government announces new education policy for 2026",
    category: "Politics",
    date: "March 25, 2026",
    images: [
      "https://picsum.photos/seed/politics1/600/400",
      "https://picsum.photos/seed/politics2/600/400",
      "https://picsum.photos/seed/politics3/600/400",
    ],
    desc: "The new policy focuses on digital learning, updated curriculum, and improving access to education in rural areas.",
  },
  {
    title: "Top 10 tech startups to watch in 2026",
    category: "Technology",
    date: "March 24, 2026",
    images: [
      "https://picsum.photos/seed/tech1/600/400",
      "https://picsum.photos/seed/tech2/600/400",
      "https://picsum.photos/seed/tech3/600/400",
    ],
    desc: "These startups are innovating in AI, blockchain, and green technology, promising major industry disruption.",
  },
];

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
export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All News");

  // Filter by category first
  const categoryFiltered =
    activeCategory === "All News"
      ? newsData
      : newsData.filter((news) => news.category === activeCategory);

  // Filter by search
  const filteredNews = categoryFiltered.filter((news) =>
    news.title.toLowerCase().includes(search.toLowerCase())
  );

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
        <h2 className="text-3xl font-bold mb-8 text-left md:text-center">
          Latest News
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-start md:justify-center gap-6 mb-12 border-b border-gray-100 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-semibold ${
                activeCategory === cat
                  ? "text-blue-500 underline"
              className={`text-sm font-semibold transition-colors ${
                activeCategory === cat
                  ? "text-blue-500 underline underline-offset-8 decoration-2"
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
              {/* Image Container (show first image from images array) */}
              <div className="relative overflow-hidden rounded-xl mb-5">
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
              {/* Text Content */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold leading-tight group-hover:text-blue-500 transition-colors">
                  {news.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {news.desc}
                </p>
                <button className="text-blue-500 font-bold text-sm flex items-center gap-1 group/btn">
                  Read Full News
                  <span className="transition-transform group-hover/btn:translate-x-1">
                    →
                  </span>
                </button>
                <p className="text-gray-400 text-xs">{news.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
}
