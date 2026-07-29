/**
 * Thread paths — edit these waypoints to reshape the timeline.
 *
 * `x` ranges from -1 (left) to 1 (right). Honor should stay near 0.
 * Add/remove/move waypoints freely; the spline fills the gaps.
 *
 * Around 2019.75, passion + connection converge on honor (x: 0)
 * for the silver intersection bubble.
 */
import { type PathWaypoint, type ThreadId } from "~/lib/past/types";

export const THREAD_PATHS: Record<ThreadId, PathWaypoint[]> = {
  honor: [
    { year: 2008, x: 0 },
    { year: 2026, x: 0 },
  ],
  passion: [
    { year: 2008, x: -0.55 },
    { year: 2011, x: -0.2 },
    { year: 2014, x: 0.45 },
    { year: 2017, x: -0.4 },
    { year: 2019.2, x: -0.25 },
    { year: 2019.75, x: 0 },
    { year: 2020.5, x: 0.35 },
    { year: 2023, x: -0.25 },
    { year: 2026, x: 0.5 },
  ],
  connection: [
    { year: 2008, x: 0.5 },
    { year: 2010, x: 0.15 },
    { year: 2013, x: -0.5 },
    { year: 2016, x: 0.4 },
    { year: 2019.2, x: 0.3 },
    { year: 2019.75, x: 0 },
    { year: 2020.5, x: -0.35 },
    { year: 2022, x: 0.55 },
    { year: 2026, x: -0.15 },
  ],
  void: [
    { year: 2008, x: 0.75 },
    { year: 2012, x: -0.7 },
    { year: 2015, x: 0.6 },
    { year: 2018, x: -0.55 },
    { year: 2019.5, x: -0.15 },
    { year: 2021, x: 0.65 },
    { year: 2024, x: -0.45 },
    { year: 2026, x: 0.7 },
  ],
  // Silver sits on the honor line (center) — path unused for drawing
  silver: [
    { year: 2008, x: 0 },
    { year: 2026, x: 0 },
  ],
};

/** Crisis stretch: scratched black zone between these years (inclusive span). */
export const CRISIS_ZONE = {
  startYear: 2019.5,
  endYear: 2019.75,
} as const;
