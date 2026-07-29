import { type Metadata } from "next";

import { DebatePage } from "~/components/passion/debate-page";

export const metadata: Metadata = { title: "Debate · Passion" };

export default function DebateRoute() {
  return <DebatePage />;
}
