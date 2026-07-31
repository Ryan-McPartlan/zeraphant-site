"use client";

import Matter from "matter-js";
import Image from "next/image";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

import { api } from "~/trpc/react";

type Tip = {
  id: string;
  body: string;
  fromName?: string | null;
  stamp?: number | null;
};

const MAX_BODY = 800;
const BALL_R = 42;
const SEAL_MS = 1100;

const LETTER_STAMPS = [
  "/connection/stamps/forever-usa.png",
  "/connection/stamps/pika.png",
  "/connection/stamps/flax.png",
  "/connection/stamps/luna-moth.png",
  "/connection/stamps/jersey-guinea.png",
  "/connection/stamps/fujeira-guinea.png",
  "/connection/stamps/axolotl.png",
] as const;

function stampSrc(stamp: number | null | undefined) {
  const index =
    typeof stamp === "number" && stamp >= 0 && stamp < LETTER_STAMPS.length
      ? stamp
      : 0;
  return LETTER_STAMPS[index]!;
}

function tipLabel(body: string) {
  const trimmed = body.trim().replace(/\s+/g, " ");
  if (trimmed.length <= 28) return trimmed;
  return `${trimmed.slice(0, 26)}…`;
}

/** Random point in the lower half of the physics floor */
function randomFloorSpawn(width: number, height: number) {
  const pad = BALL_R + 8;
  const x = pad + Math.random() * Math.max(1, width - pad * 2);
  const yMin = Math.max(pad, height * 0.5);
  const yMax = Math.max(yMin + 1, height - pad);
  const y = yMin + Math.random() * (yMax - yMin);
  return { x, y };
}

type SealAnim = {
  body: string;
  tipId: string;
  form: { left: number; top: number; width: number; height: number };
  edge: { left: number; top: number };
  pit: { left: number; top: number };
  active: boolean;
};

