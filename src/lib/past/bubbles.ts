import { type TimelineBubble } from "~/lib/past/types";

/**
 * Life bubbles — add events here.
 * `year` can be fractional (e.g. 2015.5) for mid-year placement.
 * `deltas` accumulate forward in time onto every later bubble's card.
 */
export const TIMELINE_BUBBLES: TimelineBubble[] = [
  {
    id: "2008-spark",
    thread: "passion",
    year: 2008,
    title: "A spark",
    body: "Placeholder — the timeline begins. Swap this for a real memory.",
    deltas: { passion: { joy: 1, vision: 1 } },
  },
  {
    id: "2009-bond",
    thread: "connection",
    year: 2009,
    title: "First bonds",
    body: "People start to matter in a way you can name.",
    deltas: { connection: { closeness: 2 } },
  },
  {
    id: "2010-spine",
    thread: "honor",
    year: 2010,
    title: "Straightening",
    body: "Honor holds the center — a line you can walk.",
    deltas: { honor: { resilience: 1, volition: 1 } },
  },
  {
    id: "2012-shadow",
    thread: "void",
    year: 2012,
    title: "A quiet dark",
    body: "The void threads through — not loud, but present.",
    deltas: { void: { isolation: 1 } },
  },
  {
    id: "2014-fire",
    thread: "passion",
    year: 2014,
    title: "Fuel",
    body: "Something catches. Will sharpens.",
    deltas: { passion: { will: 2, joy: 1 } },
  },
  {
    id: "2016-weight",
    thread: "honor",
    year: 2016,
    title: "Capacity",
    body: "You learn how much you can carry.",
    deltas: { honor: { capacity: 2 } },
  },
  {
    id: "2018-garden",
    thread: "connection",
    year: 2018,
    title: "The garden",
    body: "Gentleness becomes a skill, not an accident.",
    deltas: { connection: { gentleness: 2, wisdom: 1 } },
  },
  {
    id: "2020-fracture",
    thread: "void",
    year: 2020,
    title: "Fracture",
    body: "Distance grows teeth.",
    deltas: { void: { hatred: 1, weakness: 1 } },
  },
  {
    id: "2022-forge",
    thread: "honor",
    year: 2022,
    title: "Forged",
    body: "Pressure, then shape.",
    deltas: { honor: { resilience: 2, volition: 1 } },
  },
  {
    id: "2024-kindle",
    thread: "passion",
    year: 2024,
    title: "Kindling",
    body: "Vision returns with heat.",
    deltas: { passion: { vision: 2, joy: 1 } },
  },
  {
    id: "2026-now",
    thread: "connection",
    year: 2026,
    title: "Still here",
    body: "The thread continues — this page is the proof.",
    deltas: { connection: { closeness: 1, wisdom: 1 } },
  },
];
