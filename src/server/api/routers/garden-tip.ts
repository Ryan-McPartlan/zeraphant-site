import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const MAX_BODY = 800;
const MIN_BODY = 12;
const MAX_NAME = 80;
const MAX_STAMP = 6; // 0..6 inclusive
const BALL_SAMPLE_SIZE = 50;

export const gardenTipRouter = createTRPCRouter({
  /** Up to 50 random tips from everything ever saved */
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.$queryRawUnsafe<
      Array<{
        id: string;
        body: string;
        fromName: string | null;
        stamp: number;
        backglow: boolean;
        createdAt: Date;
      }>
    >(
      `SELECT id, body, "fromName", stamp, backglow, "createdAt" FROM "GardenTip" ORDER BY RANDOM() LIMIT ${BALL_SAMPLE_SIZE}`,
    );
  }),

  submit: publicProcedure
    .input(
      z.object({
        body: z.string().trim().min(MIN_BODY).max(MAX_BODY),
        fromName: z.string().trim().max(MAX_NAME).optional(),
        stamp: z.number().int().min(0).max(MAX_STAMP).default(0),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const fromName = input.fromName?.trim() || null;
      try {
        return await ctx.db.gardenTip.create({
          data: {
            body: input.body,
            fromName,
            stamp: input.stamp,
          },
          select: {
            id: true,
            body: true,
            fromName: true,
            stamp: true,
            backglow: true,
            createdAt: true,
          },
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to save garden tip";
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message });
      }
    }),
});
