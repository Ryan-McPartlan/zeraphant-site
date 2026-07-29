"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { PASSION_TOPICS, type PassionTopic, rand } from "~/lib/passion";

type Phase = "hidden" | "flare" | "live" | "ash";

type Ember = {
  slug: PassionTopic["slug"];
  label: string;
  blurb: string;
  phase: Phase;
  x: number;
  y: number;
  lifetimeMs: number;
  bornAt: number;
};

type AshSpeck = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
};

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function randomSpot(existing: Ember[]): { x: number; y: number } {
  for (let attempt = 0; attempt < 18; attempt++) {
    const x = rand(8, 78);
    const y = rand(68, 92);
    const crowded = existing.some(
      (e) => e.phase !== "hidden" && Math.hypot(e.x - x, e.y - y) < 16,
    );
    if (!crowded) return { x, y };
  }
  return { x: rand(10, 75), y: rand(70, 90) };
}

function StaticPassionLinks() {
  return (
    <ul className="mt-12 grid max-w-xl gap-3 sm:grid-cols-2">
      {PASSION_TOPICS.map((topic) => (
        <li key={topic.slug}>
          <Link
            href={`/passion/${topic.slug}`}
            className="border-fire/30 bg-fire/10 hover:bg-fire/20 block rounded-2xl border px-4 py-3 transition-colors"
          >
            <span className="font-display text-fire-gold text-lg">
              {topic.label}
            </span>
            <span className="text-mist mt-1 block text-sm">{topic.blurb}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function EmberAshCanvas({ embers }: { embers: Ember[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const specks = useRef<AshSpeck[]>([]);
  const idRef = useRef(0);
  const embersRef = useRef(embers);

  useEffect(() => {
    embersRef.current = embers;
  }, [embers]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    const tick = () => {
      const now = performance.now();
      for (const ember of embersRef.current) {
        if (ember.phase !== "ash" && ember.phase !== "live") continue;
        const age = now - ember.bornAt;
        const cooling = ember.phase === "ash" || age > ember.lifetimeMs * 0.45;
        if (!cooling) continue;
        if (Math.random() > 0.55) continue;

        const originX = (ember.x / 100) * canvas.width;
        const originY = (ember.y / 100) * canvas.height;
        for (let i = 0; i < 2; i++) {
          specks.current.push({
            id: idRef.current++,
            x: originX + rand(-28, 28),
            y: originY + rand(-8, 12),
            vx: rand(-0.4, 0.4),
            vy: rand(0.6, 1.8),
            life: 0,
            maxLife: rand(35, 70),
            size: rand(1.2, 3.2),
          });
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      specks.current = specks.current.filter((s) => {
        s.life += 1;
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.02;
        const t = s.life / s.maxLife;
        if (t >= 1) return false;
        ctx.globalAlpha = (1 - t) * 0.75;
        ctx.fillStyle = t < 0.35 ? "#9a9a9a" : "#5c5c5c";
        ctx.fillRect(s.x, s.y, s.size, s.size * 0.7);
        return true;
      });
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1]"
    />
  );
}

export function EmberField() {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );
  const [embers, setEmbers] = useState<Ember[]>(() =>
    PASSION_TOPICS.map((topic) => ({
      slug: topic.slug,
      label: topic.label,
      blurb: topic.blurb,
      phase: "hidden" as const,
      x: 0,
      y: 0,
      lifetimeMs: 5000,
      bornAt: 0,
    })),
  );
  const timers = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (reduceMotion) return;

    const timerMap = timers.current;

    const clearTimer = (slug: string) => {
      const id = timerMap.get(slug);
      if (id) window.clearTimeout(id);
      timerMap.delete(slug);
    };

    const schedule = (slug: string, delay: number, fn: () => void) => {
      clearTimer(slug);
      const id = window.setTimeout(fn, delay);
      timerMap.set(slug, id);
    };

    const hide = (slug: string) => {
      setEmbers((prev) =>
        prev.map((e) => (e.slug === slug ? { ...e, phase: "hidden" } : e)),
      );
      schedule(slug, rand(10_000, 20_000), () => ignite(slug));
    };

    const beginAsh = (slug: string) => {
      setEmbers((prev) =>
        prev.map((e) => (e.slug === slug ? { ...e, phase: "ash" } : e)),
      );
      schedule(slug, 1400, () => hide(slug));
    };

    const ignite = (slug: string) => {
      const lifetimeMs = rand(3000, 7000);
      setEmbers((prev) => {
        const spot = randomSpot(prev);
        return prev.map((e) =>
          e.slug === slug
            ? {
                ...e,
                phase: "flare",
                x: spot.x,
                y: spot.y,
                lifetimeMs,
                bornAt: performance.now(),
              }
            : e,
        );
      });

      schedule(slug, 380, () => {
        setEmbers((prev) =>
          prev.map((e) => (e.slug === slug ? { ...e, phase: "live" } : e)),
        );
        schedule(slug, lifetimeMs, () => beginAsh(slug));
      });
    };

    // Unique staggered first appearances across ~2–22s
    const order = [...PASSION_TOPICS].sort(() => Math.random() - 0.5);
    order.forEach((topic, index) => {
      const slot = 2000 + index * rand(2500, 4500) + rand(0, 1200);
      schedule(topic.slug, slot, () => ignite(topic.slug));
    });

    return () => {
      for (const id of timerMap.values()) window.clearTimeout(id);
      timerMap.clear();
    };
  }, [reduceMotion]);

  if (reduceMotion) return <StaticPassionLinks />;

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      <EmberAshCanvas embers={embers} />
      <ul className="contents">
        {embers.map((ember) => {
          if (ember.phase === "hidden") return null;
          const cooling = ember.phase === "ash";
          const flaring = ember.phase === "flare";
          return (
            <li
              key={ember.slug}
              className="absolute"
              style={{
                left: `${ember.x}%`,
                top: `${ember.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <Link
                href={`/passion/${ember.slug}`}
                className={`group pointer-events-auto relative block min-w-[9.5rem] rounded-2xl px-4 py-3 text-left transition-all duration-700 ${
                  flaring
                    ? "animate-ember-flare scale-110"
                    : cooling
                      ? "animate-ember-ash scale-95 opacity-40 grayscale"
                      : "animate-ember-burn scale-100 opacity-100"
                }`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -inset-6 -z-10 rounded-full blur-2xl transition-opacity duration-700 ${
                    cooling
                      ? "bg-zinc-500/20 opacity-40"
                      : "bg-[radial-gradient(circle,rgba(255,120,20,0.7),rgba(255,40,0,0.25)_55%,transparent_70%)] opacity-90"
                  }`}
                />
                <span
                  aria-hidden
                  className={`pointer-events-none absolute -top-3 left-1/2 h-8 w-5 -translate-x-1/2 rounded-full blur-[1px] transition-opacity duration-500 ${
                    cooling
                      ? "opacity-0"
                      : "animate-fire-flicker bg-[radial-gradient(circle_at_50%_80%,#ffd166,transparent_70%)] opacity-90"
                  }`}
                />
                <span
                  className={`font-display block text-xl tracking-tight transition-colors duration-700 ${
                    cooling
                      ? "text-zinc-400"
                      : "text-fire-gold group-hover:text-white"
                  }`}
                >
                  {ember.label}
                </span>
                <span
                  className={`mt-1 block text-sm transition-colors duration-700 ${
                    cooling ? "text-zinc-500" : "text-mist/90"
                  }`}
                >
                  {ember.blurb}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <nav aria-label="Passion topics" className="sr-only">
        <ul>
          {PASSION_TOPICS.map((topic) => (
            <li key={topic.slug}>
              <Link href={`/passion/${topic.slug}`}>{topic.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
