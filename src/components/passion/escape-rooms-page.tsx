import Link from "next/link";

import { EscapeRoomPuzzle } from "~/components/passion/escape-room-puzzle";

export function EscapeRoomsPage() {
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
          Passion · Escape Rooms
        </p>
        <h1 className="font-fire text-fire-gold mt-4 text-5xl leading-[0.95] tracking-wide sm:text-7xl">
          Escape Rooms
        </h1>
        <p className="font-display text-fire-gold/80 mt-4 text-xl sm:text-2xl">
          An escape from the mundane
        </p>

        <div className="text-mist mt-8 max-w-4xl space-y-5 text-lg">
          <p className="max-w-2xl">
            I love escape rooms! Literally the best generic activity to share
            with a group. Good memories and good times.
          </p>

          <EscapeRoomPuzzle />
        </div>
      </div>
    </main>
  );
}
