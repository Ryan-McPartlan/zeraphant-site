"use client";

import Link from "next/link";
import { useState } from "react";

import { type PromiseEntry, promises } from "~/lib/honor/promises";

function PromisePanel({ entry }: { entry: PromiseEntry | null }) {
  if (!entry) {
    return (
      <p className="text-mist/55 text-lg leading-relaxed">
        Select a promise to read it in full.
      </p>
    );
  }

  const broken = entry.status === "broken";

  return (
    <div className="animate-page-in">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2
          className={`font-display text-2xl tracking-tight sm:text-3xl ${
            broken
              ? "text-iron-bright/45 decoration-coral/70 line-through"
              : "text-iron-bright"
          }`}
        >
          {entry.title}
        </h2>
        {entry.year != null ? (
          <span className="text-mist/55 text-lg sm:text-xl">
            · {entry.year}
          </span>
        ) : null}
        {entry.status === "broken" ? (
          <span className="border-coral/50 text-coral rounded-sm border px-2 py-0.5 text-xs tracking-[0.14em] uppercase">
            Broken
          </span>
        ) : entry.status === "outstanding" ? (
          <span className="border-iron-bright/25 text-iron-bright/60 rounded-sm border px-2 py-0.5 text-xs tracking-[0.14em] uppercase">
            Outstanding
          </span>
        ) : null}
      </div>
      <div
        className={`mt-5 space-y-4 text-base leading-relaxed sm:text-lg ${
          broken ? "text-mist/55" : "text-mist"
        }`}
      >
        {entry.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

export function PromisesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = promises.find((entry) => entry.id === selectedId) ?? null;

  return (
    <main className="relative min-h-dvh overflow-x-hidden px-6 py-24 sm:px-12 lg:px-20">
      <div className="relative z-20 mx-auto max-w-6xl">
        <Link
          href="/honor"
          className="text-iron-bright/70 hover:text-iron-bright text-sm tracking-[0.18em] uppercase transition-colors"
        >
          ← Honor
        </Link>
        <p className="text-iron-bright mt-8 text-sm tracking-[0.22em] uppercase">
          Honor
        </p>
        <h1 className="font-display text-iron-bright mt-3 text-5xl leading-[0.95] tracking-tight sm:text-7xl">
          Promises
        </h1>
        <p className="text-mist mt-6 max-w-xl text-lg">
          This page lists my promises.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(14rem,20rem)_minmax(0,1fr)] lg:gap-16">
          <ul className="border-iron-bright/15 space-y-0 border-t">
            {promises.map((entry) => {
              const active = entry.id === selectedId;
              const broken = entry.status === "broken";
              return (
                <li key={entry.id} className="border-iron-bright/15 border-b">
                  <button
                    type="button"
                    onClick={() => setSelectedId(entry.id)}
                    aria-pressed={active}
                    className={`flex w-full items-baseline justify-between gap-4 py-3 text-left text-lg tracking-wide transition-colors ${
                      active
                        ? broken
                          ? "text-coral"
                          : "text-sky"
                        : broken
                          ? "text-iron-bright/45 hover:text-coral"
                          : "text-iron-bright hover:text-sky"
                    }`}
                  >
                    <span
                      className={
                        broken ? "decoration-coral/60 line-through" : undefined
                      }
                    >
                      {entry.title}
                    </span>
                    <span
                      aria-hidden
                      className={`shrink-0 text-xl leading-none ${
                        active
                          ? broken
                            ? "text-coral"
                            : "text-sky"
                          : "text-iron-bright/45"
                      }`}
                    >
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <aside className="border-iron-bright/15 lg:border-l lg:pl-12">
            <div className="lg:sticky lg:top-28">
              <PromisePanel entry={selected} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
