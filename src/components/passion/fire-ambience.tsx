"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type FireNodes = {
  ctx: AudioContext;
  master: GainNode;
  stopCrackle: () => void;
  roarSource: AudioBufferSourceNode;
};

function createNoiseBuffer(ctx: AudioContext, seconds: number) {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

function startFireGraph(ctx: AudioContext, master: GainNode): FireNodes {
  const roarSource = ctx.createBufferSource();
  roarSource.buffer = createNoiseBuffer(ctx, 2);
  roarSource.loop = true;

  const roarFilter = ctx.createBiquadFilter();
  roarFilter.type = "lowpass";
  roarFilter.frequency.value = 280;
  roarFilter.Q.value = 0.7;

  const roarGain = ctx.createGain();
  roarGain.gain.value = 0.12;

  roarSource.connect(roarFilter);
  roarFilter.connect(roarGain);
  roarGain.connect(master);
  roarSource.start();

  let crackleTimer = 0;
  let stopped = false;

  const spitCrack = () => {
    if (stopped || ctx.state === "closed") return;

    const burst = ctx.createBufferSource();
    burst.buffer = createNoiseBuffer(ctx, 0.18);

    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 900 + Math.random() * 2400;
    band.Q.value = 0.6 + Math.random() * 1.4;

    const high = ctx.createBiquadFilter();
    high.type = "highpass";
    high.frequency.value = 400 + Math.random() * 600;

    const gain = ctx.createGain();
    const now = ctx.currentTime;
    const peak = 0.04 + Math.random() * 0.09;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(peak, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      now + 0.05 + Math.random() * 0.12,
    );

    burst.connect(band);
    band.connect(high);
    high.connect(gain);
    gain.connect(master);
    burst.start(now);
    burst.stop(now + 0.2);

    if (Math.random() < 0.18) {
      const pop = ctx.createOscillator();
      const popGain = ctx.createGain();
      pop.type = "triangle";
      pop.frequency.setValueAtTime(80 + Math.random() * 60, now);
      pop.frequency.exponentialRampToValueAtTime(30, now + 0.08);
      popGain.gain.setValueAtTime(0.0001, now);
      popGain.gain.exponentialRampToValueAtTime(0.03, now + 0.01);
      popGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
      pop.connect(popGain);
      popGain.connect(master);
      pop.start(now);
      pop.stop(now + 0.12);
    }
  };

  const scheduleCracks = () => {
    if (stopped) return;
    spitCrack();
    crackleTimer = window.setTimeout(scheduleCracks, 40 + Math.random() * 180);
  };
  scheduleCracks();

  return {
    ctx,
    master,
    roarSource,
    stopCrackle: () => {
      stopped = true;
      window.clearTimeout(crackleTimer);
    },
  };
}

export function FireAmbience() {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const nodesRef = useRef<FireNodes | null>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const arm = () => setReady(true);
    window.addEventListener("pointerdown", arm, { once: true });
    return () => window.removeEventListener("pointerdown", arm);
  }, [reduceMotion]);

  useEffect(() => {
    if (!ready || reduceMotion) return;

    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const nodes = startFireGraph(ctx, master);
    nodesRef.current = nodes;

    void ctx.resume().then(() => {
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(0.55, now + 1.4);
      setEnabled(true);
    });

    return () => {
      nodes.stopCrackle();
      try {
        nodes.roarSource.stop();
      } catch {
        // already stopped
      }
      void ctx.close();
      nodesRef.current = null;
    };
  }, [ready, reduceMotion]);

  const toggle = () => {
    const nodes = nodesRef.current;
    if (!nodes) {
      setReady(true);
      return;
    }
    const { ctx, master } = nodes;
    const now = ctx.currentTime;
    if (enabled) {
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now);
      master.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      setEnabled(false);
    } else {
      void ctx.resume();
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(0.0001, now);
      master.gain.exponentialRampToValueAtTime(0.55, now + 0.5);
      setEnabled(true);
    }
  };

  if (reduceMotion) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      className="border-fire-gold/35 bg-ink/80 text-fire-gold hover:bg-fire/20 pointer-events-auto fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm shadow-[0_0_20px_rgba(255,90,20,0.25)] backdrop-blur-md transition-colors sm:right-6 sm:bottom-6"
      aria-pressed={enabled}
      aria-label={enabled ? "Douse flame" : "Ignite fire"}
    >
      {enabled ? (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="size-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
          <path d="M16 9a4 4 0 0 1 0 6" />
          <path d="M19 7a7 7 0 0 1 0 10" />
        </svg>
      ) : (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="size-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
          <path d="m23 9-6 6" />
          <path d="m17 9 6 6" />
        </svg>
      )}
      <span>{enabled ? "Douse flame" : "Ignite fire"}</span>
    </button>
  );
}
