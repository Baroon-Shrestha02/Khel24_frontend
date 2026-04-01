import React, { useRef, useState } from "react";

const categories = [
  {
    id: 1,
    nepali: "राजनीति",
    english: "Politics",
    description: "सरकार, नीति र नेतृत्वका कथाहरू",
    count: "१२४+ लेख",
    accentText: "text-red-600",
    accentBorder: "border-red-600",
    accentBg: "bg-red-50",
    accentIconBg: "bg-red-100",
    accentBar: "bg-red-600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
        />
      </svg>
    ),
  },
  {
    id: 2,
    nepali: "समाज",
    english: "Society",
    description: "मानव जीवन र सामाजिक परिवर्तनका आवाज",
    count: "८९+ लेख",
    accentText: "text-blue-700",
    accentBorder: "border-blue-700",
    accentBg: "bg-blue-50",
    accentIconBg: "bg-blue-100",
    accentBar: "bg-blue-700",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    nepali: "अर्थतन्त्र",
    english: "Economy",
    description: "बजार, व्यापार र आर्थिक विश्लेषण",
    count: "६७+ लेख",
    accentText: "text-emerald-700",
    accentBorder: "border-emerald-700",
    accentBg: "bg-emerald-50",
    accentIconBg: "bg-emerald-100",
    accentBar: "bg-emerald-700",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
        />
      </svg>
    ),
  },
  {
    id: 4,
    nepali: "स्वास्थ्य",
    english: "Health",
    description: "स्वस्थ जीवनशैली र चिकित्सा विज्ञान",
    count: "५३+ लेख",
    accentText: "text-purple-700",
    accentBorder: "border-purple-700",
    accentBg: "bg-purple-50",
    accentIconBg: "bg-purple-100",
    accentBar: "bg-purple-700",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    ),
  },
  {
    id: 5,
    nepali: "खेलकुद",
    english: "Sports",
    description: "राष्ट्रिय र अन्तर्राष्ट्रिय खेल समाचार",
    count: "१०१+ लेख",
    accentText: "text-orange-600",
    accentBorder: "border-orange-600",
    accentBg: "bg-orange-50",
    accentIconBg: "bg-orange-100",
    accentBar: "bg-orange-600",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
        />
      </svg>
    ),
  },
  {
    id: 6,
    nepali: "प्रविधि",
    english: "Technology",
    description: "डिजिटल युगका नवीनतम खोज र आविष्कार",
    count: "४५+ लेख",
    accentText: "text-teal-700",
    accentBorder: "border-teal-700",
    accentBg: "bg-teal-50",
    accentIconBg: "bg-teal-100",
    accentBar: "bg-teal-700",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3"
        />
      </svg>
    ),
  },
];

