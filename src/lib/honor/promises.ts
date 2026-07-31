export type PromiseEntry = {
  id: string;
  title: string;
  year?: number;
  status?: "outstanding" | "broken";
  body: string[];
};

export const promises: PromiseEntry[] = [
  {
    id: "clothes-shopping",
    title: "Clothes Shopping",
    year: 2019,
    status: "outstanding",
    body: [
      "Drunkenly promised Anna Daddazio (a random coworker I knew for like 3 months) that we would go clothes shopping at some point after a late night in the office.",
      "I had been extremely diligent in fulfilling all my promises to this point, but this is the streak breaker. I have like twice messaged Anna about this in what is indisputably a pretty confusing message.",
      "It is actually kinda a big deal, it was a pinky promise, so it carries similar weight to some of my strongest and most special promises. I get that it was a drunk joke, but there is no weaseling from a pinky promise.",
    ],
  },
  {
    id: "japan-trip",
    title: "Japan Trip",
    year: 2022,
    status: "broken",
    body: [
      "Promised to Cole.",
      "Broken. I never imagined a possibility where we were not close friends. This is extremely unlikely to be fulfilled.",
    ],
  },
  {
    id: "courtside-seats",
    title: "Courtside Seats",
    year: 2022,
    status: "outstanding",
    body: [
      "Once I get my first million, I will get Christopher courtside seats to a MSG game (or cash equivalent — car or vacation), his choice.",
    ],
  },
  {
    id: "equity",
    title: "Equity",
    year: 2025,
    status: "outstanding",
    body: [
      "I owe Reece 1% and Coby 2% of Enlighten, standard vest starting January 2026, 2025 shares. Paperwork has not been formalized yet.",
    ],
  },
  {
    id: "relationship-contract",
    title: "Relationship Contract",
    year: 2026,
    body: [
      "Standard preferred romantic relationship contract.",
      "Integrity — I will not lie or withhold.",
      "Freedom — I will not bind you.",
      "Eternity — I will reciprocate efforts to cultivate our connection. On our best days and on our truly worst.",
    ],
  },
];
