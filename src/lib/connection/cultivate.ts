export type CultivateTabId =
  | "home"
  | "making-new"
  | "watering"
  | "letters"
  | "events";

export type CultivateTab = {
  id: CultivateTabId;
  label: string;
};

export const CULTIVATE_TABS: readonly CultivateTab[] = [
  { id: "home", label: "Cultivating our connections" },
  { id: "making-new", label: "Making new connections" },
  { id: "watering", label: "Watering the garden" },
  { id: "letters", label: "Letters" },
  { id: "events", label: "Gathering" },
] as const;

export const LETTER_KITS = [
  {
    href: "https://www.amazon.com/dp/B09WH8VM89",
    label: "Letter writing kit",
  },
  {
    href: "https://www.amazon.com/dp/B08SQ9P1S3",
    label: "Wax seal stamp kit",
  },
] as const;

export const EVENT_TYPES = [
  {
    title: "Murder Mysteries",
    body: [
      "The fall murder mystery party will be a staple forever! Who doesn't love a big ass murder mystery mansion.",
    ],
  },
  {
    title: "Symposiums",
    body: [
      "At a symposium, a single topic will be selected, and we will spend a few days exploring it, hoping to answer and pose a few dozen questions. Activities will be planned and designed around exploration of the theme:",
    ],
    bullets: [
      "Speed-question circles",
      "Presentations",
      "Debates",
      "Other more and less structured activities",
    ],
    after: [
      "Symposiums and gatherings of the minds was what gave birth to liberalism, the renaissance. We can do better!",
      "I want to do the first one spring this year, we'll see how murder mystery goes.",
    ],
  },
  {
    title: "Purposeful retreats",
    body: [
      "I really like the idea of having gatherings with a very specific theme or purpose. Like, bringing together all musicians and devoting ourselves to making music together, or coders for hackathons, stuff like this. Need to figure it out more!",
    ],
  },
  {
    title: "Totally bizarre experiences",
    body: [
      "I have some wacky ideas guys. PLEASE GOD let me get rich PLEASE GOD I could do so much funny shit HOLY FUCK what are rich people doing",
    ],
  },
] as const;
