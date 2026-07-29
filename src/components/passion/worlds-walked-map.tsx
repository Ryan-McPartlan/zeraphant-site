"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";

type MapMemory = {
  id: string;
  title: string;
  body: string;
  left: string;
  top: string;
};

type WalkedWorld = {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  intro?: string;
  memories: MapMemory[];
};

const WORLDS: WalkedWorld[] = [
  {
    id: "hyrule",
    name: "Hyrule",
    image: "/gaming/hyrule-map.png",
    imageAlt:
      "Illustrated map of the Kingdom of Hyrule from Breath of the Wild",
    memories: [
      {
        id: "castle",
        title: "Hyrule Castle",
        body: "At the end of my adventure I climbed from the highest point in the castle and took in the whole world, focusing on one exciting memory from each place I went. Ironically, this is what I remember most vividly.",
        left: "41%",
        top: "40%",
      },
      {
        id: "central",
        title: "Central Hyrule",
        body: "I remember first seeing the Dueling Peaks, a tower, the castle, and colosseum all at once — and realizing I had so many places to go, so many adventures on the way. The start of a great journey! And a feeling only Breath of the Wild has ever delivered.",
        left: "34%",
        top: "62%",
      },
      {
        id: "faron",
        title: "Faron",
        body: "I played Breath of the Wild in a near-comatose state during one of my last zero-responsibilities summers: I played it for 12 hours straight, 4 days in a row. I remember falling asleep and waking up again to fight the Faron cyclops and being so grateful for having zero responsibilities.",
        left: "48%",
        top: "78%",
      },
      {
        id: "akkala",
        title: "Akkala",
        body: "Akkala Lynel killed me a dozen times, trying to fight it underleveled. Classic experience for all Souls enjoyers.",
        left: "58%",
        top: "28%",
      },
    ],
  },
  {
    id: "hallownest",
    name: "Hallownest",
    image: "/gaming/hallownest-map.png",
    imageAlt: "Illustrated map of Hallownest from Hollow Knight",
    memories: [
      {
        id: "crystal",
        title: "Crystal Peak",
        body: "Died to this boss like 10 times.",
        left: "72%",
        top: "18%",
      },
      {
        id: "mantis",
        title: "Mantis Lords",
        body: "It was the Mantis Lords fight that made me realize this game was a masterpiece.",
        left: "38%",
        top: "68%",
      },
      {
        id: "colosseum",
        title: "Colosseum of Fools",
        body: "Reaching the Colosseum of Fools was the moment I realized this game was a masterpiece.",
        left: "88%",
        top: "42%",
      },
      {
        id: "waterways",
        title: "Royal Waterways",
        body: "DUNG BOSS IS A MASTERPIECE",
        left: "55%",
        top: "72%",
      },
      {
        id: "deepnest",
        title: "Deepnest",
        body: "I sequence broke slightly here and shit myself constantly being in Deepnest in the early-ish game. Such a great area! Shame it has no boss.",
        left: "12%",
        top: "68%",
      },
    ],
  },
  {
    id: "fortnite",
    name: "Fortnite Season 2",
    image: "/gaming/fortnite-map.png",
    imageAlt: "Map of the Fortnite Chapter 2 island",
    memories: [
      {
        id: "agency",
        title: "The Agency",
        body: "Fortnite Season 2 was home for me for a long time. Me and Cole joined during the spy season, and played Fortnite Wednesday every week with Jessica. Really, really good days. And so many of them. So grateful!",
        left: "50%",
        top: "48%",
      },
      {
        id: "pleasant",
        title: "Pleasant Park",
        body: "VAULT TIME VAULT TIME VAULT TIME! Marvel season was best season.",
        left: "42%",
        top: "28%",
      },
      {
        id: "slurp",
        title: "Slurpy Swamp",
        body: "Will never forget Chris steamrolling an entire 4-squad solo. He left the rest of us in his dust. That's my lil bro!",
        left: "22%",
        top: "78%",
      },
      {
        id: "misty",
        title: "Misty Meadows",
        body: "GOLDEN MK GOLDEN MK",
        left: "78%",
        top: "72%",
      },
    ],
  },
  {
    id: "baldurs-gate",
    name: "Baldur's Gate",
    image: "/gaming/baldurs-gate-map.png",
    imageAlt: "Framed fantasy map of Baldur's Gate 3",
    intro:
      "This map hangs framed over my bed, four feet across — it's massive! A gift from Cole — probably the best I have gotten.",
    memories: [
      {
        id: "city",
        title: "Baldur's Gate",
        body: "Our ill-fated party never made it to the city of Baldur's Gate — after over a year of occasional sessions, we were still at Moonrise Towers. Busy lives!",
        left: "22%",
        top: "38%",
      },
      {
        id: "glade",
        title: "The Glade — John",
        body: "John was Garathor, our often-corrupt Paladin. He was happy to try out one of Mother Ethel's potions each fight, to read the Necronomicon, and generally do the evil things.",
        left: "88%",
        top: "34%",
      },
      {
        id: "last-light",
        title: "Last Light Inn — Luke",
        body: "Luke was a tricky thief and constantly got himself into trouble. We had to rescue him from under the Last Light Inn — sending that rescue party to recover him was a real challenge and my favorite adventure.",
        left: "74%",
        top: "26%",
      },
      {
        id: "moonrise",
        title: "Moonrise Towers — Cole",
        body: "Cole had a hard time finding their footing, but eventually became a SUPER SICK STORM CLERIC who could do so much fun stuff.",
        left: "58%",
        top: "40%",
      },
      {
        id: "rosymorn",
        title: "Rosymorn Monastery",
        body: "I wanted to play as a BEAR-BARIAN, a barbarian druid with throw specialty so I could throw people as a bear. I needed to make a custom mod to make my character work!",
        left: "80%",
        top: "14%",
      },
      {
        id: "underdark",
        title: "The Underdark",
        body: "We had a session on John's birthday, and I threw a feast with some games, laying out items around our camp for the guys.",
        left: "55%",
        top: "82%",
      },
      {
        id: "inventory",
        title: "Camp Inventory",
        body: "I spent a lot of time organizing everyone's inventory lol. So many items! Slows the game down to have everyone do it while the server is up.",
        left: "45%",
        top: "48%",
      },
      {
        id: "spoilers",
        title: "Trap Ahead",
        body: 'One of the most fun parts of our campaign was that Cole had played already — and knew many of the traps we were walking into! It was so funny to see them trying to hold their tongue as we blundered around. "I REALLY THINK we should NOT DO THAT" "Does the thing"',
        left: "82%",
        top: "84%",
      },
    ],
  },
];

function BootIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M4 20h11.5a2.5 2.5 0 0 0 0-5H14" />
      <path d="M4 20V9.5A3.5 3.5 0 0 1 7.5 6H9v3h2.5L14 15" />
      <path d="M9 6V4.5A1.5 1.5 0 0 1 10.5 3h.2" />
    </svg>
  );
}

function WorldMap({
  world,
  priority,
}: {
  world: WalkedWorld;
  priority?: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const panelId = useId();
  const openMemory = world.memories.find((m) => m.id === openId) ?? null;

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  return (
    <div className="mt-10">
      <h3 className="font-display text-fire-gold/85 text-xl tracking-tight sm:text-2xl">
        {world.name}
      </h3>
      {world.intro ? (
        <p className="text-mist mt-3 max-w-2xl text-base leading-relaxed sm:text-lg">
          {world.intro}
        </p>
      ) : null}

      <div className="mt-4 grid items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.65fr)]">
        <div className="border-fire/35 bg-fire/5 relative overflow-hidden rounded-[1.5rem] border shadow-[0_0_40px_rgba(255,90,20,0.12)]">
          <Image
            src={world.image}
            alt={world.imageAlt}
            width={1600}
            height={900}
            className="h-auto w-full"
            sizes="(max-width: 1024px) 100vw, 65vw"
            priority={priority}
          />

          {world.memories.map((memory) => {
            const isOpen = openId === memory.id;
            return (
              <button
                key={memory.id}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() =>
                  setOpenId((current) =>
                    current === memory.id ? null : memory.id,
                  )
                }
                className={`group focus-visible:ring-fire-gold absolute z-10 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-[radial-gradient(circle_at_35%_30%,rgba(255,209,102,0.55),rgba(255,59,31,0.35)_45%,rgba(20,8,6,0.92)_75%)] shadow-[0_0_24px_rgba(255,90,20,0.55)] transition-transform duration-300 hover:scale-110 focus-visible:ring-2 focus-visible:outline-none sm:size-14 ${
                  isOpen ? "border-fire-gold scale-110" : "border-fire-gold/50"
                }`}
                style={{ left: memory.left, top: memory.top }}
              >
                <span
                  aria-hidden
                  className="bg-fire-gold/25 absolute inset-0 animate-ping rounded-full"
                  style={{ animationDuration: "2.4s" }}
                />
                <BootIcon className="text-fire-gold relative size-5 sm:size-6" />
                <span className="sr-only">Open memory: {memory.title}</span>
              </button>
            );
          })}
        </div>

        <aside
          id={panelId}
          className={`rounded-[1.5rem] border p-5 transition-all duration-300 sm:p-6 ${
            openMemory
              ? "border-fire-gold/30 bg-[#140806]/95 shadow-[0_0_40px_rgba(255,80,20,0.18)]"
              : "lg:border-fire/20 lg:bg-fire/5 hidden border-transparent lg:block"
          }`}
        >
          {openMemory ? (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-fire-gold/70 text-sm tracking-[0.2em] uppercase">
                    Memory
                  </p>
                  <h4 className="font-display text-fire-gold mt-2 text-2xl tracking-tight">
                    {openMemory.title}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenId(null)}
                  className="border-fire-gold/30 text-fire-gold hover:bg-fire/20 rounded-full border px-3 py-1 text-sm transition-colors"
                >
                  Close
                </button>
              </div>
              <p className="text-mist mt-4 text-base leading-relaxed sm:text-lg">
                {openMemory.body}
              </p>
            </>
          ) : (
            <p className="text-mist/45 pt-2 text-base">
              Tap a bubble on the map.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}

export function WorldsWalkedMap() {
  return (
    <section className="mt-16 sm:mt-20">
      <h2 className="font-display text-fire-gold text-3xl tracking-tight sm:text-4xl">
        Worlds I&apos;ve walked (Maps I own!)
      </h2>

      {WORLDS.map((world, index) => (
        <WorldMap key={world.id} world={world} priority={index === 0} />
      ))}
    </section>
  );
}