export default function WhatWeWrite() {
  const trackRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const onMouseDown = (e) => {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = false;
    dragStart.current = { x: e.pageX, scrollLeft: el.scrollLeft };
    el.style.cursor = "grabbing";
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    const el = trackRef.current;
    if (!el) return;
    const dx = e.pageX - dragStart.current.x;
    if (Math.abs(dx) > 4) isDragging.current = true;
    el.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const onMouseUp = () => {
    const el = trackRef.current;
    if (el) el.style.cursor = "grab";
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  const scroll = (dir) => {
    trackRef.current?.scrollBy({
      left:
        dir *
        (typeof window !== "undefined"
          ? Math.min(300, window.innerWidth * 0.85)
          : 300),
      behavior: "smooth",
    });
  };

  return (
    <>
      <style>{`
        .ww-track::-webkit-scrollbar { display: none; }
        @keyframes ww-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>

      <section className="bg-white relative w-full min-w-0 max-w-full overflow-x-hidden">
        {/* Top double rule */}
        <div className="border-t-4 border-gray-900" />
        <div className="border-t border-gray-300 mt-0.5" />

        <div className="pt-10 sm:pt-12 pb-6 sm:pb-8 px-0">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-4 min-w-0">
            <div className="min-w-0">
              <p className="text-xs tracking-widest uppercase text-gray-400 font-mono mb-3">
                ✦ हाम्रो सम्पादकीय क्षेत्र
              </p>
              <h2 className="text-[clamp(1.75rem,6vw,3.75rem)] sm:text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] sm:leading-tight tracking-tight wrap-break-word">
                हामीले{" "}
                <span
                  className="italic text-red-700"
                  style={{
                    WebkitTextStroke: "1.5px #E7000B",
                    color: "transparent",
                  }}
                >
                  लेख्छौं
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto sm:pb-1">
              <button
                onClick={() => scroll(-1)}
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-900 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 text-sm"
                aria-label="Scroll left"
              >
                ←
              </button>
              <button
                onClick={() => scroll(1)}
                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-900 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 text-sm"
                aria-label="Scroll right"
              >
                →
              </button>
            </div>
          </div>

          <div className="mt-8 h-px bg-gradient-to-r from-gray-900 via-gray-300 to-transparent max-w-full" />
        </div>

        <div className="relative w-full min-w-0 max-w-full">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-6 sm:w-8 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-6 sm:w-8 bg-gradient-to-l from-white to-transparent z-10" />

          <div
            ref={trackRef}
            onMouseDown={onMouseDown}
            className="ww-track flex gap-3 sm:gap-4 overflow-x-auto overflow-y-hidden pb-8 pt-2 px-0"
            style={{
              cursor: "grab",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {categories.map((cat, i) => (
              <div
                key={cat.id}
                onMouseEnter={() => {
                  if (!isDragging.current) setHovered(cat.id);
                }}
                onMouseLeave={() => setHovered(null)}
                className={`
                  relative flex-none w-[min(16.25rem,calc(100vw-3rem))] sm:w-60 md:w-64
                  max-w-[calc(100vw-3rem)] sm:max-w-none
                  rounded-2xl border transition-all duration-300 overflow-hidden
                  p-4 sm:p-5 select-none
                  ${
                    hovered === cat.id
                      ? `${cat.accentBg} ${cat.accentBorder} shadow-lg`
                      : "bg-white border-gray-200 shadow-sm hover:shadow-md"
                  }
                `}
              >
                {/* Watermark */}
                <span className="absolute top-3 right-4 text-5xl font-black text-gray-100 leading-none select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div
                  className={`
                  w-9 h-9 rounded-xl flex items-center justify-center mb-4
                  border transition-all duration-300
                  ${
                    hovered === cat.id
                      ? `${cat.accentIconBg} ${cat.accentText} ${cat.accentBorder}`
                      : "bg-gray-100 text-gray-500 border-gray-200"
                  }
                `}
                >
                  {cat.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 leading-none mb-1">
                  {cat.nepali}
                </h3>
                <p
                  className={`text-xs tracking-widest uppercase font-mono mb-3 transition-colors duration-300 ${
                    hovered === cat.id ? cat.accentText : "text-gray-400"
                  }`}
                >
                  {cat.english}
                </p>

                <p className="text-sm text-gray-500 leading-relaxed mb-5">
                  {cat.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400">
                    {cat.count}
                  </span>
                  <span
                    className={`text-sm transition-all duration-300 ${
                      hovered === cat.id
                        ? `${cat.accentText} translate-x-1`
                        : "text-gray-300"
                    }`}
                  >
                    →
                  </span>
                </div>

                {/* Bottom accent bar */}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 transition-all duration-500 ${cat.accentBar} ${
                    hovered === cat.id ? "w-full" : "w-0"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Ticker */}
        <div className="border-t border-b border-gray-200 bg-gray-50 py-2.5 overflow-hidden w-full max-w-full">
          <div
            className="flex whitespace-nowrap will-change-transform"
            style={{ animation: "ww-ticker 22s linear infinite" }}
          >
            {[...categories, ...categories, ...categories].map((cat, i) => (
              <span
                key={i}
                className={`text-xs tracking-widest uppercase font-mono px-8 ${
                  i % 2 === 0 ? "text-gray-400" : "text-gray-300"
                }`}
              >
                {cat.nepali}
                <span className="ml-8 text-gray-200">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
