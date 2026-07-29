import { type Metadata } from "next";

import { FilmPage } from "~/components/passion/film-page";

export const metadata: Metadata = { title: "Film · Passion" };

export default function FilmRoute() {
  return <FilmPage />;
}
