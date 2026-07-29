export type ParticleThemeId =
  | "home"
  | "passion"
  | "honor"
  | "connection"
  | "past"
  | "default";

export type ParticleShape =
  | "spark"
  | "shard"
  | "heart"
  | "ember"
  | "flake"
  | "orb"
  | "ray"
  | "sand";

export type ThemeConfig = {
  id: ParticleThemeId;
  caption?: string;
  particleColors: string[];
  shapes: ParticleShape[];
  glow?: string;
  shellClass: string;
  accentClass: string;
  badgeClass: string;
  titleClass: string;
};

export const THEMES: Record<ParticleThemeId, ThemeConfig> = {
  home: {
    id: "home",
    particleColors: ["#f5f7fa", "#cfd8e3", "#9aa7b8", "#e8edf5", "#7f8b9a"],
    shapes: ["spark", "shard"],
    glow: "rgba(200, 210, 225, 0.35)",
    shellClass: "theme-home",
    accentClass: "text-silver-bright",
    badgeClass:
      "border-silver/30 bg-silver/10 text-silver-bright shadow-[0_0_24px_rgba(200,210,225,0.15)]",
    titleClass: "text-silver-bright",
  },
  passion: {
    id: "passion",
    caption: "A glutton at the great table",
    particleColors: ["#ff3b1f", "#ff7a18", "#ffd166", "#ff4d6d", "#ff1e00"],
    shapes: ["heart", "ember"],
    glow: "rgba(255, 80, 20, 0.55)",
    shellClass: "theme-passion",
    accentClass: "text-fire-gold",
    badgeClass:
      "border-fire-gold/40 bg-fire/20 text-fire-gold shadow-[0_0_30px_rgba(255,90,20,0.35)]",
    titleClass: "text-fire-gold",
  },
  honor: {
    id: "honor",
    caption: "A player in the great game",
    particleColors: ["#d7dde5", "#8b949e", "#5c6570", "#b8c0c8", "#3a4048"],
    shapes: ["flake", "shard"],
    glow: "rgba(160, 170, 185, 0.3)",
    shellClass: "theme-honor",
    accentClass: "text-iron-bright",
    badgeClass:
      "border-iron-bright/25 bg-iron/30 text-iron-bright shadow-[0_0_20px_rgba(140,150,165,0.2)]",
    titleClass: "text-iron-bright",
  },
  connection: {
    id: "connection",
    caption: "Dance with me the great garden",
    particleColors: ["#ffe566", "#ffcc33", "#fff1a8", "#f5b942", "#fff8d6"],
    shapes: ["orb", "ray"],
    glow: "rgba(255, 210, 80, 0.45)",
    shellClass: "theme-connection",
    accentClass: "text-gold",
    badgeClass:
      "border-gold/35 bg-gold/15 text-gold shadow-[0_0_28px_rgba(255,200,70,0.3)]",
    titleClass: "text-gold",
  },
  past: {
    id: "past",
    caption: "Archives, scars, and origin stories",
    particleColors: ["#e8d5a3", "#c4a574", "#a89060", "#dfc89a", "#8b7355"],
    shapes: ["sand"],
    glow: "rgba(196, 165, 116, 0.3)",
    shellClass: "theme-default",
    accentClass: "text-sky",
    badgeClass: "border-foam/15 bg-moss/40 text-chartreuse",
    titleClass: "text-foam",
  },
  default: {
    id: "default",
    particleColors: ["#d4ff4a", "#ff5c4d", "#7ee0ff", "#e8fff6", "#ffd166"],
    shapes: ["spark"],
    shellClass: "theme-default",
    accentClass: "text-chartreuse",
    badgeClass: "border-foam/15 bg-moss/40 text-chartreuse",
    titleClass: "text-foam",
  },
};

export function themeFromPath(pathname: string): ThemeConfig {
  if (pathname === "/") return THEMES.home;
  if (pathname.startsWith("/passion")) return THEMES.passion;
  if (pathname.startsWith("/honor")) return THEMES.honor;
  if (pathname.startsWith("/connection")) return THEMES.connection;
  if (pathname.startsWith("/the-past")) return THEMES.past;
  return THEMES.default;
}
