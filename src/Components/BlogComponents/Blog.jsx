import React, { useState } from "react";

// Sample data - Nepali Gamers with 3 dummy images each
const blogsData = [
  {
    title: "CarryMinati Plays Apex Legends",
    category: "Gaming",
    date: "March 26, 2026",
    images: [
      "https://images.unsplash.com/photo-1601758123927-24e6d4d1c788?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1617107632220-f4476e3b17be?auto=format&fit=crop&w=400&q=80",
    ],
    desc: "CarryMinati shows his gaming skills and strategies in Apex Legends, entertaining thousands of viewers online.",
  },
  {
    title: "Kiran Gaming Streams PUBG Mobile",
    category: "Mobile Gaming",
    date: "March 25, 2026",
    images: [
      "https://images.unsplash.com/photo-1605902711622-cfb43c44360b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1612831455541-5a32f9350568?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1612832020916-fd2a1fc6b7f1?auto=format&fit=crop&w=400&q=80",
    ],
    desc: "Kiran Gaming takes his fans through intense PUBG Mobile battles, showcasing his reflexes and game tactics.",
  },
  {
    title: "Balen Streams Fortnite Tricks",
    category: "Gaming Tips",
    date: "March 24, 2026",
    images: [
      "https://images.unsplash.com/photo-1628305320633-cd1231ec2e6f?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1612831455541-5a32f9350568?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=400&q=80",
    ],
    desc: "Balen shares advanced Fortnite building tricks and gameplay insights for aspiring gamers.",
  },
];

export default function Blog() {
  const [search, setSearch] = useState("");

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

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredBlogs.map((blog, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-3xl shadow-xl group transition-transform transform hover:-translate-y-3 hover:scale-105 duration-500 bg-gray-50"
            >
              {/* Multiple Images */}
              <div className="grid grid-cols-3 gap-2 p-3">
                {blog.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${blog.title} - ${i + 1}`}
                    className="w-full h-32 object-cover rounded-2xl transition duration-500 group-hover:brightness-95"
                  />
                ))}
              </div>

              {/* Category Tag */}
              <span className="absolute top-4 left-[-10px] rotate-[-12deg] bg-red-600 px-3 py-1 text-xs font-bold text-white z-10">
                {blog.category}
              </span>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl"></div>

              {/* Content */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{blog.date}</span>
                  <button className="px-4 py-2 text-sm bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition">
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
