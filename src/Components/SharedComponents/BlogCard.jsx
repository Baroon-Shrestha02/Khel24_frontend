import React from "react";
import { motion } from "framer-motion";

// ─── Icons ────────────────────────────────────────────────────────────────────

export const CalendarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
    <rect
      x="1"
      y="3"
      width="14"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M5 1v3M11 1v3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const UserIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const ClockIcon = () => (
  <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M8 4.5V8l2.5 2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Framer variant ───────────────────────────────────────────────────────────

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function BlogCard({
  title,
  category,
  date,
  author,
  readTime,
  heroImage,
  summary,
  accent = "#2563EB",
  tag = "📰",
  index = 0,
  onReadMore,
}) {
  return (
    <>
      <style>{`
        .blog-card-img { transition: transform 0.6s cubic-bezier(0.22,1,0.36,1); }
        .blog-card:hover .blog-card-img { transform: scale(1.07); }
        .read-arrow { display: inline-block; transition: transform 0.3s ease; }
        .blog-card:hover .read-arrow { transform: translateX(5px); }
      `}</style>

      <motion.article
        custom={index}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="blog-card group bg-white rounded-2xl overflow-hidden flex flex-col cursor-pointer"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        style={{
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.05)",
        }}
      >
        {/* ── Image ── */}
        <div className="overflow-hidden h-44 relative">
          <img
            src={heroImage}
            alt={title}
            className="blog-card-img w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/35 to-transparent" />

          {/* Category badge */}
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-white text-[11px] font-semibold shadow-sm tracking-wide"
            style={{ backgroundColor: accent }}
          >
            {tag} {category}
          </span>

          {/* Read time */}
          {readTime && (
            <span className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/50 text-white text-[10px] font-medium backdrop-blur-sm">
              <ClockIcon /> {readTime}
            </span>
          )}
        </div>

        {/* ── Body ── */}
        <div className="p-5 flex flex-col flex-1">
          {/* Date + Author */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-3">
            {date && (
              <span className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                <CalendarIcon />
                {date}
              </span>
            )}
            {date && author && (
              <span className="w-[3px] h-[3px] rounded-full bg-gray-300 inline-block" />
            )}
            {author && (
              <span className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                <UserIcon />
                {author}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className="text-[15px] font-semibold text-gray-900 mb-2"
            style={{ lineHeight: 1.42 }}
          >
            <span
              className="bg-gradient-to-r bg-[length:0%_2px] bg-no-repeat bg-bottom "
              style={{
                backgroundImage: `linear-gradient(${accent}, ${accent})`,
              }}
            >
              {title}
            </span>
          </h3>

          {/* Description */}
          <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 flex-1">
            {summary}
          </p>

          {/* Divider */}
          <div className="mt-4 mb-3 h-px bg-gray-100" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <button
              onClick={onReadMore}
              className="flex items-center gap-1.5 text-[13px] font-semibold"
              style={{ color: accent }}
            >
              Read More <span className="read-arrow">→</span>
            </button>
          </div>
        </div>
      </motion.article>
    </>
  );
}
