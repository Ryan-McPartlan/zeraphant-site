import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  emailPraiseAudio,
  emailPraiseDrawing,
  emailPraiseMessage,
} from "~/server/mail/praise";

const MAX_MESSAGE = 2000;
const MAX_NAME = 80;
/** ~1.5MB decoded — short clips / modest canvases */
const MAX_MEDIA = 2_000_000;

async function sendOrThrow(fn: () => Promise<void>) {
  try {
    await fn();
    return { ok: true as const };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to send praise email";
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message });
  }
}

export const praiseRouter = createTRPCRouter({
  submitMessage: publicProcedure
    .input(
      z.object({
        message: z.string().trim().min(1).max(MAX_MESSAGE),
        fromName: z.string().trim().max(MAX_NAME).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return sendOrThrow(() =>
        emailPraiseMessage({
          message: input.message,
          fromName: input.fromName,
        }),
      );
    }),

  submitAudio: publicProcedure
    .input(
      z.object({
        mediaData: z
          .string()
          .min(1)
          .max(MAX_MEDIA)
          .refine(
            (v) => v.startsWith("data:audio/"),
            "Expected an audio data URL",
          ),
        fromName: z.string().trim().max(MAX_NAME).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return sendOrThrow(() =>
        emailPraiseAudio({
          mediaData: input.mediaData,
          fromName: input.fromName,
        }),
      );
    }),

  submitDrawing: publicProcedure
    .input(
      z.object({
        mediaData: z
          .string()
          .min(1)
          .max(MAX_MEDIA)
          .refine(
            (v) => v.startsWith("data:image/"),
            "Expected an image data URL",
          ),
        fromName: z.string().trim().max(MAX_NAME).optional(),
        message: z.string().trim().max(MAX_MESSAGE).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return sendOrThrow(() =>
        emailPraiseDrawing({
          mediaData: input.mediaData,
          fromName: input.fromName,
          message: input.message,
        }),
      );
    }),
});
