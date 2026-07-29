import Link from "next/link";

export function ReadingPage() {
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
          Passion · Reading
        </p>
        <h1 className="font-fire text-fire-gold mt-4 text-5xl leading-[0.95] tracking-wide sm:text-7xl">
          Reading
        </h1>
        <p className="font-display text-fire-gold/80 mt-4 text-xl sm:text-2xl">
          Share our sparks
        </p>

        <div className="text-mist mt-8 max-w-2xl space-y-5 text-lg">
          <p>
            Sanderson enjoyer. Unapologetic Hoid defender. Favorite book is
            Stormlight 5: Knights of Wind and Truth. Not really close!
          </p>
          <p>
            I tried out Abercrombie and liked it a bit, but didn&apos;t get much
            from his main world. His most recent book, Devils, is absolutely
            stellar though!
          </p>
          <p>Still waiting on Doors of Stone.</p>
        </div>
      </div>
    </main>
  );
}
