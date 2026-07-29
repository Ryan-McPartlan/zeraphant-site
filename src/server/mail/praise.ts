import { Resend } from "resend";

import { env } from "~/env";

const resend = new Resend(env.RESEND_API_KEY);

const INBOX = "ryanmcp45@gmail.com";

type DataUrlParts = {
  mime: string;
  base64: string;
  extension: string;
};

function parseDataUrl(dataUrl: string): DataUrlParts {
  const match = /^data:([^;,]+)(?:;[^,]*)?;base64,(.+)$/s.exec(dataUrl);
  if (!match?.[1] || !match[2]) {
    throw new Error("Invalid media data URL");
  }
  const mime = match[1];
  const extension =
    mime === "image/png"
      ? "png"
      : mime === "image/jpeg"
        ? "jpg"
        : mime.includes("webm")
          ? "webm"
          : mime.includes("ogg")
            ? "ogg"
            : mime.includes("mp4")
              ? "m4a"
              : "bin";

  return { mime, base64: match[2], extension };
}

export async function emailPraiseMessage(opts: {
  message: string;
  fromName?: string;
}) {
  const who = opts.fromName?.trim() || "Anonymous";
  const { error } = await resend.emails.send({
    from: env.PRAISE_FROM_EMAIL,
    to: INBOX,
    subject: `Praise · Good Man — from ${who}`,
    text: `${who} wrote:\n\n${opts.message}\n`,
  });
  if (error) throw new Error(error.message);
}

export async function emailPraiseAudio(opts: {
  mediaData: string;
  fromName?: string;
}) {
  const who = opts.fromName?.trim() || "Anonymous";
  const { base64, extension } = parseDataUrl(opts.mediaData);
  const { error } = await resend.emails.send({
    from: env.PRAISE_FROM_EMAIL,
    to: INBOX,
    subject: `Praise · Good Boy — from ${who}`,
    text: `${who} sent a good boy.\n\nAudio attached.`,
    attachments: [
      {
        filename: `good-boy-${Date.now()}.${extension}`,
        content: Buffer.from(base64, "base64"),
      },
    ],
  });
  if (error) throw new Error(error.message);
}

export async function emailPraiseDrawing(opts: {
  mediaData: string;
  fromName?: string;
  message?: string;
}) {
  const who = opts.fromName?.trim() || "Anonymous";
  const { base64, extension } = parseDataUrl(opts.mediaData);
  const caption = opts.message?.trim();
  const { error } = await resend.emails.send({
    from: env.PRAISE_FROM_EMAIL,
    to: INBOX,
    subject: `Praise · Good Person — from ${who}`,
    text: caption
      ? `${who} drew a symbol of a day you made them smile.\n\nCaption: ${caption}\n\nImage attached.`
      : `${who} drew a symbol of a day you made them smile.\n\nImage attached.`,
    attachments: [
      {
        filename: `smile-symbol-${Date.now()}.${extension}`,
        content: Buffer.from(base64, "base64"),
      },
    ],
  });
  if (error) throw new Error(error.message);
}
