import { type Metadata } from "next";

import { PraisePage } from "~/components/passion/praise-page";

export const metadata: Metadata = { title: "Praise · Passion" };

export default function PraiseRoute() {
  return <PraisePage />;
}
