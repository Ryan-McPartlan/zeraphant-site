import { type Metadata } from "next";

import { StimmingPage } from "~/components/passion/stimming-page";

export const metadata: Metadata = { title: "Stimming · Passion" };

export default function StimmingRoute() {
  return <StimmingPage />;
}
