import { type Metadata } from "next";

import { EmberField } from "~/components/passion/ember-field";
import { FireAmbience } from "~/components/passion/fire-ambience";

export const metadata: Metadata = { title: "Passion" };

export default function PassionPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden px-6 py-24 sm:px-12 lg:px-20">
      <div className="relative z-20 max-w-xl">
        <h1 className="font-display text-fire-gold text-6xl leading-[0.95] tracking-tight sm:text-8xl">
          Passion
        </h1>
        <p className="font-display text-fire-gold/80 mt-5 text-xl sm:text-2xl">
          A glutton at the great table
        </p>
        <div className="text-mist mt-6 max-w-lg space-y-4 text-lg">
          <p>
            Passion is the fire in our hearts. We are entitled to nothing, but
            deserving of everything — so long as we are willing to take it.
          </p>
          <p>
            Passions are all the things we would enjoy all the same in an empty
            world, where there are no ghosts inside the other shells.
          </p>
        </div>
      </div>

      <EmberField />
      <FireAmbience />
    </main>
  );
}
