import Link from "next/link";

const SLEEP_STATS = [
  "Only good dreams",
  "Can consistently induce good dreams",
  "Fall asleep instantly on command",
  "Can sleep for 12 hours easily if nothing to do the next day",
  "Awake instantly at minor disturbances, back asleep instantly when resolved",
] as const;

export function SleepingPage() {
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
          Passion · Sleeping
        </p>
        <h1 className="font-display text-fire-gold mt-4 text-5xl leading-[0.95] tracking-tight sm:text-7xl">
          Sleeping
        </h1>
        <p className="font-display text-fire-gold/80 mt-4 text-xl sm:text-2xl">
          My only temptation
        </p>

        <div className="text-mist mt-8 max-w-2xl space-y-5 text-lg">
          <p className="font-display text-fire-gold text-2xl tracking-tight sm:text-3xl">
            I am THE RANKED COMPETITIVE #1 SLEEPER
          </p>
          <ul className="space-y-3">
            {SLEEP_STATS.map((stat) => (
              <li
                key={stat}
                className="border-fire/35 bg-fire/10 rounded-2xl border px-5 py-4"
              >
                <span className="font-display text-fire-gold">→</span> {stat}
              </li>
            ))}
          </ul>
          <p className="font-display text-fire-gold text-2xl tracking-tight sm:text-3xl">
            I WILL SLEEP MOG THE FUCK OUT OF YOU
          </p>
          <p>
            Note that my high-intensity sleeping causes snoring to disrupt my
            enemies and allow me to more completely sleep-mog them.
          </p>
        </div>
      </div>
    </main>
  );
}
