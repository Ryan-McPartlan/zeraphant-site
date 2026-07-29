import Link from "next/link";

export function VideosPage() {
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
          Passion · Videos
        </p>
        <h1 className="font-fire text-fire-gold mt-4 text-5xl leading-[0.95] tracking-wide sm:text-7xl">
          Videos
        </h1>
        <p className="font-display text-fire-gold/80 mt-4 text-xl sm:text-2xl">
          Ideas worth kindling
        </p>

        <div className="text-mist mt-8 max-w-2xl space-y-5 text-lg">
          <p>
            Like everyone in orbit, I think of being a creator sometimes, and I
            definitely have the arrogance and self indulgence for it.
          </p>
          <p>
            Check out my YouTube! Because it&apos;s demoted to my 6th priority,
            it&apos;s mostly just candid chit chat for ideas I think are
            interesting.
          </p>
          <p>
            <a
              href="https://www.youtube.com/@zeraphant"
              target="_blank"
              rel="noreferrer"
              className="text-fire-gold decoration-fire-gold/40 underline underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              youtube.com/@zeraphant
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
