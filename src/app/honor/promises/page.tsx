import { type Metadata } from "next";

import { PromisesPage } from "~/components/honor/promises-page";

export const metadata: Metadata = { title: "Promises" };

export default function HonorPromisesRoute() {
  return <PromisesPage />;
}
