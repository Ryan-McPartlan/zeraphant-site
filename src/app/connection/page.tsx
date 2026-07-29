import { type Metadata } from "next";

import { PagePlaceholder } from "~/components/page-placeholder";
import { THEMES } from "~/lib/themes";

export const metadata: Metadata = { title: "Connection" };

export default function ConnectionPage() {
  return (
    <PagePlaceholder
      title="Connection"
      line="Dance with me the great garden"
      theme={THEMES.connection}
    />
  );
}
