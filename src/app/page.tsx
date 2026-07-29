import Link from "next/link";

import { NAV_ITEMS } from "~/lib/nav";

export default function HomePage() {
  return (
    <main className="relative flex min-h-dvh flex-col justify-end px-6 pb-16 sm:px-12 sm:pb-20 lg:px-20">
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="font-display text-silver/15 absolute top-[18%] left-[8%] max-w-[min(90vw,28rem)] -rotate-6 text-[clamp(4.5rem,18vw,13rem)] leading-none tracking-tight select-none">
          click
          <br />
          anything
        </div>
      </div>

      <div className="relative z-10 max-w-4xl">
        <p className="text-silver mb-5 text-sm tracking-[0.24em] uppercase">
          Personal playground
        </p>
        <h1 className="font-display text-silver-bright text-[clamp(3.5rem,12vw,9rem)] leading-[0.88] tracking-tight">
          Zeraphant
        </h1>
        <p className="text-mist mt-6 max-w-lg text-lg sm:text-xl">
          Six rooms, one ridiculous cursor, and confetti for every click. Peek
          into the bubble up top whenever you feel lost.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/the-present"
            className="bg-silver-bright text-ink rounded-full px-5 py-3 font-semibold transition-transform hover:scale-[1.03] active:scale-95"
          >
            Start in the present
          </Link>
          <Link
            href={NAV_ITEMS[0]!.href}
            className="border-silver/35 bg-silver/10 text-silver-bright hover:bg-silver/20 rounded-full border px-5 py-3 font-semibold transition-colors"
          >
            Wander into passion
          </Link>
        </div>
      </div>
    </main>
  );
}