export function WateringGarden() {
  const tipsQuery = api.gardenTip.list.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const utils = api.useUtils();

  const formRef = useRef<HTMLFormElement>(null);
  const pitRef = useRef<HTMLDivElement>(null);

  const [draft, setDraft] = useState("");
  const [fromName, setFromName] = useState("");
  const [stamp, setStamp] = useState(0);
  const [confirming, setConfirming] = useState(false);
  const [openTip, setOpenTip] = useState<Tip | null>(null);
  const [localTips, setLocalTips] = useState<Tip[]>([]);
  const [seal, setSeal] = useState<SealAnim | null>(null);
  const [spawnId, setSpawnId] = useState<string | null>(null);
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  const submit = api.gardenTip.submit.useMutation();

  const tips = useMemo(() => {
    const fromServer = tipsQuery.data ?? [];
    const merged: Tip[] = [];
    const seen = new Set<string>();
    for (const tip of [...localTips, ...fromServer]) {
      if (seen.has(tip.id)) continue;
      seen.add(tip.id);
      merged.push(tip);
    }
    return merged.slice(0, 50);
  }, [tipsQuery.data, localTips]);

  const startSeal = async () => {
    const body = draft.trim();
    if (body.length < 12 || body.length > MAX_BODY) return;
    if (submit.isPending || seal) return;

    const formEl = formRef.current;
    const pitEl = pitRef.current;
    if (!formEl || !pitEl) return;

    const formRect = formEl.getBoundingClientRect();
    const pitRect = pitEl.getBoundingClientRect();
    const pad = BALL_R + 8;

    const edgeSide = Math.floor(Math.random() * 4);
    const edge =
      edgeSide === 0
        ? { left: -120, top: window.innerHeight * 0.35 }
        : edgeSide === 1
          ? { left: window.innerWidth + 40, top: window.innerHeight * 0.4 }
          : edgeSide === 2
            ? { left: window.innerWidth * 0.45, top: -120 }
            : { left: window.innerWidth * 0.5, top: window.innerHeight + 40 };

    let tip: Tip;
    try {
      tip = await submit.mutateAsync({
        body,
        fromName: fromName.trim() || undefined,
        stamp,
      });
    } catch {
      return;
    }

    setLocalTips((prev) => [tip, ...prev.filter((t) => t.id !== tip.id)]);
    setDraft("");
    setFromName("");
    setStamp(0);
    setConfirming(false);

    setSeal({
      body: tip.body,
      tipId: tip.id,
      form: {
        left: formRect.left,
        top: formRect.top,
        width: formRect.width,
        height: formRect.height,
      },
      edge,
      pit: {
        left:
          pad +
          Math.random() * Math.max(1, pitRect.width - pad * 2) +
          pitRect.left,
        top:
          pitRect.top +
          Math.max(pad, pitRect.height * 0.5) +
          Math.random() * Math.max(1, pitRect.height * 0.5 - pad),
      },
      active: false,
    });

    // Next frame → CSS transitions engage
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setSeal((s) => (s ? { ...s, active: true } : null));
      });
    });

    window.setTimeout(() => {
      setSeal(null);
      setSpawnId(tip.id);
      void utils.gardenTip.list.invalidate();
    }, SEAL_MS);
  };

  return (
    <div className="space-y-10 pb-[min(42vh,24rem)]">
      <div className="text-gold/85 space-y-5 text-lg">
        <p>
          If anyone has advice on how they nurture their connections, let me and
          the rest of our shared community know!
        </p>
      </div>

      <form
        ref={formRef}
        className={`connection-notecard rounded-sm px-6 py-8 sm:px-10 sm:py-10 ${
          seal ? "invisible" : ""
        }`}
        onSubmit={(e) => {
          e.preventDefault();
          const body = draft.trim();
          if (body.length < 12 || body.length > MAX_BODY) return;
          if (!confirming) {
            setConfirming(true);
            return;
          }
          void startSeal();
        }}
      >
        <p className="font-hand text-2xl text-[#2a1f0a] sm:text-3xl">
          Share how you water the garden
        </p>
        <p className="font-hand mt-2 text-base text-[#2a1f0a]/75">
          One paragraph. Once saved, it stays on the site forever. Your
          sincerity is appreciated &lt;3.
        </p>
        <textarea
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            if (confirming) setConfirming(false);
          }}
          rows={5}
          maxLength={MAX_BODY}
          placeholder="What actually works for you?"
          className="font-hand mt-6 w-full px-3 py-2 text-lg"
          required
          minLength={12}
          disabled={Boolean(seal) || submit.isPending}
        />
        <label className="font-hand mt-4 block text-base text-[#2a1f0a]/75">
          Your name <span className="text-[#2a1f0a]/50">(optional)</span>
          <input
            type="text"
            value={fromName}
            onChange={(e) => {
              setFromName(e.target.value);
              if (confirming) setConfirming(false);
            }}
            maxLength={80}
            placeholder="Leave blank to stay anonymous"
            className="font-hand mt-2 w-full px-1 py-1 text-lg"
            disabled={Boolean(seal) || submit.isPending}
          />
        </label>
        <fieldset className="mt-6">
          <legend className="font-hand text-base text-[#2a1f0a]/85">
            Don&apos;t forget to stamp your letter
          </legend>
          <div className="mt-3 flex flex-wrap gap-2.5">
            {LETTER_STAMPS.map((src, index) => {
              const selected = stamp === index;
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => {
                    setStamp(index);
                    if (confirming) setConfirming(false);
                  }}
                  disabled={Boolean(seal) || submit.isPending}
                  aria-pressed={selected}
                  aria-label={`Stamp ${index + 1}`}
                  className={`rounded-sm p-1 transition-[box-shadow,transform] ${
                    selected
                      ? "bg-[rgba(255,210,80,0.45)] shadow-[0_0_0_2px_rgba(120,80,20,0.65)]"
                      : "hover:bg-[rgba(255,210,80,0.2)]"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    width={56}
                    height={72}
                    className="h-14 w-auto object-contain"
                  />
                </button>
              );
            })}
          </div>
        </fieldset>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {confirming ? (
            <>
              <p className="font-hand w-full text-base text-[#6a4a18]">
                Really save this forever for everyone to see?
              </p>
              <button
                type="submit"
                disabled={submit.isPending}
                className="font-hand rounded-full border border-[rgba(60,40,15,0.45)] bg-[rgba(255,210,80,0.45)] px-4 py-2 text-lg text-[#2a1f0a] transition-colors hover:bg-[rgba(255,210,80,0.65)] disabled:opacity-60"
              >
                {submit.isPending ? "Sealing…" : "Yes — save forever"}
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="font-hand rounded-full border border-[rgba(60,40,15,0.35)] px-4 py-2 text-lg text-[#2a1f0a]/80 transition-colors hover:bg-[rgba(255,210,80,0.2)]"
              >
                Not yet
              </button>
            </>
          ) : (
            <button
              type="submit"
              disabled={draft.trim().length < 12 || submit.isPending}
              className="font-hand rounded-full border border-[rgba(60,40,15,0.45)] bg-[rgba(255,210,80,0.35)] px-4 py-2 text-lg text-[#2a1f0a] transition-colors hover:bg-[rgba(255,210,80,0.55)] disabled:opacity-40"
            >
              Send to the garden
            </button>
          )}
        </div>
        {submit.error ? (
          <p className="font-hand mt-3 text-base text-[#8b2e1a]">
            {submit.error.message}
          </p>
        ) : null}
      </form>

      {mounted && !tipsQuery.isLoading
        ? createPortal(
            <div
              ref={pitRef}
              className="pointer-events-none fixed inset-x-0 bottom-0 z-20 h-[min(40vh,22rem)]"
            >
              <div className="h-full w-full">
                <TipBallPit
                  tips={tips}
                  hideIds={seal ? [seal.tipId] : []}
                  spawnId={spawnId}
                  onSpawned={() => setSpawnId(null)}
                  onSelect={setOpenTip}
                />
              </div>
            </div>,
            document.body,
          )
        : null}

      {mounted && seal
        ? createPortal(<SealOverlay seal={seal} />, document.body)
        : null}

      {openTip ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-4 sm:items-center"
          role="dialog"
          aria-modal
          aria-label="Garden letter"
          onClick={() => setOpenTip(null)}
        >
          <div
            className="garden-letter-sheet max-h-[75vh] w-full max-w-lg overflow-y-auto px-7 py-9 sm:px-11 sm:py-11"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <p className="font-hand text-sm tracking-[0.12em] text-[#6a4a18]/80 uppercase">
                A letter for the garden
              </p>
              <Image
                src={stampSrc(openTip.stamp)}
                alt=""
                width={88}
                height={112}
                className="garden-letter-stamp h-auto w-[4.75rem] shrink-0 sm:w-[5.25rem]"
              />
            </div>
            <p className="font-hand text-xl text-[#2a1f0a]/70">Dear garden,</p>
            <p className="font-hand mt-4 text-xl leading-relaxed whitespace-pre-wrap text-[#2a1f0a] sm:text-2xl">
              {openTip.body}
            </p>
            {openTip.fromName ? (
              <p className="font-hand mt-8 text-right text-lg text-[#2a1f0a]/80">
                Your friend, {openTip.fromName}
              </p>
            ) : (
              <p className="font-hand mt-8 text-right text-lg text-[#2a1f0a]/70">
                — a friend in the garden
              </p>
            )}
            <button
              type="button"
              onClick={() => setOpenTip(null)}
              className="font-hand mt-8 text-lg text-[#6a4a18] underline decoration-[#6a4a18]/40 underline-offset-4"
            >
              Fold it closed
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SealOverlay({ seal }: { seal: SealAnim }) {
  const noteStyle: CSSProperties = seal.active
    ? {
        left: seal.pit.left,
        top: seal.pit.top,
        width: BALL_R * 2,
        height: BALL_R * 2,
        borderRadius: "9999px",
        transform: "translate(-50%, -50%) scale(1)",
        opacity: 0.95,
      }
    : {
        left: seal.form.left,
        top: seal.form.top,
        width: seal.form.width,
        height: seal.form.height,
        borderRadius: "2px",
        transform: "translate(0, 0) scale(1)",
        opacity: 1,
      };

  const ballStyle: CSSProperties = seal.active
    ? {
        left: seal.pit.left,
        top: seal.pit.top,
        width: BALL_R * 2,
        height: BALL_R * 2,
        transform: "translate(-50%, -50%) scale(1)",
        opacity: 0,
      }
    : {
        left: seal.edge.left,
        top: seal.edge.top,
        width: 220,
        height: 220,
        transform: "translate(-50%, -50%) scale(1)",
        opacity: 0.9,
      };

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      <div
        className="garden-letter-ball font-hand absolute overflow-hidden text-[0.65rem] leading-tight text-[#2a1f0a] shadow-lg transition-[left,top,width,height,border-radius,transform,opacity] duration-[1100ms] ease-in-out"
        style={noteStyle}
      >
        <div
          className={`flex h-full w-full items-center justify-center p-3 text-center ${
            seal.active ? "opacity-100" : "opacity-90"
          }`}
        >
          {seal.active ? tipLabel(seal.body) : seal.body}
        </div>
      </div>
      <div
        className="garden-letter-ball absolute transition-[left,top,width,height,transform,opacity] duration-[1100ms] ease-in-out"
        style={ballStyle}
      />
    </div>
  );
}

function TipBallPit({
  tips,
  hideIds,
  spawnId,
  onSpawned,
  onSelect,
}: {
  tips: Tip[];
  hideIds: string[];
  spawnId: string | null;
  onSpawned: () => void;
  onSelect: (tip: Tip) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<Map<string, Matter.Body>>(new Map());
  const visibleTips = useMemo(
    () => tips.filter((t) => !hideIds.includes(t.id)),
    [tips, hideIds],
  );
  const tipsRef = useRef(visibleTips);

  useEffect(() => {
    tipsRef.current = visibleTips;
  }, [visibleTips]);

  const [positions, setPositions] = useState<
    Record<string, { x: number; y: number; angle: number }>
  >({});

  const syncBodies = useCallback((width: number, height: number) => {
    const engine = engineRef.current;
    if (!engine) return;
    const bodies = bodiesRef.current;
    const current = new Set(tipsRef.current.map((t) => t.id));

    for (const [id, body] of bodies) {
      if (!current.has(id)) {
        Matter.Composite.remove(engine.world, body);
        bodies.delete(id);
      }
    }

    tipsRef.current.forEach((tip) => {
      if (bodies.has(tip.id)) return;
      const { x, y } = randomFloorSpawn(width, height);
      const body = Matter.Bodies.circle(x, y, BALL_R, {
        restitution: 0.72,
        friction: 0.08,
        frictionAir: 0.012,
        density: 0.0018,
        label: tip.id,
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.12);
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 3,
        y: (Math.random() - 0.5) * 1.5,
      });
      Matter.Composite.add(engine.world, body);
      bodies.set(tip.id, body);
    });

    for (const body of bodies.values()) {
      const { x, y } = body.position;
      const nx = Math.min(width - BALL_R, Math.max(BALL_R, x));
      const ny = Math.min(height - BALL_R, Math.max(BALL_R, y));
      if (nx !== x || ny !== y) Matter.Body.setPosition(body, { x: nx, y: ny });
    }
  }, []);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 0.55 } });
    engineRef.current = engine;

    let wallBodies: Matter.Body[] = [];
    const layoutWalls = (w: number, h: number) => {
      for (const wall of wallBodies)
        Matter.Composite.remove(engine.world, wall);
      const t = 40;
      wallBodies = [
        Matter.Bodies.rectangle(w / 2, h + t / 2, w + t * 2, t, {
          isStatic: true,
        }),
        Matter.Bodies.rectangle(w / 2, -t / 2, w + t * 2, t, {
          isStatic: true,
        }),
        Matter.Bodies.rectangle(-t / 2, h / 2, t, h + t * 2, {
          isStatic: true,
        }),
        Matter.Bodies.rectangle(w + t / 2, h / 2, t, h + t * 2, {
          isStatic: true,
        }),
      ];
      Matter.Composite.add(engine.world, wallBodies);
    };

    const rect = host.getBoundingClientRect();
    layoutWalls(rect.width, rect.height);
    syncBodies(rect.width, rect.height);

    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(32, now - last);
      last = now;
      Matter.Engine.update(engine, dt);

      const next: Record<string, { x: number; y: number; angle: number }> = {};
      for (const [id, body] of bodiesRef.current) {
        next[id] = {
          x: body.position.x,
          y: body.position.y,
          angle: body.angle,
        };
      }
      setPositions(next);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => {
      const r = host.getBoundingClientRect();
      layoutWalls(r.width, r.height);
      syncBodies(r.width, r.height);
    });
    const bodies = bodiesRef.current;
    ro.observe(host);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      Matter.Engine.clear(engine);
      engineRef.current = null;
      bodies.clear();
    };
  }, [syncBodies]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !engineRef.current) return;
    const r = host.getBoundingClientRect();
    syncBodies(r.width, r.height);
  }, [visibleTips, syncBodies]);

  useEffect(() => {
    if (!spawnId) return;
    const host = hostRef.current;
    if (!host) {
      onSpawned();
      return;
    }

    let frames = 0;
    let raf = 0;
    const trySpawn = () => {
      const body = bodiesRef.current.get(spawnId);
      if (!body) {
        frames += 1;
        if (frames > 30) {
          onSpawned();
          return;
        }
        raf = requestAnimationFrame(trySpawn);
        return;
      }
      const r = host.getBoundingClientRect();
      const { x, y } = randomFloorSpawn(r.width, r.height);
      Matter.Body.setPosition(body, { x, y });
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 2,
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.25);
      onSpawned();
    };
    raf = requestAnimationFrame(trySpawn);
    return () => cancelAnimationFrame(raf);
  }, [spawnId, visibleTips, onSpawned]);

  useEffect(() => {
    const id = window.setInterval(() => {
      for (const body of bodiesRef.current.values()) {
        if (Math.random() > 0.35) continue;
        Matter.Body.applyForce(body, body.position, {
          x: (Math.random() - 0.5) * 0.0025,
          y: -Math.random() * 0.0015,
        });
      }
    }, 1800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      ref={hostRef}
      className="pointer-events-none relative h-full w-full overflow-hidden"
    >
      {visibleTips.length === 0 ? (
        <p className="text-gold/45 font-hand pointer-events-none absolute inset-x-0 bottom-8 flex justify-center px-6 text-center text-lg">
          No seeds yet — be the first to share.
        </p>
      ) : null}
      {visibleTips.map((tip) => {
        const pos = positions[tip.id];
        if (!pos) return null;
        return (
          <button
            key={tip.id}
            type="button"
            onClick={() => onSelect(tip)}
            className="garden-letter-ball font-hand pointer-events-auto absolute flex size-[84px] items-center justify-center px-2 text-center text-[0.65rem] leading-tight text-[#2a1f0a] transition-shadow hover:brightness-105"
            style={{
              left: pos.x,
              top: pos.y,
              transform: `translate(-50%, -50%) rotate(${pos.angle}rad)`,
            }}
            title={tip.body}
          >
            {tipLabel(tip.body)}
          </button>
        );
      })}
    </div>
  );
}
