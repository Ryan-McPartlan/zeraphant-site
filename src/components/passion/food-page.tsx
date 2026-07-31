import Link from "next/link";

const FAVORITE_MEALS = [
  "#1: Nadine's, Yorktown Heights",
  "Full Irish breakfast in Ireland. Europe had a lot of fancy eating, but it was cool that it stood out so much to me as a simple well-executed breakfast. And, let's be fair, it caught me on a good day.",
  "Some fancy ass sushi in Boston",
  "Literally anything if I am inside of YARD HOUSE, the GREATEST APPLEBEE'S-LIKE restaurant of all time (don't get me started)",
] as const;

const MAC_NOTES = [
  "Triple the garlic",
  "Southwest spice blend is cumin / cayenne / garlic to taste — I basically double the cumin",
  "Pasta super al dente (it softens in the cheese) — take about 3 minutes off whatever HelloFresh says",
  "Cream sauce base is just milk and flour — mix in by eye for consistency",
  "I like to add a yellow onion",
] as const;

export function FoodPage() {
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
          Passion · Food
        </p>
        <h1 className="font-fire text-fire-gold mt-4 text-5xl leading-[0.95] tracking-wide sm:text-7xl">
          Food
        </h1>
        <p className="font-display text-fire-gold/80 mt-4 text-xl sm:text-2xl">
          That one we all share
        </p>

        <div className="text-mist mt-8 max-w-2xl space-y-5 text-lg">
          <section>
            <h2 className="font-display text-fire-gold text-2xl tracking-tight sm:text-3xl">
              Southwest mac &amp; cheese
            </h2>
            <p className="mt-3">
              My signature dish — adapted from HelloFresh&apos;s{" "}
              <a
                href="https://www.hellofresh.com/recipes/lone-star-poblano-mac-cheese-6182a16831db7215d52e870a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fire-gold decoration-fire-gold/40 underline underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                Lone Star Poblano Mac &amp; Cheese
              </a>
              , but made mine. (Lots of garlic and cumin, the only things almost
              as yummy as cilantro).
            </p>
            <p className="text-fire-gold/70 mt-4 text-sm tracking-[0.14em] uppercase">
              How I make it
            </p>
            <ul className="mt-3 space-y-3">
              {MAC_NOTES.map((note) => (
                <li
                  key={note}
                  className="border-fire/35 bg-fire/10 rounded-2xl border px-5 py-4"
                >
                  <span className="font-display text-fire-gold">→</span> {note}
                </li>
              ))}
            </ul>
          </section>

          <div>
            <h2 className="font-display text-fire-gold text-2xl tracking-tight">
              My favorite meals
            </h2>
            <ul className="mt-4 space-y-3">
              {FAVORITE_MEALS.map((meal) => (
                <li
                  key={meal}
                  className="border-fire/35 bg-fire/10 rounded-2xl border px-5 py-4"
                >
                  <span className="font-display text-fire-gold">→</span> {meal}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
