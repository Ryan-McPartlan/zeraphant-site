import { type Metadata } from "next";

import { CareerPage } from "~/components/honor/career-page";

export const metadata: Metadata = { title: "Career - Resume" };

export default function HonorCareerRoute() {
  return <CareerPage />;
}
