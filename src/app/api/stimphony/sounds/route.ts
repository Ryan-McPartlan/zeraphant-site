import { readdir } from "node:fs/promises";
import path from "node:path";

import { STIMPHONY_DIALS } from "~/lib/passion/stimphony";

const AUDIO_EXT = /\.(mp3|wav|ogg|m4a|webm)$/i;

/** Lists audio files dumped into public/passion/stimming/<dial>/ */
export async function GET() {
  const base = path.join(process.cwd(), "public", "passion", "stimming");
  const libraries: Record<string, string[]> = {};

  await Promise.all(
    STIMPHONY_DIALS.map(async (dial) => {
      const dir = path.join(base, dial.id);
      try {
        const files = await readdir(dir);
        libraries[dial.id] = files
          .filter((name) => AUDIO_EXT.test(name))
          .sort((a, b) => a.localeCompare(b))
          .map(
            (name) =>
              `/passion/stimming/${dial.id}/${encodeURIComponent(name)}`,
          );
      } catch {
        libraries[dial.id] = [];
      }
    }),
  );

  return Response.json({ libraries });
}
