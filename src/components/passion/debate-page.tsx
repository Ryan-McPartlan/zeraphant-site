import Link from "next/link";

const RAGEBAIT = [
  "Insider trading is good",
  "Defence of Neocons, Middle Eastern intervention, Ben Shapiro",
  "Joining someone else's side of an argument, just to nuke them with an extreme and unnecessary bullet bite",
  "Hitler's Friend",
] as const;

export function DebatePage() {
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
          Passion · Debate
        </p>
        <h1 className="font-fire text-fire-gold mt-4 text-5xl leading-[0.95] tracking-wide sm:text-7xl">
          Debate
        </h1>
        <p className="font-display text-fire-gold/80 mt-4 text-xl sm:text-2xl">
          FIGHT! WIN!
        </p>

        <div className="text-mist mt-8 max-w-2xl space-y-5 text-lg">
          <p>
            Debate is super fun! I haven&apos;t had a lot of opportunity to
            engage recently, besides DEMOLISHING Josh Sunforger by PROVING that
            insider trading is good.
          </p>
          <p>
            Watch me debate Ben Shapiro:{" "}
            <a
              href="https://youtu.be/QK-liQhqPjs?si=CnKsW7vp1IH_xvWR&t=1310"
              target="_blank"
              rel="noreferrer"
              className="text-fire-gold decoration-fire-gold/40 underline underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              YouTube clip (starts at the good part)
            </a>
          </p>
        </div>

        <section className="mt-16 max-w-2xl">
          <h2 className="font-display text-fire-gold text-2xl tracking-tight sm:text-3xl">
            Favorite ragebait takes and debate tactics
          </h2>
          <ul className="mt-6 space-y-3">
            {RAGEBAIT.map((item) => (
              <li
                key={item}
                className="border-fire/35 bg-fire/10 text-mist rounded-2xl border px-5 py-4"
              >
                <span className="font-display text-fire-gold">→</span> {item}
              </li>
            ))}
          </ul>
        </section>

        <p className="text-mist mt-12 max-w-2xl text-lg">
          I found the correct argument! But faltered a bit in the delivery. Was
          pretty happy overall!
        </p>
      </div>
    </main>
  );
}
