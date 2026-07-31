export const NAV_ITEMS = [
  {
    href: "/passion",
    label: "Passion",
    blurb: "A glutton at the great table",
    labelClass: "font-fire text-fire tracking-wide",
    blurbClass: "text-fire/70",
    activeClass: "bg-fire/15",
    hoverClass: "hover:bg-fire/10",
  },
  {
    href: "/honor",
    label: "Honor",
    blurb: "A player in the great game",
    labelClass: "font-display text-sky tracking-tight",
    blurbClass: "text-sky/70",
    activeClass: "bg-sky/15",
    hoverClass: "hover:bg-sky/10",
  },
  {
    href: "/connection",
    label: "Connection",
    blurb: "A dancer in the great garden",
    labelClass: "font-hand text-gold tracking-normal normal-case",
    blurbClass: "text-gold/70",
    activeClass: "bg-gold/15",
    hoverClass: "hover:bg-gold/10",
  },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
