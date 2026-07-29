export const GAME_DEV_GAMES = [
  {
    slug: "axonauts",
    label: "Axonauts",
    blurb: "A spark still waiting to be retold.",
  },
  {
    slug: "gift-games",
    label: "Gift Games",
    blurb: "Games made to be given.",
  },
  {
    slug: "way-of-the-mantis",
    label: "Way of the Mantis",
    blurb: "A platformer cut from sharp edges.",
  },
  {
    slug: "flappy-zombie",
    label: "Flappy Zombie",
    blurb: "My very own flappy bird clone.",
  },
  {
    slug: "skellylabs",
    label: "Skellylabs",
    blurb: "The lab behind the flames.",
  },
] as const;

export type GameDevGame = (typeof GAME_DEV_GAMES)[number];

export function gameDevGameFromSlug(slug: string): GameDevGame | undefined {
  return GAME_DEV_GAMES.find((game) => game.slug === slug);
}
