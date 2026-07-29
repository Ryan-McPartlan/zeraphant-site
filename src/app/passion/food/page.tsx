import { type Metadata } from "next";

import { FoodPage } from "~/components/passion/food-page";

export const metadata: Metadata = { title: "Food · Passion" };

export default function FoodRoute() {
  return <FoodPage />;
}
