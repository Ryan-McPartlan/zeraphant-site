import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { GAME_DEV_GAMES, gameDevGameFromSlug } from "~/lib/game-dev";

type Props = {
  params: Promise<{ game: string }>;
};

export function generateStaticParams() {
  return GAME_DEV_GAMES.map((game) => ({ game: game.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game: slug } = await params;
  const game = gameDevGameFromSlug(slug);
  return {
    title: game ? `${game.label} · Game Dev` : "Game Dev",
  };
}

export default async function GameDevGameRoute({ params }: Props) {
  const { game: slug } = await params;
  const game = gameDevGameFromSlug(slug);
  if (!game) notFound();

  return (
    <main className="relative flex min-h-dvh flex-col justify-end px-6 py-24 sm:px-12 lg:px-20">
      <div className="max-w-3xl">
        <Link
          href="/passion/game-dev"
          className="text-fire-gold/70 hover:text-fire-gold text-sm tracking-[0.18em] uppercase transition-colors"
        >
          ← Back to Game Dev
        </Link>
        <h1 className="font-display text-fire-gold mt-6 text-5xl leading-[0.95] tracking-tight sm:text-7xl">
          {game.label}
        </h1>
        <p className="text-mist mt-5 max-w-md text-lg">{game.blurb}</p>
        <p className="border-fire-gold/40 bg-fire/20 text-fire-gold mt-10 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm shadow-[0_0_30px_rgba(255,90,20,0.35)] backdrop-blur-sm">
          <span
            aria-hidden
            className="size-2 animate-pulse rounded-full bg-current"
          />
          Game page still kindling — details soon
        </p>
      </div>
    </main>
  );
}
