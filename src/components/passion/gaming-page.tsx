import Link from "next/link";

import { WorldsWalkedMap } from "~/components/passion/worlds-walked-map";

const INDIE_TITLES = [
  "Tiny Terry's Turbo Trip",
  "A Short Hike",
  "PIKUNIKU",
] as const;

export function GamingPage() {
  return (
    <main className="relative min-h-dvh px-6 py-24 sm:px-12 lg:px-20">
      <div className="relative z-10 mx-auto max-w-6xl">
        <Link
          href="/passion"
          className="text-fire-gold/70 hover:text-fire-gold text-sm tracking-[0.18em] uppercase transition-colors"
        >
          ← Back to Passion
        </Link>

        <p className="text-fire-gold mt-8 text-sm tracking-[0.22em] uppercase">
          Passion · Gaming
        </p>
        <h1 className="font-fire text-fire-gold mt-4 text-5xl leading-[0.95] tracking-wide sm:text-7xl">
          Gaming
        </h1>
        <p className="font-display text-fire-gold/80 mt-4 text-xl sm:text-2xl">
          To walk 100 worlds
        </p>

        <div className="text-mist mt-8 max-w-2xl space-y-5 text-lg">
          <p>
            I love this medium so much. It is slightly more vulnerable to
            corruption than others due to dopamine hacking stuff, but at its
            peak it is… it&apos;s just perfect.
          </p>

          <div>
            <p>
              These small hand-crafted indie titles are peak art, and are small
              enough to fit into busy days:
            </p>
            <ul className="mt-4 space-y-3">
              {INDIE_TITLES.map((title) => (
                <li
                  key={title}
                  className="border-fire/35 bg-fire/10 rounded-2xl border px-5 py-4"
                >
                  <span className="font-display text-fire-gold">→</span> {title}
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Games like these, filled with unexpected puzzles and delights and
              surprises, are a major inspiration for this site!
            </p>
          </div>

          <p>
            Bloodborne is pretty objectively the best Souls game, but no game
            can ever be as good as playing OG Dark Souls for the first time —
            thanks to Anthony Virella for the intro.
          </p>

          <p>
            I collect maps for games I have played. If you are looking for a
            gift idea :)
          </p>
        </div>

        <WorldsWalkedMap />
      </div>
    </main>
  );
}
