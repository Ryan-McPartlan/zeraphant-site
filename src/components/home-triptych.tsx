"use client";

import Link from "next/link";
import { type ReactNode,useState } from "react";

type RoomId = "honor" | "passion" | "connection";

const ROOMS: {
  id: RoomId;
  href: string;
  label: string;
  caption: string;
  baseGrow: number;
}[] = [
  {
    id: "honor",
    href: "/honor",
    label: "Honor",
    caption: "A player in the great game",
    baseGrow: 0.95,
  },
  {
    id: "passion",
    href: "/passion",
    label: "Passion",
    caption: "A glutton at the great table",
    baseGrow: 1.45,
  },
  {
    id: "connection",
    href: "/connection",
    label: "Connection",
    caption: "A dancer in the great garden",
    baseGrow: 1.1,
  },
];

const HEADER: Record<RoomId, ReactNode> = {
  honor: "Ryan McPartlan",
  passion: "Zeraph",
  connection: (
    <>
      Your Friend,
      <br />
      Ryan
    </>
  ),
};

const HEADER_KEY: Record<RoomId, string> = {
  honor: "ryan-mcpartlan",
  passion: "zeraph",
  connection: "your-friend-ryan",
};

const WELCOME: Record<RoomId, string> = {
  honor:
    "There is more work to be done. Find what you need, quickly, and then get back to it.",
  passion:
    "Welcome to the greatest personal site of all time. Kinda checks out that it would be mine. Have fun.",
  connection:
    "Welcome to my website! I am delighted and flattered to have you visit — I hope you enjoy learning about lil ole me.",
};

const LABEL_FONT: Record<RoomId, string> = {
  honor: "font-display",
  passion: "font-fire",
  connection: "font-hand",
};

const TITLE_FONT: Record<RoomId, string> = {
  honor: "font-display tracking-tight",
  passion: "font-fire tracking-wide",
  connection: "font-hand tracking-normal normal-case",
};

const PASSION_EMBERS = [
  { left: "12%", delay: "0s", dur: "2.4s", size: "6px" },
  { left: "28%", delay: "0.4s", dur: "3.1s", size: "4px" },
  { left: "41%", delay: "1.1s", dur: "2.2s", size: "7px" },
  { left: "55%", delay: "0.2s", dur: "2.8s", size: "5px" },
  { left: "68%", delay: "1.6s", dur: "3.4s", size: "4px" },
  { left: "78%", delay: "0.7s", dur: "2.6s", size: "8px" },
  { left: "22%", delay: "2s", dur: "3.2s", size: "5px" },
  { left: "62%", delay: "1.3s", dur: "2.5s", size: "6px" },
  { left: "88%", delay: "0.9s", dur: "2.9s", size: "4px" },
  { left: "35%", delay: "1.8s", dur: "3.6s", size: "5px" },
];

const CONNECTION_SPARKLES = [
  { left: "18%", top: "22%", delay: "0s", dur: "2.2s", size: "3px" },
  { left: "34%", top: "48%", delay: "0.5s", dur: "2.8s", size: "4px" },
  { left: "52%", top: "18%", delay: "1.1s", dur: "2.4s", size: "3px" },
  { left: "66%", top: "38%", delay: "0.3s", dur: "3.1s", size: "5px" },
  { left: "78%", top: "58%", delay: "1.6s", dur: "2.6s", size: "3px" },
  { left: "26%", top: "68%", delay: "0.8s", dur: "3.4s", size: "4px" },
  { left: "44%", top: "32%", delay: "1.9s", dur: "2.3s", size: "3px" },
  { left: "58%", top: "72%", delay: "1.2s", dur: "2.9s", size: "4px" },
  { left: "84%", top: "28%", delay: "0.6s", dur: "2.5s", size: "5px" },
  { left: "12%", top: "42%", delay: "1.4s", dur: "3.2s", size: "3px" },
  { left: "72%", top: "14%", delay: "2.1s", dur: "2.7s", size: "4px" },
  { left: "40%", top: "56%", delay: "0.2s", dur: "3s", size: "3px" },
];

