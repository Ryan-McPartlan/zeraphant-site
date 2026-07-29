"use client";

import Image from "next/image";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { WORLD_BUBBLES, type WorldBubble } from "~/lib/writing";

const BUBBLE_LAYOUT = [
  { left: "8%", top: "18%" },
  { left: "42%", top: "8%" },
  { left: "72%", top: "22%" },
  { left: "22%", top: "48%" },
  { left: "58%", top: "52%" },
  { left: "38%", top: "72%" },
] as const;

function subscribeNowhere() {
  return () => undefined;
}

function ExpandedBubble({
  bubble,
  onClose,
}: {
  bubble: WorldBubble;
  onClose: () => void;
}) {
  const titleId = useId();
  const mounted = useSyncExternalStore(
    subscribeNowhere,
    () => true,
    () => false,
  );

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

  const paragraphs = bubble.body.split(/\n\n+/);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label="Close"
        className="bg-ink/85 absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="animate-page-in border-fire-gold/30 relative z-10 flex h-[min(94dvh,920px)] w-[min(96vw,56rem)] flex-col overflow-hidden rounded-[1.75rem] border bg-[#140806] shadow-[0_0_60px_rgba(255,80,20,0.25)]">
        <div className="border-fire/20 relative aspect-[16/9] max-h-[38%] w-full shrink-0 overflow-hidden border-b">
          <Image
            src={bubble.image}
            alt={bubble.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140806] via-transparent to-transparent" />
        </div>

        <div className="flex shrink-0 items-start justify-between gap-4 px-5 pt-5 sm:px-8">
          <div>
            <p className="text-fire-gold/70 text-sm tracking-[0.2em] uppercase">
              Paragon
            </p>
            <h3
              id={titleId}
              className="font-display text-fire-gold mt-2 text-3xl tracking-tight sm:text-4xl"
            >
              {bubble.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="border-fire-gold/30 text-fire-gold hover:bg-fire/20 rounded-full border px-3 py-1 text-sm transition-colors"
          >
            Close
          </button>
        </div>

        <div className="text-mist mt-5 min-h-0 flex-1 space-y-4 overflow-y-auto px-5 pb-8 text-base leading-relaxed sm:px-8 sm:text-lg">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          {"link" in bubble && bubble.link ? (
            <p>
              <a
                href={bubble.link.href}
                target="_blank"
                rel="noreferrer"
                className="text-fire-gold decoration-fire-gold/40 underline underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                {bubble.link.label}
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function WorldBubbles() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openBubble = WORLD_BUBBLES.find((b) => b.id === openId) ?? null;

  return (
    <>
      <div className="relative mt-8 min-h-[28rem] sm:min-h-[32rem]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,90,20,0.12),transparent_65%)]"
        />
        <ul className="relative h-full min-h-[28rem] sm:min-h-[32rem]">
          {WORLD_BUBBLES.map((bubble, index) => {
            const layout = BUBBLE_LAYOUT[index % BUBBLE_LAYOUT.length]!;
            return (
              <li
                key={bubble.id}
                className="absolute"
                style={{ left: layout.left, top: layout.top }}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(bubble.id)}
                  className="group border-fire-gold/35 animate-float-orb focus-visible:ring-fire-gold relative flex size-36 flex-col items-center justify-center rounded-full border bg-[radial-gradient(circle_at_35%_30%,rgba(255,209,102,0.35),rgba(255,59,31,0.2)_45%,rgba(20,8,6,0.92)_75%)] px-4 text-center shadow-[0_0_30px_rgba(255,90,20,0.35)] transition-transform duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:outline-none sm:size-44"
                  style={{ animationDelay: `${index * 0.7}s` }}
                >
                  <span
                    aria-hidden
                    className="absolute -top-2 left-1/2 h-6 w-4 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_80%,#ffd166,transparent_70%)] opacity-80 blur-[0.5px]"
                  />
                  <span className="font-display text-fire-gold text-sm leading-tight sm:text-base">
                    {bubble.title}
                  </span>
                  <span className="text-mist/80 mt-2 line-clamp-3 text-[11px] sm:text-xs">
                    {bubble.teaser}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {openBubble ? (
        <ExpandedBubble bubble={openBubble} onClose={() => setOpenId(null)} />
      ) : null}
    </>
  );
}
