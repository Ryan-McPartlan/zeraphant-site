"use client";

import Link from "next/link";
import {
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { StimphonyStage } from "~/components/passion/stimphony-stage";
import {
  STIMPHONY_DIALS,
  STIMPHONY_INTERVAL_MS,
  STIMPHONY_MAX_LEVEL,
  STIMPHONY_PRESETS,
  type StimphonyDial,
  type StimphonyDialId,
  stimphonyIntensity,
  stimphonyPresetLevels,
  stimphonyPresetVolumes,
} from "~/lib/passion/stimphony";

const FALLBACK_SING_MS = 1100;

/** Play a random clip; resolves with duration in ms (for singer animation). */
function playRandomSound(sounds: string[], volume: number): Promise<number> {
  if (sounds.length === 0) return Promise.resolve(FALLBACK_SING_MS);

  const src = sounds[Math.floor(Math.random() * sounds.length)]!;
  const audio = new Audio(src);
  audio.volume = Math.min(1, Math.max(0, volume));

  return new Promise((resolve) => {
    const finish = (durationMs: number) => {
      void audio.play().catch(() => {
        /* autoplay / missing file — ignore */
      });
      resolve(durationMs);
    };

    audio.addEventListener(
      "loadedmetadata",
      () => {
        const sec = audio.duration;
        const ms =
          Number.isFinite(sec) && sec > 0
            ? Math.round(sec * 1000)
            : FALLBACK_SING_MS;
        finish(ms);
      },
      { once: true },
    );
    audio.addEventListener("error", () => finish(FALLBACK_SING_MS), {
      once: true,
    });
    audio.load();
  });
}

function StimDial({
  dial,
  level,
  volume,
  onLevelChange,
  onVolumeChange,
  onBeat,
}: {
  dial: StimphonyDial;
  level: number;
  volume: number;
  onLevelChange: (level: number) => void;
  onVolumeChange: (volume: number) => void;
  onBeat: (durationMs: number) => void;
}) {
  const knobRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const onBeatRef = useRef(onBeat);
  const levelRef = useRef(level);
  const volumeRef = useRef(volume);
  const soundsRef = useRef(dial.sounds);
  /** Start of the current wait period (dial on, or last beat). */
  const periodStartRef = useRef(0);
  const timeoutRef = useRef(0);
  const active = level > 0;

  useEffect(() => {
    onBeatRef.current = onBeat;
  }, [onBeat]);

  useEffect(() => {
    soundsRef.current = dial.sounds;
  }, [dial.sounds]);

  useEffect(() => {
    levelRef.current = level;
  }, [level]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    if (!active) {
      window.clearTimeout(timeoutRef.current);
      periodStartRef.current = 0;
      return;
    }

    // Keep the period when only the level changes; start fresh when turning on
    if (periodStartRef.current === 0) {
      const ms = STIMPHONY_INTERVAL_MS[level] ?? 0;
      // Random phase so dials don't lock-step when armed together
      const offset = ms > 0 ? Math.random() * ms : 0;
      periodStartRef.current = performance.now() - offset;
    }

    let cancelled = false;

    const scheduleFromPeriod = () => {
      window.clearTimeout(timeoutRef.current);
      const ms = STIMPHONY_INTERVAL_MS[levelRef.current] ?? 0;
      if (ms <= 0 || cancelled) return;
      const elapsed = performance.now() - periodStartRef.current;
      // Cap: next beat arrives within the dial's interval from period start
      const wait = Math.max(0, ms - elapsed);
      timeoutRef.current = window.setTimeout(() => {
        if (cancelled) return;
        periodStartRef.current = performance.now();
        void playRandomSound(soundsRef.current, volumeRef.current).then(
          (durationMs) => {
            if (cancelled) return;
            onBeatRef.current(durationMs);
          },
        );
        scheduleFromPeriod();
      }, wait);
    };

    scheduleFromPeriod();

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutRef.current);
    };
  }, [active, level]);

  function levelFromPointer(clientX: number, clientY: number) {
    const el = knobRef.current;
    if (!el) return level;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    const deg = (Math.atan2(dx, -dy) * 180) / Math.PI;
    const min = -135;
    const max = 135;
    const clamped = Math.max(min, Math.min(max, deg));
    const t = (clamped - min) / (max - min);
    return Math.round(t * STIMPHONY_MAX_LEVEL);
  }

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    onLevelChange(levelFromPointer(e.clientX, e.clientY));
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    onLevelChange(levelFromPointer(e.clientX, e.clientY));
  }

  function onPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    dragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  }

  const rotation = -135 + (level / STIMPHONY_MAX_LEVEL) * 270;
  const intervalLabel =
    level <= 0
      ? "off"
      : `${((STIMPHONY_INTERVAL_MS[level] ?? 0) / 1000).toString().replace(/\.0$/, "")}s`;

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-display text-fire-gold text-center text-lg tracking-tight sm:text-xl">
        {dial.label}
      </p>
      <div
        ref={knobRef}
        role="slider"
        aria-label={`${dial.label} frequency`}
        aria-valuemin={0}
        aria-valuemax={STIMPHONY_MAX_LEVEL}
        aria-valuenow={level}
        aria-valuetext={intervalLabel}
        tabIndex={0}
        className="stim-dial relative size-28 cursor-grab touch-none select-none active:cursor-grabbing sm:size-32"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowUp") {
            e.preventDefault();
            onLevelChange(Math.min(STIMPHONY_MAX_LEVEL, level + 1));
          } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
            e.preventDefault();
            onLevelChange(Math.max(0, level - 1));
          }
        }}
      >
        <div className="stim-dial__face absolute inset-0 rounded-full" />
        <div
          className="stim-dial__needle absolute inset-0"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <span className="stim-dial__tip" />
        </div>
        <span className="font-fire text-fire-gold pointer-events-none absolute inset-0 grid place-items-center text-2xl">
          {level}
        </span>
      </div>
      <p className="text-fire-gold/70 font-display text-sm tracking-wide">
        {intervalLabel}
        {dial.sounds.length === 0 ? (
          <span className="text-mist/60"> · awaiting sounds</span>
        ) : null}
      </p>
      <label className="flex w-full max-w-[9rem] flex-col items-center gap-1">
        <span className="text-fire-gold/55 font-display text-xs tracking-[0.14em] uppercase">
          Vol {Math.round(volume * 100)}
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          aria-label={`${dial.label} volume`}
          className="stim-volume w-full"
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          onPointerDown={(e) => e.stopPropagation()}
        />
      </label>
    </div>
  );
}