export function HomeTriptych() {
  const [hovered, setHovered] = useState<RoomId | null>(null);
  const highlight: RoomId = hovered ?? "honor";

  return (
    <main className="home-triptych relative h-dvh w-full overflow-hidden">
      <h1 className="pointer-events-none absolute inset-x-0 top-[10%] z-30 text-center sm:top-[12%]">
        <span
          key={HEADER_KEY[highlight]}
          className={`text-silver-bright animate-home-title block text-[clamp(2.4rem,8.5vw,7rem)] leading-[0.95] drop-shadow-[0_0_40px_rgba(0,0,0,0.55)] ${TITLE_FONT[highlight]} ${
            highlight === "connection"
              ? "text-[clamp(2.8rem,9vw,6.5rem)] leading-[1.05]"
              : ""
          } ${highlight === "passion" ? "text-fire-gold" : ""}`}
        >
          {HEADER[highlight]}
        </span>
        <span className="text-silver-bright/85 mt-4 block text-xl tracking-[0.22em] uppercase sm:text-3xl">
          Who am I?
        </span>
        <span
          key={`welcome-${highlight}`}
          className={`text-silver/80 animate-home-title mx-auto mt-4 block max-w-2xl px-6 text-base leading-relaxed sm:text-xl ${
            highlight === "passion"
              ? "font-fire text-fire-gold/85 tracking-wide normal-case sm:text-lg"
              : highlight === "connection"
                ? "font-hand text-gold/90 text-xl tracking-normal sm:text-2xl"
                : ""
          }`}
        >
          {WELCOME[highlight]}
        </span>
      </h1>

      <div
        className="absolute inset-0 z-10 flex"
        onMouseLeave={() => setHovered(null)}
      >
        {ROOMS.map((room) => {
          const isHot = hovered === room.id;
          const isDim = hovered !== null && !isHot;
          const grow = isHot ? 1.85 : isDim ? 0.85 : room.baseGrow;

          return (
            <Link
              key={room.id}
              href={room.href}
              aria-label={`${room.label} — ${room.caption}`}
              className={`home-slab home-slab--${room.id} relative block min-w-0 outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-inset ${
                isHot ? "is-hot z-20" : isDim ? "is-dim z-10" : "z-10"
              }`}
              style={{ flexGrow: grow, flexBasis: 0 }}
              onMouseEnter={() => setHovered(room.id)}
              onFocus={() => setHovered(room.id)}
              onBlur={() => setHovered(null)}
            >
              {/* Skewed atmosphere only — labels live outside so they aren't clipped */}
              <div
                aria-hidden
                className={`home-slab__face pointer-events-none absolute inset-y-[-8%] ${
                  room.id === "honor"
                    ? "right-[-14%] left-0"
                    : room.id === "connection"
                      ? "right-0 left-[-14%]"
                      : "inset-x-[-12%]"
                }`}
              >
                <div className="home-slab__glow" />
                <div className="home-slab__shine" />

                {room.id === "passion" ? (
                  <div className="home-slab__hearth">
                    <div className="home-slab__flame home-slab__flame--a" />
                    <div className="home-slab__flame home-slab__flame--b" />
                    <div className="home-slab__flame home-slab__flame--c" />
                    <div className="home-slab__embers">
                      {PASSION_EMBERS.map((e, i) => (
                        <span
                          key={i}
                          className="home-slab__ember"
                          style={{
                            left: e.left,
                            width: e.size,
                            height: e.size,
                            animationDelay: e.delay,
                            animationDuration: e.dur,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}

                {room.id === "connection" ? (
                  <div className="home-slab__sparkles">
                    {CONNECTION_SPARKLES.map((s, i) => (
                      <span
                        key={i}
                        className="home-slab__sparkle"
                        style={{
                          left: s.left,
                          top: s.top,
                          width: s.size,
                          height: s.size,
                          animationDelay: s.delay,
                          animationDuration: s.dur,
                        }}
                      />
                    ))}
                  </div>
                ) : null}
              </div>

              <div
                className={`home-slab__copy relative z-10 flex h-full flex-col justify-end pb-16 sm:pb-20 ${
                  room.id === "honor"
                    ? "pr-3 pl-6 sm:pr-4 sm:pl-10"
                    : room.id === "connection"
                      ? "pr-6 pl-3 sm:pr-10 sm:pl-4"
                      : "px-4 sm:px-6"
                } ${isDim ? "pointer-events-none opacity-0" : "opacity-100"}`}
              >
                <p
                  className={`${LABEL_FONT[room.id]} text-[clamp(3rem,7.5vw,6.4rem)] leading-[0.95] whitespace-nowrap transition-transform duration-500 ${
                    room.id === "connection"
                      ? "tracking-normal normal-case"
                      : room.id === "passion"
                        ? "tracking-wide"
                        : "tracking-tight"
                  } ${isHot ? "translate-y-0 scale-105" : "translate-y-0"}`}
                >
                  {room.label}
                </p>
                <p
                  className={`mt-3 text-lg whitespace-nowrap sm:text-2xl ${
                    room.id === "connection"
                      ? "font-hand text-xl tracking-normal sm:text-3xl"
                      : room.id === "passion"
                        ? "font-fire text-xl tracking-wide sm:text-3xl"
                        : "tracking-[0.08em]"
                  } ${isHot ? "opacity-100" : "opacity-70"}`}
                >
                  {room.caption}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
