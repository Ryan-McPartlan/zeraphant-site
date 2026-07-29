import { type Metadata } from "next";

import { SailingPage } from "~/components/passion/sailing-page";

export const metadata: Metadata = { title: "Sailing · Passion" };

export default function SailingRoute() {
  return <SailingPage />;
}
