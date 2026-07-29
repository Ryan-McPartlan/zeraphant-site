import { type Metadata } from "next";

import { GameDevPage } from "~/components/passion/game-dev-page";

export const metadata: Metadata = { title: "Game Dev · Passion" };

export default function GameDevRoute() {
  return <GameDevPage />;
}
