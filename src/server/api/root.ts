import { connectionApplyRouter } from "~/server/api/routers/connection-apply";
import { gardenTipRouter } from "~/server/api/routers/garden-tip";
import { groupStoryRouter } from "~/server/api/routers/group-story";
import { oathTakingRouter } from "~/server/api/routers/oath-taking";
import { postRouter } from "~/server/api/routers/post";
import { praiseRouter } from "~/server/api/routers/praise";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  praise: praiseRouter,
  connectionApply: connectionApplyRouter,
  gardenTip: gardenTipRouter,
  oathTaking: oathTakingRouter,
  groupStory: groupStoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
