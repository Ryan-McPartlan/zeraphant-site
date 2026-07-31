import { readdir } from "node:fs/promises";
import path from "node:path";

const AUDIO_EXT = /\.(mp3|wav|ogg|m4a|webm)$/i;
const ENTRY_RE = /^(\d+)-(.+)\.(mp3|wav|ogg|m4a|webm)$/i;

export type GoodBoyEntry = {
  rank: number;
  name: string;
  src: string;
  filename: string;
};

export function parseGoodBoyFilename(filename: string): GoodBoyEntry | null {
  const match = ENTRY_RE.exec(filename);
  if (!match?.[1] || !match[2]) return null;

  const rank = Number.parseInt(match[1], 10);
  if (!Number.isFinite(rank) || rank < 1) return null;

  const name = match[2].replace(/-/g, " ").replace(/\s+/g, " ").trim();
  if (!name) return null;

  return {
    rank,
    name,
    filename,
    src: `/passion/praise/good-boy/${encodeURIComponent(filename)}`,
  };
}

/** Reads dump folder `public/passion/praise/good-boy/`. */
export async function listGoodBoyLeaderboard(): Promise<GoodBoyEntry[]> {
  const dir = path.join(
    process.cwd(),
    "public",
    "passion",
    "praise",
    "good-boy",
  );

  let files: string[];
  try {
    files = await readdir(dir);
  } catch {
    return [];
  }

  const entries = files
    .filter((name) => AUDIO_EXT.test(name) && !name.startsWith("."))
    .map(parseGoodBoyFilename)
    .filter((entry): entry is GoodBoyEntry => entry !== null);

  entries.sort((a, b) => {
    if (a.rank !== b.rank) return a.rank - b.rank;
    return a.filename.localeCompare(b.filename);
  });

  return entries;
}
