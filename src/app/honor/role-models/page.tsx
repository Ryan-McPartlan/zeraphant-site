import { type Metadata } from "next";

import { RoleModelsPage } from "~/components/honor/role-models-page";

export const metadata: Metadata = { title: "Role Models" };

export default function HonorRoleModelsRoute() {
  return <RoleModelsPage />;
}
