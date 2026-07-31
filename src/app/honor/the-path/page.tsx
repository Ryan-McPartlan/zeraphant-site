import { type Metadata } from "next";

import { LifeTimeline } from "~/components/past/life-timeline";

export const metadata: Metadata = { title: "My Path" };

export default function ThePathPage() {
  return <LifeTimeline />;
}
