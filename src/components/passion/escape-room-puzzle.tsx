"use client";

import Matter from "matter-js";
import {
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type LockId = "temple" | "gambling" | "zombie";

type Lock = {
  id: LockId;
  label: string;
  hint: string;
  room: string;
};

const LOCKS: Lock[] = [
  {
    id: "temple",
    label: "Temple",
    hint: "Needs a torch",
    room: "There is this temple-exploring room in a casino in Connecticut where it's legit dark and you need to hold a torch up, and the puzzles play with this a lot. Super fun!",
  },
  {
    id: "gambling",
    label: "Casino",
    hint: "Needs a chip",
    room: "Atlantic City casino escape room. Something for everyone! Went in with a dozen people and was still very hard. Lots to touch, great set design, themed to the location. Even had its own cool story! And HATS",
  },
  {
    id: "zombie",
    label: "Undead",
    hint: "Needs a skull",
    room: "Zombie room in Middletown, New York. So bad it's good. SO BAD holy shit.",
  },
];

const KEY_LABEL: Record<LockId, string> = {
  temple: "Torch key",
  gambling: "Chip key",
  zombie: "Skull key",
};

const KEY_RADIUS = 28;
const BUSH_W = 92;
const BUSH_H = 70;
const ROPE_SNAP = 150;

function KeyGlyph({ id, className }: { id: LockId; className?: string }) {
  if (id === "temple") {
    return (
      <svg viewBox="0 0 24 24" className={className ?? "size-7"} aria-hidden>
        <path
          d="M12 3c1.2 2.4 2 4.6 2 6.2a2 2 0 1 1-4 0C10 7.6 10.8 5.4 12 3Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M12 11.5v8.5M10 16h4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }
  if (id === "gambling") {
    return (
      <svg viewBox="0 0 24 24" className={className ?? "size-7"} aria-hidden>
        <rect
          x="5"
          y="5"
          width="14"
          height="14"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.75"
          fill="none"
        />
        <circle cx="9" cy="9" r="1.2" fill="currentColor" />
        <circle cx="15" cy="9" r="1.2" fill="currentColor" />
        <circle cx="12" cy="12" r="1.2" fill="currentColor" />
        <circle cx="9" cy="15" r="1.2" fill="currentColor" />
        <circle cx="15" cy="15" r="1.2" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className ?? "size-7"} aria-hidden>
      <circle
        cx="12"
        cy="10"
        r="5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="none"
      />
      <circle cx="10" cy="9" r="1" fill="currentColor" />
      <circle cx="14" cy="9" r="1" fill="currentColor" />
      <path
        d="M9.5 12.5c.8.9 1.6 1.3 2.5 1.3s1.7-.4 2.5-1.3M8 18h8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function EscapeRoomPuzzle() {
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<Map<string, Matter.Body>>(new Map());
  const nodeRefs = useRef<Map<string, HTMLElement>>(new Map());
  const ropeRef = useRef<Matter.Constraint | null>(null);
  const ropeAnchorRef = useRef<Matter.Body | null>(null);
  const ropeLineRef = useRef<SVGLineElement | null>(null);
  const ropeKnotRef = useRef<SVGCircleElement | null>(null);
  const lockRefs = useRef<Partial<Record<LockId, HTMLDivElement | null>>>({});
  const dragIdRef = useRef<string | null>(null);
  const templeSpotRef = useRef({ x: 100, y: 500 });
  const unlockedRef = useRef<Partial<Record<LockId, boolean>>>({});
  const templeFoundRef = useRef(false);
  const chipSpawnedRef = useRef(false);
  const ropeSnappedRef = useRef(false);

  const [unlocked, setUnlocked] = useState<Partial<Record<LockId, boolean>>>(
    {},
  );
  const [templeFound, setTempleFound] = useState(false);
  const [chipSpawned, setChipSpawned] = useState(false);
  const [ropeSnapped, setRopeSnapped] = useState(false);
  const [skullReady, setSkullReady] = useState(false);
  const [shakeId, setShakeId] = useState<LockId | null>(null);
  const [wrongFlash, setWrongFlash] = useState<LockId | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [reels, setReels] = useState<[string, string, string]>([
    "7",
    "BAR",
    "7",
  ]);
  const [slotMsg, setSlotMsg] = useState("1 in 5 shot");

  const setNodeRef = (id: string, node: HTMLElement | null) => {
    if (node) nodeRefs.current.set(id, node);
    else nodeRefs.current.delete(id);
  };

  const tryUnlock = (keyId: LockId, clientX: number, clientY: number) => {
    if (unlockedRef.current[keyId]) return;
    for (const lock of LOCKS) {
      if (unlockedRef.current[lock.id]) continue;
      const el = lockRefs.current[lock.id];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        continue;
      }
      if (lock.id === keyId) {
        unlockedRef.current = { ...unlockedRef.current, [keyId]: true };
        setUnlocked({ ...unlockedRef.current });
        const body = bodiesRef.current.get(`key-${keyId}`);
        const engine = engineRef.current;
        if (engine && body) {
          Matter.Composite.remove(engine.world, body);
          bodiesRef.current.delete(`key-${keyId}`);
        }
        const node = nodeRefs.current.get(`key-${keyId}`);
        if (node) node.style.visibility = "hidden";
        return;
      }
      setShakeId(lock.id);
      setWrongFlash(lock.id);
      window.setTimeout(() => setShakeId(null), 450);
      window.setTimeout(() => setWrongFlash(null), 650);
      return;
    }
  };

  useEffect(() => {
    const { Engine, Bodies, Composite, Runner, Events, Body, Constraint } =
      Matter;
    const engine = Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 },
    });
    engineRef.current = engine;

    const buildWorld = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const thickness = 120;

      Composite.clear(engine.world, false);
      bodiesRef.current.clear();
      ropeRef.current = null;
      ropeAnchorRef.current = null;
      templeFoundRef.current = false;
      chipSpawnedRef.current = false;
      ropeSnappedRef.current = false;

      const walls = [
        Bodies.rectangle(w / 2, h + thickness / 2, w + 400, thickness, {
          isStatic: true,
        }),
        Bodies.rectangle(-thickness / 2, h / 2, thickness, h * 2, {
          isStatic: true,
        }),
        Bodies.rectangle(w + thickness / 2, h / 2, thickness, h * 2, {
          isStatic: true,
        }),
        Bodies.rectangle(w / 2, -thickness / 2, w + 400, thickness, {
          isStatic: true,
        }),
      ];
      Composite.add(engine.world, walls);

      // Bottom-left: bushes hiding temple key
      const spot = { x: 110, y: h - 100 };
      templeSpotRef.current = spot;
      const bushA = Bodies.rectangle(spot.x - 28, spot.y - 8, BUSH_W, BUSH_H, {
        label: "bush-a",
        restitution: 0.12,
        frictionAir: 0.05,
        density: 0.004,
        chamfer: { radius: 18 },
      });
      const bushB = Bodies.rectangle(spot.x + 34, spot.y + 6, BUSH_W, BUSH_H, {
        label: "bush-b",
        restitution: 0.12,
        frictionAir: 0.05,
        density: 0.004,
        chamfer: { radius: 18 },
      });
      Body.setAngle(bushA, -0.22);
      Body.setAngle(bushB, 0.28);
      Composite.add(engine.world, [bushA, bushB]);
      bodiesRef.current.set("bush-a", bushA);
      bodiesRef.current.set("bush-b", bushB);

      // Top-right: skull key on ceiling rope
      const anchorX = w - 88;
      const anchorY = 36;
      const skull = Bodies.circle(anchorX, anchorY + 72, KEY_RADIUS, {
        label: "key-zombie",
        restitution: 0.35,
        frictionAir: 0.02,
        density: 0.002,
      });
      const anchor = Bodies.circle(anchorX, anchorY, 6, {
        isStatic: true,
        label: "rope-anchor",
      });
      const rope = Constraint.create({
        bodyA: anchor,
        bodyB: skull,
        length: 72,
        stiffness: 0.75,
        damping: 0.05,
      });
      Composite.add(engine.world, [anchor, skull, rope]);
      bodiesRef.current.set("key-zombie", skull);
      ropeRef.current = rope;
      ropeAnchorRef.current = anchor;
      setSkullReady(true);
      setTempleFound(false);
      setChipSpawned(false);
      setRopeSnapped(false);
    };

    buildWorld();

    const runner = Runner.create();
    Runner.run(runner, engine);

    Events.on(engine, "afterUpdate", () => {
      for (const [id, body] of bodiesRef.current) {
        const el = nodeRefs.current.get(id);
        if (!el) continue;
        el.style.transform = `translate3d(${body.position.x}px, ${body.position.y}px, 0) translate(-50%, -50%) rotate(${body.angle}rad)`;
      }

      const skullBody = bodiesRef.current.get("key-zombie");
      const anc = ropeAnchorRef.current;
      if (skullBody && anc && !ropeSnappedRef.current) {
        if (ropeLineRef.current) {
          ropeLineRef.current.setAttribute("x1", String(anc.position.x));
          ropeLineRef.current.setAttribute("y1", String(anc.position.y));
          ropeLineRef.current.setAttribute("x2", String(skullBody.position.x));
          ropeLineRef.current.setAttribute("y2", String(skullBody.position.y));
        }
        if (ropeKnotRef.current) {
          ropeKnotRef.current.setAttribute("cx", String(anc.position.x));
          ropeKnotRef.current.setAttribute("cy", String(anc.position.y));
        }
        const dist = Math.hypot(
          skullBody.position.x - anc.position.x,
          skullBody.position.y - anc.position.y,
        );
        if (dist > ROPE_SNAP && ropeRef.current) {
          Composite.remove(engine.world, ropeRef.current);
          ropeRef.current = null;
          ropeSnappedRef.current = true;
          setRopeSnapped(true);
        }
      }

      if (!templeFoundRef.current) {
        const a = bodiesRef.current.get("bush-a");
        const b = bodiesRef.current.get("bush-b");
        const spot = templeSpotRef.current;
        if (a && b) {
          const clearA =
            Math.hypot(a.position.x - spot.x, a.position.y - spot.y) > 100;
          const clearB =
            Math.hypot(b.position.x - spot.x, b.position.y - spot.y) > 100;
          if (clearA && clearB) {
            templeFoundRef.current = true;
            const key = Bodies.circle(spot.x, spot.y, KEY_RADIUS, {
              label: "key-temple",
              restitution: 0.4,
              frictionAir: 0.02,
              density: 0.002,
            });
            Composite.add(engine.world, key);
            bodiesRef.current.set("key-temple", key);
            setTempleFound(true);
          }
        }
      }
    });

    const onResize = () => {
      // Keep simple — only rebuild if nothing unlocked yet
      if (Object.keys(unlockedRef.current).length > 0) return;
      buildWorld();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      Runner.stop(runner);
      Engine.clear(engine);
      engineRef.current = null;
      bodiesRef.current.clear();
    };
  }, []);

  const spawnChipKey = () => {
    if (chipSpawnedRef.current || !engineRef.current) return;
    chipSpawnedRef.current = true;
    const { Bodies, Composite, Body } = Matter;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const key = Bodies.circle(w - 210, h - 200, KEY_RADIUS, {
      label: "key-gambling",
      restitution: 0.45,
      frictionAir: 0.02,
      density: 0.002,
    });
    Body.setVelocity(key, { x: -2.5, y: -5 });
    Composite.add(engineRef.current.world, key);
    bodiesRef.current.set("key-gambling", key);
    setChipSpawned(true);
    setSlotMsg("JACKPOT — chip key!");
  };

  const spinSlots = () => {
    if (spinning || chipSpawnedRef.current) return;
    setSpinning(true);
    setSlotMsg("Spinning…");
    const symbols = ["7", "BAR", "◆", "☠", "★"];
    let ticks = 0;
    const id = window.setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)]!,
        symbols[Math.floor(Math.random() * symbols.length)]!,
        symbols[Math.floor(Math.random() * symbols.length)]!,
      ]);
      ticks += 1;
      if (ticks >= 12) {
        window.clearInterval(id);
        setSpinning(false);
        if (Math.random() < 0.2) {
          setReels(["★", "★", "★"]);
          spawnChipKey();
        } else {
          setSlotMsg("No key. Try again?");
        }
      }
    }, 70);
  };

  const onPropPointerDown = (
    e: ReactPointerEvent<HTMLButtonElement>,
    id: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const body = bodiesRef.current.get(id);
    if (!body) return;
    if (id.startsWith("key-")) {
      const keyId = id.replace("key-", "") as LockId;
      if (unlockedRef.current[keyId]) return;
    }
    dragIdRef.current = id;
    Matter.Body.setStatic(body, true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPropPointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const id = dragIdRef.current;
    if (!id) return;
    const body = bodiesRef.current.get(id);
    if (!body) return;
    Matter.Body.setPosition(body, { x: e.clientX, y: e.clientY });
    Matter.Body.setVelocity(body, { x: 0, y: 0 });
    Matter.Body.setAngularVelocity(body, 0);
  };

  const onPropPointerUp = (e: ReactPointerEvent<HTMLButtonElement>) => {
    const id = dragIdRef.current;
    if (!id) return;
    const body = bodiesRef.current.get(id);
    if (body) {
      Matter.Body.setStatic(body, false);
      Matter.Body.setVelocity(body, { x: 0, y: 0 });
    }
    dragIdRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    if (id.startsWith("key-")) {
      tryUnlock(id.replace("key-", "") as LockId, e.clientX, e.clientY);
    }
  };

  const keyButton = (id: LockId, visible: boolean) => {
    if (!visible || unlocked[id]) return null;
    return (
      <button
        key={`key-${id}`}
        type="button"
        ref={(node) => setNodeRef(`key-${id}`, node)}
        aria-label={`Drag ${KEY_LABEL[id]}`}
        onPointerDown={(e) => onPropPointerDown(e, `key-${id}`)}
        onPointerMove={onPropPointerMove}
        onPointerUp={onPropPointerUp}
        onPointerCancel={onPropPointerUp}
        className="border-fire-gold/50 text-fire-gold pointer-events-auto absolute top-0 left-0 z-40 touch-none rounded-full border bg-[radial-gradient(circle_at_35%_30%,rgba(255,209,102,0.5),rgba(255,59,31,0.3)_50%,rgba(20,8,6,0.95)_80%)] p-3 shadow-[0_0_22px_rgba(255,90,20,0.45)] select-none"
        style={{ transform: "translate3d(-200px, -200px, 0)" }}
      >
        <KeyGlyph id={id} />
      </button>
    );
  };

  const bushButton = (id: "bush-a" | "bush-b", label: string) => (
    <button
      key={id}
      type="button"
      ref={(node) => setNodeRef(id, node)}
      aria-label={label}
      onPointerDown={(e) => onPropPointerDown(e, id)}
      onPointerMove={onPropPointerMove}
      onPointerUp={onPropPointerUp}
      onPointerCancel={onPropPointerUp}
      className="pointer-events-auto absolute top-0 left-0 z-30 touch-none select-none"
      style={{
        width: BUSH_W,
        height: BUSH_H,
        transform: "translate3d(-200px, -200px, 0)",
      }}
    >
      <span className="block h-full w-full rounded-[40%_45%_35%_50%] bg-[radial-gradient(ellipse_at_40%_35%,#4a7c3f,#1e3d1a_70%,#0f2410)] shadow-[0_8px_20px_rgba(0,0,0,0.45)] ring-1 ring-emerald-900/40">
        <span className="absolute top-2 left-3 size-4 rounded-full bg-lime-700/50 blur-[1px]" />
        <span className="absolute top-4 right-4 size-5 rounded-full bg-green-800/60 blur-[1px]" />
        <span className="sr-only">{label}</span>
      </span>
    </button>
  );

  return (
    <div className="mt-2">
      <h2 className="font-display text-fire-gold text-2xl tracking-tight">
        Favorite rooms
      </h2>
      <p className="text-mist/80 mt-2 max-w-2xl text-base">
        Find keys to learn about my favorite escape rooms
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {LOCKS.map((lock) => {
          const isOpen = Boolean(unlocked[lock.id]);
          const shaking = shakeId === lock.id;
          const wrong = wrongFlash === lock.id;
          return (
            <div key={lock.id} className="flex flex-col gap-3">
              <div
                ref={(node) => {
                  lockRefs.current[lock.id] = node;
                }}
                className={`relative min-h-[9.5rem] rounded-2xl border px-4 py-4 transition-colors duration-300 ${
                  isOpen
                    ? "border-fire-gold/55 bg-fire/15"
                    : wrong
                      ? "border-red-400/60 bg-red-950/30"
                      : "border-fire/35 bg-[#140806]/80"
                } ${shaking ? "animate-pulse" : ""}`}
              >
                <p className="text-fire-gold/70 text-xs tracking-[0.18em] uppercase">
                  {lock.label}
                </p>
                {isOpen ? (
                  <div className="text-fire-gold mt-3 flex items-center gap-2">
                    <KeyGlyph id={lock.id} />
                    <span className="font-display text-sm tracking-wide">
                      Unlocked
                    </span>
                  </div>
                ) : (
                  <div className="text-mist/45 mt-4 flex flex-col items-center gap-2">
                    <span className="border-fire-gold/35 flex size-14 items-center justify-center rounded-full border border-dashed">
                      <span className="font-display text-fire-gold/40 text-2xl">
                        ?
                      </span>
                    </span>
                    <span className="text-center text-sm">{lock.hint}</span>
                  </div>
                )}
              </div>

              <div
                className={`min-h-[5.5rem] rounded-2xl border px-4 py-3 text-base leading-relaxed transition-all duration-500 ${
                  isOpen
                    ? "border-fire/35 bg-fire/10 text-mist opacity-100"
                    : "border-transparent bg-transparent text-transparent opacity-0"
                }`}
                aria-hidden={!isOpen}
              >
                {isOpen ? (
                  <>
                    <span className="font-display text-fire-gold">→</span>{" "}
                    {lock.room}
                  </>
                ) : (
                  "\u00a0"
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
        {!ropeSnapped ? (
          <svg className="pointer-events-none absolute inset-0 size-full">
            <line
              ref={ropeLineRef}
              x1="0"
              y1="0"
              x2="0"
              y2="0"
              stroke="#c4a574"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle ref={ropeKnotRef} cx="0" cy="0" r="4" fill="#8b7355" />
          </svg>
        ) : null}

        {bushButton("bush-a", "Drag bush aside")}
        {bushButton("bush-b", "Drag bush aside")}
        {keyButton("temple", templeFound)}
        {keyButton("gambling", chipSpawned)}
        {keyButton("zombie", skullReady)}

        <div className="pointer-events-auto absolute right-6 bottom-6 z-30 w-[9.5rem] sm:right-10 sm:bottom-10">
          <div className="border-fire-gold/40 rounded-xl border bg-[#1a0c08] p-3 shadow-[0_0_30px_rgba(255,90,20,0.25)]">
            <p className="text-fire-gold/70 text-center text-[10px] tracking-[0.16em] uppercase">
              Slots
            </p>
            <div className="mt-2 grid grid-cols-3 gap-1 rounded-md bg-black/50 p-1.5">
              {reels.map((sym, i) => (
                <div
                  key={`${sym}-${i}`}
                  className="font-display text-fire-gold flex h-10 items-center justify-center rounded bg-[#2a1510] text-sm"
                >
                  {sym}
                </div>
              ))}
            </div>
            <button
              type="button"
              disabled={spinning || chipSpawned}
              onClick={spinSlots}
              className="border-fire-gold/45 bg-fire/25 font-display text-fire-gold hover:bg-fire/40 mt-2 w-full rounded-full border py-1.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              {chipSpawned ? "Won" : spinning ? "…" : "Pull"}
            </button>
            <p className="text-mist/70 mt-1.5 text-center text-[11px]">
              {slotMsg}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