export function StimmingPage() {
  const [levels, setLevels] = useState<Record<StimphonyDialId, number>>(
    () =>
      Object.fromEntries(STIMPHONY_DIALS.map((d) => [d.id, 6])) as Record<
        StimphonyDialId,
        number
      >,
  );
  const [volumes, setVolumes] = useState<Record<StimphonyDialId, number>>(
    () =>
      Object.fromEntries(STIMPHONY_DIALS.map((d) => [d.id, 0.02])) as Record<
        StimphonyDialId,
        number
      >,
  );
  const [libraries, setLibraries] = useState<
    Partial<Record<StimphonyDialId, string[]>>
  >({});
  const [beat, setBeat] = useState({ id: 0, durationMs: 1100 });
  const intensity = stimphonyIntensity(levels);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/stimphony/sounds")
      .then(
        (res) => res.json() as Promise<{ libraries: Record<string, string[]> }>,
      )
      .then((data) => {
        if (!cancelled) setLibraries(data.libraries ?? {});
      })
      .catch(() => {
        /* empty libraries until sounds exist */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const dials = STIMPHONY_DIALS.map((dial) => ({
    ...dial,
    sounds: libraries[dial.id] ?? dial.sounds,
  }));

  return (
    <main className="relative min-h-dvh px-6 py-24 sm:px-12 lg:px-20">
      <div className="relative z-10 mx-auto max-w-5xl">
        <Link
          href="/passion"
          className="text-fire-gold/70 hover:text-fire-gold text-sm tracking-[0.18em] uppercase transition-colors"
        >
          ← Back to Passion
        </Link>

        <p className="text-fire-gold mt-8 text-sm tracking-[0.22em] uppercase">
          Passion · Stimming
        </p>
        <h1 className="font-fire text-fire-gold mt-4 text-5xl leading-[0.95] tracking-wide sm:text-7xl">
          Stimming
        </h1>
        <p className="font-display text-fire-gold/85 mt-6 max-w-2xl text-xl leading-relaxed sm:text-2xl">
          There is no greater joy in this world than adding a new stimmy noise
          to my collection.
        </p>
        <p className="font-display text-mist mt-4 max-w-2xl text-lg leading-relaxed">
          Feel free to attempt to create a{" "}
          <span className="text-fire-gold font-fire tracking-wide">
            STIMPHONY
          </span>{" "}
          of your own — but be warned, you may not be ready for a glimpse inside
          of my twisted mind…
        </p>

        <section className="mt-14">
          <h2 className="font-fire text-fire-gold text-3xl tracking-wide sm:text-4xl">
            The STIMPHONY
          </h2>
          <p className="text-mist mt-3 max-w-xl text-base">
            Glimpse inside the mind of a savant
          </p>

          <StimphonyStage
            intensity={intensity}
            beatId={beat.id}
            beatDurationMs={beat.durationMs}
          />

          <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {dials.map((dial) => (
              <StimDial
                key={dial.id}
                dial={dial}
                level={levels[dial.id] ?? 0}
                volume={volumes[dial.id] ?? 0.2}
                onLevelChange={(next) =>
                  setLevels((prev) => ({ ...prev, [dial.id]: next }))
                }
                onVolumeChange={(next) =>
                  setVolumes((prev) => ({ ...prev, [dial.id]: next }))
                }
                onBeat={(durationMs) =>
                  setBeat((b) => ({ id: b.id + 1, durationMs }))
                }
              />
            ))}
          </div>

          <div className="mt-10">
            <h3 className="font-fire text-fire-gold text-2xl tracking-wide sm:text-3xl">
              Stimphonies I&apos;ve composed
            </h3>
            <p className="text-mist mt-2 text-sm">
              Click a score to set the dials and volumes.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {STIMPHONY_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className="border-fire/40 text-fire-gold hover:bg-fire/15 font-display rounded-full border px-4 py-2 text-sm tracking-wide transition-colors"
                  onClick={() => {
                    setLevels(stimphonyPresetLevels(preset));
                    setVolumes(stimphonyPresetVolumes(preset));
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="border-fire/40 text-fire-gold hover:bg-fire/15 font-display mt-10 rounded-full border px-5 py-2 text-sm tracking-wide transition-colors"
            onClick={() =>
              setLevels(
                Object.fromEntries(
                  STIMPHONY_DIALS.map((d) => [d.id, 0]),
                ) as Record<StimphonyDialId, number>,
              )
            }
          >
            Silence the orchestra
          </button>
        </section>
      </div>
    </main>
  );
}
