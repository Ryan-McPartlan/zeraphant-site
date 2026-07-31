import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Honor" };

export default function HonorPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden px-6 py-24 sm:px-12 lg:px-20">
      <div className="relative z-20 max-w-xl">
        <Link
          href="/"
          className="text-iron-bright/70 hover:text-iron-bright text-sm tracking-[0.18em] uppercase transition-colors"
        >
          ← Home
        </Link>
        <p className="text-iron-bright mt-8 text-sm tracking-[0.22em] uppercase">
          Honor
        </p>
        <h1 className="font-display text-iron-bright mt-3 text-5xl leading-[0.95] tracking-tight sm:text-7xl">
          A player in the great game
        </h1>
        <div className="text-mist mt-6 max-w-lg space-y-4 text-lg">
          <p>
            Honor is the{" "}
            <span className="text-sky font-medium">iron in our blood</span>. The
            measure of our worth is how much we can give, how much we do.
          </p>
          <p>
            Honor is the oaths, principles, and codes we have bound ourselves
            to. Everything we do is in{" "}
            <span className="text-sky font-medium">service</span> to them.
          </p>
          <p>
            Honor&apos;s <span className="text-sky font-medium">strength</span>{" "}
            grants the capacity to navigate the hardest paths.
          </p>
        </div>
      </div>
    </main>
  );
}
