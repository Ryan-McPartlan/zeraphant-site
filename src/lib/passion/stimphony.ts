/**
 * Interval (ms) for Stimphony dial levels.
 * Level 0 = off. Levels 1–11 from leisurely to frantic.
 */
export const STIMPHONY_INTERVAL_MS = [
  0, // off
  20_000,
  17_000,
  15_000,
  12_000,
  10_000,
  9_000,
  8_000,
  6_000,
  5_000,
  4_000,
  1_000,
] as const;

export const STIMPHONY_MAX_LEVEL = 11;

export type StimphonyDialId =
  | "singing"
  | "stimming"
  | "bits"
  | "interview-with-a-vampire";

export type StimphonyDial = {
  id: StimphonyDialId;
  label: string;
  /** Filled at runtime from public/passion/stimming/<id>/ via /api/stimphony/sounds */
  sounds: string[];
};

/**
 * Each dial draws at random from its library.
 * Drop audio into `public/passion/stimming/<id>/` — see README there.
 */
export const STIMPHONY_DIALS: StimphonyDial[] = [
  {
    id: "singing",
    label: "Singing",
    sounds: [],
  },
  {
    id: "stimming",
    label: "Stimming",
    sounds: [],
  },
  {
    id: "bits",
    label: "Bits",
    sounds: [],
  },
  {
    id: "interview-with-a-vampire",
    label: "Interview with a vampire",
    sounds: [],
  },
];

/** Total dial fill as 0–1, independent of dial count / max level changes. */
export function stimphonyIntensity(
  levels: Record<StimphonyDialId, number>,
): number {
  const maxTotal = STIMPHONY_DIALS.length * STIMPHONY_MAX_LEVEL;
  if (maxTotal <= 0) return 0;
  let sum = 0;
  for (const dial of STIMPHONY_DIALS) {
    sum += levels[dial.id] ?? 0;
  }
  return Math.min(1, Math.max(0, sum / maxTotal));
}

export const STIMPHONY_SPRITES = {
  maestro: "/passion/stimming/sprites/maestro.png",
  silent: "/passion/stimming/sprites/silent.png",
  sing: "/passion/stimming/sprites/sing.png",
} as const;

export type StimphonyPreset = {
  id: string;
  label: string;
  /** Dial levels in STIMPHONY_DIALS order */
  levels: readonly [number, number, number, number];
  /** Volumes 0–100 in STIMPHONY_DIALS order */
  volumes: readonly [number, number, number, number];
};

export const STIMPHONY_PRESETS: StimphonyPreset[] = [
  {
    id: "asmr",
    label: "ASMR",
    levels: [0, 11, 0, 0],
    volumes: [50, 5, 50, 50],
  },
  {
    id: "theater-kid",
    label: "Theater Kid",
    levels: [5, 10, 0, 10],
    volumes: [65, 20, 50, 70],
  },
  {
    id: "get-off-the-stage",
    label: "Get off the stage",
    levels: [0, 0, 4, 0],
    volumes: [50, 50, 100, 50],
  },
  {
    id: "my-twisted-mind",
    label: "My twisted mind",
    levels: [10, 11, 8, 8],
    volumes: [10, 40, 100, 40],
  },
  {
    id: "rockstar",
    label: "Rockstar",
    levels: [8, 8, 11, 9],
    volumes: [100, 6, 5, 20],
  },
];

export function stimphonyPresetLevels(
  preset: StimphonyPreset,
): Record<StimphonyDialId, number> {
  return Object.fromEntries(
    STIMPHONY_DIALS.map((dial, i) => [
      dial.id,
      Math.min(STIMPHONY_MAX_LEVEL, Math.max(0, preset.levels[i] ?? 0)),
    ]),
  ) as Record<StimphonyDialId, number>;
}

export function stimphonyPresetVolumes(
  preset: StimphonyPreset,
): Record<StimphonyDialId, number> {
  return Object.fromEntries(
    STIMPHONY_DIALS.map((dial, i) => [
      dial.id,
      Math.min(1, Math.max(0, (preset.volumes[i] ?? 50) / 100)),
    ]),
  ) as Record<StimphonyDialId, number>;
}
