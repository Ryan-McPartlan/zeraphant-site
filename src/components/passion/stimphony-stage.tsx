"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { STIMPHONY_SPRITES } from "~/lib/passion/stimphony";

type Platform = { y: number; x0: number; x1: number };

type Guy = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  facing: 1 | -1;
  singingUntil: number;
  bobPhase: number;
  grounded: boolean;
};

type Shock = {
  id: number;
  x: number;
  y: number;
  born: number;
  power: number;
};

const PLATFORMS: Platform[] = [
  // Small side ledges — plug the wall cracks without flooring the whole stage
  { y: 0.94, x0: 0, x1: 0.12 },
  { y: 0.94, x0: 0.88, x1: 1 },
  { y: 0.88, x0: 0.04, x1: 0.42 },
  { y: 0.88, x0: 0.48, x1: 0.96 },
  { y: 0.7, x0: 0.12, x1: 0.55 },
  { y: 0.7, x0: 0.6, x1: 0.94 },
  { y: 0.52, x0: 0.05, x1: 0.38 },
  { y: 0.52, x0: 0.42, x1: 0.78 },
  { y: 0.34, x0: 0.22, x1: 0.7 },
  { y: 0.2, x0: 0.55, x1: 0.92 },
];

const GUY_COUNT = 10;
const FALLBACK_SING_MS = 1100;
/** Walk/move scale after two 1/10 reductions from the original pace */
const MOVE_SCALE = 0.01;
const GRAVITY = 0.9;
const MAX_WALK_SPEED = 0.35 * MOVE_SCALE * 10;
const WALK_ACCEL = 1.2 * MOVE_SCALE * 10;

function seedGuys(): Guy[] {
  return Array.from({ length: GUY_COUNT }, (_, id) => {
    const p = PLATFORMS[id % PLATFORMS.length]!;
    const t = 0.15 + Math.random() * 0.7;
    const facing: 1 | -1 = Math.random() > 0.5 ? 1 : -1;
    return {
      id,
      x: p.x0 + (p.x1 - p.x0) * t,
      y: p.y,
      vx: facing * MAX_WALK_SPEED,
      vy: 0,
      facing,
      singingUntil: 0,
      bobPhase: Math.random() * Math.PI * 2,
      grounded: true,
    };
  });
}

function wrap(v: number, min: number, max: number) {
  const span = max - min;
  let n = v;
  while (n < min) n += span;
  while (n > max) n -= span;
  return n;
}

