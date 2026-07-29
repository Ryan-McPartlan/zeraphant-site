"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { TimelineCard } from "~/components/past/timeline-card";
import { TIMELINE_BUBBLES } from "~/lib/past/bubbles";
import {
  bubblePosition,
  buildThreadPathD,
  scrollTopToYear,
  yearToScrollTop,
  yearToT,
} from "~/lib/past/path";
import { flattenDeltas } from "~/lib/past/stats";
import { CRISIS_ZONE, THREAD_PATHS } from "~/lib/past/threads";
import {
  clampYear,
  THREAD_COLORS,
  type ThreadId,
  TIMELINE_END,
  TIMELINE_START,
  yearCount,
  years,
} from "~/lib/past/types";

const THREAD_ORDER: ThreadId[] = ["void", "passion", "connection", "honor"];

export function LifeTimeline() {
  const [year, setYear] = useState(TIMELINE_START);
  const [width, setWidth] = useState(1200);
  const [openId, setOpenId] = useState<string | null>(null);
  const syncingFromSlider = useRef(false);
  const [vh, setVh] = useState(800);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const measure = () => {
      setWidth(window.innerWidth);
      setVh(window.innerHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const totalH = yearCount() * vh;

  // Start at 2008 (bottom of the page)
  useEffect(() => {
    syncingFromSlider.current = true;
    window.scrollTo({ top: yearToScrollTop(TIMELINE_START), behavior: "auto" });
    setYear(TIMELINE_START);
    const id = window.requestAnimationFrame(() => {
      syncingFromSlider.current = false;
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  const scrollToYear = useCallback((next: number) => {
    const y = clampYear(next);
    syncingFromSlider.current = true;
    setYear(y);
    window.scrollTo({ top: yearToScrollTop(y), behavior: "smooth" });

    const release = () => {
      syncingFromSlider.current = false;
    };
    window.addEventListener("scrollend", release, { once: true });
    window.setTimeout(release, 1500);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (syncingFromSlider.current) return;
      setYear(clampYear(scrollTopToYear(window.scrollY)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const paths = useMemo(() => {
    return THREAD_ORDER.map((id) => ({
      id,
      d: buildThreadPathD(THREAD_PATHS[id], width, totalH),
      color: THREAD_COLORS[id],
    }));
  }, [totalH, width]);

  const openBubble = TIMELINE_BUBBLES.find((b) => b.id === openId) ?? null;

  // Widget lists present → past (top → bottom), matching the page
  const yearsTopToBottom = useMemo(() => [...years()].reverse(), []);

  const yearNav = (
    <nav
      aria-label="Jump to year"
      className="pointer-events-auto fixed top-1/2 right-3 z-[60] w-[4.5rem] -translate-y-1/2 rounded-2xl border border-white/15 bg-[#0a0c10]/92 px-1.5 py-2 shadow-[0_0_40px_rgba(0,0,0,0.55)] backdrop-blur-md sm:right-5 sm:w-[5.25rem] sm:px-2 sm:py-3"
    >
      <p className="text-mist/50 mb-1.5 text-center text-[9px] tracking-[0.16em] uppercase sm:text-[10px]">
        Years
      </p>
      <ul className="flex flex-col gap-0">
        {yearsTopToBottom.map((y) => {
          const active = y === year;
          return (
            <li key={y}>
              <button
                type="button"
                onClick={() => scrollToYear(y)}
                aria-current={active ? "true" : undefined}
                className={`font-display flex w-full shrink-0 items-center justify-end gap-1.5 rounded-md px-1.5 py-[0.2rem] text-[11px] leading-none tabular-nums transition-colors sm:py-[0.28rem] sm:text-xs ${
                  active
                    ? "text-foam bg-white/10"
                    : "text-mist/55 hover:text-mist hover:bg-white/5"
                }`}
              >
                {active ? (
                  <span
                    aria-hidden
                    className="size-1.5 shrink-0 rounded-full bg-[#5b8def] shadow-[0_0_8px_rgba(91,141,239,0.85)]"
                  />
                ) : (
                  <span aria-hidden className="size-1.5 shrink-0" />
                )}
                <span>{y}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <>
      <main
        className="relative w-full pr-14 sm:pr-16"
        style={{ height: totalH }}
      >
        <svg
          className="pointer-events-none absolute inset-0 size-full"
          viewBox={`0 0 ${width} ${totalH}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          {paths.map((path) => (
            <path
              key={path.id}
              d={path.d}
              fill="none"
              stroke={path.color.stroke}
              strokeWidth={path.id === "honor" ? 5 : 3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={path.id === "void" ? 0.9 : 0.95}
              style={{
                filter:
                  path.id === "void"
                    ? "drop-shadow(0 0 6px rgba(0,0,0,0.85))"
                    : `drop-shadow(0 0 10px ${path.color.glow})`,
              }}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* Scratched black zone between crisis bubbles */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 z-[5] overflow-hidden"
          style={{
            top: yearToT(CRISIS_ZONE.endYear) * totalH,
            height:
              (yearToT(CRISIS_ZONE.startYear) - yearToT(CRISIS_ZONE.endYear)) *
              totalH,
          }}
        >
          <div className="absolute inset-0 bg-black" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "180px 180px",
              mixBlendMode: "overlay",
            }}
          />
          <svg
            className="absolute inset-0 size-full opacity-70"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {[
              "M0 8 L18 6 L40 14 L65 4 L100 10",
              "M0 32 L22 36 L48 28 L72 40 L100 30",
              "M0 55 L28 60 L52 50 L78 64 L100 56",
              "M0 78 L18 72 L45 86 L70 68 L100 80",
              "M6 0 L9 38 L4 68 L14 100",
              "M42 0 L40 34 L48 62 L44 100",
              "M72 0 L78 28 L70 58 L82 100",
              "M94 0 L90 42 L97 74 L91 100",
              "M12 22 L38 58",
              "M58 12 L88 46",
              "M22 70 L50 96",
              "M52 58 L92 86",
              "M18 38 L8 82",
            ].map((d) => (
              <path
                key={d}
                d={d}
                fill="none"
                stroke="rgba(200,200,200,0.28)"
                strokeWidth="0.35"
              />
            ))}
          </svg>
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent to-black/0" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-transparent to-black/0" />
        </div>

        {/* Year bands with headers on the demarcation lines */}
        {years().map((y) => (
          <div
            key={y}
            className="pointer-events-none absolute left-0 flex w-full items-start border-t border-white/10 px-4 pt-5 sm:px-8"
            style={{
              top: (TIMELINE_END - y) * vh,
              height: vh,
            }}
          >
            <span
              className={`font-display text-2xl tabular-nums sm:text-3xl ${
                y === year ? "text-foam" : "text-mist/40"
              }`}
            >
              {y}
            </span>
          </div>
        ))}

        {TIMELINE_BUBBLES.map((bubble) => {
          const pos = bubblePosition(
            THREAD_PATHS[bubble.thread],
            bubble.year,
            width,
            totalH,
          );
          const color = THREAD_COLORS[bubble.thread];
          const gains = flattenDeltas(bubble.deltas);
          const isSilver = bubble.thread === "silver";
          const isVoid = bubble.thread === "void";
          return (
            <button
              key={bubble.id}
              type="button"
              onClick={() => setOpenId(bubble.id)}
              className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
              style={{ left: pos.x, top: pos.y }}
              aria-label={`${bubble.title}, ${Math.floor(bubble.year)}`}
            >
              <span
                className={`flex items-center justify-center rounded-full border-2 ${
                  isSilver ? "size-14 sm:size-16" : "size-12 sm:size-14"
                }`}
                style={{
                  borderColor: color.stroke,
                  background: isVoid
                    ? "#050505"
                    : isSilver
                      ? "radial-gradient(circle at 35% 30%, #f5f7fa, #9aa7b8 55%, #5c6570 100%)"
                      : `radial-gradient(circle at 35% 30%, ${color.stroke}bb, #0a0c10 72%)`,
                  boxShadow: isSilver
                    ? `0 0 28px ${color.glow}, 0 0 8px #5b8def88, 0 0 8px #ff3b1f66, 0 0 8px #ffd24a66`
                    : `0 0 22px ${color.glow}`,
                }}
              >
                <span
                  className="font-display text-xs tabular-nums sm:text-sm"
                  style={{ color: isSilver ? "#1a1f2a" : color.stroke }}
                >
                  {String(Math.floor(bubble.year)).slice(2)}
                </span>
              </span>
              {gains.length > 0 ? (
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide text-black"
                  style={{ background: color.stroke }}
                >
                  {gains
                    .map((g) => `${g.key.slice(0, 3)}+${g.value}`)
                    .join(" · ")}
                </span>
              ) : null}
              <span
                className={`max-w-[9rem] truncate text-center text-[11px] ${
                  isSilver ? "text-silver-bright/90" : "text-mist/85"
                }`}
              >
                {bubble.title}
              </span>
            </button>
          );
        })}
      </main>

      {mounted ? createPortal(yearNav, document.body) : null}

      <div className="pointer-events-none fixed top-20 left-6 z-20 max-w-xs sm:left-12 lg:left-20">
        <p className="text-mist/70 text-sm tracking-[0.22em] uppercase">
          The past
        </p>
        <h1 className="font-display text-foam mt-2 text-4xl tracking-tight sm:text-5xl">
          Life line
        </h1>
        <p className="text-mist/75 mt-3 text-sm">
          One scroll = one year. Open a bubble for story, picture, and stats
          accumulated up to that beat.
        </p>
      </div>

      {openBubble ? (
        <TimelineCard bubble={openBubble} onClose={() => setOpenId(null)} />
      ) : null}
    </>
  );
}
