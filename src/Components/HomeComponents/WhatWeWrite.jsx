import React, { useRef, useState } from "react";

const categories = [
  {
    id: 1,
    nepali: "फुटबल",
    english: "Football",
    description: "नेपाली, भारतीय र अन्तर्राष्ट्रिय फुटबल समाचार",
    count: "१८३+ लेख",
    accentText: "text-blue-700",
    accentBorder: "border-blue-700",
    accentBg: "bg-blue-50",
    accentIconBg: "bg-blue-100",
    accentBar: "bg-blue-700",
    icon: "⚽",
  },
  {
    id: 2,
    nepali: "क्रिकेट",
    english: "Cricket",
    description: "नेपाल, भारत र विश्व क्रिकेटका ताजा अपडेट",
    count: "२४५+ लेख",
    accentText: "text-emerald-700",
    accentBorder: "border-emerald-700",
    accentBg: "bg-emerald-50",
    accentIconBg: "bg-emerald-100",
    accentBar: "bg-emerald-700",
    icon: "🏏",
  },
  {
    id: 3,
    nepali: "भलिबल",
    english: "Volleyball",
    description: "राष्ट्रिय प्रतियोगिता र अन्तर्राष्ट्रिय भलिबल अपडेट",
    count: "९७+ लेख",
    accentText: "text-orange-600",
    accentBorder: "border-orange-600",
    accentBg: "bg-orange-50",
    accentIconBg: "bg-orange-100",
    accentBar: "bg-orange-600",
    icon: "🏐",
  },
  {
    id: 4,
    nepali: "अन्य खेल",
    english: "Others",
    description: "टेन्निस, बास्केटबल, एथलेटिक्स र अन्य खेलकुद",
    count: "६८+ लेख",
    accentText: "text-purple-700",
    accentBorder: "border-purple-700",
    accentBg: "bg-purple-50",
    accentIconBg: "bg-purple-100",
    accentBar: "bg-purple-700",
    icon: "🎯",
  },
  {
    id: 5,
    nepali: "नेपाल खेल",
    english: "Nepal Sports",
    description: "घरेलु लिग, राष्ट्रिय टोली र युवा खेल प्रतिभा",
    count: "१२१+ लेख",
    accentText: "text-red-600",
    accentBorder: "border-red-600",
    accentBg: "bg-red-50",
    accentIconBg: "bg-red-100",
    accentBar: "bg-red-600",
    icon: "🇳🇵",
  },
  {
    id: 6,
    nepali: "अन्तर्राष्ट्रिय",
    english: "International",
    description: "विश्वकप, च्याम्पियन्स लिग र विश्व खेल समाचार",
    count: "१५८+ लेख",
    accentText: "text-teal-700",
    accentBorder: "border-teal-700",
    accentBg: "bg-teal-50",
    accentIconBg: "bg-teal-100",
    accentBar: "bg-teal-700",
    icon: "🌍",
  },
];

export default function WhatWeWrite() {
  const trackRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const onMouseDown = (e) => {
    isDragging.current = false;
    dragStart.current = { x: e.pageX, scrollLeft: trackRef.current.scrollLeft };
    trackRef.current.style.cursor = "grabbing";
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    const dx = e.pageX - dragStart.current.x;
    if (Math.abs(dx) > 4) isDragging.current = true;
    trackRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const onMouseUp = () => {
    trackRef.current.style.cursor = "grab";
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  const scroll = (dir) => {
    trackRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
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

      {/*
        This component lives inside a flex column that has px-3/px-4 padding
        and a max-w sidebar layout. We use a "full-bleed" escape technique:
        - relative + negative horizontal margins + matching padding
          pulls the section edge-to-edge within its scroll context
        - overflow-hidden on THIS element clips children without
          affecting the parent's width calculation
      */}
      <section className="bg-white relative -mx-3 sm:-mx-4 overflow-hidden">
        {/* Top double rule */}
        <div className="border-t-4 border-gray-900" />
        <div className="border-t border-gray-300 mt-0.5" />

        {/* Header — re-apply the parent's padding so text aligns with siblings */}
        <div className="px-4 sm:px-6 pt-10 sm:pt-12 pb-6 sm:pb-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-400 font-mono mb-3">
                ✦ हाम्रो सम्पादकीय क्षेत्र
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                हामीले{" "}
                <span
                  className="italic"
                  style={{
                    WebkitTextStroke: "1.5px #111",
                    color: "transparent",
                  }}
                >
                  लेख्छौं
                </span>
              </h2>
            </div>

            {/* Arrow controls */}
            <div className="flex items-center gap-2 shrink-0 pb-1">
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

          <div className="mt-8 h-px bg-gradient-to-r from-gray-900 via-gray-300 to-transparent" />
        </div>

        {/* Carousel track wrapper — handles edge fades */}
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent z-10" />

          <div
            ref={trackRef}
            onMouseDown={onMouseDown}
            className="ww-track flex gap-3 sm:gap-4 overflow-x-auto px-4 sm:px-6 pb-8 pt-2"
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
                  relative flex-none w-52 sm:w-60 md:w-64
                  rounded-2xl border transition-all duration-300 overflow-hidden
                  p-5 select-none
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
        <div className="border-t border-b border-gray-200 bg-gray-50 py-2.5 overflow-hidden">
          <div
            className="flex whitespace-nowrap"
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
