"use client";

import Matter from "matter-js";
import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

import {
  CONNECTION_EDGES,
  CONNECTION_NODES,
  type ConnectionNode,
  connectionNodeById,
  type ConnectionPerson,
  glowStyle,
  NODE_RADIUS,
  type PersonStyle,
} from "~/lib/connection/network";

function jitter(seed: number) {
  // Deterministic -1..1 from seed (avoids impure Math.random in effects)
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  const t = x - Math.floor(x);
  return t * 2 - 1;
}

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type Shockwave = {
  id: number;
  x: number;
  y: number;
  born: number;
};

function BubbleFace({
  node,
  radius,
}: {
  node: ConnectionNode;
  radius: number;
}) {
  const palette = glowStyle(node.glow);

  return (
    <div
      className="relative flex size-full flex-col items-center justify-center overflow-hidden rounded-full border-2 px-3 text-center"
      style={{
        background: `radial-gradient(circle at 35% 28%, ${palette.highlight}, ${palette.mid} 48%, ${palette.deep} 88%)`,
        boxShadow: palette.boxShadow,
        borderColor: palette.ring,
      }}
    >
      {node.image ? (
        <Image
          src={node.image}
          alt=""
          fill
          className="object-cover"
          style={{ opacity: palette.imageOpacity }}
        />
      ) : (
        <span
          className={`font-hand relative z-10 leading-tight ${
            palette.textLight
              ? "text-gold/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]"
              : "text-[#2a1f0a] drop-shadow-[0_1px_0_rgba(255,230,140,0.35)]"
          }`}
          style={{ fontSize: Math.max(15, radius * 0.24) }}
        >
          {node.shortLabel ?? node.label}
        </span>
      )}
    </div>
  );
}

/** Visual treatment for each PersonStyle. */
const PERSON_STYLE: Record<PersonStyle, string> = {
  honor:
    "font-display tracking-tight text-sky drop-shadow-[0_0_14px_rgba(126,224,255,0.45)]",
  passion:
    "font-fire tracking-wide text-fire drop-shadow-[0_0_14px_rgba(255,59,31,0.55)]",
  connection:
    "font-hand tracking-normal text-gold drop-shadow-[0_0_14px_rgba(255,210,80,0.45)]",
  silver:
    "font-display tracking-tight text-silver-bright drop-shadow-[0_0_14px_rgba(200,210,230,0.55)]",
};

function PersonLine({ person }: { person: ConnectionPerson }) {
  const style = PERSON_STYLE[person.style];
  return (
    <li className={`text-base leading-relaxed sm:text-lg ${style}`}>
      {person.epithet} {person.name}
    </li>
  );
}

function subscribeNowhere() {
  return () => undefined;
}

