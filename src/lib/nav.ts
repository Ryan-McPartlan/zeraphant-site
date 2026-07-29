export const NAV_ITEMS = [
  {
    href: "/passion",
    label: "Passion",
    blurb: "A glutton at the great table",
  },
  {
    href: "/honor",
    label: "Honor",
    blurb: "A player in the great game",
  },
  {
    href: "/connection",
    label: "Connection",
    blurb: "Dance with me the great garden",
  },
  {
    href: "/the-past",
    label: "The past",
    blurb: "Dusty receipts & origin myths.",
  },
  {
    href: "/the-future",
    label: "The future",
    blurb: "Half-built rockets & maybe-lists.",
  },
  {
    href: "/the-present",
    label: "The present",
    blurb: "Right now, blinking cursor included.",
  },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
