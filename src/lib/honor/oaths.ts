export type OathSegment = {
  text: string;
  /** true / "honor" = sky, "passion" = fire, "connection" = gold */
  accent?: boolean | "honor" | "passion" | "connection";
  href?: string;
};

export const OATH_IDS = [
  "declaration",
  "constitution",
  "pledge-of-allegiance",
  "scout-law",
  "scout-oath",
  "scout-slogan",
  "integrity",
  "obligation-of-an-engineer",
  "effective-altruism",
  "pledge-to-give",
  "animal-welfare",
  "grace",
  "path-of-the-sage",
  "pledge-to-love",
] as const;

export type OathId = (typeof OATH_IDS)[number];

export type OathCohort = "patriots" | "scouts" | "altruists" | "engineers";

export type Oath = {
  id: OathId;
  title: string;
  year?: number;
  body: string | OathSegment[];
  pledge?: string;
  note?: string;
  /** Personal oaths are not offered for others to take */
  personal?: boolean;
  /** Noun used when counting who has bound themselves to this oath */
  cohort?: OathCohort;
  href?: string;
  hrefLabel?: string;
};

export const oaths: Oath[] = [
  {
    id: "declaration",
    title: "The Declaration",
    year: 1996,
    cohort: "patriots",
    body: "I hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.",
    pledge:
      "For the support of this Declaration, I pledge my Life, Fortune and sacred Honor.",
  },
  {
    id: "constitution",
    title: "The Constitution",
    year: 1996,
    cohort: "patriots",
    body: [
      { text: "I pledge myself", accent: true },
      {
        text: " to the Union and its Constitution, to Justice, to Tranquility, to the general Welfare, and to securing the Blessings of Liberty for ourselves and our Posterity.\n\n",
      },
      { text: "I do solemnly swear", accent: true },
      {
        text: " that I will faithfully and to the best of my ability, preserve, protect and defend the Constitution of the United States.",
      },
    ],
  },
  {
    id: "pledge-of-allegiance",
    title: "The Pledge of Allegiance",
    year: 1996,
    cohort: "patriots",
    body: [
      {
        text: "I pledge allegiance to the Flag of the United States of America",
        accent: true,
      },
      {
        text: ", and to the Republic for which it stands, one Nation under God, indivisible, with liberty and justice for all.",
      },
    ],
  },
  {
    id: "scout-law",
    title: "The Scout Law",
    year: 2009,
    cohort: "scouts",
    body: "A Scout is trustworthy, loyal, helpful, friendly, courteous, kind, obedient, cheerful, thrifty, brave, clean, and reverent.",
    pledge: "I pledge to be a good scout",
  },
  {
    id: "scout-oath",
    title: "The Scout Oath",
    year: 2009,
    cohort: "scouts",
    body: [
      { text: "On my honor", accent: true },
      { text: " I will do my best to " },
      { text: "do my duty", accent: true },
      {
        text: " to God and my country and to obey the Scout Law; ",
      },
      { text: "to help other people at all times", accent: true },
      {
        text: "; to keep myself physically strong, mentally awake, and morally straight.",
      },
    ],
  },
  {
    id: "scout-slogan",
    title: "The Scout Slogan",
    year: 2009,
    cohort: "scouts",
    body: [
      { text: "I pledge", accent: true },
      { text: " to do a good turn daily." },
    ],
  },
  {
    id: "integrity",
    title: "Integrity",
    year: 2014,
    personal: true,
    body: [{ text: "I do not lie.", accent: true }],
  },
  {
    id: "obligation-of-an-engineer",
    title: "Obligation of an Engineer",
    year: 2018,
    cohort: "engineers",
    note: "While my degree (computer science) does not qualify me for membership in the order of engineering, I admire their oath and take it gladly.",
    body: [
      {
        text: "I am an Engineer. In my profession I take deep pride. To it I owe solemn obligations. As an Engineer, ",
      },
      { text: "I pledge", accent: true },
      {
        text: " to practice integrity and fair dealing, tolerance and respect; and to uphold devotion to the standards and the dignity of my profession, conscious always that my skill carries with it the obligation to serve humanity by making the best use of the Earth's precious wealth. As an Engineer, ",
      },
      { text: "I shall", accent: true },
      {
        text: " participate in none but honest enterprises. When needed, my skill and knowledge shall be given without reservation for the public good. In the performance of duty and with deep fidelity to my profession, ",
      },
      { text: "I shall", accent: true },
      { text: " give my utmost." },
    ],
  },
  {
    id: "effective-altruism",
    title: "Effective Altruism",
    year: 2022,
    cohort: "altruists",
    body: [
      { text: "I pledge", accent: true },
      {
        text: " to think deeply, and frequently, about how I can do good better.",
      },
    ],
  },
  {
    id: "pledge-to-give",
    title: "Pledge to Give",
    year: 2022,
    cohort: "altruists",
    href: "https://www.givingwhatwecan.org/pledge",
    hrefLabel: "givingwhatwecan.org/pledge",
    body: [
      {
        text: "I recognise that I can use part of my income to do a significant amount of good.\n\nSince I can live well enough on a smaller income, ",
      },
      { text: "I pledge", accent: true },
      {
        text: " that from today and for the rest of my life, I shall give at least 10% of what I earn to whichever ",
      },
      {
        text: "organizations",
        href: "https://www.givewell.org/",
      },
      {
        text: " can most effectively use it to improve the lives of others.\n\n",
      },
      {
        text: "I make this pledge freely, openly, and sincerely.",
        accent: true,
      },
    ],
  },
  {
    id: "animal-welfare",
    title: "Animal Welfare",
    year: 2022,
    cohort: "altruists",
    body: [
      { text: "I pledge", accent: true },
      {
        text: " to minimize the unnecessary suffering I cause to animals.",
      },
    ],
  },
  {
    id: "grace",
    title: "Grace",
    year: 2023,
    personal: true,
    body: [
      { text: "I pledge", accent: true },
      {
        text: " to see the best in people, to have no enemies — but to ",
      },
      { text: "fight vigorously", accent: "passion" },
      {
        text: " against the evil ideas that possess them.",
      },
    ],
  },
  {
    id: "path-of-the-sage",
    title: "The Path of the Sage",
    year: 2025,
    personal: true,
    body: [
      { text: "To Sam, " },
      { text: "I pledge", accent: true },
      {
        text: " to be both firm and gentle for all my days. To see the narrow way through.",
      },
    ],
  },
  {
    id: "pledge-to-love",
    title: "Love",
    year: 2025,
    personal: true,
    body: [
      { text: "I will", accent: true },
      { text: " " },
      { text: "nurture and cultivate love", accent: "connection" },
      { text: " wherever it arises." },
    ],
  },
];

export function oathAudioSrc(oathId: string): string {
  return `/honor/oaths/audio/${oathId}.mp3`;
}
