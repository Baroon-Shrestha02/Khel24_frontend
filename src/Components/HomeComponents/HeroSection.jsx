// src/components/HeroSection.jsx
import React from "react";

export default function HeroSection() {
  return (
    <section
      className="relative w-full flex items-center justify-center overflow-hidden "
      style={{ minHeight: "80vh" }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('home/img1.jpg')" }}
      />

      {/* Left-to-transparent gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(10, 15, 60, 0.92) 0%, rgba(10, 15, 60, 0.75) 25%, rgba(10, 15, 60, 0.30) 45%, transparent 55%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 rounded-3xl">
        {/* Text Block */}
        <div className="max-w-xl text-white">
          {/* Eyebrow label */}
          <span
            className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{
              background: "rgba(99, 102, 241, 0.30)",
              border: "1px solid rgba(165, 180, 252, 0.40)",
              color: "#a5b4fc",
              letterSpacing: "0.18em",
            }}
          >
            Sports · Tech · Entertainment
          </span>

          <h1
            className="font-black mb-5 leading-tight"
            style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              color: "#ffffff",
              textShadow: "0 4px 32px rgba(0,0,0,0.35)",
            }}
          >
            <span
              style={{
                background: "linear-gradient(90deg, #818cf8, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              KhelKhabar
            </span>
          </h1>

          <p
            className="mb-8 leading-relaxed"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "rgba(226, 232, 240, 0.88)",
            }}
          >
            Your daily dose of the latest sports, and entertainment news —
            curated, compelling, and always current.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#news"
              className="inline-block px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 bg-[#ec1f33]"
            >
              Explore News
            </a>
            <a
              href="#trending"
              className="inline-block px-8 py-3 rounded-lg font-semibold transition-all duration-200 border border-white"
            >
              Trending
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
