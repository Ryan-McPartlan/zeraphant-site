import { type Metadata } from "next";
import Link from "next/link";

import { ConnectForm } from "~/components/connection/connect-form";

export const metadata: Metadata = { title: "Connect with me" };

export default function ConnectPage() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-xl">
        <Link
          href="/connection"
          className="text-gold/70 hover:text-gold font-hand text-lg transition-colors"
        >
          ← Garden
        </Link>
        <div className="mt-8">
          <ConnectForm />
        </div>
      </div>
    </main>
  );
}
