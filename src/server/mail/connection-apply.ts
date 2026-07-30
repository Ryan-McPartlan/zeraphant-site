import { Resend } from "resend";

import { env } from "~/env";
import {
  applicantRoleWord,
  type ConnectionRole,
  connectionRoleLabel,
  ryanRoleWord,
} from "~/lib/connection/apply";

const resend = new Resend(env.RESEND_API_KEY);

const INBOX = "ryanmcp45@gmail.com";

export async function emailConnectionApplication(opts: {
  role: ConnectionRole;
  name: string;
  email: string;
  whyWant: string;
  whyGoodToMe: string;
  whyGoodToYou: string;
}) {
  const who = opts.name.trim() || "Anonymous";
  const roleLabel = connectionRoleLabel(opts.role);
  const theirs = applicantRoleWord(opts.role);
  const yours = ryanRoleWord(opts.role);
  const { error } = await resend.emails.send({
    from: env.PRAISE_FROM_EMAIL,
    to: INBOX,
    replyTo: opts.email.trim(),
    subject: `Connection apply · ${roleLabel} — from ${who}`,
    text: [
      `${who} (${opts.email.trim()}) applied to be your ${theirs}.`,
      "",
      `Why they want to be your ${theirs}:`,
      opts.whyWant.trim(),
      "",
      `Why they would be a good ${theirs} to you:`,
      opts.whyGoodToMe.trim(),
      "",
      `Why you would be a good ${yours} to them:`,
      opts.whyGoodToYou.trim(),
      "",
    ].join("\n"),
  });
  if (error) throw new Error(error.message);
}
