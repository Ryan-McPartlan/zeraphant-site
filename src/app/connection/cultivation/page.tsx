import { type Metadata } from "next";

import { CultivatePage } from "~/components/connection/cultivate-page";

export const metadata: Metadata = {
  title: "Cultivation · Connection",
};

export default function CultivationRoute() {
  return <CultivatePage />;
}
