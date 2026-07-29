import Link from "next/link";

import { GAME_DEV_GAMES } from "~/lib/game-dev";

export function GameDevPage() {
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
          Passion · Game Dev
        </p>
        <h1 className="font-fire text-fire-gold mt-4 text-5xl leading-[0.95] tracking-wide sm:text-7xl">
          Game Dev
        </h1>
        <p className="font-display text-fire-gold/80 mt-4 text-xl sm:text-2xl">
          My highest art
        </p>

        <div className="text-mist mt-8 max-w-2xl space-y-5 text-lg">
          <p>
            Game dev was my first great passion. In college, I would come home
            from school, sit at my computer, and do game dev work for 8 hours.
            Basically every day! I would have been glad to have made it my
            career.
          </p>
          <p>
            See my itch.io:{" "}
            <a
              href="https://skelly1324.itch.io/"
              target="_blank"
              rel="noreferrer"
              className="text-fire-gold decoration-fire-gold/40 underline underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              skelly1324.itch.io
            </a>
          </p>
          <p>
            Fun fact: My IBM interviewer asked if I was ready to write
            &ldquo;Real code&rdquo;, a military contractor asked if I spent more
            time &ldquo;Playing games or building them&rdquo;.
          </p>
        </div>

        <section className="mt-16">
          <h2 className="font-display text-fire-gold text-2xl tracking-tight sm:text-3xl">
            Games
          </h2>
          <p className="text-mist mt-2">
            Pick a title — each one opens its own ember.
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {GAME_DEV_GAMES.map((game) => (
              <li key={game.slug}>
                <Link
                  href={`/passion/game-dev/${game.slug}`}
                  className="group border-fire/35 bg-fire/10 hover:border-fire-gold/50 hover:bg-fire/20 relative block overflow-hidden rounded-2xl border px-5 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(255,90,20,0.25)]"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-6 right-4 h-16 w-10 rounded-full bg-[radial-gradient(circle_at_50%_80%,#ffd166,transparent_70%)] opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-80"
                  />
                  <span className="font-display text-fire-gold text-xl transition-colors group-hover:text-white">
                    {game.label}
                  </span>
                  <span className="text-mist mt-2 block text-sm">
                    {game.blurb}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
