/**
 * Thread paths — edit these waypoints to reshape the timeline.
 *
 * `x` ranges from -1 (left) to 1 (right). Honor should stay near 0.
 * Add/remove/move waypoints freely; the spline fills the gaps.
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
    { year: 2020, x: 0.35 },
    { year: 2023, x: -0.25 },
    { year: 2026, x: 0.5 },
  ],
  connection: [
    { year: 2008, x: 0.5 },
    { year: 2010, x: 0.15 },
    { year: 2013, x: -0.5 },
    { year: 2016, x: 0.4 },
    { year: 2019, x: -0.35 },
    { year: 2022, x: 0.55 },
    { year: 2026, x: -0.15 },
  ],
  void: [
    { year: 2008, x: 0.75 },
    { year: 2012, x: -0.7 },
    { year: 2015, x: 0.6 },
    { year: 2018, x: -0.55 },
    { year: 2021, x: 0.65 },
    { year: 2024, x: -0.45 },
    { year: 2026, x: 0.7 },
  ],
};
