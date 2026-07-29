import { type Metadata } from "next";

import { SleepingPage } from "~/components/passion/sleeping-page";

export const metadata: Metadata = { title: "Sleeping · Passion" };

export default function SleepingRoute() {
  return <SleepingPage />;
}
