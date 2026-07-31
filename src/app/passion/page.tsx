import { type Metadata } from "next";

import { EmberField } from "~/components/passion/ember-field";
import { FireAmbience } from "~/components/passion/fire-ambience";

export const metadata: Metadata = { title: "Passion" };

export default function PassionPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden px-6 py-24 sm:px-12 lg:px-20">
      <div className="relative z-20 max-w-xl">
        <h1 className="font-fire text-fire-gold text-6xl leading-[0.95] tracking-wide sm:text-8xl">
          Passion
        </h1>
        <p className="font-fire text-fire-gold/80 mt-5 text-xl tracking-wide sm:text-2xl">
          A glutton at the great table
        </p>
        <div className="text-mist mt-6 max-w-lg space-y-4 text-lg">
          <p>
            Passion is the{" "}
            <span className="font-fire text-fire">fire in our hearts</span>. We
            are entitled to nothing, but deserving of everything — so long as we
            are willing to <span className="font-fire text-fire">take</span> it.
          </p>
          <p>
            Our passions are all that we would enjoy if we were gods of an empty
            world — pleasures of the senses, challenge and triumph, beauty of
            all kinds. Everything we do is in{" "}
            <span className="font-fire text-fire">indulgence</span> to them.
          </p>
          <p>
            Passion&apos;s fire is the{" "}
            <span className="font-fire text-fire">will</span> to take the next
            step. And ever the next one.
          </p>
        </div>
      </div>

      <EmberField />
      <FireAmbience />
    </main>
  );
}
