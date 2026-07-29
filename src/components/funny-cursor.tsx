"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { type ParticleThemeId } from "~/lib/themes";

type Pos = { x: number; y: number };

function subscribePointerPrefs(onChange: () => void) {
  const fine = window.matchMedia("(pointer: fine)");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  fine.addEventListener("change", onChange);
  reduce.addEventListener("change", onChange);
  return () => {
    fine.removeEventListener("change", onChange);
    reduce.removeEventListener("change", onChange);
  };
}

function getFunnyCursorEnabled() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function CursorGlyph({
  themeId,
  pupilRef,
}: {
  themeId: ParticleThemeId;
  pupilRef: React.RefObject<HTMLDivElement | null>;
}) {
  switch (themeId) {
    case "home":
      return (
        <>
          <div className="absolute inset-0 rounded-full bg-[linear-gradient(145deg,#f7f9fc_0%,#9aa7b8_45%,#e8edf5_70%,#6f7b8a_100%)] shadow-[0_0_20px_rgba(200,210,225,0.55)]" />
          <div className="absolute top-1 left-2 h-2 w-3.5 rotate-[-20deg] rounded-full bg-white/70 blur-[1px]" />
          <div className="bg-ink/20 absolute inset-[28%] rounded-full border border-white/30" />
          <div
            ref={pupilRef}
            className="bg-iron relative z-10 size-2.5 rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]"
          />
        </>
      );
    case "passion":
      return (
        <>
          <div className="animate-fire-flicker absolute -top-3 left-1/2 h-5 w-3 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_80%,#ffd166,transparent_70%)] blur-[1px]" />
          <div className="absolute inset-0 scale-110">
            <svg
              viewBox="0 0 32 32"
              className="size-full drop-shadow-[0_0_12px_rgba(255,70,20,0.8)]"
            >
              <path
                d="M16 28 C6 20 2 14 2 9 C2 4.5 5.5 2 9.5 2 C12.5 2 14.8 3.6 16 5.5 C17.2 3.6 19.5 2 22.5 2 C26.5 2 30 4.5 30 9 C30 14 26 20 16 28 Z"
                fill="#ff3b1f"
              />
              <path
                d="M16 24 C9 18 6 14 6 10 C6 7.2 8 5.5 10.4 5.5 C12.4 5.5 14 6.7 15 8.4 C15.4 7.6 16.8 5.5 21.6 5.5 C24 5.5 26 7.2 26 10 C26 14 23 18 16 24 Z"
                fill="#ff7a18"
                opacity="0.85"
              />
              <path
                d="M16 20 C12 16.5 10.5 14 10.5 11.5 C10.5 10 11.5 9 13 9 C14.2 9 15.1 9.7 15.7 10.9 C16.1 10.3 17 9 19 9 C20.5 9 21.5 10 21.5 11.5 C21.5 14 20 16.5 16 20 Z"
                fill="#ffd166"
              />
            </svg>
          </div>
        </>
      );
    case "honor":
      return (
        <>
          <div className="absolute inset-[18%] rotate-45 rounded-[3px] bg-[linear-gradient(135deg,#e8edf5,#5c6570_45%,#d7dde5_70%,#3a4048)] shadow-[0_0_14px_rgba(140,150,165,0.45)]" />
          <div className="bg-iron-bright/90 absolute inset-x-[46%] inset-y-[8%]" />
          <div className="bg-iron-bright/90 absolute inset-x-[8%] inset-y-[46%]" />
          <div className="bg-iron absolute inset-[38%] rounded-sm border border-white/25" />
          <div
            ref={pupilRef}
            className="bg-silver-bright relative z-10 size-1.5 rounded-full"
          />
        </>
      );
    case "connection":
      return (
        <>
          <div className="absolute inset-[-18%] animate-spin [animation-duration:8s]">
            {[0, 45, 90, 135].map((deg) => (
              <div
                key={deg}
                className="via-gold absolute top-1/2 left-1/2 h-[2px] w-8 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent to-transparent opacity-80"
                style={{ transform: `translate(-50%, -50%) rotate(${deg}deg)` }}
              />
            ))}
          </div>
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff8d6,#ffd24a_45%,#f5b942_75%,#c98912)] shadow-[0_0_22px_rgba(255,200,70,0.7)]" />
          <div className="absolute top-1.5 left-2 size-2 rounded-full bg-white/70 blur-[0.5px]" />
          <div
            ref={pupilRef}
            className="bg-[#7a5208]/ring-2 relative z-10 size-2 rounded-full ring-white/30"
          />
        </>
      );
    default:
      return (
        <>
          <div className="bg-chartreuse absolute inset-0 rounded-full shadow-[0_0_18px_color-mix(in_oklab,var(--color-chartreuse)_55%,transparent)]" />
          <div className="bg-coral absolute -top-1 -right-1 size-3.5 rounded-full" />
          <div
            ref={pupilRef}
            className="bg-ink relative z-10 size-4 rounded-full transition-transform duration-75"
          >
            <div className="bg-foam absolute top-0.5 left-0.5 size-1.5 rounded-full" />
          </div>
        </>
      );
  }
}

export function FunnyCursor({ themeId }: { themeId: ParticleThemeId }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLDivElement>(null);
  const target = useRef<Pos>({ x: -100, y: -100 });
  const current = useRef<Pos>({ x: -100, y: -100 });
  const [pressed, setPressed] = useState(false);
  const enabled = useSyncExternalStore(
    subscribePointerPrefs,
    getFunnyCursorEnabled,
    () => false,
  );

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("has-funny-cursor");

    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    let frame = 0;
    const tick = () => {
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * 0.28;
      c.y += (t.y - c.y) * 0.28;

      const el = cursorRef.current;
      const pupil = pupilRef.current;
      if (el) {
        el.style.transform = `translate3d(${c.x}px, ${c.y}px, 0) translate(-50%, -50%)`;
      }
      if (pupil) {
        const dx = (t.x - c.x) * 0.12;
        const dy = (t.y - c.y) * 0.12;
        pupil.style.transform = `translate(${dx}px, ${dy}px)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("has-funny-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  const pressClass =
    themeId === "passion"
      ? pressed
        ? "scale-125 rotate-[-8deg]"
        : "scale-100"
      : pressed
        ? "scale-75 rotate-12"
        : "scale-100";

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
    >
      <div
        key={themeId}
        className={`relative grid size-10 place-items-center transition-transform duration-150 ${pressClass}`}
      >
        <CursorGlyph themeId={themeId} pupilRef={pupilRef} />
      </div>
    </div>
  );
}
