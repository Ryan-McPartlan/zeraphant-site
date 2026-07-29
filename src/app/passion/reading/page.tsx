import { type Metadata } from "next";

import { ReadingPage } from "~/components/passion/reading-page";

export const metadata: Metadata = { title: "Reading · Passion" };

export default function ReadingRoute() {
  return <ReadingPage />;
}
