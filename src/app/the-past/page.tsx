import { type Metadata } from "next";

import { LifeTimeline } from "~/components/past/life-timeline";

export const metadata: Metadata = { title: "The past" };

export default function ThePastPage() {
  return <LifeTimeline />;
}
