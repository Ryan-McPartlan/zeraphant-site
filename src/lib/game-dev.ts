export type ItchEmbed = {
  id: string;
  title: string;
  itchUrl: string;
  embedSrc: string;
  description: string;
};

export type GameDevSection = {
  id: string;
  label: string;
  blurb: string;
};

/** Playable gift games hosted on itch.io */
export const GIFT_GAME_EMBEDS: readonly ItchEmbed[] = [
  {
    id: "keto-kwest",
    title: "Keto Kwest",
    itchUrl: "https://skelly1324.itch.io/keto-kwest",
    embedSrc: "https://itch.io/embed-upload/5050149?dark=true",
    description:
      "Tom learns nutrition so he can defeat Correlation One at ping pong. Made for Tom Jensen-Large — Correlation One secret Santa, 2018.",
  },
  {
    id: "erics-game",
    title: "Eric's Game",
    itchUrl: "https://skelly1324.itch.io/erics-game",
    embedSrc: "https://itch.io/embed-upload/5050064?dark=true",
    description:
      "Defeat spiders. Collect potatoes. Save Christmas. Made for Eric Dusseau — Correlation One secret Santa, 2021.",
  },
] as const;

export const FLAPPY_ZOMBIE = {
  id: "flappy-zombie",
  label: "Flappy Zombie",
  blurb: "My very own flappy bird clone.",
  story: [
    "Flappy zombie was my flappy bird clone, built off a tutorial. I gave it my own touch, and used some math to ensure it was JUST BARELY guaranteed to be always possible to survive.",
    "Before going offline, was William Sheridan (gold)'s favorite app. He is the Flappy Zombie world champion.",
  ],
  image: {
    src: "/passion/game-dev/flappy-zombie/gameplay.png",
    alt: "Flappy Zombie — game over screen and gameplay with brains and lava",
  },
} as const;

export const WAY_OF_THE_MANTIS = {
  id: "way-of-the-mantis",
  label: "Way of the Mantis",
  blurb:
    "A sick platformer — the first game I finished and published 100% on my own.",
  itchUrl: "https://skelly1324.itch.io/way-of-the-mantis",
  story: [
    "Way of the mantis is a sick platformer, and is the first game I finished and published 100% on my own :)",
  ],
  images: [
    {
      src: "/passion/game-dev/way-of-the-mantis/mantis-ascent.png",
      alt: "Way of the Mantis — jumping the canyon in Mantis Ascent",
    },
    {
      src: "/passion/game-dev/way-of-the-mantis/floating-island.png",
      alt: "Way of the Mantis — floating island with trees and glowing orbs",
    },
  ],
} as const;

export const SKELLYLABS_MODELS = [
  {
    src: "/passion/game-dev/skellylabs/demacratic-donkey.png",
    alt: "demacratic donkey — Roblox model by skellylabs, 2008",
    caption: "Born to dem",
  },
  {
    src: "/passion/game-dev/skellylabs/working-telescope.png",
    alt: "working telescope by skellylabs inc. — Roblox model with scripts",
    caption:
      "My greatest creation. Touching the lens would teleport you inside a tiny room inside the telescope, forcing your camera so close you can't see yourself — your view would instead be full of stars!",
  },
] as const;

export const KINDLED_GAMES = [
  {
    id: "axonauts",
    label: "Axonauts",
    blurb: "My next big game! This one is going to make a million dollars :)",
    story: ["Not too much to show off yet"],
  },
] as const;

/** Top-of-page directory — scroll targets on the Game Dev page */
export const GAME_DEV_DIRECTORY: readonly GameDevSection[] = [
  {
    id: "skellylabs",
    label: "Skellylabs",
    blurb: "The lab behind the flames.",
  },
  ...GIFT_GAME_EMBEDS.map((game) => ({
    id: game.id,
    label: game.title,
    blurb: game.description,
  })),
  {
    id: FLAPPY_ZOMBIE.id,
    label: FLAPPY_ZOMBIE.label,
    blurb: FLAPPY_ZOMBIE.blurb,
  },
  ...KINDLED_GAMES,
  {
    id: WAY_OF_THE_MANTIS.id,
    label: WAY_OF_THE_MANTIS.label,
    blurb: WAY_OF_THE_MANTIS.blurb,
  },
] as const;
