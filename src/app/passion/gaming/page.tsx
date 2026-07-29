import { type Metadata } from "next";

import { GamingPage } from "~/components/passion/gaming-page";

export const metadata: Metadata = { title: "Gaming · Passion" };

export default function GamingRoute() {
  return <GamingPage />;
}
