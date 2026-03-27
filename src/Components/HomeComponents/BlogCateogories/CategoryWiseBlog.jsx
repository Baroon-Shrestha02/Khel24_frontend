import React, { useState } from "react";

// ─── Sub-components ──────────────────────────────────────────────────────────

function CategoryLabel({ name }) {
  return (
    <span className="font-mono text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-400">
      {name}
    </span>
  );
}

function FeaturedTextCol({ featured }) {
  return (
    <a
      href={featured.slug}
      className="hidden md:flex flex-col justify-between h-full no-underline group"
    >
      <div>
        <CategoryLabel name={featured.category} />
        <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] font-bold leading-[1.1] text-gray-900 mt-1.5 mb-0 group-hover:text-gray-500 transition-colors duration-200">
          {featured.title}
        </h2>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed m-0">
        {featured.excerpt}
      </p>
    </a>
  );
}

function FeaturedImage({ featured }) {
  return (
    <div className="flex flex-col">
      {/* Mobile-only header */}
      <div className="md:hidden mb-3">
        <CategoryLabel name={featured.category} />
        <h2 className="font-serif text-[1.75rem] font-bold text-gray-900 mt-1 mb-1.5 leading-tight">
          {featured.title}
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed m-0">
          {featured.excerpt}
        </p>
      </div>

      <a
        href={featured.slug}
        className="block overflow-hidden rounded-sm flex-1"
        style={{ minHeight: "420px" }}
      >
        <img
          src={featured.image}
          alt={featured.title}
          className="w-full h-full object-cover block transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.035]"
          style={{ minHeight: "420px" }}
        />
      </a>
    </div>
  );
}

function SideCard({ post }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={post.slug}
      className="block no-underline"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden rounded-sm mb-3.5">
        <img
          src={post.image}
          alt={post.title}
          className="w-full aspect-video object-cover block transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
        />
      </div>
      <CategoryLabel name={post.category} />
      <h3
        className="font-serif text-[1.35rem] font-bold mt-1 mb-2 leading-tight transition-colors duration-200"
        style={{ color: hovered ? "#555" : "#111" }}
      >
        {post.title}
      </h3>
      <p className="text-[0.85rem] text-gray-400 leading-relaxed m-0">
        {post.excerpt}
      </p>
    </a>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
//
// Props:
//   featured  — { category, title, excerpt, image, slug }
//   sidePosts — [{ id, category, title, excerpt, image, slug }, ...]  (from API)
//
export default function CategoryWiseBlog({ featured, sidePosts = [] }) {
  if (!featured) return null;

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr_1fr] gap-8 md:gap-10 items-start md:items-stretch">
        {/* Col 1 — featured text (desktop only) */}
        <FeaturedTextCol featured={featured} />

        {/* Col 2 — tall hero image + mobile header */}
        <FeaturedImage featured={featured} />

        {/* Col 3 — side cards from API */}
        <div className="flex flex-col gap-8">
          {sidePosts.map((post) => (
            <SideCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
