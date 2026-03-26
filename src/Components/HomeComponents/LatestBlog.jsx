// src/components/LatestNews.jsx
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

const sampleNews = [
  {
    title: "Latest Technology Trends",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione enim libero eveniet corrupti alias error, dignissimos dolores possimus recusandae dolorum adipisci praesentium blanditiis quas labore ullam porro repellendus totam quasi eaque itaque obcaecati iure dicta pariatur minus. Reiciendis, earum dolorem.",
    tag: "Tech",
    date: "24 March",
    author: "Admin",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Smart Cities Development",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione enim libero eveniet corrupti alias error, dignissimos dolores possimus recusandae dolorum adipisci praesentium blanditiis quas labore ullam porro repellendus totam quasi eaque itaque obcaecati iure dicta pariatur minus. Reiciendis, earum dolorem.",
    tag: "Cities",
    date: "24 March",
    author: "Admin",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Global Sports Updates",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione enim libero eveniet corrupti alias error, dignissimos dolores possimus recusandae dolorum adipisci praesentium blanditiis quas labore ullam porro repellendus totam quasi eaque itaque obcaecati iure dicta pariatur minus. Reiciendis, earum dolorem.",
    tag: "Sports",
    date: "24 March",
    author: "Admin",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Football World Cup Qualifiers",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione enim libero eveniet corrupti alias error, dignissimos dolores possimus recusandae dolorum adipisci praesentium blanditiis quas labore ullam porro repellendus totam quasi eaque itaque obcaecati iure dicta pariatur minus. Reiciendis, earum dolorem.",
    tag: "Football",
    date: "24 March",
    author: "Admin",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Cricket Season Highlights",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione enim libero eveniet corrupti alias error, dignissimos dolores possimus recusandae dolorum adipisci praesentium blanditiis quas labore ullam porro repellendus totam quasi eaque itaque obcaecati iure dicta pariatur minus. Reiciendis, earum dolorem.",
    tag: "Cricket",
    date: "24 March",
    author: "Admin",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=600&q=80",
  },
];

// Tag color map
const tagColors = {
  Tech: "bg-blue-100 text-blue-700",
  Cities: "bg-emerald-100 text-emerald-700",
  Sports: "bg-orange-100 text-orange-700",
  Football: "bg-red-100 text-red-700",
  Cricket: "bg-yellow-100 text-yellow-700",
};

function NewsCard({
  title,
  description,
  url,
  image,
  author,
  date,
  tag,
  index,
}) {
  const ref = useRef(null);
  // Only trigger once when card enters viewport
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <a
        href={url}
        className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        {/* Image */}
        <div className="relative overflow-hidden h-52">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Tag badge */}
          <span
            className={`absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
              tagColors[tag] || "bg-gray-100 text-gray-600"
            }`}
          >
            {tag}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-2.5">
          <h2 className="text-[1.05rem] font-extrabold text-gray-900 leading-snug group-hover:text-[#00569e] transition-colors duration-200 line-clamp-2">
            {title}
          </h2>

          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
            {description}
          </p>

          {/* Footer meta */}
          <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              {/* Calendar icon */}
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{date}, 2026</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              {/* Person icon */}
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A8.966 8.966 0 0112 15c2.21 0 4.232.797 5.879 2.104M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{author}</span>
            </div>

            {/* Read more arrow */}
            <span className="flex items-center gap-1 text-xs font-semibold text-[#00569e] group-hover:gap-2 transition-all duration-200">
              Read
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function LatestBlog() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <section id="news" className="container mx-auto px-4 py-10">
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="w-1 h-8 bg-[#00569e] rounded-full" />
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Latest News
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleNews.map((item, index) => (
          <NewsCard
            key={index}
            index={index}
            title={item.title}
            description={item.description}
            url={item.url}
            image={item.image}
            author={item.author}
            date={item.date}
            tag={item.tag}
          />
        ))}
      </div>
    </section>
  );
}
