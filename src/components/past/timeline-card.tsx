"use client";

import Image from "next/image";
import { useEffect, useId, useMemo } from "react";
import { createPortal } from "react-dom";

import { TIMELINE_BUBBLES } from "~/lib/past/bubbles";
import { flattenDeltas, statsAtBubble } from "~/lib/past/stats";
import {
  THREAD_COLORS,
  type TimelineBubble,
  VOID_STAT_COLORS,
} from "~/lib/past/types";

const STAT_MAX = 10;

function clampStat(value: number) {
  return Math.min(STAT_MAX, Math.max(0, value));
}

function VerticalStatBar({
  label,
  value,
  color,
  gain = 0,
}: {
  label: string;
  value: number;
  color: string;
  gain?: number;
}) {
  const filled = clampStat(value);

  return (
    <li
      className={`flex flex-col items-center gap-2 rounded-xl px-1.5 py-2 ${
        gain ? "bg-white/8 ring-1 ring-white/15" : ""
      }`}
    >
      <div
        className="relative flex h-36 w-7 flex-col justify-end overflow-hidden rounded-md bg-white/10 sm:h-40 sm:w-8"
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={STAT_MAX}
        aria-valuenow={filled}
      >
        {/* 10 distinct tick marks (one per fill level) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 inset-y-0 z-[2]"
        >
          {Array.from({ length: STAT_MAX }, (_, i) => (
            <span
              key={i}
              className="absolute inset-x-0 h-px bg-black/35"
              style={{ top: `${((i + 1) / STAT_MAX) * 100}%` }}
            />
          ))}
        </div>
        <div
          className="relative z-[1] w-full rounded-b-md transition-[height] duration-500 ease-out"
          style={{
            height: `${(filled / STAT_MAX) * 100}%`,
            background: `linear-gradient(180deg, ${color}, ${color}88)`,
            boxShadow: filled > 0 ? `0 0 14px ${color}66` : undefined,
          }}
        />
      </div>
      <div className="text-center">
        <p className="text-mist max-w-[4.5rem] text-[10px] leading-tight capitalize sm:text-[11px]">
          {label}
        </p>
        {gain ? (
          <p
            className="font-display mt-0.5 text-[10px] tabular-nums"
            style={{ color }}
          >
            {gain > 0 ? `+${gain}` : gain}
          </p>
        ) : null}
      </div>
    </li>
  );
}

function VoidAura({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-2xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-[1.5rem] opacity-80 blur-xl"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(107,90,26,0.35), transparent 55%), radial-gradient(ellipse at 70% 30%, rgba(30,58,110,0.35), transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(92,18,16,0.4), transparent 55%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

export function TimelineCard({
  bubble,
  onClose,
}: {
  bubble: TimelineBubble;
  onClose: () => void;
}) {
  const titleId = useId();
  const { stats, gains } = useMemo(
    () => statsAtBubble(TIMELINE_BUBBLES, bubble.id),
    [bubble.id],
  );
  const gainList = flattenDeltas(gains);
  const thread = THREAD_COLORS[bubble.thread];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const content = (
    <div
      className="animate-page-in relative z-10 flex max-h-[min(92dvh,880px)] w-[min(96vw,42rem)] flex-col overflow-hidden rounded-[1.75rem] border bg-[#0a0c10] shadow-[0_0_60px_rgba(0,0,0,0.55)]"
      style={{ borderColor: `${thread.stroke}55` }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden border-b border-white/10 bg-[#141820]">
        {bubble.image ? (
          <Image
            src={bubble.image}
            alt={bubble.imageAlt ?? bubble.title}
            fill
            className="object-cover"
            sizes="672px"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 40% 30%, ${thread.glow}, transparent 60%), linear-gradient(160deg, #1a1f2a, #0a0c10)`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-transparent to-transparent" />
      </div>

      <div className="flex shrink-0 items-start justify-between gap-4 px-5 pt-5 sm:px-7">
        <div>
          <p
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: thread.stroke }}
          >
            {Math.floor(bubble.year)}
          </p>
          <h3
            id={titleId}
            className="font-display text-foam mt-2 text-3xl tracking-tight"
          >
            {bubble.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-mist hover:text-foam rounded-full border border-white/20 px-3 py-1 text-sm transition-colors hover:border-white/40"
        >
          Close
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-5 pb-7 sm:px-7">
        <div className="text-mist mt-4 space-y-4 text-base leading-relaxed">
          {bubble.body.split(/\n\n+/).map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>

        {gainList.length > 0 ? (
          <div
            className="rounded-2xl border px-4 py-3"
            style={{
              borderColor: `${thread.stroke}55`,
              background: `${thread.stroke}14`,
            }}
          >
            <ul className="flex flex-wrap gap-2">
              {gainList.map((g) => (
                <li
                  key={`${g.group}-${g.key}`}
                  className="font-display text-foam rounded-full border border-white/15 bg-black/30 px-3 py-1 text-sm"
                >
                  <span className="capitalize">{g.key}</span>{" "}
                  <span style={{ color: thread.stroke }}>
                    {g.value > 0 ? `+${g.value}` : g.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {(
            [
              [
                "resilience",
                stats.honor.resilience,
                THREAD_COLORS.honor.stroke,
                gains?.honor?.resilience,
              ],
              [
                "capacity",
                stats.honor.capacity,
                THREAD_COLORS.honor.stroke,
                gains?.honor?.capacity,
              ],
              [
                "volition",
                stats.honor.volition,
                THREAD_COLORS.honor.stroke,
                gains?.honor?.volition,
              ],
              [
                "joy",
                stats.passion.joy,
                THREAD_COLORS.passion.stroke,
                gains?.passion?.joy,
              ],
              [
                "will",
                stats.passion.will,
                THREAD_COLORS.passion.stroke,
                gains?.passion?.will,
              ],
              [
                "vision",
                stats.passion.vision,
                THREAD_COLORS.passion.stroke,
                gains?.passion?.vision,
              ],
              [
                "closeness",
                stats.connection.closeness,
                THREAD_COLORS.connection.stroke,
                gains?.connection?.closeness,
              ],
              [
                "wisdom",
                stats.connection.wisdom,
                THREAD_COLORS.connection.stroke,
                gains?.connection?.wisdom,
              ],
              [
                "gentleness",
                stats.connection.gentleness,
                THREAD_COLORS.connection.stroke,
                gains?.connection?.gentleness,
              ],
              [
                "isolation",
                stats.void.isolation,
                VOID_STAT_COLORS.isolation,
                gains?.void?.isolation,
              ],
              [
                "weakness",
                stats.void.weakness,
                VOID_STAT_COLORS.weakness,
                gains?.void?.weakness,
              ],
              [
                "hatred",
                stats.void.hatred,
                VOID_STAT_COLORS.hatred,
                gains?.void?.hatred,
              ],
            ] as const
          ).map(([key, value, color, gain]) => (
            <VerticalStatBar
              key={key}
              label={key}
              value={value}
              color={color}
              gain={gain ?? 0}
            />
          ))}
        </ul>
      </div>
    </div>
  );

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {bubble.thread === "void" ? <VoidAura>{content}</VoidAura> : content}
    </div>,
    document.body,
  );
}
