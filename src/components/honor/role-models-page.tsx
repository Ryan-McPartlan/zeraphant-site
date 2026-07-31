"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  ROLE_MODEL_TABS,
  type RoleModel,
  type RoleModelParagraph,
  type RoleModelSegment,
  type RoleModelTabId,
} from "~/lib/honor/role-models";

function RoleModelSegments({ segments }: { segments: RoleModelSegment[] }) {
  return (
    <>
      {segments.map((segment, index) =>
        typeof segment === "string" ? (
          <span key={`${index}-${segment.slice(0, 16)}`}>{segment}</span>
        ) : (
          <span
            key={`${index}-${segment.text}`}
            className="font-hand text-gold text-xl sm:text-2xl"
          >
            {segment.text}
          </span>
        ),
      )}
    </>
  );
}

function RoleModelBody({ body }: { body: RoleModelParagraph[] }) {
  return (
    <div className="text-mist mt-5 space-y-4 text-base leading-relaxed sm:text-lg">
      {body.map((paragraph, index) => (
        <p key={index}>
          {typeof paragraph === "string" ? (
            paragraph
          ) : (
            <RoleModelSegments segments={paragraph} />
          )}
        </p>
      ))}
    </div>
  );
}

function RoleModelPanel({ model }: { model: RoleModel | null }) {
  if (!model) {
    return (
      <p className="text-mist/55 text-lg leading-relaxed">
        Select a role model to read more.
      </p>
    );
  }

  return (
    <div className="animate-page-in">
      <h2 className="font-display text-iron-bright text-2xl tracking-tight sm:text-3xl">
        {model.name}
      </h2>
      {model.note?.tone === "connection" ? (
        <p className="font-hand text-gold mt-4 text-xl sm:text-2xl">
          {model.note.text}
        </p>
      ) : null}
      {model.image ? (
        <div className="border-iron-bright/20 mt-5 overflow-hidden border">
          <Image
            src={model.image.src}
            alt={model.image.alt}
            width={720}
            height={900}
            className="h-auto w-full max-w-sm object-cover"
          />
        </div>
      ) : null}
      {model.body ? <RoleModelBody body={model.body} /> : null}
    </div>
  );
}

export function RoleModelsPage() {
  const [tabId, setTabId] = useState<RoleModelTabId>("life");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const tab =
    ROLE_MODEL_TABS.find((item) => item.id === tabId) ?? ROLE_MODEL_TABS[0]!;
  const selected = tab.models.find((model) => model.id === selectedId) ?? null;

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
          Role Models
        </h1>
        <p className="text-mist mt-6 max-w-xl text-lg">
          Everything you admire in me was borrowed first from them.
        </p>

        <div
          role="tablist"
          aria-label="Role model categories"
          className="border-iron-bright/20 mt-10 flex flex-wrap gap-2 border-b pb-3"
        >
          {ROLE_MODEL_TABS.map((item) => {
            const selectedTab = tabId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selectedTab}
                id={`role-models-tab-${item.id}`}
                aria-controls={`role-models-panel-${item.id}`}
                onClick={() => {
                  setTabId(item.id);
                  setSelectedId(null);
                }}
                className={`rounded-sm px-3 py-1.5 text-sm tracking-wide transition-colors sm:text-base ${
                  selectedTab
                    ? "bg-iron-bright/10 text-sky"
                    : "text-iron-bright/65 hover:text-iron-bright"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`role-models-panel-${tab.id}`}
          aria-labelledby={`role-models-tab-${tab.id}`}
          className="mt-8 grid gap-10 lg:grid-cols-[minmax(14rem,20rem)_minmax(0,1fr)] lg:gap-16"
        >
          <ul className="border-iron-bright/15 space-y-0 border-t">
            {tab.models.map((model) => {
              const active = model.id === selectedId;
              return (
                <li key={model.id} className="border-iron-bright/15 border-b">
                  <button
                    type="button"
                    onClick={() => setSelectedId(model.id)}
                    aria-pressed={active}
                    className={`flex w-full items-baseline justify-between gap-4 py-3 text-left text-lg tracking-wide transition-colors ${
                      active ? "text-sky" : "text-iron-bright hover:text-sky"
                    }`}
                  >
                    <span>{model.name}</span>
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
              <RoleModelPanel model={selected} />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
