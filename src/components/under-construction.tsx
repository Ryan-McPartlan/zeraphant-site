"use client";

import Image from "next/image";
import { useEffect } from "react";

const AMBIENCE_SRC = "/construction/ambiance.mp3";
const AMBIENCE_VOLUME = 0.35;

const BARREL_SRC = "/construction/barrel.png";

const SIGN_SRCS = [
  "/construction/area-under-construction.png",
  "/construction/caution-tape.png",
  "/construction/caution-excuse.png",
] as const;

type PropItem = {
  src: string;
  left: number;
  bottom: number;
  width: number;
  delay: number;
  rotate: number;
  z: number;
  bobDuration: number;
};

type TruckItem = {
  direction: "left" | "right";
  bottom: number;
  duration: number;
  delay: number;
  width: number;
  z: number;
};

/** Deterministic PRNG so SSR and client paint the same clutter. */
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rand: () => number, items: readonly T[]): T {
  return items[Math.floor(rand() * items.length)]!;
}

function range(rand: () => number, min: number, max: number) {
  return min + rand() * (max - min);
}

function buildProp(
  rand: () => number,
  src: string,
  opts?: { widthMin?: number; widthMax?: number; rotateMax?: number },
): PropItem {
  const isTape = src.includes("caution-tape");
  const isBarrel = src === BARREL_SRC;
  const widthMin = opts?.widthMin ?? (isTape ? 2.4 : isBarrel ? 2.0 : 2.6);
  const widthMax = opts?.widthMax ?? (isTape ? 5.5 : isBarrel ? 4.8 : 5.8);
  const rotateMax = opts?.rotateMax ?? (isBarrel ? 28 : 22);

  return {
    src,
    left: range(rand, -2, 96),
    bottom: range(rand, 0.05, 1.8),
    width: range(rand, widthMin, widthMax),
    delay: range(rand, 0, 2.4),
    rotate: range(rand, -rotateMax, rotateMax),
    z: Math.floor(range(rand, 1, 20)),
    bobDuration: range(rand, 2.2, 4.2),
  };
}

function buildSigns(count: number, seed: number): PropItem[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () =>
    buildProp(rand, pick(rand, SIGN_SRCS)),
  );
}

function buildBarrels(count: number, seed: number): PropItem[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => buildProp(rand, BARREL_SRC));
}

function buildTrucks(count: number, seed: number): TruckItem[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => ({
    direction: rand() > 0.5 ? ("right" as const) : ("left" as const),
    bottom: range(rand, -0.8, 0.9),
    duration: range(rand, 14, 32),
    delay: -range(rand, 0, 28),
    width: range(rand, 5.5, 10.5),
    z: Math.floor(range(rand, 10, 28)),
  }));
}

/** Was ~6 barrels; tripled to 18, plus the same sign/tape clutter. */
const PROPS = [...buildSigns(21, 0xc0ffee), ...buildBarrels(18, 0xbabe01)];
const TRUCKS = buildTrucks(9, 0xdead42);

function useConstructionAmbience() {
  useEffect(() => {
    const audio = new Audio(AMBIENCE_SRC);
    audio.loop = true;
    audio.volume = AMBIENCE_VOLUME;
    audio.preload = "auto";

    const tryPlay = () => {
      void audio.play().catch(() => {
        // Autoplay blocked until a user gesture.
      });
    };

    tryPlay();

    const unlock = () => {
      tryPlay();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      audio.pause();
      audio.src = "";
    };
  }, []);
}

/** Signs, barrels, tape, and trucks — all along the bottom of the viewport. */
export function UnderConstructionDecor() {
  useConstructionAmbience();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[25] h-52 overflow-visible sm:h-56"
    >
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent" />

      {PROPS.map((prop, index) => (
        <div
          key={`prop-${index}`}
          className="construction-barrel absolute"
          style={{
            left: `${prop.left}%`,
            bottom: `${prop.bottom}rem`,
            width: `${prop.width}rem`,
            zIndex: prop.z,
            animationDelay: `${prop.delay}s`,
            animationDuration: `${prop.bobDuration}s`,
          }}
        >
          <div style={{ transform: `rotate(${prop.rotate}deg)` }}>
            <Image
              src={prop.src}
              alt=""
              width={160}
              height={160}
              className="h-auto w-full drop-shadow-md"
            />
          </div>
        </div>
      ))}

      {TRUCKS.map((truck, index) => (
        <div
          key={`truck-${index}`}
          className={
            truck.direction === "right"
              ? "construction-truck-right absolute"
              : "construction-truck-left absolute"
          }
          style={{
            bottom: `${truck.bottom}rem`,
            width: `${truck.width}rem`,
            zIndex: truck.z,
            animationDuration: `${truck.duration}s`,
            animationDelay: `${truck.delay}s`,
          }}
        >
          <Image
            src="/construction/truck.png"
            alt=""
            width={220}
            height={120}
            className="h-auto w-full drop-shadow-lg"
          />
        </div>
      ))}
    </div>
  );
}
