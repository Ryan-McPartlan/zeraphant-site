"use client";

import { useEffect, useRef, useState } from "react";

import { type Oath, oathAudioSrc } from "~/lib/honor/oaths";
import { api } from "~/trpc/react";

function formatTakenAt(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function OathTaking({ oath }: { oath: Oath }) {
  const [taking, setTaking] = useState(false);
  const [name, setName] = useState("");
  const [affirmed, setAffirmed] = useState(false);
  const [showTakers, setShowTakers] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const utils = api.useUtils();
  const { data: count = 0 } = api.oathTaking.countByOath.useQuery({
    oathId: oath.id,
  });
  const { data: takers, isLoading: takersLoading } =
    api.oathTaking.listByOath.useQuery(
      { oathId: oath.id },
      { enabled: showTakers },
    );

  const take = api.oathTaking.take.useMutation({
    onSuccess: async () => {
      setDone(true);
      setError(null);
      await utils.oathTaking.countByOath.invalidate({ oathId: oath.id });
      await utils.oathTaking.listByOath.invalidate({ oathId: oath.id });
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  useEffect(() => {
    setTaking(false);
    setName("");
    setAffirmed(false);
    setDone(false);
    setError(null);
    setShowTakers(false);
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
  }, [oath.id]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const startTaking = () => {
    setTaking(true);
    setDone(false);
    setError(null);
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Audio file may not exist yet — still allow taking the oath.
    });
  };

  const submit = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Enter your name to take this oath.");
      return;
    }
    if (!affirmed) {
      setError("Affirm that you have spoken the words aloud.");
      return;
    }
    take.mutate({ oathId: oath.id, name: trimmed });
  };

  return (
    <div className="border-iron-bright/15 mt-8 border-t pt-6">
      <audio ref={audioRef} src={oathAudioSrc(oath.id)} preload="none" />

      <button
        type="button"
        onClick={() => setShowTakers((open) => !open)}
        aria-expanded={showTakers}
        className="text-mist/70 hover:text-sky text-left text-sm underline-offset-4 transition-colors hover:underline"
      >
        {count} additional {oath.cohort ?? "people"} have bound themselves to
        this oath
      </button>

      {showTakers ? (
        <div className="border-iron-bright/15 mt-3 border-l pl-4">
          <p className="text-mist/70 text-sm">Bound to this oath:</p>
          {takersLoading ? (
            <p className="text-mist/55 mt-2 text-sm">Loading…</p>
          ) : !takers?.length ? (
            <p className="text-mist/55 mt-2 text-sm">
              No one has taken this oath yet. Be the first.
            </p>
          ) : (
            <ul className="mt-2 space-y-2">
              {takers.map((taker) => (
                <li
                  key={taker.id}
                  className="flex items-baseline justify-between gap-4 text-sm"
                >
                  <span className="text-iron-bright">{taker.name}</span>
                  <span className="text-mist/55 shrink-0 tabular-nums">
                    {formatTakenAt(taker.createdAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}

      {done ? (
        <p className="text-sky mt-4 text-base">
          Thank you, {name.trim()}. Your name is bound to this oath.
        </p>
      ) : !taking ? (
        <button
          type="button"
          onClick={startTaking}
          className="border-iron-bright/35 text-iron-bright hover:border-sky hover:text-sky mt-4 w-full border px-4 py-3 text-left text-base leading-snug transition-colors sm:text-lg"
        >
          Click here and speak the words aloud with me to take this oath
          yourself
        </button>
      ) : (
        <div className="mt-4 space-y-4">
          <p className="text-mist/80 text-sm leading-relaxed">
            Listen as I read, and speak the words aloud with me. Then affirm
            below to permanently add your name.
          </p>
          <label className="block">
            <span className="text-iron-bright/70 text-sm tracking-wide">
              Your name
            </span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={80}
              autoComplete="name"
              className="border-iron-bright/25 bg-iron/40 text-iron-bright placeholder:text-mist/35 focus:border-sky mt-1.5 w-full border px-3 py-2 text-base outline-none"
              placeholder="Name"
            />
          </label>
          <label className="text-mist flex cursor-pointer items-start gap-3 text-sm leading-snug sm:text-base">
            <input
              type="checkbox"
              checked={affirmed}
              onChange={(event) => setAffirmed(event.target.checked)}
              className="border-iron-bright/40 accent-sky mt-1 size-4 shrink-0"
            />
            <span>
              I have spoken these words aloud and take this oath myself.
            </span>
          </label>
          {error ? <p className="text-coral text-sm">{error}</p> : null}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={submit}
              disabled={take.isPending}
              className="border-sky/50 bg-sky/15 text-sky hover:bg-sky/25 px-4 py-2 text-sm tracking-wide transition-colors disabled:opacity-50"
            >
              {take.isPending ? "Binding…" : "Bind my name to this oath"}
            </button>
            <button
              type="button"
              onClick={() => {
                setTaking(false);
                audioRef.current?.pause();
              }}
              className="text-mist/60 hover:text-mist text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
