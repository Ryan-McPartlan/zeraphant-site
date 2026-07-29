import Link from "next/link";

export function SailingPage() {
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
          Passion · Sailing
        </p>
        <h1 className="font-display text-fire-gold mt-4 text-5xl leading-[0.95] tracking-tight sm:text-7xl">
          Sailing
        </h1>
        <p className="font-display text-fire-gold/80 mt-4 text-xl sm:text-2xl">
          Like flying but wet
        </p>

        <div className="text-mist mt-8 max-w-2xl space-y-5 text-lg">
          <p>
            Sailing is about as close as we can get to flying. I remember, so
            distinctly, the feeling at… 14? Of knowing that I would get to sail
            a sailboat at Camp Read. Or the one day I sailed across the Belmar
            bay, and me and Luke left the class in our dust.
          </p>
          <p>
            It is shocking how little I have sailed for how much I love it. Need
            to do this soon!
          </p>
          <p>
            Pirate is the best sailing game. You ram into the other sailboat,
            and start to untie knots or steal their rudder, pushing each other
            into the water to defend your boats. Good idea for a retreat….
          </p>
        </div>
      </div>
    </main>
  );
}
