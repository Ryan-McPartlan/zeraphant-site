import { type TimelineBubble } from "~/lib/past/types";

/**
 * Life bubbles — add events here.
 * `year` can be fractional (e.g. 2015.5) for mid-year placement.
 * `deltas` accumulate forward in time onto every later bubble's card.
 */
export const TIMELINE_BUBBLES: TimelineBubble[] = [
  {
    id: "2008-foundation",
    thread: "honor",
    year: 2008,
    title: "The foundation",
    body: "The child is not yet human. It mostly wants to play videogames. By some chance, it has great potential. It has no strong connections, and is uninterested in them.",
    deltas: { honor: { capacity: 3 } },
  },
  {
    id: "2008-let-there-be-light",
    thread: "connection",
    year: 2008.15,
    title: "Let there be light",
    body: "The boy is laying in bed — early today. He stares at the ceiling. He rolls around. He smiles, laughs, cries. He had never felt so much of each, not by half, and is overwhelmed by them all at once. He does not understand what is happening to him, or what he wants, or what he is, but by morning he will.\n\nEarlier in the day, a lovely young lady with a great hat told him she loved him. A passing comment, half in jest. He will spend the next 2 years praying, yearning, wanting desperately for more of whatever this is.\n\nHe is disconnected from the world — a watcher. He will not act.",
    deltas: {
      honor: { resilience: 1, capacity: 1, volition: 1 },
      passion: { joy: 1, will: 1, vision: 1 },
      connection: { closeness: 3, wisdom: 3, gentleness: 3 },
    },
  },
  {
    id: "2019-crisis-start",
    thread: "void",
    year: 2019.5,
    title: "Start existential crisis",
    body: "Placeholder — the void opens. (Copy coming.)",
  },
  {
    id: "2019-crisis-end",
    thread: "silver",
    year: 2019.75,
    title: "End existential crisis",
    body: "Placeholder — honor, passion, and connection converge. (Copy coming.)",
  },
];
