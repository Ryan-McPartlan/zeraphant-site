export const TIMELINE_START = 2008;
export const TIMELINE_END = 2026;

export type ThreadId = "honor" | "passion" | "connection" | "void";

export type HonorStats = {
  resilience: number;
  capacity: number;
  volition: number;
};

export type PassionStats = {
  joy: number;
  will: number;
  vision: number;
};

export type ConnectionStats = {
  closeness: number;
  wisdom: number;
  gentleness: number;
};

export type VoidStats = {
  isolation: number;
  weakness: number;
  hatred: number;
};

export type AllStats = {
  honor: HonorStats;
  passion: PassionStats;
  connection: ConnectionStats;
  void: VoidStats;
};

/** Partial nested deltas — only include stats that change on this bubble */
export type StatDeltas = {
  honor?: Partial<HonorStats>;
  passion?: Partial<PassionStats>;
  connection?: Partial<ConnectionStats>;
  void?: Partial<VoidStats>;
};

export type TimelineBubble = {
  id: string;
  thread: ThreadId;
  /** Year on the timeline (2008–2026). Use .5 for mid-year placement. */
  year: number;
  title: string;
  body: string;
  /** Optional image under /public */
  image?: string;
  imageAlt?: string;
  deltas?: StatDeltas;
};

/**
 * Thread path waypoints — easy to edit.
 * `x` is lane position from -1 (far left) to 1 (far right).
 * Honor stays at 0 (center). Other threads spline through these points.
 */
export type PathWaypoint = {
  year: number;
  x: number;
};

export const THREAD_COLORS: Record<
  ThreadId,
  { stroke: string; glow: string; label: string }
> = {
  honor: {
    stroke: "#5b8def",
    glow: "rgba(91, 141, 239, 0.45)",
    label: "Honor",
  },
  passion: {
    stroke: "#ff3b1f",
    glow: "rgba(255, 59, 31, 0.45)",
    label: "Passion",
  },
  connection: {
    stroke: "#ffd24a",
    glow: "rgba(255, 210, 74, 0.45)",
    label: "Connection",
  },
  void: {
    stroke: "#1a1a1a",
    glow: "rgba(0, 0, 0, 0.65)",
    label: "Void",
  },
};

export const VOID_STAT_COLORS = {
  isolation: "#6b5a1a", // dark gold
  weakness: "#1e3a6e", // dark blue
  hatred: "#5c1210", // dark red
} as const;

export const EMPTY_STATS: AllStats = {
  honor: { resilience: 0, capacity: 0, volition: 0 },
  passion: { joy: 0, will: 0, vision: 0 },
  connection: { closeness: 0, wisdom: 0, gentleness: 0 },
  void: { isolation: 0, weakness: 0, hatred: 0 },
};

export function yearCount() {
  return TIMELINE_END - TIMELINE_START + 1;
}

export function clampYear(year: number) {
  return Math.min(TIMELINE_END, Math.max(TIMELINE_START, year));
}

export function years(): number[] {
  return Array.from({ length: yearCount() }, (_, i) => TIMELINE_START + i);
}
