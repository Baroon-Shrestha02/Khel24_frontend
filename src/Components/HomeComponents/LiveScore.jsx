// src/components/LiveScoreSidebar.jsx
import React, { useEffect, useState } from "react";

// ─── Football match data ───────────────────────────────────────────────────────
const FOOTBALL = {
  id: "f1",
  competition: "Premier League",
  minute: 67,
  home: {
    name: "Man United",
    score: 2,
    bg: "rgba(220,38,38,0.12)",
    border: "rgba(220,38,38,0.25)",
  },
  away: {
    name: "Leeds Utd",
    score: 1,
    bg: "rgba(250,204,21,0.10)",
    border: "rgba(250,204,21,0.25)",
  },
  stats: { shots: 5, possession: 62, corners: 3 },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function PulseDot({ color }) {
  return (
    <span className="relative flex h-2 w-2">
      <span
        className={`animate-ping absolute inset-0 rounded-full opacity-70`}
        style={{ background: color }}
      />
      <span
        className="relative inline-flex rounded-full h-2 w-2"
        style={{ background: color }}
      />
    </span>
  );
}

// ─── Football Card ─────────────────────────────────────────────────────────────
function FootballCard({ data }) {
  const [state, setState] = useState(data);

  useEffect(() => {
    const t = setInterval(() => {
      setState((prev) => ({
        ...prev,
        minute: Math.min(90, prev.minute + 1),
        stats: {
          shots: prev.stats.shots + (Math.random() < 0.08 ? 1 : 0),
          corners: prev.stats.corners + (Math.random() < 0.04 ? 1 : 0),
          possession: Math.max(
            40,
            Math.min(70, prev.stats.possession + rand(-1, 1)),
          ),
        },
      }));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-2xl bg-[#0f0d1f] border border-[rgba(139,120,255,0.15)] hover:border-[rgba(139,120,255,0.38)] transition-all duration-300 hover:-translate-y-px overflow-hidden cursor-pointer">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.05]">
        <span className="text-[10px] font-medium tracking-widest uppercase text-[#6b648a]">
          ⚽ {state.competition}
        </span>
        <div className="flex items-center gap-1.5">
          <PulseDot color="#f59e0b" />
          <span className="text-[11px] font-medium text-amber-400">
            {state.minute}'
          </span>
        </div>
      </div>

      {/* Teams + Score */}
      <div className="flex items-center justify-between px-4 py-4 gap-2">
        {[state.home, state.away].map((team, i) => (
          <React.Fragment key={i}>
            {i === 1 && (
              <div className="flex flex-col items-center gap-1 min-w-[80px]">
                <div className="flex items-center gap-2.5">
                  <span className="text-[36px] font-bold text-white leading-none tabular-nums">
                    {state.home.score}
                  </span>
                  <span className="text-[15px] text-[#3d3657] font-light">
                    :
                  </span>
                  <span className="text-[36px] font-bold text-white leading-none tabular-nums">
                    {state.away.score}
                  </span>
                </div>
                <span className="text-[10px] text-amber-400 font-medium tracking-wider">
                  LIVE
                </span>
              </div>
            )}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center border"
                style={{ background: team.bg, borderColor: team.border }}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: team.border }}
                />
              </div>
              <span className="text-[11px] font-medium text-[#c4bce0] text-center leading-tight">
                {team.name}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Stats */}
      <div
        className="grid border-t border-white/[0.05] py-2.5"
        style={{ gridTemplateColumns: "1fr 1px 1fr 1px 1fr" }}
      >
        {[
          { v: state.stats.shots, l: "Shots" },
          { v: null },
          { v: state.stats.possession + "%", l: "Possession" },
          { v: null },
          { v: state.stats.corners, l: "Corners" },
        ].map((s, i) =>
          s.v === null ? (
            <div key={i} className="bg-white/[0.05]" />
          ) : (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <span className="text-[13px] font-medium text-[#e2deff]">
                {s.v}
              </span>
              <span className="text-[10px] text-[#6b648a]">{s.l}</span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────────────────────
export default function LiveScoreSidebar() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <aside className="w-full md:w-80 shrink-0">
      <div className="sticky top-4 flex flex-col gap-3 p-4 rounded-2xl bg-[#080715] text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">
            Live <span className="text-[#8B78FF]">Scores</span>
          </h2>
          <span className="text-xs text-[#6b648a] tabular-nums">
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </span>
        </div>

        <div className="flex items-center gap-2 w-fit bg-[#1a1535] border border-[rgba(139,120,255,0.25)] rounded-full px-3 py-1.5">
          <PulseDot color="#8B78FF" />
          <span className="text-[11px] font-medium text-[#a395ff] tracking-wider">
            2 matches live
          </span>
        </div>
      </div>
    </aside>
  );
}
