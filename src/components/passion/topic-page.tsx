import Link from "next/link";

import { PASSION_TOPICS, type PassionTopic } from "~/lib/passion";

export function PassionTopicPage({ topic }: { topic: PassionTopic }) {
  return (
    <main className="relative flex min-h-dvh flex-col justify-end px-6 py-24 sm:px-12 lg:px-20">
      <div className="max-w-3xl">
        <Link
          href="/passion"
          className="text-fire-gold/70 hover:text-fire-gold text-sm tracking-[0.18em] uppercase transition-colors"
        >
          ← Back to Passion
        </Link>
        <h1 className="font-fire text-fire-gold mt-6 text-5xl leading-[0.95] tracking-wide sm:text-7xl">
          {topic.label}
        </h1>
        <p className="text-mist mt-5 max-w-md text-lg">{topic.blurb}</p>
        <p className="border-fire-gold/40 bg-fire/20 text-fire-gold mt-10 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm shadow-[0_0_30px_rgba(255,90,20,0.35)] backdrop-blur-sm">
          <span
            aria-hidden
            className="size-2 animate-pulse rounded-full bg-current"
          />
          Embers still gathering — content soon
        </p>
      </div>
    </main>
  );
}

export function passionTopicFromSlug(slug: string): PassionTopic | undefined {
  return PASSION_TOPICS.find((topic) => topic.slug === slug);
}
