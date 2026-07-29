import { type Metadata } from "next";

import { PagePlaceholder } from "~/components/page-placeholder";

export const metadata: Metadata = { title: "The future" };

export default function TheFuturePage() {
  return (
    <PagePlaceholder
      title="The future"
      line="Half-sketched plans and shiny maybe-machines. Come back when the blueprints land."
    />
  );
}
