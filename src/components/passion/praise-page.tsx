"use client";

import Link from "next/link";
import {
  type FormEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { api } from "~/trpc/react";

type TabId = "muscle" | "fire" | "light";

const TABS: {
  id: TabId;
  label: string;
  icon: ReactNode;
  glow: string;
  active: string;
}[] = [
  {
    id: "muscle",
    label: "Good Man — admiration",
    glow: "shadow-[0_0_24px_rgba(91,141,239,0.55)]",
    active: "bg-[#5b8def]/25 ring-2 ring-[#7ee0ff]",
    icon: <MuscleIcon />,
  },
  {
    id: "fire",
    label: "Good Boy — voice note",
    glow: "shadow-[0_0_24px_rgba(255,59,31,0.55)]",
    active: "bg-fire/25 ring-2 ring-fire",
    icon: <FireIcon />,
  },
  {
    id: "light",
    label: "Good Person — drawing",
    glow: "shadow-[0_0_24px_rgba(255,210,74,0.55)]",
    active: "bg-gold/20 ring-2 ring-gold",
    icon: <LightIcon />,
  },
];

const BACKDROPS: Record<TabId, string> = {
  muscle:
    "bg-[radial-gradient(ellipse_70%_55%_at_20%_15%,rgba(126,224,255,0.28),transparent_55%),radial-gradient(ellipse_55%_45%_at_85%_80%,rgba(91,141,239,0.22),transparent_50%),linear-gradient(165deg,#071018_0%,#0a1628_50%,#132a4a_100%)]",
  fire: "bg-[radial-gradient(ellipse_70%_55%_at_80%_20%,rgba(255,59,31,0.35),transparent_55%),radial-gradient(ellipse_50%_40%_at_20%_85%,rgba(255,209,102,0.12),transparent_50%),linear-gradient(165deg,#120504_0%,#1a0604_50%,#3a0c08_100%)]",
  light:
    "bg-[radial-gradient(ellipse_70%_55%_at_50%_10%,rgba(255,210,74,0.32),transparent_55%),radial-gradient(ellipse_50%_40%_at_70%_90%,rgba(255,209,102,0.14),transparent_50%),linear-gradient(165deg,#141004_0%,#1a1404_50%,#3a2a08_100%)]",
};

const GOOD_BOY_EMBERS = [
  { left: "8%", size: "5px", dur: "1.1s", delay: "0s", drift: "10px" },
  { left: "22%", size: "4px", dur: "1.35s", delay: "0.2s", drift: "-8px" },
  { left: "38%", size: "6px", dur: "1.05s", delay: "0.45s", drift: "14px" },
  { left: "52%", size: "4px", dur: "1.4s", delay: "0.1s", drift: "-12px" },
  { left: "66%", size: "5px", dur: "1.15s", delay: "0.55s", drift: "6px" },
  { left: "78%", size: "3px", dur: "1.25s", delay: "0.3s", drift: "-10px" },
  { left: "90%", size: "5px", dur: "1.2s", delay: "0.7s", drift: "8px" },
  { left: "30%", size: "3px", dur: "0.95s", delay: "0.85s", drift: "-6px" },
  { left: "58%", size: "4px", dur: "1.3s", delay: "0.4s", drift: "11px" },
  { left: "14%", size: "3px", dur: "1.1s", delay: "0.95s", drift: "-14px" },
] as const;

export function PraisePage() {
  const [tab, setTab] = useState<TabId>("muscle");

  return (
    <main
      className={`relative flex min-h-dvh flex-col overflow-hidden px-6 py-20 transition-[background] duration-500 sm:px-12 lg:px-20 ${BACKDROPS[tab]}`}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col">
        <Link
          href="/passion"
          className="text-fire-gold/70 hover:text-fire-gold w-fit text-sm tracking-[0.18em] uppercase transition-colors"
        >
          ← Back to Passion
        </Link>

        <p className="text-fire-gold mt-6 text-sm tracking-[0.22em] uppercase">
          Passion · Praise
        </p>
        <h1 className="font-fire text-fire-gold mt-3 text-5xl leading-[0.95] tracking-wide sm:text-6xl">
          Praise
        </h1>
        <p className="font-display text-fire-gold/85 mt-3 text-xl sm:text-2xl">
          Oh ya. I know.
        </p>
        <p className="text-mist mt-4 max-w-xl text-base sm:text-lg">
          One of the few joys greater than the sound of my own voice is the
          sound of my name. Go ahead and tell me I&apos;m special.
        </p>

        <div
          role="tablist"
          aria-label="Praise offerings"
          className="mt-10 flex items-center gap-4"
        >
          {TABS.map((t) => {
            const selected = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${t.id}`}
                id={`tab-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`flex size-14 items-center justify-center rounded-full transition-all duration-300 sm:size-16 ${
                  selected
                    ? `${t.active} ${t.glow} scale-110`
                    : "bg-white/5 opacity-70 ring-1 ring-white/15 hover:opacity-100 hover:ring-white/35"
                }`}
              >
                <span className="sr-only">{t.label}</span>
                <span aria-hidden className="size-7 sm:size-8">
                  {t.icon}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex-1 pb-8">
          {tab === "muscle" ? <GoodManPanel /> : null}
          {tab === "fire" ? <GoodBoyPanel /> : null}
          {tab === "light" ? <GoodPersonPanel /> : null}
        </div>
      </div>
    </main>
  );
}

function GoodManPanel() {
  const [message, setMessage] = useState("");
  const [fromName, setFromName] = useState("");
  const [done, setDone] = useState(false);
  const submit = api.praise.submitMessage.useMutation({
    onSuccess: () => {
      setDone(true);
      setMessage("");
      setFromName("");
    },
  });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!message.trim() || submit.isPending) return;
    submit.mutate({
      message: message.trim(),
      fromName: fromName.trim() || undefined,
    });
  }

  return (
    <div
      role="tabpanel"
      id="panel-muscle"
      aria-labelledby="tab-muscle"
      className="animate-page-in"
    >
      <h2 className="font-display text-3xl leading-[1.05] tracking-tight text-[#b8e6ff] sm:text-4xl">
        Tell me I&apos;m a Good Man.
      </h2>
      <p className="mt-3 text-[#9ec5e0]">
        Tell me something you admire — a quality, a moment, a habit worth
        keeping.
      </p>

      {done ? (
        <p className="font-display mt-10 text-2xl text-[#b8e6ff]">
          Received. I&apos;ll pretend I already knew.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="sr-only">Admiration</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              maxLength={2000}
              required
              placeholder="Something I admire in you is…"
              className="w-full resize-y rounded-2xl border border-[#5b8def]/55 bg-[#0a1628]/70 px-5 py-4 text-lg text-[#e8f4ff] outline-none placeholder:text-[#7aa0c0]/70 focus:border-[#7ee0ff] focus:ring-2 focus:ring-[#7ee0ff]/30"
            />
          </label>
          <label className="block">
            <span className="sr-only">Your name</span>
            <input
              type="text"
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              maxLength={80}
              placeholder="Your name (optional)"
              className="w-full rounded-2xl border border-[#5b8def]/40 bg-[#0a1628]/70 px-5 py-3 text-[#e8f4ff] outline-none placeholder:text-[#7aa0c0]/70 focus:border-[#7ee0ff] focus:ring-2 focus:ring-[#7ee0ff]/30"
            />
          </label>
          {submit.error ? (
            <p className="text-coral text-sm">
              Couldn&apos;t send — try again in a moment.
            </p>
          ) : null}
          <button
            type="submit"
            disabled={submit.isPending || !message.trim()}
            className="rounded-full bg-[#5b8def] px-7 py-3 text-sm font-semibold tracking-[0.14em] text-[#061018] uppercase transition hover:bg-[#7ee0ff] disabled:opacity-40"
          >
            {submit.isPending ? "Sending…" : "Send admiration"}
          </button>
        </form>
      )}
    </div>
  );
}

function GoodBoyPanel() {
  const [unlocked, setUnlocked] = useState(false);
  const [fromName, setFromName] = useState("");
  const [leaderboardConsent, setLeaderboardConsent] = useState(false);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  type BoardEntry = { rank: number; name: string; src: string };
  const [board, setBoard] = useState<BoardEntry[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const tickRef = useRef<number | null>(null);
  const boardAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    void fetch("/api/praise/good-boy-leaderboard")
      .then((res) => res.json() as Promise<{ entries?: BoardEntry[] }>)
      .then((data) => {
        if (Array.isArray(data.entries)) setBoard(data.entries);
      })
      .catch(() => {
        setBoard([]);
      });

    return () => {
      boardAudioRef.current?.pause();
      boardAudioRef.current = null;
    };
  }, []);

  const submit = api.praise.submitAudio.useMutation({
    onSuccess: () => {
      setDone(true);
      cleanupPreview();
      setFromName("");
      setLeaderboardConsent(false);
    },
  });

  const cleanupPreview = useCallback(() => {
    setBlobUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setDataUrl(null);
    setSeconds(0);
  }, []);

  useEffect(() => {
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  async function startRecording() {
    setMicError(null);
    cleanupPreview();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
          ? "audio/webm"
          : "";
      const recorder = mime
        ? new MediaRecorder(stream, { mimeType: mime })
        : new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });
        setBlobUrl(URL.createObjectURL(blob));
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === "string") setDataUrl(reader.result);
        };
        reader.readAsDataURL(blob);
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecording(true);
      setSeconds(0);
      tickRef.current = window.setInterval(() => {
        setSeconds((s) => {
          const next = s + 1;
          if (next >= 10) {
            window.setTimeout(() => stopRecording(), 0);
            return 10;
          }
          return next;
        });
      }, 1000);
    } catch {
      setMicError("Mic access denied — I need it to hear your good boy.");
    }
  }

  function stopRecording() {
    if (tickRef.current) {
      window.clearInterval(tickRef.current);
      tickRef.current = null;
    }
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") recorder.stop();
    mediaRecorderRef.current = null;
    setRecording(false);
  }

  function send() {
    if (!dataUrl || submit.isPending) return;
    submit.mutate({
      mediaData: dataUrl,
      fromName: fromName.trim() || undefined,
      leaderboardConsent,
    });
  }

  return (
    <div
      role="tabpanel"
      id="panel-fire"
      aria-labelledby="tab-fire"
      className="animate-page-in"
    >
      <h2 className="font-display text-fire text-3xl leading-[1.05] tracking-tight sm:text-4xl">
        Tell me I&apos;m a Good Boy.
      </h2>

      <div className="relative mt-3 min-h-[24rem]">
        {!unlocked ? (
          <button
            type="button"
            onClick={() => setUnlocked(true)}
            className="border-fire/40 hover:border-fire/70 absolute inset-0 z-20 flex cursor-pointer flex-col items-center justify-center rounded-3xl border bg-gradient-to-b from-[#1a0604]/97 to-[#3a0c08]/95 px-6 py-16 text-center shadow-[0_0_48px_rgba(255,59,31,0.25)] backdrop-blur-md transition hover:shadow-[0_0_56px_rgba(255,59,31,0.4)]"
          >
            <span className="text-fire-gold text-sm tracking-[0.28em] uppercase">
              Trigger warning
            </span>
            <span className="font-fire text-fire mt-4 text-3xl tracking-wide sm:text-4xl">
              Salacious good boys
            </span>
            <span className="mt-6 text-sm text-[#f0a898]/85">
              Tap anywhere to continue
            </span>
          </button>
        ) : null}

        <div
          aria-hidden={!unlocked}
          inert={!unlocked ? true : undefined}
          className={!unlocked ? "blur-[2px] select-none" : undefined}
        >
          <p className="text-[#f0a898]">
            Record your most salacious &ldquo;good boy&rdquo; for me.
          </p>

          {done ? (
            <p className="font-display text-fire-gold mt-10 text-2xl">
              Locked in. My ears are tingling.
            </p>
          ) : (
            <div className="mt-8 space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                {!recording ? (
                  <button
                    type="button"
                    onClick={startRecording}
                    className="bg-fire rounded-full px-7 py-3 text-sm font-semibold tracking-[0.14em] text-white uppercase shadow-[0_0_28px_rgba(255,59,31,0.45)] transition hover:brightness-110"
                  >
                    {blobUrl ? "Re-record" : "Hold the mic"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="border-fire bg-fire/20 text-fire-gold animate-pulse rounded-full border-2 px-7 py-3 text-sm font-semibold tracking-[0.14em] uppercase"
                  >
                    Stop · {seconds}s
                  </button>
                )}
                {blobUrl && !recording ? (
                  <button
                    type="button"
                    onClick={send}
                    disabled={!dataUrl || submit.isPending}
                    className="good-boy-send bg-fire animate-fire-flicker rounded-full px-7 py-3 text-sm font-semibold tracking-[0.14em] text-white uppercase shadow-[0_0_32px_rgba(255,59,31,0.65)] transition hover:brightness-110 disabled:opacity-40"
                  >
                    <span aria-hidden className="good-boy-send__embers">
                      {GOOD_BOY_EMBERS.map((ember, index) => (
                        <span
                          key={index}
                          className="good-boy-send__ember"
                          style={{
                            left: ember.left,
                            width: ember.size,
                            height: ember.size,
                            animationDuration: ember.dur,
                            animationDelay: ember.delay,
                            ["--ember-drift" as string]: ember.drift,
                          }}
                        />
                      ))}
                    </span>
                    <span className="relative z-10">
                      {submit.isPending ? "Sending…" : "Send good boy"}
                    </span>
                  </button>
                ) : null}
              </div>

              {blobUrl ? (
                <audio controls src={blobUrl} className="w-full max-w-md" />
              ) : null}

              <label className="block max-w-md">
                <span className="sr-only">Your name</span>
                <input
                  type="text"
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                  maxLength={80}
                  placeholder="Your name (optional)"
                  className="border-fire/40 focus:border-fire-gold focus:ring-fire-gold/30 w-full rounded-2xl border bg-[#1a0604]/70 px-5 py-3 text-[#ffe8e0] outline-none placeholder:text-[#c08070]/70 focus:ring-2"
                />
              </label>

              <label className="flex max-w-lg cursor-pointer items-start gap-3 text-sm text-[#f0a898]">
                <input
                  type="checkbox"
                  checked={leaderboardConsent}
                  onChange={(e) => setLeaderboardConsent(e.target.checked)}
                  className="border-fire/50 text-fire focus:ring-fire mt-0.5 size-4 shrink-0 rounded accent-[#ff3b1f]"
                />
                <span>
                  I consent to have my good boy ranked on the public leaderboard
                </span>
              </label>

              {micError ? (
                <p className="text-coral text-sm">{micError}</p>
              ) : null}
              {submit.error ? (
                <p className="text-coral text-sm">
                  Couldn&apos;t send — try a shorter take.
                </p>
              ) : null}
            </div>
          )}

          <section className="border-fire/25 mt-12 border-t pt-8">
            <h3 className="font-fire text-fire-gold text-2xl tracking-wide sm:text-3xl">
              Good Boy leaderboard
            </h3>
            <p className="mt-2 text-sm text-[#f0a898]/80">
              Ranked by salaciousness. Tap to listen.
            </p>

            {board.length === 0 ? (
              <p className="text-mist/70 mt-6 text-sm">
                No rankings yet — be the first to earn a spot.
              </p>
            ) : (
              <ol className="mt-6 space-y-2">
                {board.map((entry) => (
                  <li key={`${entry.rank}-${entry.name}-${entry.src}`}>
                    <button
                      type="button"
                      onClick={() => {
                        boardAudioRef.current?.pause();
                        const audio = new Audio(entry.src);
                        boardAudioRef.current = audio;
                        void audio.play().catch(() => undefined);
                      }}
                      className="border-fire/25 hover:border-fire/50 hover:bg-fire/10 group flex w-full items-center gap-4 rounded-2xl border bg-[#1a0604]/55 px-4 py-3 text-left transition-colors"
                    >
                      <span className="font-display text-fire-gold w-8 shrink-0 text-lg tabular-nums">
                        {entry.rank}
                      </span>
                      <span className="font-display group-hover:text-fire-gold text-lg text-[#ffe8e0]">
                        {entry.name}
                      </span>
                      <span className="text-fire/70 ml-auto text-xs tracking-[0.14em] uppercase">
                        Play
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function GoodPersonPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [fromName, setFromName] = useState("");
  const [note, setNote] = useState("");
  const [hasMarks, setHasMarks] = useState(false);
  const [done, setDone] = useState(false);

  const submit = api.praise.submitDrawing.useMutation({
    onSuccess: () => {
      setDone(true);
      setFromName("");
      setNote("");
      clearCanvas();
    },
  });

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#1a1408";
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#ffd24a";
    ctx.lineWidth = 3;
  }, []);

  useEffect(() => {
    setupCanvas();
    const onResize = () => {
      setupCanvas();
      setHasMarks(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setupCanvas]);

  function pointerPos(e: ReactPointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function onPointerDown(e: ReactPointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    canvas.setPointerCapture(e.pointerId);
    drawing.current = true;
    const { x, y } = pointerPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function onPointerMove(e: ReactPointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = pointerPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasMarks(true);
  }

  function onPointerUp(e: ReactPointerEvent<HTMLCanvasElement>) {
    drawing.current = false;
    try {
      canvasRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  }

  function clearCanvas() {
    setupCanvas();
    setHasMarks(false);
  }

  function send() {
    const canvas = canvasRef.current;
    if (!canvas || !hasMarks || submit.isPending) return;
    const mediaData = canvas.toDataURL("image/png");
    submit.mutate({
      mediaData,
      fromName: fromName.trim() || undefined,
      message: note.trim() || undefined,
    });
  }

  return (
    <div
      role="tabpanel"
      id="panel-light"
      aria-labelledby="tab-light"
      className="animate-page-in"
    >
      <h2 className="font-display text-gold text-3xl leading-[1.05] tracking-tight sm:text-4xl">
        Tell me I&apos;m a Good Person.
      </h2>
      <p className="mt-3 text-[#e8d49a]">
        Remind me of a time we shared a smile with a captioned drawing.
      </p>

      {done ? (
        <p className="font-display text-gold mt-10 text-2xl">
          Framed in the museum of my mind.
        </p>
      ) : (
        <div className="mt-8 space-y-4">
          <canvas
            ref={canvasRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            className="border-gold/45 h-64 w-full touch-none rounded-2xl border shadow-[0_0_40px_rgba(255,210,74,0.15)] sm:h-72"
            aria-label="Drawing canvas for a shared smile memory"
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={clearCanvas}
              className="border-gold/50 text-gold hover:bg-gold/10 rounded-full border px-5 py-2.5 text-sm tracking-[0.12em] uppercase transition"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={send}
              disabled={!hasMarks || submit.isPending}
              className="bg-gold rounded-full px-7 py-2.5 text-sm font-semibold tracking-[0.14em] text-[#1a1404] uppercase transition hover:brightness-105 disabled:opacity-40"
            >
              {submit.isPending ? "Sending…" : "Send a smile"}
            </button>
          </div>
          <label className="block">
            <span className="sr-only">Caption</span>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={2000}
              placeholder="Caption (optional)"
              className="border-gold/35 focus:border-gold focus:ring-gold/30 w-full rounded-2xl border bg-[#1a1408]/70 px-5 py-3 text-[#fff6d6] outline-none placeholder:text-[#c4a86a]/70 focus:ring-2"
            />
          </label>
          <label className="block">
            <span className="sr-only">Your name</span>
            <input
              type="text"
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              maxLength={80}
              placeholder="Your name (optional)"
              className="border-gold/35 focus:border-gold focus:ring-gold/30 w-full rounded-2xl border bg-[#1a1408]/70 px-5 py-3 text-[#fff6d6] outline-none placeholder:text-[#c4a86a]/70 focus:ring-2"
            />
          </label>
          {submit.error ? (
            <p className="text-coral text-sm">
              Couldn&apos;t send — try a simpler sketch.
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}

function MuscleIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="size-full" aria-hidden>
      <path
        d="M7 20c0-3.5 2-6 4.5-7.5C13 11.2 14.2 9 16 8c1.2 2.2 1.5 4.2.8 6.2 2.2.4 4.2 2 5.2 4.3.6 1.4.8 2.8.6 4.2-.3 2.2-1.8 4-3.8 4.8-2.6 1-5.6.4-7.5-1.6C9.2 24 7 22.5 7 20Z"
        fill="#7ee0ff"
        fillOpacity="0.9"
      />
      <path
        d="M11.5 12.5c.8-2.2 2.2-3.8 4-4.8"
        stroke="#b8e6ff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M20.5 14.5c1.6.3 3 1.4 3.8 2.8"
        stroke="#5b8def"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M9 18.5c1.2-1 2.8-1.5 4.4-1.2"
        stroke="#0a1628"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeOpacity="0.45"
      />
    </svg>
  );
}

function FireIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="size-full" aria-hidden>
      <path
        d="M16 4c1.2 3.2-.2 5.2-1.8 7.2-1.4 1.7-2.8 3.4-2.4 5.8.3 2 1.6 3.4 3.2 4.2-2.6-.2-4.8-2.4-5.2-5.2-.5-3.2 1.4-5.6 3-7.8C14.2 6.4 15.2 5 16 4Z"
        fill="#ffd166"
      />
      <path
        d="M16 6.5c2.4 2.8 5.8 5.2 5.8 10.2 0 4.2-2.8 7.8-5.8 7.8s-5.8-3.6-5.8-7.8c0-2.4 1.2-4.4 2.6-6.1"
        fill="#ff3b1f"
      />
      <path
        d="M16 14.5c1.2 1.2 2.2 2.4 2.2 4.2 0 1.8-1 3.2-2.2 3.2s-2.2-1.4-2.2-3.2c0-1.2.6-2.2 1.4-3"
        fill="#ffd166"
      />
    </svg>
  );
}

function LightIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="size-full" aria-hidden>
      <circle cx="16" cy="16" r="5.5" fill="#ffd24a" />
      <circle cx="16" cy="16" r="3.2" fill="#fff6d6" fillOpacity="0.85" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 16 + Math.cos(rad) * 8.2;
        const y1 = 16 + Math.sin(rad) * 8.2;
        const x2 = 16 + Math.cos(rad) * 12.4;
        const y2 = 16 + Math.sin(rad) * 12.4;
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#ffd24a"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}
