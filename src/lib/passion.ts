export const PASSION_TOPICS = [
  {
    slug: "writing",
    label: "Writing",
    blurb: "And then there was light",
  },
  {
    slug: "gaming",
    label: "Gaming",
    blurb: "To walk 100 worlds",
  },
  {
    slug: "game-dev",
    label: "Game Dev",
    blurb: "My highest art",
  },
  {
    slug: "film",
    label: "Film",
    blurb: "Kin's highest art",
  },
  {
    slug: "videos",
    label: "Videos",
    blurb: "Ideas worth kindling",
  },
  {
    slug: "debate",
    label: "Debate",
    blurb: "FIGHT! WIN!",
  },
  {
    slug: "outdoors",
    label: "Outdoors",
    blurb: "Treasure to all mankind",
  },
  {
    slug: "sailing",
    label: "Sailing",
    blurb: "Like flying but wet",
  },
  {
    slug: "sleeping",
    label: "Sleeping",
    blurb: "My only temptation",
  },
  {
    slug: "animals",
    label: "Animals",
    blurb: "Like us, but cuter",
  },
  {
    slug: "food",
    label: "Food",
    blurb: "That one we all share",
  },
  {
    slug: "escape-rooms",
    label: "Escape Rooms",
    blurb: "An escape from the mundane",
  },
  {
    slug: "reading",
    label: "Reading",
    blurb: "Share our sparks",
  },
] as const;

export type PassionTopic = (typeof PASSION_TOPICS)[number];

export function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}
