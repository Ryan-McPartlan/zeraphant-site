import Link from "next/link";

import { type Oath, oaths, type OathSegment } from "~/lib/honor/oaths";

function OathSegmentView({ segment }: { segment: OathSegment }) {
  const className = segment.accent
    ? "text-sky font-medium"
    : segment.href
      ? "text-sky underline underline-offset-2"
      : undefined;

  if (segment.href) {
    return (
      <a
        href={segment.href}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {segment.text}
      </a>
    );
  }

  if (segment.accent) {
    return <span className={className}>{segment.text}</span>;
  }

  return <span>{segment.text}</span>;
}

function OathBody({ body }: { body: Oath["body"] }) {
  if (typeof body === "string") return body;
  return body.map((segment, index) => (
    <OathSegmentView key={`${index}-${segment.text}`} segment={segment} />
  ));
}

export function OathsPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden px-6 py-24 sm:px-12 lg:px-20">
      <div className="relative z-20 max-w-xl">
        <Link
          href="/honor"
          className="text-iron-bright/70 hover:text-iron-bright text-sm tracking-[0.18em] uppercase transition-colors"
        >
          ← Honor
        </Link>
        <p className="text-iron-bright mt-8 text-sm tracking-[0.22em] uppercase">
          Honor
        </p>
        <h1 className="font-display text-iron-bright mt-3 text-5xl leading-[0.95] tracking-tight sm:text-7xl">
          Oaths
        </h1>
        <div className="text-mist mt-6 max-w-lg space-y-4 text-lg">
          <p>
            These are the words I have bound myself to. Click an oath to read it
            in full.
          </p>
        </div>

        <ul className="mt-10 space-y-2">
          {oaths.map((oath) => (
            <li key={oath.id}>
              <details className="honor-oath group border-iron-bright/20 open:border-iron-bright/35 border-b">
                <summary className="text-iron-bright hover:text-sky flex cursor-pointer list-none items-baseline justify-between gap-4 py-3 text-lg tracking-wide transition-colors marker:content-none [&::-webkit-details-marker]:hidden">
                  <span>{oath.title}</span>
                  <span
                    aria-hidden
                    className="text-iron-bright/45 text-xl leading-none transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="pb-4 text-base leading-relaxed sm:text-lg">
                  <p className="text-mist whitespace-pre-wrap">
                    <OathBody body={oath.body} />
                  </p>
                  {oath.pledge ? (
                    <p className="text-sky mt-3 font-medium">{oath.pledge}</p>
                  ) : null}
                  {oath.href ? (
                    <p className="mt-3">
                      <a
                        href={oath.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky underline underline-offset-2"
                      >
                        {oath.hrefLabel ?? oath.href}
                      </a>
                    </p>
                  ) : null}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
