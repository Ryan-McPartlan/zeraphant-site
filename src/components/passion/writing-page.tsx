import Link from "next/link";

import { WorldBubbles } from "~/components/passion/world-bubbles";

export function WritingPage() {
  return (
    <main className="relative min-h-dvh px-6 py-24 sm:px-12 lg:px-20">
      <div className="relative z-10 mx-auto max-w-4xl">
        <Link
          href="/passion"
          className="text-fire-gold/70 hover:text-fire-gold text-sm tracking-[0.18em] uppercase transition-colors"
        >
          ← Back to Passion
        </Link>

        <p className="text-fire-gold mt-8 text-sm tracking-[0.22em] uppercase">
          Passion · Writing
        </p>
        <h1 className="font-display text-fire-gold mt-4 text-5xl leading-[0.95] tracking-tight sm:text-7xl">
          Writing
        </h1>
        <p className="font-display text-fire-gold/80 mt-4 text-xl sm:text-2xl">
          And then there was light
        </p>

        <div className="text-mist mt-8 max-w-2xl space-y-5 text-lg">
          <p>
            I have been developing my fantasy setting Paragon since high school
            for DnD campaigns and now for my first book! Game dev is my most
            developed passion, but since I code so much for work, writing is the
            one I most enjoy. And its the easiest to do while driving or
            showering!
          </p>
          <p>
            Fun fact: Me and Cole&apos;s first substantial 1:1 interaction was
            me info dumping about my world for two hours. Passion is admirable!
          </p>
        </div>

        <section className="mt-24 pb-16">
          <h2 className="font-display text-fire-gold text-3xl tracking-tight sm:text-4xl">
            Learn about my world!
          </h2>
          <p className="text-mist mt-3 max-w-xl">
            Tap a bubble to open a piece of Paragon.
          </p>
          <WorldBubbles />
        </section>
      </div>
    </main>
  );
}