function DetailPanel({
  node,
  onClose,
}: {
  node: ConnectionNode;
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

  if (!mounted) return null;

  const palette = glowStyle(node.glow);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-[#120e06]/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="border-gold/35 relative z-10 w-full max-w-lg overflow-hidden rounded-[1.75rem] border bg-[radial-gradient(ellipse_at_20%_0%,rgba(255,210,80,0.22),transparent_50%),linear-gradient(165deg,#2a1f0a_0%,#140f06_100%)] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)] sm:p-8">
        <div className="flex gap-5">
          <div className="ring-gold/50 relative size-24 shrink-0 overflow-hidden rounded-full ring-2 sm:size-28">
            {node.image ? (
              <Image src={node.image} alt="" fill className="object-cover" />
            ) : (
              <div
                className="flex size-full items-center justify-center"
                style={{
                  background: `radial-gradient(circle at 30% 25%, ${palette.highlight}, ${palette.mid} 55%, ${palette.deep})`,
                }}
              >
                <span
                  className={`font-hand text-3xl ${
                    palette.textLight ? "text-gold/90" : "text-[#1a1408]"
                  }`}
                >
                  {node.label.slice(0, 1)}
                </span>
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-gold/70 text-xs tracking-[0.2em] uppercase">
              {node.subtitle ?? "A thread in the garden"}
            </p>
            <h2
              id={titleId}
              className="font-hand text-gold mt-1 text-3xl leading-tight sm:text-4xl"
            >
              {node.label}
            </h2>
          </div>
        </div>
        <p className="text-gold/90 mt-6 text-base leading-relaxed whitespace-pre-line sm:text-lg">
          {node.blurb}
        </p>
        {node.people?.length ? (
          <div className="mt-6">
            <p className="text-gold/70 text-sm tracking-[0.18em] uppercase">
              Particularly
            </p>
            <ul className="mt-3 space-y-2">
              {node.people.map((person) => (
                <PersonLine key={person.name} person={person} />
              ))}
            </ul>
          </div>
        ) : null}
        {node.closing ? (
          <p className="text-gold/90 mt-6 text-base leading-relaxed whitespace-pre-line sm:text-lg">
            {node.closing}
          </p>
        ) : null}
        <button
          type="button"
          onClick={onClose}
          className="border-gold/40 text-gold hover:bg-gold/15 font-hand mt-8 rounded-full border px-5 py-2 text-lg transition-colors"
        >
          Back to the garden
        </button>
      </div>
    </div>,
    document.body,
  );
}

export function ConnectionNetwork() {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef<Map<string, HTMLElement>>(new Map());
  const bodiesRef = useRef<Map<string, Matter.Body>>(new Map());
  const engineRef = useRef<Matter.Engine | null>(null);
  const mouseRef = useRef<Matter.Mouse | null>(null);
  const dragMoved = useRef(false);
  const pointerDownAt = useRef<{ x: number; y: number; id: string } | null>(
    null,
  );
  const shockId = useRef(0);

  const [openId, setOpenId] = useState<string | null>(null);
  const [shockwaves, setShockwaves] = useState<Shockwave[]>([]);
  const lineEls = useRef<Map<string, SVGLineElement>>(new Map());

  const setNodeRef = (id: string, el: HTMLElement | null) => {
    if (el) nodeRefs.current.set(id, el);
    else nodeRefs.current.delete(id);
  };

  const applyShockwave = (x: number, y: number, strength = 0.08) => {
    const id = ++shockId.current;
    setShockwaves((prev) => [
      ...prev.slice(-4),
      { id, x, y, born: performance.now() },
    ]);
    window.setTimeout(() => {
      setShockwaves((prev) => prev.filter((s) => s.id !== id));
    }, 700);

    for (const body of bodiesRef.current.values()) {
      const dx = body.position.x - x;
      const dy = body.position.y - y;
      const dist = Math.hypot(dx, dy) || 1;
      const falloff = Math.min(1, 280 / dist);
      const force = strength * falloff * body.mass;
      Matter.Body.applyForce(body, body.position, {
        x: (dx / dist) * force,
        y: (dy / dist) * force,
      });
      Matter.Body.setAngularVelocity(
        body,
        body.angularVelocity + jitter(body.id) * 0.04 * falloff,
      );
    }
  };

  useEffect(() => {
    if (reduceMotion) return;
    const root = containerRef.current;
    if (!root) return;

    const {
      Engine,
      Bodies,
      Composite,
      Runner,
      Events,
      Body,
      Constraint,
      Mouse,
      MouseConstraint,
    } = Matter;

    const engine = Engine.create({
      gravity: { x: 0, y: 0, scale: 0.001 },
    });
    engine.timing.timeScale = 0.95;
    engineRef.current = engine;

    const w = root.clientWidth || window.innerWidth;
    const h = root.clientHeight || window.innerHeight;
    const cx = w * 0.52;
    const cy = h * 0.58;

    const wallOpts = { isStatic: true, render: { visible: false } };
    const thickness = 120;
    const walls = [
      Bodies.rectangle(w / 2, -thickness / 2, w + 400, thickness, wallOpts),
      Bodies.rectangle(w / 2, h + thickness / 2, w + 400, thickness, wallOpts),
      Bodies.rectangle(-thickness / 2, h / 2, thickness, h + 400, wallOpts),
      Bodies.rectangle(w + thickness / 2, h / 2, thickness, h + 400, wallOpts),
    ];
    Composite.add(engine.world, walls);

    const seedMap: Record<string, { x: number; y: number }> = {
      community: { x: cx, y: cy },
      "victory-boys": { x: cx - 210, y: cy - 40 },
      dgg: { x: cx - 120, y: cy - 160 },
      dggp: { x: cx - 240, y: cy - 150 },
      silverrook: { x: cx - 160, y: cy - 40 },
      superego: { x: cx - 40, y: cy - 180 },
      burners: { x: cx + 90, y: cy - 40 },
      ea: { x: cx + 180, y: cy - 90 },
      fractal: { x: cx + 210, y: cy - 10 },
      nyc: { x: cx + 240, y: cy + 60 },
      "manhattan-university": { x: cx + 360, y: cy + 40 },
      yonkers: { x: cx + 320, y: cy + 160 },
      "troop-4": { x: cx + 280, y: cy + 280 },
      "boy-scouts": { x: cx + 180, y: cy + 340 },
      c1: { x: cx + 160, y: cy + 180 },
      "software-startups": { x: cx + 40, y: cy + 200 },
      enlighten: { x: cx + 120, y: cy + 300 },
      liberals: { x: cx - 40, y: cy + 170 },
      dc: { x: cx - 200, y: cy + 80 },
    };

    for (const node of CONNECTION_NODES) {
      const r = NODE_RADIUS[node.size];
      const seed = seedMap[node.id] ?? {
        x: cx + jitter(node.id.length * 3) * 150,
        y: cy + jitter(node.id.length * 7) * 110,
      };
      const body = Bodies.circle(seed.x, seed.y, r, {
        label: node.id,
        restitution: 0.55,
        friction: 0.02,
        frictionAir: 0.045,
        density: node.size === "xl" ? 0.0022 : 0.0016,
      });
      Body.setVelocity(body, {
        x: jitter(node.id.length * 11) * 0.6,
        y: jitter(node.id.length * 17) * 0.6,
      });
      bodiesRef.current.set(node.id, body);
      Composite.add(engine.world, body);
    }

    for (const edge of CONNECTION_EDGES) {
      const a = bodiesRef.current.get(edge.from);
      const b = bodiesRef.current.get(edge.to);
      if (!a || !b) continue;
      const rest =
        (NODE_RADIUS[connectionNodeById(edge.from)!.size] +
          NODE_RADIUS[connectionNodeById(edge.to)!.size] +
          70) *
        1.15;
      Composite.add(
        engine.world,
        Constraint.create({
          bodyA: a,
          bodyB: b,
          length: rest,
          stiffness: edge.stiffness ?? 0.012,
          damping: 0.08,
        }),
      );
    }

    const mouse = Mouse.create(root);
    mouseRef.current = mouse;
    mouse.pixelRatio = window.devicePixelRatio || 1;
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.18,
        damping: 0.12,
        render: { visible: false },
      },
    });
    Composite.add(engine.world, mouseConstraint);

    Events.on(mouseConstraint, "startdrag", () => {
      dragMoved.current = false;
    });
    Events.on(mouseConstraint, "enddrag", () => {
      // handled in pointerup
    });

    Events.on(engine, "beforeUpdate", () => {
      const bodies = [...bodiesRef.current.values()];

      // Soft centering so the constellation doesn't drift forever
      for (const body of bodies) {
        Body.applyForce(body, body.position, {
          x: (cx - body.position.x) * 0.00000011 * body.mass,
          y: (cy - body.position.y) * 0.00000011 * body.mass,
        });

        // Keep bubbles on-stage.
        const pad = 120;
        const minX = -pad;
        const maxX = w + pad;
        const minY = -pad;
        const maxY = h + pad;
        if (body.position.x < minX || body.position.x > maxX) {
          Body.setPosition(body, {
            x: Math.max(minX, Math.min(maxX, body.position.x)),
            y: body.position.y,
          });
        }
        if (body.position.y < minY || body.position.y > maxY) {
          Body.setPosition(body, {
            x: body.position.x,
            y: Math.max(minY, Math.min(maxY, body.position.y)),
          });
          Body.setVelocity(body, {
            x: body.velocity.x * 0.2,
            y: body.velocity.y * 0.2,
          });
        }
      }

      // Mild soft repulsion so linked clusters don't collapse into piles
      for (let i = 0; i < bodies.length; i++) {
        const a = bodies[i]!;
        const ra = a.circleRadius ?? 40;
        for (let j = i + 1; j < bodies.length; j++) {
          const b = bodies[j]!;
          const rb = b.circleRadius ?? 40;
          const dx = b.position.x - a.position.x;
          const dy = b.position.y - a.position.y;
          const dist = Math.hypot(dx, dy) || 1;
          const comfort = ra + rb + 48;
          if (dist >= comfort) continue;
          const t = (comfort - dist) / comfort;
          const mag = 0.000012 * t * t;
          const fx = (dx / dist) * mag;
          const fy = (dy / dist) * mag;
          Body.applyForce(a, a.position, { x: -fx * a.mass, y: -fy * a.mass });
          Body.applyForce(b, b.position, { x: fx * b.mass, y: fy * b.mass });
        }
      }
    });

    Events.on(engine, "afterUpdate", () => {
      for (const [id, body] of bodiesRef.current) {
        const el = nodeRefs.current.get(id);
        if (!el) continue;
        el.style.transform = `translate3d(${body.position.x}px, ${body.position.y}px, 0) translate(-50%, -50%)`;
      }
      for (const edge of CONNECTION_EDGES) {
        const a = bodiesRef.current.get(edge.from);
        const b = bodiesRef.current.get(edge.to);
        const line = lineEls.current.get(`${edge.from}-${edge.to}`);
        if (!a || !b || !line) continue;
        line.setAttribute("x1", String(a.position.x));
        line.setAttribute("y1", String(a.position.y));
        line.setAttribute("x2", String(b.position.x));
        line.setAttribute("y2", String(b.position.y));
      }
    });

    const runner = Runner.create();
    Runner.run(runner, engine);

    const onResize = () => {
      // Keep walls roughly matching — recreate on big resizes
      const nw = root.clientWidth;
      const nh = root.clientHeight;
      Composite.remove(engine.world, walls);
      walls.length = 0;
      walls.push(
        Bodies.rectangle(nw / 2, -thickness / 2, nw + 400, thickness, wallOpts),
        Bodies.rectangle(
          nw / 2,
          nh + thickness / 2,
          nw + 400,
          thickness,
          wallOpts,
        ),
        Bodies.rectangle(-thickness / 2, nh / 2, thickness, nh + 400, wallOpts),
        Bodies.rectangle(
          nw + thickness / 2,
          nh / 2,
          thickness,
          nh + 400,
          wallOpts,
        ),
      );
      Composite.add(engine.world, walls);
    };
    window.addEventListener("resize", onResize);

    const bodies = bodiesRef.current;
    return () => {
      window.removeEventListener("resize", onResize);
      Runner.stop(runner);
      Engine.clear(engine);
      bodies.clear();
      engineRef.current = null;
    };
  }, [reduceMotion]);

  // Sync mouse offset for scrolled containers
  useEffect(() => {
    const root = containerRef.current;
    const mouse = mouseRef.current;
    if (!root || !mouse) return;
    const sync = () => {
      const rect = root.getBoundingClientRect();
      Matter.Mouse.setOffset(mouse, { x: -rect.left, y: -rect.top });
    };
    sync();
    window.addEventListener("scroll", sync, true);
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync, true);
      window.removeEventListener("resize", sync);
    };
  }, [reduceMotion]);

  const shockFromEvent = (e: React.PointerEvent, strength = 0.1) => {
    const root = containerRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    applyShockwave(e.clientX - rect.left, e.clientY - rect.top, strength);
  };

  const onBackgroundPointerDown = (e: React.PointerEvent) => {
    // Empty space in the network (not a bubble) still sends a pulse
    if (e.target !== e.currentTarget) return;
    shockFromEvent(e, 0.1);
  };

  const onPointerDown = (id: string, e: React.PointerEvent) => {
    e.stopPropagation();
    pointerDownAt.current = { x: e.clientX, y: e.clientY, id };
    dragMoved.current = false;
    // Open immediately so small bubbles don't bounce away before pointerup
    setOpenId(id);
    const clientX = e.clientX;
    const clientY = e.clientY;
    window.setTimeout(() => {
      const root = containerRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      applyShockwave(clientX - rect.left, clientY - rect.top, 0.08);
    }, 120);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const start = pointerDownAt.current;
    if (!start) return;
    if (Math.hypot(e.clientX - start.x, e.clientY - start.y) > 8) {
      dragMoved.current = true;
    }
  };

  const onPointerUp = (_id: string, _e: React.PointerEvent) => {
    pointerDownAt.current = null;
  };

  const openNode = openId ? connectionNodeById(openId) : null;

  if (reduceMotion) {
    return (
      <div className="mx-auto grid max-w-4xl gap-4 px-6 py-10 sm:grid-cols-2">
        {CONNECTION_NODES.map((node) => (
          <button
            key={node.id}
            type="button"
            onClick={() => setOpenId(node.id)}
            className="border-gold/30 bg-gold/10 hover:bg-gold/15 rounded-2xl border p-5 text-left transition-colors"
          >
            <p className="font-hand text-gold text-2xl">{node.label}</p>
          </button>
        ))}
        {openNode ? (
          <DetailPanel node={openNode} onClose={() => setOpenId(null)} />
        ) : null}
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="relative h-full w-full touch-none overflow-hidden"
        onPointerDown={onBackgroundPointerDown}
        onPointerMove={onPointerMove}
      >
        <svg
          ref={svgRef}
          className="pointer-events-none absolute inset-0 size-full"
          aria-hidden
        >
          {CONNECTION_EDGES.map((edge) => (
            <line
              key={`${edge.from}-${edge.to}`}
              ref={(el) => {
                const key = `${edge.from}-${edge.to}`;
                if (el) lineEls.current.set(key, el);
                else lineEls.current.delete(key);
              }}
              x1={0}
              y1={0}
              x2={0}
              y2={0}
              stroke="rgba(255, 210, 80, 0.45)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
        </svg>

        {shockwaves.map((wave) => (
          <span
            key={wave.id}
            className="border-gold pointer-events-none absolute rounded-full border-[3px]"
            style={{
              left: wave.x,
              top: wave.y,
              width: 16,
              height: 16,
              transform: "translate(-50%, -50%)",
              animation: "connection-shock 0.7s ease-out forwards",
              boxShadow:
                "0 0 24px rgba(255,210,80,0.85), 0 0 60px rgba(255,210,80,0.45)",
            }}
          />
        ))}

        {CONNECTION_NODES.map((node) => {
          const r = NODE_RADIUS[node.size];
          // Generous hit target so small bubbles stay clickable while bouncing
          const hit = Math.max(r * 2, 96);
          return (
            <button
              key={node.id}
              type="button"
              ref={(el) => setNodeRef(node.id, el)}
              aria-label={node.label}
              className="absolute top-0 left-0 grid cursor-grab place-items-center active:cursor-grabbing"
              style={{
                width: hit,
                height: hit,
                transform:
                  "translate3d(-200px, -200px, 0) translate(-50%, -50%)",
                willChange: "transform",
              }}
              onPointerDown={(e) => onPointerDown(node.id, e)}
              onPointerUp={(e) => onPointerUp(node.id, e)}
            >
              <div style={{ width: r * 2, height: r * 2 }}>
                <BubbleFace node={node} radius={r} />
              </div>
            </button>
          );
        })}
      </div>

      {openNode ? (
        <DetailPanel node={openNode} onClose={() => setOpenId(null)} />
      ) : null}
    </>
  );
}
