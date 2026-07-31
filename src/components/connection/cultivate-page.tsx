"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { WateringGarden } from "~/components/connection/watering-garden";
import {
  CULTIVATE_TABS,
  type CultivateTabId,
  EVENT_TYPES,
  LETTER_KITS,
} from "~/lib/connection/cultivate";

const bubbleClass =
  "connection-invite-orb font-hand flex size-[5.5rem] shrink-0 items-center justify-center rounded-full border-2 px-1.5 text-center text-[0.65rem] leading-snug transition-[box-shadow,transform,opacity] duration-300 sm:size-[6.75rem] sm:px-2.5 sm:text-sm lg:size-32 lg:px-3 lg:text-base";

export function CultivatePage() {
  const [tab, setTab] = useState<CultivateTabId>("home");

  return (
    <main className="relative min-h-dvh overflow-x-hidden px-6 py-24 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/connection"
          className="text-gold/70 hover:text-gold font-hand text-lg transition-colors"
        >
          ← Garden
        </Link>

        <p className="text-gold mt-8 text-sm tracking-[0.22em] uppercase">
          Connection · Cultivating our connections
        </p>
        <h1 className="font-hand text-gold mt-3 text-5xl leading-[1.05] sm:text-7xl">
          Cultivating our connections
        </h1>

        <div
          role="tablist"
          aria-label="Cultivating sections"
          className="mt-10 flex flex-nowrap justify-center gap-2 overflow-visible py-5 sm:gap-3 lg:gap-4"
        >
          {CULTIVATE_TABS.map((item, index) => {
            const selected = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`cultivate-tab-${item.id}`}
                aria-controls={`cultivate-panel-${item.id}`}
                onClick={() => setTab(item.id)}
                className={`${bubbleClass} ${
                  selected
                    ? "border-[rgba(255,230,120,0.95)] opacity-100 ring-2 ring-[rgba(255,210,80,0.55)]"
                    : "border-[rgba(255,210,80,0.55)] opacity-65 hover:opacity-100"
                }`}
                style={{ animationDelay: `${-index * 0.7}s` }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`cultivate-panel-${tab}`}
          aria-labelledby={`cultivate-tab-${tab}`}
          className="mt-12"
        >
          {tab === "home" ? <HomePanel /> : null}
          {tab === "making-new" ? <MakingNewPanel /> : null}
          {tab === "watering" ? <WateringPanel /> : null}
          {tab === "letters" ? <LettersPanel /> : null}
          {tab === "events" ? <EventsPanel /> : null}
        </div>
      </div>
    </main>
  );
}

function HomePanel() {
  return (
    <div className="text-gold/85 max-w-2xl space-y-5 text-lg">
      <p>
        We all have a shared responsibility to cultivate the communities we are
        a part of — this is the most important work we can do.
      </p>
      <p>
        Here are the things I do. You should too! You are the average of the
        people you surround yourself with — finding and building up the best of
        us makes you better too!
      </p>
    </div>
  );
}

function MakingNewPanel() {
  return (
    <div className="text-gold/85 space-y-5 text-lg">
      <p>
        There is ONLY ONE WAY to make new connections — its to DO COOL SHIT.
        With PASSION and DEVOTION.
      </p>
      <p>
        Do you love overwatch? Join a &ldquo;minor league&rdquo; competitive
        team that is at the same skill level as you, but is dedicated: Watching
        your replays, meeting at consistent scheduled times, etc.
      </p>
      <p>
        Do you love dgg? Show up to every community event, and bring that fire
        with you
      </p>
      <p>
        Do you love art or music or game development? There is a discord server
        full of people who share your passions
      </p>
    </div>
  );
}

function WateringPanel() {
  return <WateringGarden />;
}

function LettersPanel() {
  return (
    <div className="text-gold/85 space-y-8 text-lg">
      <p>
        Getting into the habit of writing bomb ass letters is the best decision
        I have ever made in my life. Please do this, start practicing it,
        everyone loves it and its just the best easiest way to make people feel
        good.
      </p>

      <figure className="border-gold/30 overflow-hidden rounded-2xl border">
        <Image
          src="/connection/letters-garden.png"
          alt="Handwritten letters with wax seals and twine, ready for the garden"
          width={1200}
          height={900}
          className="h-auto w-full"
        />
      </figure>

      <p className="font-hand text-gold text-2xl sm:text-3xl">
        Two step process:
      </p>

      <section>
        <h2 className="font-hand text-gold text-3xl sm:text-4xl">
          Get your kit!
        </h2>
        <p className="mt-4">I like these:</p>
        <ul className="mt-4 space-y-3">
          {LETTER_KITS.map((kit) => (
            <li key={kit.href}>
              <a
                href={kit.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold decoration-gold/40 underline underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                → {kit.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-hand text-gold text-3xl sm:text-4xl">
          Practice your writing!
        </h2>
        <p className="mt-4">
          To be frank, the easiest way to write good letters is to surround
          yourself with ridiculously cool people and then just like... gesturing
          towards the cool things about them.
        </p>
        <p className="font-hand text-gold mt-6 text-xl sm:text-2xl">
          Some easy prompts:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            "What I most admire in them",
            "My favorite memory of them",
            "What is most unique about them",
            "How they make me better",
            "Imagining the far future",
          ].map((prompt) => (
            <li key={prompt}>
              <span className="text-gold">→</span> {prompt}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-hand text-gold text-3xl sm:text-4xl">Occasions</h2>
        <p className="mt-4">
          I do my letters for my gathering events, but birthdays work well. Or
          frankly, just shooting one off at random can be really surprising and
          flattering.
        </p>
      </section>
    </div>
  );
}

function EventsPanel() {
  return (
    <div>
      <div className="text-gold/85 space-y-5 text-lg">
        <p>
          Its hard to get the best of us from all around the nation to gather —
          they need a dam good reason. So I plan to give us some!
        </p>
        <p>
          My events are the main way I plan to nurture and cultivate my
          connections once I am giga rich
        </p>
      </div>

      <div className="mt-12 space-y-12">
        {EVENT_TYPES.map((event) => (
          <section key={event.title}>
            <h2 className="font-hand text-gold text-3xl sm:text-4xl">
              {event.title}
            </h2>
            <div className="text-gold/80 mt-4 space-y-4 text-lg">
              {event.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {"bullets" in event ? (
                <ul className="space-y-2 pl-1">
                  {event.bullets.map((item) => (
                    <li key={item}>
                      <span className="text-gold">→</span> {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              {"after" in event
                ? event.after.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))
                : null}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
