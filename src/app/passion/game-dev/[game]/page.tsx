import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { RedirectToGameDevHash } from "~/components/passion/redirect-to-game-dev-hash";
import { GAME_DEV_DIRECTORY } from "~/lib/game-dev";

type Props = {
  params: Promise<{ game: string }>;
};

const LEGACY_SLUGS: Record<string, string> = {
  "gift-games": "keto-kwest",
};

export function generateStaticParams() {
  return GAME_DEV_DIRECTORY.map((entry) => ({ game: entry.id })).concat(
    Object.keys(LEGACY_SLUGS).map((game) => ({ game })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { game: slug } = await params;
  const hash = LEGACY_SLUGS[slug] ?? slug;
  const entry = GAME_DEV_DIRECTORY.find((item) => item.id === hash);
  return {
    title: entry ? `${entry.label} · Game Dev` : "Game Dev",
  };
}

export default async function GameDevGameRoute({ params }: Props) {
  const { game: slug } = await params;
  const hash = LEGACY_SLUGS[slug] ?? slug;
  if (!GAME_DEV_DIRECTORY.some((entry) => entry.id === hash)) notFound();

  return <RedirectToGameDevHash hash={hash} />;
}
