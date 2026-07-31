"use client";

import Link from "next/link";
import { useState } from "react";

import {
  type ConquestSection,
  conquestSections,
} from "~/lib/honor/world-conquest";

function isListItem(text: string, sectionId: string) {
  if (sectionId === "nature-of-power") {
    return text === "Wealth" || text === "Media" || text === "Politics";
  }
  if (sectionId === "what-is-power") {
    return (
      text.startsWith("Have the vision") ||
      text.startsWith("Have the capacity") ||
      text.startsWith("Have the will")
    );
  }
  return false;
}

function ConquestPanel({ section }: { section: ConquestSection | null }) {
  if (!section) {
    return (
      <p className="text-mist/55 text-lg leading-relaxed">
        Select a section to read it in full.
      </p>
    );
  }

  const blocks: Array<
    { kind: "p"; text: string } | { kind: "list"; items: string[] }
  > = [];
  let pendingList: string[] = [];

  const flushList = () => {
    if (pendingList.length > 0) {
      blocks.push({ kind: "list", items: pendingList });
      pendingList = [];
    }
  };

  for (const paragraph of section.body) {
    if (isListItem(paragraph, section.id)) {
      pendingList.push(paragraph);
    } else {
      flushList();
      blocks.push({ kind: "p", text: paragraph });
    }
  }
  flushList();

  return (
    <div className="animate-page-in">
      <h2 className="font-display text-iron-bright text-2xl tracking-tight sm:text-3xl">
        {section.title}
      </h2>
      <div className="text-mist mt-5 space-y-4 text-base leading-relaxed sm:text-lg">
        {blocks.map((block, index) =>
          block.kind === "p" ? (
            <p key={`${index}-${block.text.slice(0, 24)}`}>{block.text}</p>
          ) : (
            <ul
              key={`${index}-list`}
              className="marker:text-sky list-disc space-y-1 pl-5"
            >
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ),
        )}
      </div>
    </div>
  );
}

export function WorldConquestPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected =
    conquestSections.find((section) => section.id === selectedId) ?? null;

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
          World Conquest
        </h1>
        <p className="text-mist mt-6 max-w-xl text-lg">
          This page outlines my plan to make the world anew.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(14rem,22rem)_minmax(0,1fr)] lg:gap-16">
          <ul className="border-iron-bright/15 space-y-0 border-t">
            {conquestSections.map((section) => {
              const active = section.id === selectedId;
              return (
                <li key={section.id} className="border-iron-bright/15 border-b">
                  <button
                    type="button"
                    onClick={() => setSelectedId(section.id)}
                    aria-pressed={active}
                    className={`flex w-full items-baseline justify-between gap-4 py-3 text-left text-lg tracking-wide transition-colors ${
                      active ? "text-sky" : "text-iron-bright hover:text-sky"
                    }`}
                  >
                    <span>{section.title}</span>
                    <span
                      aria-hidden
                      className={`shrink-0 text-xl leading-none ${
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
              <ConquestPanel section={selected} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
