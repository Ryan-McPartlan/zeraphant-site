import { type Metadata } from "next";

import { VideosPage } from "~/components/passion/videos-page";

export const metadata: Metadata = { title: "Videos · Passion" };

export default function VideosRoute() {
  return <VideosPage />;
}
