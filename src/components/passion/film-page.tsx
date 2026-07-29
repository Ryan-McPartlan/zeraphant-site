import Link from "next/link";

export function FilmPage() {
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
          Passion · Film
        </p>
        <h1 className="font-display text-fire-gold mt-4 text-5xl leading-[0.95] tracking-tight sm:text-7xl">
          Film
        </h1>
        <p className="font-display text-fire-gold/80 mt-4 text-xl sm:text-2xl">
          Kin&apos;s highest art
        </p>

        <div className="text-mist mt-8 max-w-2xl space-y-5 text-lg">
          <p>
            Movies are interesting for me — they leave some of the most powerful
            impressions, but because of my uniquely bad memory, I tend to forget
            basically everything that actually happens.
          </p>
          <p>
            One of my favorite periods was ~2018-19, where I went down and
            watched through most of the IMDB top 100 — that will keep you busy
            for a year!
          </p>
          <p>
            I am trying to be more deliberate about movie watching, and got a
            Letterboxd a few weeks ago. I like these kinds of rating apps! I
            feel like without them everything tends to escape me over time.
          </p>
          <p>
            <a
              href="https://letterboxd.com/zeraphant/"
              target="_blank"
              rel="noreferrer"
              className="text-fire-gold decoration-fire-gold/40 underline underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              letterboxd.com/zeraphant
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
