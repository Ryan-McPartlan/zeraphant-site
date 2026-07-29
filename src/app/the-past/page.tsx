import { type Metadata } from "next";

import { PagePlaceholder } from "~/components/page-placeholder";

export const metadata: Metadata = { title: "The past" };

export default function ThePastPage() {
  return (
    <PagePlaceholder
      eyebrow="Room 04"
      title="The past"
      line="Archives, scars, and origin stories. Currently a beautifully empty hallway."
    />
  );
}
