import { type Metadata } from "next";

import { EscapeRoomsPage } from "~/components/passion/escape-rooms-page";

export const metadata: Metadata = { title: "Escape Rooms · Passion" };

export default function EscapeRoomsRoute() {
  return <EscapeRoomsPage />;
}
