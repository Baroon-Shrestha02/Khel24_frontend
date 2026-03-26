import React from "react";

export default function FeaturedBlog() {
  const featured = {
    title: "Epic Football Clash Ends in Last-Minute Goal",
    category: "Football",
    date: "March 26, 2026",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80",
    desc: "A dramatic finish shocked fans as the underdogs secured victory in the final seconds of the match.",
  };

  const sideBlogs = [
    {
      title: "Cricket World Cup Highlights",
      image: "https://images.unsplash.com/photo-1593766827228-8737b4534aa6?auto=format&fit=crop&w=400&q=80",
      date: "March 25, 2026",
    },
    {
      title: "NBA Playoffs Heat Up",
      image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=400&q=80",
      date: "March 24, 2026",
    },
    {
      title: "Tennis Grand Slam Victory",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80",
      date: "March 23, 2026",
    },
  ];

  return (
    <section className="bg-white text-gray-900 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Featured News</h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Featured */}
          <div className="lg:col-span-2 relative rounded-3xl overflow-hidden group shadow-lg bg-gray-50">
            <img
              src={featured.image}
              alt=""
              className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500 rounded-t-3xl"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 rounded-t-3xl"></div>

            <div className="absolute bottom-6 left-6 max-w-lg">
              <span className="text-gray-600 text-sm font-semibold">
                {featured.category}
              </span>

              <h3 className="text-2xl font-bold mt-2 text-gray-900">{featured.title}</h3>

              <p className="text-gray-700 mt-2 text-sm">{featured.desc}</p>

              <span className="text-xs text-gray-500 block mt-3">{featured.date}</span>
            </div>
          </div>

          {/* Side News */}
          <div className="flex flex-col gap-6">
            {sideBlogs.map((blog, index) => (
              <div
                key={index}
                className="flex gap-4 bg-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={blog.image}
                  alt=""
                  className="w-28 h-24 object-cover"
                />

                <div className="p-3">
                  <h4 className="text-sm font-semibold text-gray-900">{blog.title}</h4>
                  <span className="text-xs text-gray-500">{blog.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}