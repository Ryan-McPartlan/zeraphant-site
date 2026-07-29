import { type ThemeConfig } from "~/lib/themes";

export function PagePlaceholder({
  title,
  eyebrow,
  line,
  theme,
}: {
  title: string;
  eyebrow: string;
  line: string;
  theme?: ThemeConfig;
}) {
  return (
    <main className="relative flex min-h-dvh items-center px-6 py-24 sm:px-12 lg:px-20">
      <div className="mx-auto w-full max-w-5xl">
        <p
          className={`mb-4 text-sm tracking-[0.22em] uppercase ${theme?.accentClass ?? "text-sky"}`}
        >
          {eyebrow}
        </p>
        <h1
          className={`font-display max-w-[14ch] text-6xl leading-[0.95] tracking-tight sm:text-8xl lg:text-9xl ${theme?.titleClass ?? "text-foam"}`}
        >
          {title}
        </h1>
        <p className="text-mist mt-8 max-w-xl text-lg sm:text-xl">{line}</p>
        <p
          className={`mt-10 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm backdrop-blur-sm ${theme?.badgeClass ?? "border-foam/15 bg-moss/40 text-chartreuse"}`}
        >
          <span
            aria-hidden
            className="size-2 animate-pulse rounded-full bg-current"
          />
          Placeholder room — furniture arriving soon
        </p>
      </div>
    </main>
  );
}
