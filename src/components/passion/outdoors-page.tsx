import Link from "next/link";

export function OutdoorsPage() {
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
          Passion · Outdoors
        </p>
        <h1 className="font-display text-fire-gold mt-4 text-5xl leading-[0.95] tracking-tight sm:text-7xl">
          Outdoors
        </h1>
        <p className="font-display text-fire-gold/80 mt-4 text-xl sm:text-2xl">
          Treasure to all mankind
        </p>

        <div className="text-mist mt-8 max-w-2xl space-y-5 text-lg">
          <p>
            Who doesn&apos;t love a good hike! Been to most of the good ones
            around Westchester and the Palisades, always try to hit a trail
            while I&apos;m out.
          </p>
          <p>
            I don&apos;t get out west much, so Red Rock in Vegas is currently my
            favorite — just so unique from anything else I have done.
          </p>
        </div>
      </div>
    </main>
  );
}
