"use client";

import Matter from "matter-js";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { PASSION_TOPICS, type PassionTopic, rand } from "~/lib/passion";

type Phase = "hidden" | "flare" | "live" | "ash";

type EmberState = {
  slug: PassionTopic["slug"];
  label: string;
  blurb: string;
  phase: Phase;
  bornAt: number;
  lifetimeMs: number;
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

type BodyMeta = {
  riseUntil: number;
  riseMs: number;
  fallAt: number;
  bornAt: number;
  lifetimeMs: number;
  phase: Phase;
};

const CARD_RADIUS = 114;

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

function EmberAshCanvas({
  bodiesRef,
  metaRef,
}: {
  bodiesRef: React.RefObject<Map<string, Matter.Body>>;
  metaRef: React.RefObject<Map<string, BodyMeta>>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const specks = useRef<AshSpeck[]>([]);
  const idRef = useRef(0);

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
      for (const [slug, body] of bodiesRef.current) {
        const meta = metaRef.current.get(slug);
        if (!meta) continue;
        const age = now - meta.bornAt;
        const cooling = meta.phase === "ash" || age > meta.lifetimeMs * 0.45;
        if (!cooling || Math.random() > 0.55) continue;

        for (let i = 0; i < 2; i++) {
          specks.current.push({
            id: idRef.current++,
            x: body.position.x + rand(-28, 28),
            y: body.position.y + rand(-8, 12),
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
  }, [bodiesRef, metaRef]);

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
  const [embers, setEmbers] = useState<EmberState[]>(() =>
    PASSION_TOPICS.map((topic) => ({
      slug: topic.slug,
      label: topic.label,
      blurb: topic.blurb,
      phase: "hidden" as const,
      bornAt: 0,
      lifetimeMs: 5000,
    })),
  );

  const bodiesRef = useRef<Map<string, Matter.Body>>(new Map());
  const metaRef = useRef<Map<string, BodyMeta>>(new Map());
  const nodeRefs = useRef<Map<string, HTMLElement>>(new Map());
  const engineRef = useRef<Matter.Engine | null>(null);
  const wallsRef = useRef<Matter.Body[]>([]);
  const timers = useRef<Map<string, number>>(new Map());

  const setNodeRef = (slug: string, node: HTMLElement | null) => {
    if (node) nodeRefs.current.set(slug, node);
    else nodeRefs.current.delete(slug);
  };

  // Physics world
  useEffect(() => {
    if (reduceMotion) return;

    const { Engine, Bodies, Composite, Runner, Events, Body } = Matter;
    const engine = Engine.create({
      gravity: { x: 0, y: 0.85, scale: 0.001 },
    });
    engineRef.current = engine;

    const makeWalls = (w: number, h: number) => {
      const thickness = 80;
      const roofY = h * 0.5;
      return [
        Bodies.rectangle(w / 2, h + thickness / 2, w + 400, thickness, {
          isStatic: true,
        }),
        Bodies.rectangle(-thickness / 2, h * 0.75, thickness, h, {
          isStatic: true,
        }),
        Bodies.rectangle(w + thickness / 2, h * 0.75, thickness, h, {
          isStatic: true,
        }),
        // Roof halfway up the viewport — embers bounce in the lower half
        Bodies.rectangle(w / 2, roofY - thickness / 2, w + 400, thickness, {
          isStatic: true,
        }),
      ];
    };

    let width = window.innerWidth;
    let height = window.innerHeight;
    wallsRef.current = makeWalls(width, height);
    Composite.add(engine.world, wallsRef.current);

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      Composite.remove(engine.world, wallsRef.current);
      wallsRef.current = makeWalls(width, height);
      Composite.add(engine.world, wallsRef.current);
    };
    window.addEventListener("resize", onResize);

    Events.on(engine, "beforeUpdate", () => {
      const now = performance.now();
      for (const [slug, body] of bodiesRef.current) {
        const meta = metaRef.current.get(slug);
        if (!meta) continue;

        if (now < meta.riseUntil) {
          const remaining = (meta.riseUntil - now) / meta.riseMs;
          const lift = 0.00135 * Math.max(0.2, remaining);
          Body.applyForce(body, body.position, {
            x: (Math.random() - 0.5) * 0.0001,
            y: -lift * body.mass,
          });
          // Keep a playful tumble while rising
          Body.setAngularVelocity(
            body,
            body.angularVelocity * 0.995 + (Math.random() - 0.5) * 0.004,
          );
        } else if (now < meta.fallAt && meta.phase !== "ash") {
          // Hold upward momentum ~1s before fall force kicks in
          Body.applyForce(body, body.position, {
            x: 0,
            y: -0.85 * 0.001 * body.mass,
          });
        } else if (meta.phase !== "ash") {
          Body.applyForce(body, body.position, {
            x: 0,
            y: 0.00035 * body.mass,
          });
        } else {
          Body.applyForce(body, body.position, {
            x: 0,
            y: 0.0009 * body.mass,
          });
        }
      }
    });

    Events.on(engine, "afterUpdate", () => {
      for (const [slug, body] of bodiesRef.current) {
        const el = nodeRefs.current.get(slug);
        if (!el) continue;
        el.style.transform = `translate3d(${body.position.x}px, ${body.position.y}px, 0) translate(-50%, -50%) rotate(${body.angle}rad)`;
      }
    });

    const bodies = bodiesRef.current;
    const metas = metaRef.current;
    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      window.removeEventListener("resize", onResize);
      Runner.stop(runner);
      Engine.clear(engine);
      engineRef.current = null;
      bodies.clear();
      metas.clear();
    };
  }, [reduceMotion]);

  // Spawn / lifecycle
  useEffect(() => {
    if (reduceMotion) return;

    const timerMap = timers.current;
    const { Bodies, Composite, Body } = Matter;

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

    const removeBody = (slug: string) => {
      const engine = engineRef.current;
      const body = bodiesRef.current.get(slug);
      if (engine && body) Composite.remove(engine.world, body);
      bodiesRef.current.delete(slug);
      metaRef.current.delete(slug);
    };

    const hide = (slug: string) => {
      removeBody(slug);
      setEmbers((prev) =>
        prev.map((e) => (e.slug === slug ? { ...e, phase: "hidden" } : e)),
      );
      schedule(slug, rand(2800, 6000), () => ignite(slug));
    };

    const beginAsh = (slug: string) => {
      const meta = metaRef.current.get(slug);
      const body = bodiesRef.current.get(slug);
      if (meta) meta.phase = "ash";
      if (body) {
        Body.set(body, { frictionAir: 0.045, restitution: 0.12 });
      }
      setEmbers((prev) =>
        prev.map((e) => (e.slug === slug ? { ...e, phase: "ash" } : e)),
      );
      schedule(slug, 800, () => hide(slug));
    };

    const ignite = (slug: string) => {
      const engine = engineRef.current;
      if (!engine) {
        schedule(slug, 400, () => ignite(slug));
        return;
      }

      removeBody(slug);

      const lifetimeMs = rand(3250, 4500);
      const riseMs = rand(1400, 2100);
      const bornAt = performance.now();
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = rand(
        CARD_RADIUS + 24,
        Math.max(CARD_RADIUS + 25, w - CARD_RADIUS - 24),
      );
      const y = h + CARD_RADIUS * 0.35;

      const body = Bodies.circle(x, y, CARD_RADIUS, {
        label: slug,
        restitution: 0.72,
        friction: 0.08,
        frictionAir: 0.035,
        density: 0.0018,
      });
      // Aim initial momentum toward screen center (lower playfield)
      const targetX = w * 0.5;
      const targetY = h * 0.72;
      const dx = targetX - x;
      const dy = targetY - y;
      const dist = Math.hypot(dx, dy) || 1;
      const speed = rand(3.2, 4.8);
      Body.setVelocity(body, {
        x: (dx / dist) * speed + rand(-0.25, 0.25),
        y: (dy / dist) * speed,
      });
      Body.setAngle(body, rand(-0.85, 0.85));
      Body.setAngularVelocity(body, rand(-0.18, 0.18));
      // Bias spin direction so they tumble in noticeably
      if (Math.abs(body.angularVelocity) < 0.08) {
        Body.setAngularVelocity(
          body,
          (Math.random() < 0.5 ? -1 : 1) * rand(0.1, 0.2),
        );
      }

      Composite.add(engine.world, body);
      bodiesRef.current.set(slug, body);
      metaRef.current.set(slug, {
        riseUntil: bornAt + riseMs,
        riseMs,
        fallAt: bornAt + riseMs + 1000,
        bornAt,
        lifetimeMs,
        phase: "flare",
      });

      setEmbers((prev) =>
        prev.map((e) =>
          e.slug === slug ? { ...e, phase: "flare", bornAt, lifetimeMs } : e,
        ),
      );

      // Place immediately so first paint isn't at 0,0
      requestAnimationFrame(() => {
        const el = nodeRefs.current.get(slug);
        if (el) {
          el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        }
      });

      schedule(slug, 350, () => {
        const meta = metaRef.current.get(slug);
        if (meta) meta.phase = "live";
        setEmbers((prev) =>
          prev.map((e) => (e.slug === slug ? { ...e, phase: "live" } : e)),
        );
        schedule(slug, lifetimeMs, () => beginAsh(slug));
      });
    };

    const order = [...PASSION_TOPICS].sort(() => Math.random() - 0.5);
    for (const topic of order) {
      schedule(topic.slug, rand(600, 12000), () => ignite(topic.slug));
    }

    return () => {
      for (const id of timerMap.values()) window.clearTimeout(id);
      timerMap.clear();
    };
  }, [reduceMotion]);

  if (reduceMotion) return <StaticPassionLinks />;

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
      <EmberAshCanvas bodiesRef={bodiesRef} metaRef={metaRef} />
      <ul className="contents">
        {embers.map((ember) => {
          if (ember.phase === "hidden") return null;
          const cooling = ember.phase === "ash";
          const flaring = ember.phase === "flare";
          return (
            <li
              key={ember.slug}
              ref={(node) => setNodeRef(ember.slug, node)}
              className="absolute top-0 left-0 will-change-transform"
              style={{ transform: "translate3d(-200px, -200px, 0)" }}
            >
              <Link
                href={`/passion/${ember.slug}`}
                aria-label={`${ember.label} — open passion`}
                className={`group pointer-events-auto relative flex items-center gap-2.5 overflow-hidden rounded-2xl px-6 py-4 text-left transition-[opacity,filter,scale] duration-500 ${
                  flaring
                    ? "animate-ember-flare scale-110"
                    : cooling
                      ? "animate-ember-ash scale-95 opacity-40 grayscale"
                      : "scale-100 opacity-100"
                }`}
              >
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 -z-10 rounded-2xl transition-opacity duration-700 ${
                    cooling
                      ? "bg-zinc-500/10 opacity-50"
                      : "animate-ember-haze bg-[radial-gradient(ellipse_at_50%_80%,rgba(255,120,20,0.22),rgba(255,60,10,0.08)_55%,transparent_75%)]"
                  }`}
                />
                <span
                  className={`font-display relative z-10 text-2xl tracking-tight transition-colors duration-500 sm:text-3xl ${
                    cooling
                      ? "text-zinc-400"
                      : "animate-text-on-fire group-hover:brightness-125"
                  }`}
                >
                  {ember.label}
                </span>
                <span
                  aria-hidden
                  className={`font-display relative z-10 text-xl transition-transform duration-300 ${
                    cooling
                      ? "text-zinc-500"
                      : "animate-text-on-fire group-hover:translate-x-0.5"
                  }`}
                >
                  →
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
