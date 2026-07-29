import {
  type AllStats,
  type ConnectionStats,
  EMPTY_STATS,
  type HonorStats,
  type PassionStats,
  type StatDeltas,
  type TimelineBubble,
  type VoidStats,
} from "~/lib/past/types";

function addGroup<T extends Record<string, number>>(
  base: T,
  delta: Partial<T> | undefined,
): T {
  if (!delta) return base;
  const next = { ...base };
  for (const [key, value] of Object.entries(delta)) {
    if (typeof value === "number") {
      next[key as keyof T] = ((base[key as keyof T] as number) +
        value) as T[keyof T];
    }
  }
  return next;
}

function applyDeltas(
  stats: AllStats,
  deltas: StatDeltas | undefined,
): AllStats {
  if (!deltas) return stats;
  return {
    honor: addGroup<HonorStats>(stats.honor, deltas.honor),
    passion: addGroup<PassionStats>(stats.passion, deltas.passion),
    connection: addGroup<ConnectionStats>(stats.connection, deltas.connection),
    void: addGroup<VoidStats>(stats.void, deltas.void),
  };
}

/** Sort oldest → newest (stable for same year by id). */
export function sortBubblesChronologically(bubbles: TimelineBubble[]) {
  return [...bubbles].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.id.localeCompare(b.id);
  });
}

/** Stats at a bubble = all deltas from bubbles at or before it in time. */
export function statsAtBubble(
  bubbles: TimelineBubble[],
  targetId: string,
): { stats: AllStats; gains: StatDeltas | undefined } {
  const ordered = sortBubblesChronologically(bubbles);
  const target = ordered.find((b) => b.id === targetId);
  if (!target) return { stats: EMPTY_STATS, gains: undefined };

  let stats = EMPTY_STATS;
  for (const bubble of ordered) {
    if (bubble.year > target.year) break;
    if (bubble.year === target.year && bubble.id.localeCompare(target.id) > 0) {
      break;
    }
    stats = applyDeltas(stats, bubble.deltas);
  }
  return { stats, gains: target.deltas };
}

export function flattenDeltas(deltas: StatDeltas | undefined) {
  if (!deltas) return [] as { group: string; key: string; value: number }[];
  const out: { group: string; key: string; value: number }[] = [];
  for (const [group, values] of Object.entries(deltas)) {
    if (!values) continue;
    for (const [key, value] of Object.entries(values)) {
      if (typeof value === "number" && value !== 0) {
        out.push({ group, key, value });
      }
    }
  }
  return out;
}
