import { type Metadata } from "next";

import { WorldConquestPage } from "~/components/honor/world-conquest-page";

export const metadata: Metadata = { title: "World Conquest" };

export default function HonorWorldConquestRoute() {
  return <WorldConquestPage />;
}
