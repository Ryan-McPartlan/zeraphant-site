import { type Metadata } from "next";

import { AnimalsPage } from "~/components/passion/animals-page";

export const metadata: Metadata = { title: "Animals · Passion" };

export default function AnimalsRoute() {
  return <AnimalsPage />;
}
