import React, { useState } from "react";

// News data with dummy images from picsum.photos
const newsData = [
  {
    title: "Nepal defeats India in thrilling cricket match",
    category: "Sports",
    date: "March 26, 2026",
    images: [
      "https://images.unsplash.com/photo-1601758123927-24e6d4d1c788?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1617107632220-f4476e3b17be?auto=format&fit=crop&w=400&q=80",
    ],
    desc: "CarryMinati shows his gaming skills and strategies in Apex Legends, entertaining thousands of viewers online.",
  },
  {
    title: "Government announces new education policy for 2026",
    category: "Politics",
    date: "March 25, 2026",
    images: [
      "https://images.unsplash.com/photo-1605902711622-cfb43c44360b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1612831455541-5a32f9350568?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1612832020916-fd2a1fc6b7f1?auto=format&fit=crop&w=400&q=80",
    ],
    desc: "Kiran Gaming takes his fans through intense PUBG Mobile battles, showcasing his reflexes and game tactics.",
  },
  {
    title: "Top 10 tech startups to watch in 2026",
    category: "Technology",
    date: "March 24, 2026",
    images: [
      "https://images.unsplash.com/photo-1628305320633-cd1231ec2e6f?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1612831455541-5a32f9350568?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=400&q=80",
    ],
    desc: "Balen shares advanced Fortnite building tricks and gameplay insights for aspiring gamers.",
  },
];

const categories = ["All News", "Sports", "Politics", "Technology", "Health"];

  const filteredBlogs = blogsData.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="bg-white text-gray-900 py-16 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Search Input */}
        <div className="text-center mb-16">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-4 px-4 py-3 rounded-lg text-gray-900 w-full md:w-96 outline-none shadow-md"
          />
        </div>

          <h2 className="text-3xl font-bold mb-8 text-left md:text-center">Latest News</h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-start md:justify-center gap-6 mb-12 border-b border-gray-100 pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
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
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news, index) => (
            <div key={index} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-xl mb-5">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

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
                  <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                </button>
                <p className="text-gray-400 text-xs">{news.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
