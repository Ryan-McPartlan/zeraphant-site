"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { type ParticleThemeId } from "~/lib/themes";

type CursorId = ParticleThemeId | "praise";

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
  themeId: CursorId;
  pupilRef: React.RefObject<HTMLDivElement | null>;
}) {
  switch (themeId) {
    case "praise":
      return (
        <svg
          viewBox="0 0 28 44"
          className="h-11 w-7 drop-shadow-[0_0_10px_rgba(255,209,102,0.45)]"
          aria-hidden
        >
          {/* Tip — hotspot at top center */}
          <path d="M14 0 L18.5 9 H9.5 Z" fill="#3a2a18" />
          <path d="M14 1.5 L16.8 8 H11.2 Z" fill="#c4a574" />
          <path d="M14 3 L15.2 7.2 H12.8 Z" fill="#1a1408" />
          {/* Ferrule-free wood body */}
          <rect x="9.5" y="9" width="9" height="24" rx="1" fill="#ffd24a" />
          <rect
            x="11.2"
            y="9"
            width="2.2"
            height="24"
            fill="#ffe566"
            opacity="0.85"
          />
          <rect
            x="16.2"
            y="9"
            width="1.4"
            height="24"
            fill="#c98912"
            opacity="0.45"
          />
          {/* Metal band + eraser */}
          <rect
            x="9.2"
            y="33"
            width="9.6"
            height="3.2"
            rx="0.6"
            fill="#cfd8e3"
          />
          <rect
            x="9.5"
            y="36.2"
            width="9"
            height="6.5"
            rx="1.2"
            fill="#ff7a9a"
          />
          <path
            d="M11 36.2 H17 V41.5 C17 42.6 15.7 43.2 14 43.2 S11 42.6 11 41.5 Z"
            fill="#ff5c7a"
            opacity="0.55"
          />
        </svg>
      );
    case "home":
      return (
        <Image
          src="/zeraph.png"
          alt=""
          width={56}
          height={56}
          priority
          className="size-12 rounded-full object-cover shadow-[0_0_18px_rgba(120,160,220,0.55)] ring-1 ring-white/35"
          draggable={false}
        />
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
        <svg
          viewBox="0 0 40 52"
          className="h-[3.25rem] w-10 drop-shadow-[0_0_10px_rgba(160,170,185,0.55)]"
          aria-hidden
        >
          {/* Pointed tip — hotspot at top center */}
          <path d="M20 0 L26 12 L20 10 L14 12 Z" fill="#f5f7fa" />
          <path d="M20 10 L24 12.5 L20 20 L16 12.5 Z" fill="#8b949e" />
          <path d="M20 10 L22.5 12 L20 16 L17.5 12 Z" fill="#cfd8e3" />
          {/* Iron chain links */}
          <ellipse
            cx="20"
            cy="23"
            rx="5.4"
            ry="3.8"
            fill="none"
            stroke="#e8edf5"
            strokeWidth="2.5"
          />
          <ellipse
            cx="20"
            cy="23"
            rx="5.4"
            ry="3.8"
            fill="none"
            stroke="#5c6570"
            strokeWidth="1.1"
            opacity="0.75"
          />
          <ellipse
            cx="20"
            cy="31.5"
            rx="5.4"
            ry="3.8"
            fill="none"
            stroke="#b8c0c8"
            strokeWidth="2.5"
          />
          <ellipse
            cx="20"
            cy="31.5"
            rx="5.4"
            ry="3.8"
            fill="none"
            stroke="#3a4048"
            strokeWidth="1.1"
            opacity="0.7"
          />
          <ellipse
            cx="20"
            cy="40"
            rx="5.4"
            ry="3.8"
            fill="none"
            stroke="#d7dde5"
            strokeWidth="2.5"
          />
          <ellipse
            cx="20"
            cy="40"
            rx="5.4"
            ry="3.8"
            fill="none"
            stroke="#5c6570"
            strokeWidth="1.1"
            opacity="0.75"
          />
          <ellipse
            cx="20"
            cy="48"
            rx="4.8"
            ry="3.3"
            fill="none"
            stroke="#8b949e"
            strokeWidth="2.3"
          />
        </svg>
      );
    case "past":
      return (
        <div className="relative flex h-12 w-8 flex-col items-center">
          {/* Tip hotspot — stays upright */}
          <svg viewBox="0 0 32 8" className="relative z-10 h-2 w-8" aria-hidden>
            <path d="M16 0 L20 7 L16 5.5 L12 7 Z" fill="#e8edf5" />
          </svg>
          <div className="animate-hourglass-flip relative -mt-0.5">
            <svg
              viewBox="0 0 32 40"
              className="h-10 w-8 drop-shadow-[0_0_10px_rgba(200,210,225,0.4)]"
              aria-hidden
            >
              {/* Glass frame */}
              <path
                d="M8 4 H24 L16 20 L24 36 H8 L16 20 Z"
                fill="none"
                stroke="#cfd8e3"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M7 4 H25 M7 36 H25"
                stroke="#e8edf5"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Top sand — drains */}
              <g className="animate-hourglass-sand-top">
                <path d="M10 6 H22 L16 18 Z" fill="#c4a574" opacity="0.95" />
                <circle cx="13.5" cy="9" r="0.7" fill="#e8d5a3" opacity="0.7" />
                <circle
                  cx="17"
                  cy="11"
                  r="0.55"
                  fill="#dfc89a"
                  opacity="0.55"
                />
              </g>

              {/* Bottom sand — fills */}
              <g className="animate-hourglass-sand-bottom">
                <path d="M16 22 L22 34 H10 Z" fill="#a89060" opacity="0.95" />
                <circle
                  cx="15"
                  cy="30"
                  r="0.65"
                  fill="#e8d5a3"
                  opacity="0.45"
                />
              </g>

              {/* Falling stream */}
              <g className="animate-hourglass-stream">
                <line
                  x1="16"
                  y1="18"
                  x2="16"
                  y2="23"
                  stroke="#c4a574"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  opacity="0.75"
                />
                <circle
                  className="animate-hourglass-grain"
                  cx="16"
                  cy="18.5"
                  r="0.9"
                  fill="#e8d5a3"
                />
                <circle
                  className="animate-hourglass-grain"
                  cx="15.4"
                  cy="18.8"
                  r="0.55"
                  fill="#c4a574"
                  style={{ animationDelay: "0.12s" }}
                />
                <circle
                  className="animate-hourglass-grain"
                  cx="16.5"
                  cy="18.6"
                  r="0.5"
                  fill="#a89060"
                  style={{ animationDelay: "0.24s" }}
                />
                <circle
                  className="animate-hourglass-grain"
                  cx="15.8"
                  cy="18.4"
                  r="0.45"
                  fill="#dfc89a"
                  style={{ animationDelay: "0.36s" }}
                />
              </g>
            </svg>
          </div>
        </div>
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

export function FunnyCursor({
  themeId,
  pathname,
}: {
  themeId: ParticleThemeId;
  pathname: string;
}) {
  const cursorId: CursorId = pathname.startsWith("/passion/praise")
    ? "praise"
    : themeId;
  const tipHotspot =
    cursorId === "honor" || cursorId === "past" || cursorId === "praise";

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
        const origin = tipHotspot
          ? "translate(-50%, 0)"
          : "translate(-50%, -50%)";
        el.style.transform = `translate3d(${c.x}px, ${c.y}px, 0) ${origin}`;
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
  }, [enabled, tipHotspot]);

  if (!enabled) return null;

  const pressClass =
    cursorId === "passion"
      ? pressed
        ? "scale-125 rotate-[-8deg]"
        : "scale-100"
      : cursorId === "praise"
        ? pressed
          ? "scale-95 rotate-[-12deg] translate-y-0.5"
          : "scale-100 rotate-[-6deg]"
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
        key={cursorId}
        className={`relative grid place-items-center transition-transform duration-150 ${
          tipHotspot
            ? "h-12 w-10 items-start"
            : cursorId === "home"
              ? "size-12"
              : "size-10"
        } ${pressClass}`}
      >
        <CursorGlyph themeId={cursorId} pupilRef={pupilRef} />
      </div>
    </div>
  );
}
