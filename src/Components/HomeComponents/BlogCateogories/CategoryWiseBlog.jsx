import React, { useState } from "react";
import { Link } from "react-router-dom";

function resolvePath(item) {
  if (!item) return null;
  const p = item.to ?? item.href ?? item.slug;
  if (!p || p === "#") return null;
  return p;
}

function OptionalLink({ to, className, children, ...rest }) {
  if (to) {
    return (
      <Link to={to} className={className} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}

function CategoryLabel({ name }) {
  return (
    <span className="font-mono text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-400">
      {name}
    </span>
  );
}

function FeaturedTextCol({ featured }) {
  const to = resolvePath(featured);
  return (
    <OptionalLink
      to={to}
      className="hidden md:flex flex-col justify-between h-full no-underline group text-inherit"
    >
      <div>
        <CategoryLabel name={featured.category} />
        <h2 className="font-serif text-[clamp(2rem,3vw,2.75rem)] font-bold leading-[1.1] text-gray-900 mt-1.5 mb-0">
          {featured.title}
        </h2>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed m-0">
        {featured.excerpt}
      </p>
    </OptionalLink>
  );
}

function FeaturedImage({ featured }) {
  const to = resolvePath(featured);
  return (
    <div className="flex flex-col">
      {/* Mobile-only header */}
      <OptionalLink
        to={to}
        className="md:hidden mb-3 block no-underline text-inherit"
      >
        <CategoryLabel name={featured.category} />
        <h2 className="font-serif text-[1.75rem] font-bold text-gray-900 mt-1 mb-1.5 leading-tight">
          {featured.title}
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed m-0">
          {featured.excerpt}
        </p>
      </OptionalLink>

      <OptionalLink
        to={to}
        className="block overflow-hidden rounded-sm flex-1 h-64 sm:h-80 md:h-[420px]"
      >
        <img
          src={featured.image}
          alt={featured.title}
          className="w-full h-full object-cover block transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.035]"
        />
      </OptionalLink>
    </div>
  );
}

function SideCard({ post }) {
  const [hovered, setHovered] = useState(false);
  const to = resolvePath(post);

  return (
    <OptionalLink
      to={to}
      className="block no-underline text-inherit cursor-pointer"
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
    </OptionalLink>
  );
}

export default function CategoryWiseBlog({ featured, sidePosts = [] }) {
  if (!featured) return null;

  return (
    <section className="w-full max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-10 md:py-12 min-w-0">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr_1fr] gap-6 sm:gap-8 md:gap-10 items-start md:items-stretch min-w-0">
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
