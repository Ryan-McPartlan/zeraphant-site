import { type Metadata } from "next";
import Link from "next/link";

import { ConnectionNetwork } from "~/components/connection/connection-network";

export const metadata: Metadata = { title: "Connection" };

export default function ConnectionPage() {
  return (
    <main className="relative h-dvh overflow-hidden">
      <div className="absolute inset-0 z-10">
        <ConnectionNetwork />
      </div>

      <div className="pointer-events-none relative z-20 px-6 pt-24 sm:px-12 lg:px-20">
        <Link
          href="/"
          className="text-gold/70 hover:text-gold font-hand pointer-events-auto text-lg transition-colors"
        >
          ← Home
        </Link>
        <p className="text-gold mt-6 text-sm tracking-[0.22em] uppercase">
          Connection
        </p>
        <h1 className="font-hand text-gold mt-3 text-5xl leading-[1.05] sm:text-7xl">
          A dancer in the great garden
        </h1>
        <p className="text-gold/80 mt-4 max-w-xl text-lg">
          Connection is the light behind our eyes, the closest the ghost inside
          can get to being seen.
        </p>
        <p className="text-gold/80 mt-4 max-w-xl text-lg">
          Explore the communities I am a part of below, and take a quiz to find
          communities that you should join!
        </p>
      </div>

      <Link
        href="/connection/connect"
        className="connection-invite-orb font-hand pointer-events-auto fixed right-5 bottom-6 z-30 flex size-[7.25rem] items-center justify-center rounded-full border-2 border-[rgba(255,210,80,0.55)] px-3 text-center text-lg leading-tight transition-[box-shadow,transform] duration-300 sm:right-8 sm:bottom-8 sm:size-32 sm:text-xl"
      >
        Connect with me!
      </Link>
    </main>
  );
}
