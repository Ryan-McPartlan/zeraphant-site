import { listGoodBoyLeaderboard } from "~/lib/passion/good-boy-leaderboard";

/** Lists ranked good-boy clips dumped into public/passion/praise/good-boy/ */
export async function GET() {
  const entries = await listGoodBoyLeaderboard();
  return Response.json({ entries });
}
