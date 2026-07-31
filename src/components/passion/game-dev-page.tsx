import Image from "next/image";
import Link from "next/link";

import { ItchGameEmbed } from "~/components/passion/itch-game-embed";
import {
  FLAPPY_ZOMBIE,
  GAME_DEV_DIRECTORY,
  GIFT_GAME_EMBEDS,
  KINDLED_GAMES,
  SKELLYLABS_MODELS,
  WAY_OF_THE_MANTIS,
} from "~/lib/game-dev";

export function GameDevPage() {
  return (
    <main className="relative min-h-dvh px-6 py-24 sm:px-12 lg:px-20">
      <div className="relative z-10 mx-auto max-w-5xl">
        <Link
          href="/passion"
          className="text-fire-gold/70 hover:text-fire-gold text-sm tracking-[0.18em] uppercase transition-colors"
        >
          ← Back to Passion
        </Link>

        <p className="text-fire-gold mt-8 text-sm tracking-[0.22em] uppercase">
          Passion · Game Dev
        </p>
        <h1 className="font-fire text-fire-gold mt-4 text-5xl leading-[0.95] tracking-wide sm:text-7xl">
          Game Dev
        </h1>
        <p className="font-display text-fire-gold/80 mt-4 text-xl sm:text-2xl">
          My highest art
        </p>

        <div className="text-mist mt-8 max-w-2xl space-y-5 text-lg">
          <p>
            Game dev was my first great passion. In college, I would come home
            from school, sit at my computer, and do game dev work for 8 hours.
            Basically every day! I would have been glad to have made it my
            career.
          </p>
          <p>
            See my itch.io:{" "}
            <a
              href="https://skelly1324.itch.io/"
              target="_blank"
              rel="noreferrer"
              className="text-fire-gold decoration-fire-gold/40 underline underline-offset-4 transition-colors hover:text-white hover:decoration-white"
            >
              skelly1324.itch.io
            </a>
          </p>
          <p>
            Fun fact: My IBM interviewer asked if I was ready to write
            &ldquo;Real code&rdquo;, a military contractor asked if I spent more
            time &ldquo;Playing games or building them&rdquo;.
          </p>
        </div>

        <nav aria-label="Game Dev directory" className="mt-12">
          <p className="text-fire-gold/70 text-sm tracking-[0.18em] uppercase">
            Directory
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {GAME_DEV_DIRECTORY.map((entry) => (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  className="group border-fire/35 bg-fire/10 hover:border-fire-gold/50 hover:bg-fire/20 relative block overflow-hidden rounded-2xl border px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(255,90,20,0.25)]"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-6 right-4 h-16 w-10 rounded-full bg-[radial-gradient(circle_at_50%_80%,#ffd166,transparent_70%)] opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-80"
                  />
                  <span className="font-display text-fire-gold text-xl transition-colors group-hover:text-white">
                    {entry.label}
                  </span>
                  <span className="text-mist mt-1 line-clamp-2 block text-sm">
                    {entry.blurb}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section id="skellylabs" className="mt-20 scroll-mt-28">
          <h2 className="font-display text-fire-gold text-2xl tracking-tight sm:text-3xl">
            Skellylabs
          </h2>
          <div className="text-mist mt-4 max-w-2xl space-y-4 text-lg">
            <p>
              I was a bit of a big deal in Roblox in 2008. I had a company that
              made models and hired assassins, and used to be recognized in
              game!
            </p>
            <p>Its a hard thing, to have peaked at 12...</p>
          </div>

          <ul className="mt-10 grid gap-10 sm:grid-cols-2">
            {SKELLYLABS_MODELS.map((model) => (
              <li key={model.src} className="space-y-3">
                <figure className="border-fire/35 bg-fire/10 overflow-hidden rounded-2xl border">
                  <Image
                    src={model.src}
                    alt={model.alt}
                    width={1200}
                    height={900}
                    className="h-auto w-full"
                  />
                </figure>
                <p className="text-mist text-sm leading-relaxed sm:text-base">
                  <span className="font-display text-fire-gold">→</span>{" "}
                  {model.caption}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {GIFT_GAME_EMBEDS.map((embed) => (
          <section
            key={embed.id}
            id={embed.id}
            className="mt-20 scroll-mt-28 space-y-4"
          >
            <h2 className="font-display text-fire-gold text-2xl tracking-tight sm:text-3xl">
              {embed.title}
            </h2>
            <p className="text-mist max-w-2xl text-lg">{embed.description}</p>
            <ItchGameEmbed
              title={embed.title}
              itchUrl={embed.itchUrl}
              embedSrc={embed.embedSrc}
            />
          </section>
        ))}

        <section id={FLAPPY_ZOMBIE.id} className="mt-20 scroll-mt-28 space-y-8">
          <h2 className="font-display text-fire-gold text-2xl tracking-tight sm:text-3xl">
            {FLAPPY_ZOMBIE.label}
          </h2>
          <div className="text-mist max-w-2xl space-y-4 text-lg">
            {FLAPPY_ZOMBIE.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <figure className="border-fire/35 bg-fire/10 max-w-2xl overflow-hidden rounded-2xl border">
            <Image
              src={FLAPPY_ZOMBIE.image.src}
              alt={FLAPPY_ZOMBIE.image.alt}
              width={1200}
              height={1600}
              className="h-auto w-full"
            />
          </figure>
        </section>

        {KINDLED_GAMES.map((game) => (
          <section key={game.id} id={game.id} className="mt-20 scroll-mt-28">
            <h2 className="font-display text-fire-gold text-2xl tracking-tight sm:text-3xl">
              {game.label}
            </h2>
            <div className="text-mist mt-4 max-w-2xl space-y-4 text-lg">
              <p>{game.blurb}</p>
              {"story" in game
                ? game.story.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))
                : null}
            </div>
            {"story" in game ? null : (
              <p className="border-fire-gold/40 bg-fire/20 text-fire-gold mt-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm shadow-[0_0_30px_rgba(255,90,20,0.35)] backdrop-blur-sm">
                <span
                  aria-hidden
                  className="size-2 animate-pulse rounded-full bg-current"
                />
                Still kindling — details soon
              </p>
            )}
          </section>
        ))}

        <section
          id={WAY_OF_THE_MANTIS.id}
          className="mt-20 scroll-mt-28 space-y-8"
        >
          <h2 className="font-display text-fire-gold text-2xl tracking-tight sm:text-3xl">
            {WAY_OF_THE_MANTIS.label}
          </h2>
          <div className="text-mist max-w-2xl space-y-4 text-lg">
            {WAY_OF_THE_MANTIS.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              Play / download on{" "}
              <a
                href={WAY_OF_THE_MANTIS.itchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fire-gold decoration-fire-gold/40 underline underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                itch.io
              </a>
              .
            </p>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2">
            {WAY_OF_THE_MANTIS.images.map((image) => (
              <li key={image.src}>
                <figure className="border-fire/35 bg-fire/10 overflow-hidden rounded-2xl border">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1200}
                    height={800}
                    className="h-auto w-full"
                  />
                </figure>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
