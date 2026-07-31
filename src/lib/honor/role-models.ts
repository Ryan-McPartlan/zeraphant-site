export type RoleModelTabId = "life" | "media" | "great" | "characters";

export type RoleModelNote = {
  text: string;
  tone: "connection";
};

export type RoleModelSegment = string | { text: string; tone: "connection" };

/** A paragraph is plain text, or inline segments (for mixed styling). */
export type RoleModelParagraph = string | RoleModelSegment[];

export type RoleModel = {
  id: string;
  name: string;
  image?: { src: string; alt: string };
  note?: RoleModelNote;
  body?: RoleModelParagraph[];
};

export type RoleModelTab = {
  id: RoleModelTabId;
  label: string;
  models: RoleModel[];
};

export const ROLE_MODEL_TABS: RoleModelTab[] = [
  {
    id: "life",
    label: "Life",
    models: [
      {
        id: "digno-alvarez",
        name: "Digno Alvarez",
        image: {
          src: "/honor/role-models/digno-alvarez.png",
          alt: "Portrait of Digno Alvarez",
        },
        body: [
          "Papa dedicated his life to his family — working in construction and as a bus driver late into his life, and giving all he had to bring family from Cuba and support us when we were here.",
          "Our family owes so much to him, he was an inspiration and role model to us all. Universally beloved and for good reason.",
          "I do not do him justice. I will add more here soon.",
        ],
      },
      { id: "betty-malone", name: "Betty Malone" },
      { id: "alex-grieco", name: "Alex Grieco" },
      {
        id: "cole-rosado",
        name: "Cole Rosado",
        body: [
          [
            { text: "Gentleness and sincerity", tone: "connection" },
            " did not come naturally to me. These were shared with me by Cole.",
          ],
        ],
      },
    ],
  },
  {
    id: "media",
    label: "Media Figures",
    models: [
      { id: "steven-bonnell", name: "Steven Kenneth Bonnell II" },
      { id: "gregory-guevara", name: "Gregory Guevara" },
      { id: "jordan-peterson", name: "Jordan Peterson" },
      { id: "ben-shapiro", name: "Ben Shapiro" },
    ],
  },
  {
    id: "great",
    label: "Great Figures",
    models: [
      { id: "the-founders", name: "The Founders" },
      { id: "george-hw-bush", name: "George HW Bush" },
      { id: "barack-obama", name: "Barack Obama" },
      { id: "john-mccain", name: "John McCain" },
      { id: "mitt-romney", name: "Mitt Romney" },
    ],
  },
  {
    id: "characters",
    label: "Characters",
    models: [
      { id: "rock-lee", name: "Rock Lee" },
      { id: "ben-tennyson", name: "Ben Tennyson" },
      { id: "naruto-uzumaki", name: "Naruto Uzumaki" },
      { id: "sonic", name: "Sonic the Hedgehog" },
    ],
  },
];
