export type OathSegment = {
  text: string;
  /** true / "honor" = sky, "passion" = fire, "connection" = gold */
  accent?: boolean | "honor" | "passion" | "connection";
  href?: string;
};

export type Oath = {
  id: string;
  title: string;
  body: string | OathSegment[];
  pledge?: string;
  href?: string;
  hrefLabel?: string;
};

export const oaths: Oath[] = [
  {
    id: "declaration",
    title: "The Declaration",
    body: "I hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.",
    pledge:
      "For the support of this Declaration, I pledge my Life, Fortune and sacred Honor.",
  },
  {
    id: "constitution",
    title: "The Constitution",
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
    body: "A Scout is trustworthy, loyal, helpful, friendly, courteous, kind, obedient, cheerful, thrifty, brave, clean, and reverent.",
    pledge: "I pledge to be a good scout",
  },
  {
    id: "scout-oath",
    title: "The Scout Oath",
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
    body: [
      { text: "I pledge", accent: true },
      { text: " to do a good turn daily." },
    ],
  },
  {
    id: "effective-altruism",
    title: "Effective Altruism",
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
    body: [
      { text: "I pledge", accent: true },
      {
        text: " to minimize the unnecessary suffering I cause to animals.",
      },
    ],
  },
  {
    id: "pledge-to-love",
    title: "Love",
    body: [
      { text: "I will", accent: true },
      { text: " " },
      { text: "nurture and cultivate love", accent: "connection" },
      { text: " wherever it arises." },
    ],
  },
  {
    id: "grace",
    title: "Grace",
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
    id: "integrity",
    title: "Integrity",
    body: [{ text: "I do not lie.", accent: true }],
  },
  {
    id: "path-of-the-sage",
    title: "The Path of the Sage",
    body: [
      { text: "To Sam, " },
      { text: "I pledge", accent: true },
      {
        text: " to be both firm and gentle for all my days. To see the narrow way through.",
      },
    ],
  },
];
