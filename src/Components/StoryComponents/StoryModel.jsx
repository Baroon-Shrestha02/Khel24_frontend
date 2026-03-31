// src/Components/StoryModal/StoryModal.jsx
import React, { useState, useEffect } from "react";
import { fetchStories } from "../../Services/StoryServices";

const STORY_DURATION = 5000;

// How long ago the story was posted
function timeAgo(dateStr) {
  if (!dateStr) return "";
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function StoryModal() {
  const [stories, setStories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [postedAgo, setPostedAgo] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchStories();
        setStories(res.data.data || []);
      } catch (e) {
        console.error("Failed to fetch stories:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Update "time ago" every 30s while modal is open
  useEffect(() => {
    if (!open || !stories[activeIndex]) return;
    const update = () => {
      const s = stories[activeIndex];
      setPostedAgo(timeAgo(s.createdAt || s.created_at || s.uploadedAt));
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, [open, activeIndex, stories]);

  const openModal = () => {
    setActiveIndex(0);
    setImgLoaded(false);
    setProgress(0);
    setOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  };

  const closeModal = () => {
    setVisible(false);
    setTimeout(() => {
      setOpen(false);
      setProgress(0);
    }, 280);
  };

  const goNext = () => {
    if (activeIndex < stories.length - 1) {
      setActiveIndex((i) => i + 1);
      setImgLoaded(false);
      setProgress(0);
    } else {
      closeModal();
    }
  };

  const goPrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((i) => i - 1);
      setImgLoaded(false);
      setProgress(0);
    }
  };

  // Auto-advance
  useEffect(() => {
    if (!open || !imgLoaded) return;
    setProgress(0);
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const pct = Math.min(((now - start) / STORY_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        goNext();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open, activeIndex, imgLoaded]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, activeIndex, stories.length]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Circular timer values
  const RADIUS = 10;
  const CIRCUM = 2 * Math.PI * RADIUS;
  const dashOffset = CIRCUM * (1 - progress / 100);
  const secondsLeft = imgLoaded
    ? Math.ceil(((100 - progress) / 100) * (STORY_DURATION / 1000))
    : STORY_DURATION / 1000;

  const currentStory = stories[activeIndex];
  const firstStory = stories[0];

  return (
    <>
      <style>{`
        @keyframes sm-shimmer {
          0%  { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .sm-shimmer {
          background: linear-gradient(110deg, #e0e7ef 30%, #f0f4f8 50%, #e0e7ef 70%);
          background-size: 200% 100%;
          animation: sm-shimmer 1.2s linear infinite;
        }
        .sm-modal-enter {
          opacity: 0;
          transform: translateY(28px) scale(0.95);
          transition: opacity 0.28s ease, transform 0.28s cubic-bezier(0.34,1.2,0.64,1);
        }
        .sm-modal-enter.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        @keyframes sk-img {
          0%  { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .sm-img-skeleton {
          background: linear-gradient(110deg,#1a1a1a 30%,#2e2e2e 50%,#1a1a1a 70%);
          background-size: 200% 100%;
          animation: sk-img 1.2s linear infinite;
        }
      `}</style>

      {/* ── Single story trigger circle ── */}
      {loading ? (
        <div className="sm-shimmer w-[56px] h-[56px] rounded-full flex-shrink-0" />
      ) : stories.length > 0 ? (
        <button
          onClick={openModal}
          aria-label="View stories"
          className="relative w-[56px] h-[56px] rounded-full border-none bg-transparent cursor-pointer flex-shrink-0 transition-transform duration-200 hover:scale-105 p-0"
        >
          <div
            className="w-full h-full rounded-full p-[2.5px] flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #00569e, #38bdf8)" }}
          >
            <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
              {firstStory && (
                <img
                  src={firstStory.mediaUrl.url}
                  alt="Stories"
                  className="w-full h-full object-cover rounded-full block"
                />
              )}
            </div>
          </div>
          {stories.length > 1 && (
            <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#00569e] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white leading-none">
              {stories.length}
            </span>
          )}
        </button>
      ) : null}

      {/* ── Modal ── */}
      {open && currentStory && (
        <div
          className={`fixed inset-0 z-[999] flex items-center justify-center transition-all duration-300 ${
            visible ? "bg-black/75" : "bg-black/0"
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`relative w-full max-w-sm rounded-2xl overflow-hidden bg-[#111] select-none sm-modal-enter ${
              visible ? "visible" : ""
            }`}
            style={{ height: "80vh" }}
          >
            {/* ── Progress bars ── */}
            <div className="absolute top-3 left-3 right-3 flex gap-1 z-10">
              {stories.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-[3px] rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.3)" }}
                >
                  <div
                    className="h-full bg-white rounded-full"
                    style={{
                      width:
                        i < activeIndex
                          ? "100%"
                          : i === activeIndex
                            ? `${progress}%`
                            : "0%",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* ── Header: Admin (left) + Timer + Close (right) ── */}
            <div className="absolute top-8 left-0 right-0 z-20 flex items-center justify-between px-3">
              {/* Left: avatar + name + posted time */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#00569e] flex items-center justify-center flex-shrink-0 border-2 border-white/30">
                  <svg width="14" height="14" fill="white" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-xs font-bold leading-tight tracking-wide">
                    Admin | KhelLive 24
                  </span>
                  {/* Posted time ago */}
                  {postedAgo && (
                    <span className="text-white/60 text-[10px] leading-tight flex items-center gap-1">
                      {/* Clock icon */}
                      <svg
                        width="9"
                        height="9"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        className="opacity-70"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path strokeLinecap="round" d="M12 6v6l4 2" />
                      </svg>
                      {postedAgo}
                    </span>
                  )}
                </div>
              </div>

              {/* Right: circular countdown + close */}
              <div className="flex items-center gap-2">
                {/* Close */}
                <button
                  onClick={closeModal}
                  aria-label="Close"
                  className="w-8 h-8 rounded-full bg-black/50 border-none cursor-pointer flex items-center justify-center text-white hover:bg-black/75 transition-colors duration-150"
                >
                  <svg
                    width="13"
                    height="13"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Image ── */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#111]">
              {!imgLoaded && (
                <div className="absolute inset-0 sm-img-skeleton" />
              )}
              <img
                key={currentStory._id}
                src={currentStory.mediaUrl.url}
                alt={`Story ${activeIndex + 1}`}
                className="max-w-full max-h-full w-auto h-auto object-contain block"
                style={{
                  opacity: imgLoaded ? 1 : 0,
                  transition: "opacity 0.25s ease",
                }}
                onLoad={() => setImgLoaded(true)}
              />
            </div>

            {/* ── Tap zones ── */}
            <button
              className="absolute top-0 bottom-0 left-0 w-[42%] z-10 bg-transparent border-none cursor-pointer"
              onClick={goPrev}
              aria-label="Previous story"
            />
            <button
              className="absolute top-0 bottom-0 right-0 w-[42%] z-10 bg-transparent border-none cursor-pointer"
              onClick={goNext}
              aria-label="Next story"
            />
          </div>
        </div>
      )}
    </>
  );
}
