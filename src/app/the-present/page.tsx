import { type Metadata } from "next";

import { PagePlaceholder } from "~/components/page-placeholder";

export const metadata: Metadata = { title: "The present" };

export default function ThePresentPage() {
  return (
    <PagePlaceholder
      title="The present"
      line="Whatever is happening right now — including this temporary placeholder sentence."
    />
  );
}
