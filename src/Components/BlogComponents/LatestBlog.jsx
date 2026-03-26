import React from "react";

export default function LatestBlog() {
  const latestBlogs = [
    {
      title: "Messi Scores Stunning Goal",
      category: "Football",
      date: "March 26, 2026",
      image:
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80",
      desc: "Lionel Messi dazzled fans with a breathtaking goal in the final minutes.",
    },
    {
      title: "Virat Kohli Century Leads Team",
      category: "Cricket",
      date: "March 25, 2026",
      image:
        "https://images.unsplash.com/photo-1593766827228-8737b4534aa6?auto=format&fit=crop&w=800&q=80",
      desc: "Kohli’s brilliant century helped India secure a commanding win.",
    },
    {
      title: "Lakers Dominate NBA Finals",
      category: "Basketball",
      date: "March 24, 2026",
      image:
        "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=800&q=80",
      desc: "The Lakers showcased incredible teamwork and strategy in the playoffs.",
    },
  ];

  return (
    <section className="bg-white text-gray-900 py-16 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-2 tracking-wide">
            Latest News & Updates
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Catch the hottest sports updates, trending stories, and match
            highlights from around the world.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {latestBlogs.map((blog, index) => (
            <div
              key={index}
              className="relative group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 bg-gray-50"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-72 sm:h-64 md:h-72 object-cover rounded-t-3xl transform group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-t-3xl"></div>

              {/* Content */}
              <div className="p-6">
                <span className="inline-block px-3 py-1 mb-3 rounded-full text-sm bg-blue-600 text-white font-semibold">
                  {blog.category}
                </span>

                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-800 transition duration-300">
                  {blog.title}
                </h3>

                <p className="text-gray-700 mb-4 text-sm line-clamp-3">
                  {blog.desc}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{blog.date}</span>
                  <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
