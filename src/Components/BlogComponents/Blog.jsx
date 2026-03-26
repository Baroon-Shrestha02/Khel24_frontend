import React, { useState } from "react";

// News data with dummy images from picsum.photos
const newsData = [
  {
    title: "Nepal defeats India in thrilling cricket match",
    category: "Sports",
    date: "March 26, 2026",
    image: "https://picsum.photos/seed/sports1/600/400",
    desc: "In an unexpected turn, Nepal won the cricket match against India in a nail-biting finish that left fans ecstatic.",
  },
  {
    title: "Government announces new education policy for 2026",
    category: "Politics",
    date: "March 25, 2026",
    image: "https://picsum.photos/seed/politics1/600/400",
    desc: "The new policy focuses on digital learning, updated curriculum, and improving access to education in rural areas.",
  },
  {
    title: "Top 10 tech startups to watch in 2026",
    category: "Technology",
    date: "March 24, 2026",
    image: "https://picsum.photos/seed/tech1/600/400",
    desc: "These startups are innovating in AI, blockchain, and green technology, promising major industry disruption.",
  },
  {
    title: "Health ministry issues alert on seasonal flu",
    category: "Health",
    date: "March 23, 2026",
    image: "https://picsum.photos/seed/health1/600/400",
    desc: "Citizens are advised to take precautions and get vaccinated as flu cases rise across the country.",
  },
  {
    title: "Football league finals scheduled for April",
    category: "Sports",
    date: "March 22, 2026",
    image: "https://picsum.photos/seed/sports2/600/400",
    desc: "The national football league will hold its finals in April, promising an exciting showdown between top teams.",
  },
];

const categories = ["All News", "Sports", "Politics", "Technology", "Health"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All News");
  const [email, setEmail] = useState("");

  const filteredNews =
    activeCategory === "All News"
      ? newsData
      : newsData.filter((news) => news.category === activeCategory);

  return (
    <section className="bg-white text-gray-900 py-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">KhelKhabar News Portal</h1>
          <p className="text-gray-500 mb-8">
            Subscribe to get the latest news updates and trending stories across sports, politics, and technology
          </p>

          {/* Subscription Input */}
          <div className="relative max-w-lg mx-auto mb-20">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full pl-6 pr-32 py-4 bg-white border border-gray-200 rounded-full shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="absolute right-2 top-2 bottom-2 px-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition-all">
              Subscribe
            </button>
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