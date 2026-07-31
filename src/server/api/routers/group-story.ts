import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const MAX_SENTENCE = 250;
const MAX_AUTHOR = 80;
const MAX_CHAT = 800;

export const groupStoryRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.groupStorySentence.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        text: true,
        author: true,
        createdAt: true,
      },
    });
  }),

  submit: publicProcedure
    .input(
      z.object({
        /** Do not trim — spacing is part of the story */
        text: z.string().min(1).max(MAX_SENTENCE),
        author: z.string().trim().min(1).max(MAX_AUTHOR),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.groupStorySentence.create({
          data: {
            text: input.text,
            author: input.author.trim(),
          },
          select: {
            id: true,
            text: true,
            author: true,
            createdAt: true,
          },
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to save sentence";
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message });
      }
    }),

  chatList: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.groupStoryChatMessage.findMany({
      orderBy: { createdAt: "asc" },
      take: 200,
      select: {
        id: true,
        body: true,
        author: true,
        createdAt: true,
      },
    });
  }),

  chatSubmit: publicProcedure
    .input(
      z.object({
        body: z.string().trim().min(1).max(MAX_CHAT),
        author: z.string().trim().max(MAX_AUTHOR).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.groupStoryChatMessage.create({
          data: {
            body: input.body,
            author: input.author?.trim() || null,
          },
          select: {
            id: true,
            body: true,
            author: true,
            createdAt: true,
          },
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to send chat message";
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message });
      }
    }),
});
