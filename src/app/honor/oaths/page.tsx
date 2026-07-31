import { type Metadata } from "next";

import { OathsPage } from "~/components/honor/oaths-page";

export const metadata: Metadata = { title: "Oaths" };

export default function HonorOathsRoute() {
  return <OathsPage />;
}
