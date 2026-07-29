import { type Metadata } from "next";

import { OutdoorsPage } from "~/components/passion/outdoors-page";

export const metadata: Metadata = { title: "Outdoors · Passion" };

export default function OutdoorsRoute() {
  return <OutdoorsPage />;
}
