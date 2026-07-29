import Link from "next/link";

const FAVORITES = [
  "There is a rabbit that lives near Greystone station. We are pretty cool these days — he lets me get pretty close.",
  "My guinea pigs. The sweetest darn critters on earth.",
  "Chewbacca, my first dog. RIP.",
  "There is this pig at a farm and its um,",
] as const;

export function AnimalsPage() {
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
          Passion · Animals
        </p>
        <h1 className="font-display text-fire-gold mt-4 text-5xl leading-[0.95] tracking-tight sm:text-7xl">
          Animals
        </h1>
        <p className="font-display text-fire-gold/80 mt-4 text-xl sm:text-2xl">
          Like us, but cuter
        </p>

        <div className="text-mist mt-8 max-w-2xl space-y-5 text-lg">
          <p>Yo, did you notice that little dudes are kinda the best?</p>

          <div>
            <h2 className="font-display text-fire-gold text-2xl tracking-tight">
              Favorite animals
            </h2>
            <ul className="mt-4 space-y-3">
              {FAVORITES.map((item) => (
                <li
                  key={item}
                  className="border-fire/35 bg-fire/10 rounded-2xl border px-5 py-4"
                >
                  <span className="font-display text-fire-gold">→</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <p>
            Currently a fake pescatarian. I lean towards fish and cruelty free
            where I can, but don&apos;t sweat it too much.
          </p>
        </div>
      </div>
    </main>
  );
}
