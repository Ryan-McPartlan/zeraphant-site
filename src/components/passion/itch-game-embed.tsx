"use client";

import { useState } from "react";

type ItchGameEmbedProps = {
  title: string;
  itchUrl: string;
  /** itch.io /embed-upload/… URL (Distribute → Embed game) */
  embedSrc: string;
};

export function ItchGameEmbed({
  title,
  itchUrl,
  embedSrc,
}: ItchGameEmbedProps) {
  const [started, setStarted] = useState(false);

  return (
    <div className="space-y-3">
      <div className="border-fire/35 bg-ink relative aspect-video w-full overflow-hidden rounded-2xl border">
        {started ? (
          <iframe
            title={title}
            src={embedSrc}
            className="h-full w-full border-0"
            allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="bg-fire/15 text-fire-gold hover:bg-fire/25 focus-visible:ring-fire-gold/60 flex h-full w-full flex-col items-center justify-center gap-3 transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <span
              aria-hidden
              className="border-fire-gold/50 flex size-14 items-center justify-center rounded-full border text-2xl"
            >
              ▶
            </span>
            <span className="font-display text-lg tracking-wide">
              Run {title}
            </span>
            <span className="text-mist max-w-xs px-4 text-sm">
              Loads from itch.io — Unity WebGL, so give it a moment.
            </span>
          </button>
        )}
      </div>
      <p className="text-mist text-sm">
        Also on{" "}
        <a
          href={itchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fire-gold decoration-fire-gold/40 underline underline-offset-4 transition-colors hover:text-white hover:decoration-white"
        >
          itch.io
        </a>
      </p>
    </div>
  );
}
