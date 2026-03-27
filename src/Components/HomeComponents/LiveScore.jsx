import React, { useEffect, useState } from "react";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function PulseDot({ color }) {
  return (
    <span className="relative flex h-2 w-2">
      <span
        className="animate-ping absolute inset-0 rounded-full opacity-70"
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
function FootballCard() {
  const [state, setState] = useState({
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
  });

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
    <div className="rounded-2xl bg-[#0f0d1f]/80 backdrop-blur-md border border-[rgba(139,120,255,0.15)] hover:border-[rgba(139,120,255,0.38)] transition-all duration-300 hover:-translate-y-px overflow-hidden cursor-pointer">
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
    </div>
  );
}

// ─── Cricket Card ──────────────────────────────────────────────────────────────
function CricketCard() {
  const [state, setState] = useState({
    competition: "ICC Test · Day 3",
    over: 52,
    ball: 3,
    batting: {
      team: "India",
      innings: "1st innings",
      runs: 312,
      wickets: 4,
      b1: { name: "Kohli", runs: 87, balls: 143 },
      b2: { name: "Jadeja", runs: 34, balls: 51 },
    },
    bowling: { team: "England", bowler: "Anderson", figures: "12-2-38-1" },
    fours: 28,
    sixes: 7,
    crr: "6.02",
  });

  useEffect(() => {
    const t = setInterval(() => {
      setState((prev) => {
        let { over, ball, batting, fours, sixes } = prev;
        ball++;
        if (ball > 6) {
          ball = 1;
          over++;
        }

        const runs = rand(0, 6);
        let newFours = fours,
          newSixes = sixes;
        let b1 = { ...batting.b1 },
          b2 = { ...batting.b2 };
        let totalRuns = batting.runs,
          wickets = batting.wickets;

        if (runs === 4) newFours++;
        if (runs === 6) newSixes++;

        if (runs === 0 && Math.random() < 0.07 && wickets < 10) {
          wickets++;
        } else {
          totalRuns += runs;
          if (Math.random() < 0.5) {
            b1.runs += runs;
            b1.balls++;
          } else {
            b2.runs += runs;
            b2.balls++;
          }
        }

        const crr = (totalRuns / (over + ball / 6)).toFixed(2);
        return {
          ...prev,
          over,
          ball,
          fours: newFours,
          sixes: newSixes,
          crr,
          batting: { ...batting, runs: totalRuns, wickets, b1, b2 },
        };
      });
    }, 2500);
    return () => clearInterval(t);
  }, []);

  const { over, ball, batting, bowling } = state;

  return (
    <div className="rounded-2xl bg-[#0f0d1f]/80 backdrop-blur-md border border-[rgba(139,120,255,0.15)] hover:border-[rgba(139,120,255,0.38)] transition-all duration-300 hover:-translate-y-px overflow-hidden cursor-pointer">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.05]">
        <span className="text-[10px] font-medium tracking-widest uppercase text-[#6b648a]">
          🏏 {state.competition}
        </span>
        <div className="flex items-center gap-1.5">
          <PulseDot color="#f59e0b" />
          <span className="text-[11px] font-medium text-amber-400">
            Ov {over}.{ball}
          </span>
        </div>
      </div>

      <div className="px-4 pt-3.5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center border"
              style={{
                background: "rgba(34,197,94,0.10)",
                borderColor: "rgba(34,197,94,0.25)",
              }}
            >
              <span className="text-xs font-semibold text-green-400">IND</span>
            </div>
            <div>
              <span className="text-[13px] font-medium text-[#e2deff]">
                {batting.team}
              </span>
              <span className="text-[10px] text-[#6b648a] ml-1.5">batting</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[22px] font-bold text-white tabular-nums">
              {batting.runs}
            </span>
            <span className="text-[13px] text-[#6b648a]">/</span>
            <span className="text-[15px] font-medium text-[#a395ff]">
              {batting.wickets}
            </span>
            <div className="text-[10px] text-[#6b648a]">{batting.innings}</div>
          </div>
        </div>

        <div
          className="rounded-[10px] mb-3 px-3 py-2"
          style={{
            background: "rgba(139,120,255,0.06)",
            border: "0.5px solid rgba(139,120,255,0.12)",
          }}
        >
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] text-[#6b648a] tracking-wider">
              AT CREASE
            </span>
            <div className="flex gap-4">
              {["R", "B", "SR"].map((h) => (
                <span
                  key={h}
                  className="text-[10px] text-[#6b648a] w-6 text-right"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
          {[batting.b1, batting.b2].map((b, i) => (
            <div
              key={i}
              className="flex justify-between items-center mb-1 last:mb-0"
            >
              <div className="flex items-center gap-1.5">
                {i === 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                )}
                <span
                  className={`text-[12px] font-medium ${i === 0 ? "text-[#e2deff]" : "text-[#c4bce0] ml-3"}`}
                >
                  {b.name}
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-[12px] font-medium text-[#e2deff] w-6 text-right">
                  {b.runs}
                </span>
                <span className="text-[12px] text-[#8a83a8] w-6 text-right">
                  {b.balls}
                </span>
                <span className="text-[12px] text-[#8a83a8] w-6 text-right">
                  {b.balls > 0 ? ((b.runs / b.balls) * 100).toFixed(1) : "0.0"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pb-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center border"
              style={{
                background: "rgba(59,130,246,0.10)",
                borderColor: "rgba(59,130,246,0.25)",
              }}
            >
              <span className="text-xs font-semibold text-blue-400">ENG</span>
            </div>
            <div>
              <span className="text-[13px] font-medium text-[#e2deff]">
                {bowling.team}
              </span>
              <span className="text-[10px] text-[#6b648a] ml-1.5">bowling</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[12px] font-medium text-[#c4bce0]">
              {bowling.bowler}
            </span>
            <div className="text-[10px] text-[#6b648a]">{bowling.figures}</div>
          </div>
        </div>
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
    <aside className="w-full md:w-80 shrink-0 ">
      {/* Background image container — fixed on md+, normal flow on mobile */}
      <div className="md:h-[80vh]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center rounded-2xl overflow-hidden"
          style={{
            backgroundImage: `url(/main/logo.png)`,
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#080715]/80 backdrop-blur-[2px] rounded-2xl" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col gap-3 p-4 text-white overflow-y-auto ">
          {/* Header */}
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

          <div className="flex flex-col gap-2.5">
            <FootballCard />
            <CricketCard />
          </div>
        </div>
      </div>
    </aside>
  );
}
