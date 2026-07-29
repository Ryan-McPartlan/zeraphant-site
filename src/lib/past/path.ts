import { type PathWaypoint, TIMELINE_END, yearCount } from "~/lib/past/types";

/** Linear interpolate x at a given year from waypoints. */
export function xAtYear(waypoints: PathWaypoint[], year: number): number {
  if (waypoints.length === 0) return 0;
  const sorted = [...waypoints].sort((a, b) => a.year - b.year);
  if (year <= sorted[0]!.year) return sorted[0]!.x;
  if (year >= sorted[sorted.length - 1]!.year)
    return sorted[sorted.length - 1]!.x;

  for (let i = 0; i < sorted.length - 1; i += 1) {
    const a = sorted[i]!;
    const b = sorted[i + 1]!;
    if (year >= a.year && year <= b.year) {
      const t = (year - a.year) / (b.year - a.year || 1);
      const s = t * t * (3 - 2 * t);
      return a.x + (b.x - a.x) * s;
    }
  }
  return sorted[sorted.length - 1]!.x;
}

/**
 * Year → vertical progress 0..1 through the timeline.
 * Present (2026) near the top; 2008 at the bottom.
 * Each integer year owns one viewport band; fractions move within that band
 * (e.g. 2019.5 = halfway through 2019, lower on the page than 2019.75).
 */
export function yearToT(year: number) {
  return (TIMELINE_END + 1 - year) / yearCount();
}

/** Document scroll Y for a given year (one viewport per year). */
export function yearToScrollTop(
  year: number,
  vh = typeof window !== "undefined" ? window.innerHeight : 800,
) {
  return (TIMELINE_END - Math.floor(year)) * vh;
}

/** Year from current scroll position. */
export function scrollTopToYear(
  scrollY: number,
  vh = typeof window !== "undefined" ? window.innerHeight : 800,
) {
  return TIMELINE_END - Math.round(scrollY / vh);
}

/** Build an SVG path through the timeline for a thread (top = present). */
export function buildThreadPathD(
  waypoints: PathWaypoint[],
  width: number,
  height: number,
  samples = 64,
): string {
  const centerX = width / 2;
  const lane = width * 0.38;
  const parts: string[] = [];
  const count = yearCount();

  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const year = TIMELINE_END + 1 - t * count;
    const x = centerX + xAtYear(waypoints, year) * lane;
    const y = t * height;
    parts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return parts.join(" ");
}

export function bubblePosition(
  waypoints: PathWaypoint[],
  year: number,
  width: number,
  height: number,
) {
  const centerX = width / 2;
  const lane = width * 0.38;
  const t = yearToT(year);
  return {
    x: centerX + xAtYear(waypoints, year) * lane,
    y: t * height,
  };
}
