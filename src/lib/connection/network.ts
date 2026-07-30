/** Person styles — honor = blue · passion = red · connection = gold · silver = silver */
export const PERSON_STYLES = [
  "honor",
  "passion",
  "connection",
  "silver",
] as const;
export type PersonStyle = (typeof PERSON_STYLES)[number];

export type ConnectionPerson = {
  epithet: string;
  name: string;
  /** honor = blue · passion = red · connection = gold · silver = silver */
  style: PersonStyle;
};

/**
 * Belonging / brightness on a fixed gold → tarnished-brown scale.
 * 10 = brightest living gold · 1 = most tarnished brown
 */
export type GlowLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type ConnectionNode = {
  id: string;
  label: string;
  /** Shorter face label when the full title is long */
  shortLabel?: string;
  subtitle?: string;
  blurb: string;
  people?: ConnectionPerson[];
  /** Shown under Particularly, after the named people */
  closing?: string;
  /** Relative path under /public, optional until photos land */
  image?: string;
  size: "xl" | "lg" | "md" | "sm";
  /** Position on the gold → tarnished-brown gradient (1–10) */
  glow: GlowLevel;
};

export type ConnectionEdge = {
  from: string;
  to: string;
  stiffness?: number;
};

/** Stops along gold → tarnished brown (index = glow − 1) */
const GLOW_STOPS = [
  "#4a3514", // 1 — tarnished brown
  "#5c4218", // 2
  "#6e5220", // 3
  "#856428", // 4
  "#9a7830", // 5
  "#b89238", // 6
  "#d4a83e", // 7
  "#e8bc42", // 8
  "#f5cc44", // 9
  "#ffd24a", // 10 — living gold
] as const;

