import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { OATH_IDS } from "~/lib/honor/oaths";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const MAX_NAME = 80;
const oathIdSchema = z.enum(OATH_IDS);

export const oathTakingRouter = createTRPCRouter({
  countByOath: publicProcedure
    .input(z.object({ oathId: oathIdSchema }))
    .query(async ({ ctx, input }) => {
      return ctx.db.oathTaking.count({ where: { oathId: input.oathId } });
    }),

  listByOath: publicProcedure
    .input(z.object({ oathId: oathIdSchema }))
    .query(async ({ ctx, input }) => {
      return ctx.db.oathTaking.findMany({
        where: { oathId: input.oathId },
        orderBy: { createdAt: "asc" },
        select: { id: true, name: true, createdAt: true },
      });
    }),

  take: publicProcedure
    .input(
      z.object({
        oathId: oathIdSchema,
        name: z.string().trim().min(1).max(MAX_NAME),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.oathTaking.create({
          data: {
            oathId: input.oathId,
            name: input.name.trim(),
          },
          select: { id: true, name: true, createdAt: true },
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to record oath";
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message });
      }
    }),
});
