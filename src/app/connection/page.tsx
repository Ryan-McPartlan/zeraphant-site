import { type Metadata } from "next";
import Link from "next/link";

import { ConnectionNetwork } from "~/components/connection/connection-network";

export const metadata: Metadata = { title: "Connection" };

const orbClassName =
  "connection-invite-orb font-hand flex size-[7.25rem] items-center justify-center rounded-full border-2 border-[rgba(255,210,80,0.55)] px-3 text-center text-lg leading-tight transition-[box-shadow,transform] duration-300 sm:size-32 sm:text-xl";

export default function ConnectionPage() {
  return (
    <main className="relative h-dvh overflow-hidden">
      <div className="absolute inset-0 z-10">
        <ConnectionNetwork />
      </div>

      <div className="pointer-events-none relative z-20 px-6 pt-24 sm:px-12 lg:px-20">
        <Link
          href="/"
          className="connection-gold-backlit text-gold/70 hover:text-gold font-hand pointer-events-auto text-lg transition-colors"
        >
          ← Home
        </Link>
        <p className="connection-gold-backlit text-gold mt-6 text-sm tracking-[0.22em] uppercase">
          Connection
        </p>
        <h1 className="connection-gold-backlit font-hand text-gold mt-3 text-5xl leading-[1.05] sm:text-7xl">
          A dancer in the great garden
        </h1>
        <div className="connection-gold-backlit text-gold/85 mt-4 max-w-xl space-y-4 text-lg">
          <p>
            Connection is the{" "}
            <span className="text-gold font-medium">light behind our eyes</span>
            . The best of all things are the ones that we share.
          </p>
          <p>
            Connection is the{" "}
            <span className="text-gold font-medium">bonds</span> between us.
            Everything we do is for ourselves and each other.
          </p>
          <p>
            Connection&apos;s{" "}
            <span className="text-gold font-medium">wisdom</span> guides us to
            paths worth choosing.
          </p>
        </div>
      </div>

      <div className="pointer-events-auto fixed bottom-6 left-5 z-30 flex flex-col items-center gap-3.5 sm:bottom-8 sm:left-8 sm:gap-4">
        <Link
          href="/connection/cultivation"
          className={`${orbClassName} text-base leading-snug sm:text-lg`}
          style={{ animationDelay: "-1.6s" }}
        >
          Cultivating our connections
        </Link>
        <Link href="/connection/connect" className={orbClassName}>
          Connect with me!
        </Link>
      </div>
    </main>
  );
}