function mixHex(a: string, b: string, t: number) {
  const parse = (hex: string) => {
    const h = hex.replace("#", "");
    return [
      Number.parseInt(h.slice(0, 2), 16),
      Number.parseInt(h.slice(2, 4), 16),
      Number.parseInt(h.slice(4, 6), 16),
    ] as const;
  };
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `#${[r, g, bl].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}

export function glowStyle(glow: GlowLevel) {
  const t = (glow - 1) / 9;
  const mid = GLOW_STOPS[glow - 1]!;
  const highlight =
    glow >= 8
      ? mixHex("#ffd24a", "#ffcc33", 0.35)
      : glow >= 5
        ? mixHex(mid, "#e8bc42", 0.45)
        : mixHex(mid, "#9a7830", 0.35);
  const deep = mixHex("#1a1208", "#3a2a12", Math.min(1, t * 0.55));
  // Outer bloom: none at 1, full at 10
  const glowPx = t * 56;
  const glowAlpha = t * 0.65;

  return {
    mid,
    highlight,
    deep,
    boxShadow:
      t <= 0 ? "none" : `0 0 ${glowPx}px rgba(255, 200, 60, ${glowAlpha})`,
    ring: `rgba(255, 210, 80, ${0.18 + t * 0.5})`,
    textLight: glow <= 4,
    imageOpacity: 0.5 + t * 0.45,
  };
}

export const CONNECTION_NODES: ConnectionNode[] = [
  {
    id: "community",
    label: "Truth seeking, Virtuous nerds",
    shortLabel: "Truth seeking, Virtuous nerds",
    subtitle: "Our broader community",
    blurb:
      "Our broader community. If you are reading this, right now, these are your people, the top of your funnel, our baseline.\n\nThey are scattered to the winds. Find them, gather them, invite them to join your communities. Connect with them!",
    image: "/connection/community-nerds.png",
    size: "xl",
    glow: 8,
  },
  {
    id: "gaming",
    label: "Gaming",
    subtitle: "Days well spent",
    blurb: "Days well spent. Particularly those spent with:",
    image: "/connection/gaming.png",
    people: [
      {
        epithet: "The Exalted",
        name: "Ileff Harney",
        style: "passion",
      },
      {
        epithet: "Grandmaster Artisan,",
        name: "Jessica Harney",
        style: "connection",
      },
    ],
    size: "sm",
    glow: 6,
  },
  {
    id: "victory-boys",
    label: "Victory Boys",
    subtitle: "The best of us",
    blurb:
      "We shared a home at 266 Bodmann in Cinti for... 4 months? We all remember that time very well, and very fondly.",
    image: "/connection/266-bodmann.jpg",
    people: [
      {
        epithet: "Our friend and mentor,",
        name: "Sejin",
        style: "honor",
      },
      {
        epithet: "The glue,",
        name: "Jack Dorsey",
        style: "connection",
      },
    ],
    closing:
      "The others have moved on to other parts of my life and can be found elsewhere among my connections.",
    size: "sm",
    glow: 10,
  },
  {
    id: "dgg",
    label: "dgg",
    subtitle: "Destiny's community",
    blurb:
      "The first time I ever felt at home was at the 2022 doorknock for Warnock event. I could sit at any table and enjoy all of the company. I finally found the community I was looking for!\n\nWe have our rough edges but its a lot of really great folks,",
    people: [
      {
        epithet: "Our mutual best friend,",
        name: "Steven Bonnell",
        style: "honor",
      },
    ],
    image: "/connection/dgg.png",
    size: "md",
    glow: 7,
  },
  {
    id: "superego",
    label: "The Superego",
    shortLabel: "The Superego",
    subtitle: "Kyla's community",
    blurb:
      "Some of the most intelligent and open people I have met. A group worth getting closer with!",
    image: "/connection/superego.png",
    size: "sm",
    glow: 2,
  },
  {
    id: "dggp",
    label: "Digital Ground Game",
    shortLabel: "Digital Ground Game",
    subtitle: "Destiny politics",
    blurb:
      "Me and Bryce cofounded this shit BRICK BY BRICK. My first community building project!\n\ndgg is a great starting point, but the community I ultimately want will need to be cultivated. Digital Ground Game is a great start towards this, but dgg is super lacking in the love shit.\n\nThe next community I build, I want to infuse with that. I need to connect with the burners to learn more about this!",
    image: "/connection/dggp.png",
    people: [
      {
        epithet: "Built this shit Brick by brick,",
        name: "Bryce Peever",
        style: "honor",
      },
      {
        epithet: "My treasured friend,",
        name: "Sam Cebula",
        style: "connection",
      },
      {
        epithet: "The only person I could ever envy,",
        name: "Blair Jones",
        style: "connection",
      },
    ],
    size: "md",
    glow: 8,
  },
  {
    id: "silverrook",
    label: "Silverrook",
    subtitle: "The dream",
    blurb:
      "Silverrook is the community I dream of eventually cultivating, similar to what the fractal guys built. Will be in a waiting room for a few years.\n\nGoal would be to use my events (Murder mysteries, symposiums, retreats) to gather a national community of elites and leaders from all my other communities.\n\nIdeally, these events are scalable and can spread, connecting more people from across the spectrum of ambitious virtuous truth seeking nerds.",
    image: "/connection/silverrook.png",
    size: "sm",
    glow: 1,
  },
  {
    id: "ea",
    label: "Effective Altruism",
    shortLabel: "EA",
    subtitle: "My first deliberate stop",
    blurb:
      'My first deliberate stop on my quest for community! The EAs were great, but the community suffers from many of the problems in "intellectual" communities.\n\nA big one for me is the neglect of politics, which many there see as a game for the sheep people, not the intellectual elite.\n\nAll honor, but no passion or connection. DGG is way cooler and more fun :P',
    image: "/connection/effective-altruism.jpg",
    size: "md",
    glow: 5,
  },
  {
    id: "fractal",
    label: "Fractal",
    subtitle: "A stop I never made",
    blurb:
      "A stop I never made it to on my quest for community — these guys have some of the strongest connection of anyone I have seen, along with the burners. They really get what life is about.\n\nMaybe after DC I'll find a year to move in with them and connect with them better.",
    image: "/connection/fractal.png",
    people: [
      {
        epithet: "The truly alive",
        name: "Douglass Brown",
        style: "connection",
      },
    ],
    size: "sm",
    glow: 3,
  },
  {
    id: "burners",
    label: "Burners",
    subtitle: "Open heart concert people",
    blurb:
      'There is a brand of "Open heart concert people" who really get what life is about, and it is the element I think is most missing from most communities. Once I am rich I\'ll start going, so I can spread this virtue around.',
    image: "/connection/burners.jpg",
    size: "sm",
    glow: 1,
  },
  {
    id: "nyc",
    label: "NYC",
    subtitle: "The greatest city in the world",
    blurb:
      "The greatest city in the world. The backdrop of a thousand adventures. So blessed to be born in its shadow.",
    image: "/connection/nyc.png",
    size: "md",
    glow: 5,
  },
  {
    id: "manhattan-university",
    label: "Manhattan University",
    shortLabel: "Manhattan U",
    subtitle: "My college!",
    blurb:
      "Named for its lovely view of Manhattan, the school is on a hill in the Bronx.\n\nA big fish in a small pond, I did well for myself here, and maintain a close connection to the department. I mentor every year, running guest lectures, taking interns, and doing the mentor dinners.\n\nI didn't make any strong permanent connections — just pure silliness on my part. So many lovely people to have brushed shoulders with! Oh well.",
    image: "/connection/manhattan-university.png",
    size: "md",
    glow: 7,
  },
  {
    id: "yonkers",
    label: "Yonkers",
    subtitle: "Home is where the heart is",
    blurb: "Home is where the heart is.",
    image: "/connection/yonkers.jpg",
    people: [
      {
        epithet: "My oldest friend,",
        name: "John Sheridan",
        style: "connection",
      },
      {
        epithet: "My forever youngest brother, the damn fool",
        name: "William Sheridan",
        style: "connection",
      },
    ],
    size: "md",
    glow: 8,
  },
  {
    id: "family",
    label: "Family",
    subtitle: "Family is where home is",
    blurb: "Family is where home is.",
    image: "/connection/family-digno.png",
    people: [
      {
        epithet: "The man I admire most,",
        name: "Digno Alvarez",
        style: "silver",
      },
      {
        epithet: "Always in my corner,",
        name: "Alex Grieco",
        style: "passion",
      },
      {
        epithet: "The best of us,",
        name: "Chris McPartlan",
        style: "connection",
      },
      {
        epithet: "Destined for greatness,",
        name: "Joseph Zeolla",
        style: "honor",
      },
      {
        epithet: "The infectious smile,",
        name: "Michael Zeolla",
        style: "connection",
      },
      {
        epithet: "Mom,",
        name: "Omaira Mcpartlan",
        style: "connection",
      },
      {
        epithet: "Mom #2,",
        name: "Nina Odalys",
        style: "connection",
      },
      {
        epithet: "Also Mom #2,",
        name: "Nina Olgie",
        style: "connection",
      },
      {
        epithet: "Dad,",
        name: "Brendan McPartlan",
        style: "honor",
      },
      {
        epithet: "Also Brendan McPartlan,",
        name: "Brendan McPartlan",
        style: "passion",
      },
    ],
    size: "sm",
    glow: 9,
  },
  {
    id: "alvarez-maher",
    label: "Alvarez Maher",
    shortLabel: "Alvarez Maher",
    subtitle: "Their own lil family",
    blurb: "Luke and Taylor have their own lil family now!",
    image: "/connection/alvarez-maher.jpg",
    people: [
      {
        epithet: "My brooda,",
        name: "Lukas Tahaja Alvarez",
        style: "connection",
      },
      {
        epithet: "Guardian of light,",
        name: "Taylor Maher",
        style: "connection",
      },
      {
        epithet:
          "And of course — the first member of the next generation — from the top ropes — Lil Baby",
        name: "Cerulia",
        style: "silver",
      },
    ],
    size: "sm",
    glow: 8,
  },
  {
    id: "yonkers-high-tjt",
    label: "Yonkers High & TJT",
    shortLabel: "YHS & TJT",
    subtitle: "What started as a parody",
    blurb:
      "What started off as a parody of a clique became one of the closest friend groups to leave YHS.\n\nEnded poorly after my breakup. Will still treasure my memories of them, as well as:",
    image: "/connection/tjt.jpg",
    people: [
      {
        epithet: "My best friend of 10 years,",
        name: "Cole Rosado",
        style: "connection",
      },
      {
        epithet: "My amicable ex-Husband,",
        name: "Paul Revelo",
        style: "connection",
      },
      {
        epithet: "The truly honorable",
        name: "Anthony Virella",
        style: "honor",
      },
      {
        epithet: "The fiery",
        name: "Jessica Farciert",
        style: "passion",
      },
      {
        epithet: "The sometimes-wise",
        name: "Jessica Catalan",
        style: "connection",
      },
    ],
    size: "sm",
    glow: 6,
  },
  {
    id: "troop-4",
    label: "Troop 4",
    subtitle: "First and finest in Yonkers",
    blurb:
      "First and finest in Yonkers — and my first and finest community.\n\nNobody who went through scouts would be the men they are today without that program, and without the friends they made along the way.",
    image: "/connection/troop-4.png",
    people: [
      {
        epithet: "The dreamer,",
        name: "Skye Malone",
        style: "passion",
      },
      {
        epithet: "The woman I admire most,",
        name: "Bettye Malone",
        style: "silver",
      },
      {
        epithet: "The Adventurer,",
        name: "Paul Szhumny",
        style: "connection",
      },
    ],
    size: "sm",
    glow: 6,
  },
  {
    id: "boy-scouts",
    label: "Scouts of America",
    shortLabel: "Scouts of America",
    subtitle: "The wider scouting world",
    blurb:
      "Scouts is an amazing organization, but has been through hard times, and is in need for renewal, for youth leadership, for rebirth.\n\nA life dedicated to scouting was a path I strongly considered, and would have been well spent. But I hope I can use the advantages I accumulate in my other roles to help reinvigorate scouting.",
    image: "/connection/scouts.png",
    size: "md",
    glow: 3,
  },
  {
    id: "c1",
    label: "C1",
    subtitle: "My first startup",
    blurb:
      "C1 is the place where I forged myself, and I will forever be grateful for the time I spent there, and the friends I made.",
    image: "/connection/c1.png",
    people: [
      {
        epithet: "The ambitious",
        name: "Owen Neuber",
        style: "honor",
      },
      {
        epithet: "The lovely",
        name: "Roysi Eskanazi",
        style: "connection",
      },
      {
        epithet: "My second favorite Schitzo,",
        name: "Junaid Nomani",
        style: "passion",
      },
    ],
    size: "sm",
    glow: 6,
  },
  {
    id: "software-startups",
    label: "Software Startups",
    shortLabel: "Startups",
    subtitle: "Ambitious people",
    blurb:
      "A great group of ambitious people. Kinda wish I went through Y Combinator early, but it is what it is.",
    image: "/connection/startups.png",
    size: "sm",
    glow: 5,
  },
  {
    id: "enlighten",
    label: "Enlighten Clinical Solutions",
    shortLabel: "Enlighten",
    subtitle: "Where I build now",
    blurb:
      "The culmination of a decade's work. Hopefully this thing will finally make me rich — as well as a few of my favorite lads.",
    image: "/connection/enlighten.png",
    people: [
      {
        epithet: "The concious",
        name: "Ryan Schwartz",
        style: "connection",
      },
      {
        epithet: "The artisian",
        name: "Coby Walters",
        style: "passion",
      },
      {
        epithet: "The dependable",
        name: "Reece Siksay",
        style: "honor",
      },
      {
        epithet: "The brilliant",
        name: "Patrick Orave",
        style: "passion",
      },
    ],
    size: "sm",
    glow: 9,
  },
  {
    id: "liberals",
    label: "Liberalism",
    subtitle: "Open society types",
    blurb:
      "A liberal is anyone who believes axiomatically that all are created equal, and are endowed with inalienable rights. All other beliefs and policies are naturally downstream of this idea.",
    image: "/connection/liberalism.jpg",
    size: "md",
    glow: 8,
  },
  {
    id: "dc",
    label: "DC",
    subtitle: "The capital orbit",
    blurb:
      "The next community I want to integrate with. So many people here I look forward to knowing better, particularly:",
    image: "/connection/dc.jpg",
    people: [
      {
        epithet: "The Insatiable",
        name: "Maya Luna",
        style: "passion",
      },
      {
        epithet: "The shining",
        name: "Ringo Harrison",
        style: "connection",
      },
      {
        epithet: "The ambitious",
        name: "Josh Epstine",
        style: "passion",
      },
      {
        epithet: "The diligent",
        name: "Ben Adams",
        style: "honor",
      },
      {
        epithet: "The elusive",
        name: "Lauren [Redacted]",
        style: "honor",
      },
    ],
    size: "md",
    glow: 7,
  },
];

export const CONNECTION_EDGES: ConnectionEdge[] = [
  { from: "community", to: "dgg", stiffness: 0.012 },
  { from: "community", to: "ea", stiffness: 0.012 },
  { from: "community", to: "liberals", stiffness: 0.012 },
  { from: "community", to: "gaming", stiffness: 0.014 },
  { from: "dgg", to: "dggp", stiffness: 0.01 },
  { from: "dgg", to: "superego", stiffness: 0.016 },
  { from: "ea", to: "fractal", stiffness: 0.016 },
  { from: "fractal", to: "nyc", stiffness: 0.016 },
  { from: "fractal", to: "software-startups", stiffness: 0.014 },
  { from: "fractal", to: "burners", stiffness: 0.014 },
  { from: "burners", to: "silverrook", stiffness: 0.012 },
  { from: "silverrook", to: "dggp", stiffness: 0.012 },
  { from: "nyc", to: "c1", stiffness: 0.018 },
  { from: "nyc", to: "yonkers", stiffness: 0.016 },
  { from: "nyc", to: "manhattan-university", stiffness: 0.016 },
  { from: "yonkers", to: "troop-4", stiffness: 0.018 },
  { from: "yonkers", to: "family", stiffness: 0.018 },
  { from: "yonkers", to: "yonkers-high-tjt", stiffness: 0.016 },
  { from: "family", to: "alvarez-maher", stiffness: 0.018 },
  { from: "yonkers-high-tjt", to: "alvarez-maher", stiffness: 0.016 },
  { from: "troop-4", to: "boy-scouts", stiffness: 0.016 },
  { from: "software-startups", to: "c1", stiffness: 0.01 },
  { from: "software-startups", to: "enlighten", stiffness: 0.016 },
  { from: "liberals", to: "dggp", stiffness: 0.014 },
  { from: "victory-boys", to: "dgg", stiffness: 0.02 },
  { from: "dc", to: "liberals", stiffness: 0.016 },
  { from: "dc", to: "dggp", stiffness: 0.016 },
];

export function connectionNodeById(id: string) {
  return CONNECTION_NODES.find((n) => n.id === id);
}

export const NODE_RADIUS: Record<ConnectionNode["size"], number> = {
  xl: 118,
  lg: 92,
  md: 76,
  sm: 48,
};
