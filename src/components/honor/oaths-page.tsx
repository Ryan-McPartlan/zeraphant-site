"use client";

import Link from "next/link";
import { useState } from "react";

import { OathTaking } from "~/components/honor/oath-taking";
import { type Oath, oaths, type OathSegment } from "~/lib/honor/oaths";

function accentClass(accent: NonNullable<OathSegment["accent"]>): string {
  if (accent === "passion") return "font-fire text-fire";
  if (accent === "connection") return "font-hand text-gold";
  return "text-sky font-medium";
}

function OathSegmentView({ segment }: { segment: OathSegment }) {
  const className = segment.accent
    ? accentClass(segment.accent)
    : segment.href
      ? "text-sky underline underline-offset-2"
      : undefined;

  if (segment.href) {
    return (
      <a
        href={segment.href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {segment.text}
      </a>
    );
  }

  if (segment.accent) {
    return <span className={className}>{segment.text}</span>;
  }

  return <span>{segment.text}</span>;
}

function OathBody({ body }: { body: Oath["body"] }) {
  if (typeof body === "string") return body;
  return body.map((segment, index) => (
    <OathSegmentView key={`${index}-${segment.text}`} segment={segment} />
  ));
}

function OathPanel({ oath }: { oath: Oath | null }) {
  if (!oath) {
    return (
      <p className="text-mist/55 text-lg leading-relaxed">
        Select an oath to read it in full.
      </p>
    );
  }

  return (
    <div className="animate-page-in">
      <h2 className="font-display text-iron-bright text-2xl tracking-tight sm:text-3xl">
        {oath.title}
        {oath.year != null ? (
          <span className="text-mist/55 ml-2 text-lg font-normal tracking-normal sm:text-xl">
            · {oath.year}
          </span>
        ) : null}
      </h2>
      <div className="mt-5 text-base leading-relaxed sm:text-lg">
        <p className="text-mist whitespace-pre-wrap">
          <OathBody body={oath.body} />
        </p>
        {oath.pledge ? (
          <p className="text-sky mt-4 font-medium">{oath.pledge}</p>
        ) : null}
        {oath.note ? (
          <p className="text-mist/65 mt-4 text-base leading-relaxed italic sm:text-lg">
            {oath.note}
          </p>
        ) : null}
        {oath.href ? (
          <p className="mt-4">
            <a
              href={oath.href}
              target="_blank"
              rel="noreferrer"
              className="text-sky underline underline-offset-2"
            >
              {oath.hrefLabel ?? oath.href}
            </a>
          </p>
        ) : null}
      </div>
      {oath.personal ? (
        <p className="border-iron-bright/15 text-mist/70 mt-8 border-t pt-6 text-base leading-relaxed italic sm:text-lg">
          This oath is personal to me, and would not make sense for you to take
          now without additional context.
        </p>
      ) : (
        <OathTaking oath={oath} />
      )}
    </div>
  );
}

export function OathsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = oaths.find((oath) => oath.id === selectedId) ?? null;

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
          Oaths
        </h1>
        <div className="text-mist mt-6 max-w-xl space-y-4 text-lg">
          <p>
            We are always bound. To our principles, to our desires, to our
            obligations, to our survival. All we are free to choose is our
            chains.
          </p>
          <p>
            These are the words I have bound myself to. Select an oath to read
            it in full.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(14rem,20rem)_minmax(0,1fr)] lg:gap-16">
          <ul className="border-iron-bright/15 space-y-0 border-t">
            {oaths.map((oath) => {
              const active = oath.id === selectedId;
              return (
                <li key={oath.id} className="border-iron-bright/15 border-b">
                  <button
                    type="button"
                    onClick={() => setSelectedId(oath.id)}
                    aria-pressed={active}
                    className={`flex w-full items-baseline justify-between gap-4 py-3 text-left text-lg tracking-wide transition-colors ${
                      active ? "text-sky" : "text-iron-bright hover:text-sky"
                    }`}
                  >
                    <span>{oath.title}</span>
                    <span
                      aria-hidden
                      className={`text-xl leading-none ${
                        active ? "text-sky" : "text-iron-bright/45"
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
              <OathPanel oath={selected} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
