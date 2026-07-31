import { type Metadata } from "next";

import { CultivatePage } from "~/components/connection/cultivate-page";

export const metadata: Metadata = {
  title: "Cultivating our connections · Connection",
};

export default function CultivateRoute() {
  return <CultivatePage />;
}
