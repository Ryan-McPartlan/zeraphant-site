import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { CONNECTION_ROLES } from "~/lib/connection/apply";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { emailConnectionApplication } from "~/server/mail/connection-apply";

const MAX_ANSWER = 4000;
const MAX_NAME = 80;

export const connectionApplyRouter = createTRPCRouter({
  submit: publicProcedure
    .input(
      z.object({
        role: z.enum(CONNECTION_ROLES),
        name: z.string().trim().min(1).max(MAX_NAME),
        email: z.string().trim().email().max(200),
        whyWant: z.string().trim().min(1).max(MAX_ANSWER),
        whyGoodToMe: z.string().trim().min(1).max(MAX_ANSWER),
        whyGoodToYou: z.string().trim().min(1).max(MAX_ANSWER),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        await emailConnectionApplication(input);
        return { ok: true as const };
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to send connection application";
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message });
      }
    }),
});
