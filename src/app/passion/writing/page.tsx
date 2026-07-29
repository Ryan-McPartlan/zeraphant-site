import { type Metadata } from "next";

import { WritingPage } from "~/components/passion/writing-page";

export const metadata: Metadata = { title: "Writing · Passion" };

export default function WritingRoute() {
  return <WritingPage />;
}