export function StimphonyStage({
  intensity,
  beatId,
  beatDurationMs,
}: {
  /** 0–1 normalized total dial fill */
  intensity: number;
  /** Increments each time any dial fires a sound/beat */
  beatId: number;
  /** Length of the clip that just fired — singer stays in sing pose this long */
  beatDurationMs: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const guysRef = useRef<Guy[]>(seedGuys());
  const shocksRef = useRef<Shock[]>([]);
  const maestroRef = useRef({ x: 0.5, y: 0.42, phase: 0, rock: 0 });
  const intensityRef = useRef(intensity);
  const beatDurationRef = useRef(beatDurationMs);
  const beatHandled = useRef(0);
  const shockSeq = useRef(0);
  const [view, setView] = useState(() => ({
    now: 0,
    maestro: { x: 0.5, y: 0.42, rock: 0 },
    guys: seedGuys(),
    shocks: [] as Shock[],
  }));

  useEffect(() => {
    intensityRef.current = intensity;
  }, [intensity]);

  useEffect(() => {
    beatDurationRef.current = beatDurationMs;
  }, [beatDurationMs]);

  useEffect(() => {
    if (beatId === 0 || beatId === beatHandled.current) return;
    beatHandled.current = beatId;

    const guys = guysRef.current;
    if (guys.length === 0) return;
    const singer = guys[Math.floor(Math.random() * guys.length)]!;
    const now = performance.now();
    const singMs = Math.max(200, beatDurationRef.current || FALLBACK_SING_MS);
    singer.singingUntil = now + singMs;
    singer.grounded = false;
    singer.vy = -(0.18 + intensityRef.current * 0.35);

    const power = 0.15 + intensityRef.current * 0.85;
    shockSeq.current += 1;
    shocksRef.current.push({
      id: shockSeq.current,
      x: singer.x,
      y: singer.y,
      born: now,
      power,
    });

    for (const guy of guys) {
      if (guy.id === singer.id) continue;
      const dx = guy.x - singer.x;
      const dy = (guy.y - singer.y) * 0.55;
      const dist = Math.hypot(dx, dy) || 0.001;
      const falloff = Math.min(1, 0.4 / dist);
      const kick = power * falloff * 0.35;
      guy.vx += (dx / dist) * kick;
      guy.vy += (dy / dist) * kick * 0.7 - power * 0.08;
      guy.grounded = false;
      if (Math.abs(guy.vx) > 0.002) {
        guy.facing = guy.vx > 0 ? 1 : -1;
      }
    }
  }, [beatId]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const i = intensityRef.current;

      // Maestro floats, bounces, and rocks L/R as intensity rises
      const m = maestroRef.current;
      m.phase += dt * (1.2 + i * 7.5);
      const wander = Math.sin(now * 0.00035) * 0.08;
      m.x = 0.5 + wander;
      m.y = 0.38 + Math.sin(m.phase) * (0.02 + i * 0.055);
      m.rock = Math.sin(m.phase * 0.85) * (8 + i * 18);

      for (const guy of guysRef.current) {
        const singing = now < guy.singingUntil;
        const prevY = guy.y;

        if (singing) {
          guy.bobPhase += dt * (8 + i * 18);
          // Extra hop while singing — still under gravity
          guy.vy += Math.sin(guy.bobPhase) * (0.8 + i * 1.6) * dt;
        } else if (guy.grounded) {
          // Crawl along whatever surface they're on
          guy.vx += guy.facing * WALK_ACCEL * dt;
          if (Math.abs(guy.vx) > MAX_WALK_SPEED) {
            guy.vx = Math.sign(guy.vx) * MAX_WALK_SPEED;
          }
        }

        if (!guy.grounded) {
          guy.vy += GRAVITY * dt;
        }

        guy.vx *= guy.grounded ? 0.98 : 0.995;
        guy.x += guy.vx * dt;
        guy.y += guy.vy * dt;

        // Pac-Man wrap
        guy.x = wrap(guy.x, 0, 1);
        guy.y = wrap(guy.y, -0.08, 1.08);

        // Land on platforms when falling through their tops
        guy.grounded = false;
        if (guy.vy >= 0) {
          for (const p of PLATFORMS) {
            const onX = guy.x >= p.x0 && guy.x <= p.x1;
            const crossed = prevY <= p.y && guy.y >= p.y;
            const near =
              Math.abs(guy.y - p.y) < 0.03 && onX && prevY <= p.y + 0.01;
            if (onX && (crossed || near)) {
              guy.y = p.y;
              guy.vy = 0;
              guy.grounded = true;
              break;
            }
          }
        }

        // Walked off the end of a platform
        if (guy.grounded) {
          let onAny = false;
          for (const p of PLATFORMS) {
            if (
              Math.abs(guy.y - p.y) < 0.01 &&
              guy.x >= p.x0 &&
              guy.x <= p.x1
            ) {
              onAny = true;
              break;
            }
          }
          if (!onAny) {
            guy.grounded = false;
          }
        }

        if (Math.abs(guy.vx) > 0.0005) {
          guy.facing = guy.vx > 0 ? 1 : -1;
        }
      }

      shocksRef.current = shocksRef.current.filter((s) => now - s.born < 700);

      const mSnap = maestroRef.current;
      setView({
        now,
        maestro: { x: mSnap.x, y: mSnap.y, rock: mSnap.rock },
        guys: guysRef.current.map((g) => ({ ...g })),
        shocks: shocksRef.current.map((s) => ({ ...s })),
      });
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const { now, maestro: m, guys, shocks } = view;
  // Growth 0–100%: scale 1 → 8 (max ~2× prior)
  const maestroScale = 1 + intensity * 7;

  return (
    <div
      ref={rootRef}
      className="stimphony-stage relative mt-10 h-[420px] overflow-hidden rounded-2xl border border-[rgba(255,209,102,0.28)] sm:h-[520px]"
      aria-hidden
    >
      <div className="stimphony-stage__sky absolute inset-0" />

      {PLATFORMS.map((p, idx) => (
        <div
          key={idx}
          className="stimphony-stage__platform absolute h-2 rounded-full"
          style={{
            left: `${p.x0 * 100}%`,
            width: `${(p.x1 - p.x0) * 100}%`,
            top: `${p.y * 100}%`,
          }}
        />
      ))}

      {shocks.map((s) => {
        const age = (now - s.born) / 700;
        const size = 80 + age * (240 + s.power * 320);
        return (
          <span
            key={s.id}
            className="stimphony-shock pointer-events-none absolute rounded-full border-2 border-[#ffd166]"
            style={{
              left: `${s.x * 100}%`,
              top: `${s.y * 100}%`,
              width: size,
              height: size,
              opacity: Math.max(0, 1 - age),
              transform: "translate(-50%, -50%)",
              boxShadow: `0 0 ${40 + s.power * 80}px rgba(255, 209, 102, ${0.55 * (1 - age)})`,
            }}
          />
        );
      })}

      {guys.map((guy) => {
        const singing = now < guy.singingUntil;
        const grow = singing ? 1 + intensity : 1;
        const size = 52 * grow;
        return (
          <div
            key={guy.id}
            className="absolute"
            style={{
              left: `${guy.x * 100}%`,
              top: `${guy.y * 100}%`,
              width: size,
              height: size,
              transform: `translate(-50%, -92%) scaleX(${guy.facing})`,
              zIndex: singing ? 5 : 2,
              transition: "width 0.15s ease-out, height 0.15s ease-out",
            }}
          >
            <Image
              src={singing ? STIMPHONY_SPRITES.sing : STIMPHONY_SPRITES.silent}
              alt=""
              width={128}
              height={128}
              className="pointer-events-none size-full object-contain"
              draggable={false}
              priority={guy.id < 3}
            />
          </div>
        );
      })}

      <div
        className="absolute z-10"
        style={{
          left: `${m.x * 100}%`,
          top: `${m.y * 100}%`,
          width: 110 * maestroScale,
          height: 110 * maestroScale,
          transform: `translate(-50%, -50%) rotate(${m.rock}deg)`,
          transition: "width 0.2s ease-out, height 0.2s ease-out",
        }}
      >
        <Image
          src={STIMPHONY_SPRITES.maestro}
          alt=""
          width={160}
          height={160}
          className="pointer-events-none size-full object-contain drop-shadow-[0_8px_24px_rgba(255,59,31,0.35)]"
          draggable={false}
          priority
        />
      </div>
    </div>
  );
}
