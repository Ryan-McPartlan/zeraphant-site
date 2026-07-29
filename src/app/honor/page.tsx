import { type Metadata } from "next";

import { PagePlaceholder } from "~/components/page-placeholder";
import { THEMES } from "~/lib/themes";

export const metadata: Metadata = { title: "Honor" };

export default function HonorPage() {
  return (
    <PagePlaceholder
      eyebrow="Room 02"
      title="Honor"
      line="A player in the great game"
      theme={THEMES.honor}
    />
  );
}
