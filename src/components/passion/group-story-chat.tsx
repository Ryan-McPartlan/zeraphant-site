"use client";

import { useEffect, useRef, useState } from "react";

import { api } from "~/trpc/react";

const MAX_CHAT = 800;

export function GroupStoryChat() {
  const utils = api.useUtils();
  const { data: messages = [], isLoading } = api.groupStory.chatList.useQuery(
    undefined,
    { refetchInterval: 8_000 },
  );
  const send = api.groupStory.chatSubmit.useMutation({
    onSuccess: async () => {
      setBody("");
      await utils.groupStory.chatList.invalidate();
    },
  });

  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  return (
    <aside className="border-fire-gold/25 flex h-full min-h-[28rem] flex-col rounded-[1.75rem] border bg-[#140806]/80 lg:min-h-0">
      <div className="border-fire/20 border-b px-4 py-3 sm:px-5">
        <h3 className="font-display text-fire-gold text-xl tracking-tight">
          Story chat
        </h3>
        <p className="text-mist/70 mt-1 text-sm">
          Share ideas and thoughts — freeform, anyone can jump in.
        </p>
      </div>

      <div
        ref={scrollerRef}
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5"
      >
        {isLoading ? (
          <p className="text-mist/60 text-sm">Loading chat…</p>
        ) : messages.length === 0 ? (
          <p className="text-mist/65 text-sm italic">
            No messages yet. Toss an idea in.
          </p>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="text-sm leading-relaxed">
              <p className="text-fire-gold/85 font-medium">
                {message.author?.trim() || "Anonymous"}
              </p>
              <p className="mt-0.5 whitespace-pre-wrap text-[#ffe8d6]/90">
                {message.body}
              </p>
            </div>
          ))
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const trimmed = body.trim();
          if (send.isPending || !trimmed) return;
          send.mutate({
            body: trimmed,
            author: author.trim() || undefined,
          });
        }}
        className="border-fire/20 space-y-2 border-t px-4 py-3 sm:px-5"
      >
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          maxLength={80}
          placeholder="Name (optional)"
          className="border-fire/30 focus:border-fire-gold focus:ring-fire-gold/25 w-full rounded-xl border bg-[#1a0604]/70 px-3 py-2 text-sm text-[#ffe8e0] outline-none placeholder:text-[#c08070]/60 focus:ring-1"
          autoComplete="nickname"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value.slice(0, MAX_CHAT))}
          maxLength={MAX_CHAT}
          rows={3}
          placeholder="Ideas, thoughts, fragments…"
          className="border-fire/30 focus:border-fire-gold focus:ring-fire-gold/25 w-full resize-none rounded-xl border bg-[#1a0604]/70 px-3 py-2 text-sm text-[#ffe8e0] outline-none placeholder:text-[#c08070]/60 focus:ring-1"
        />
        <div className="flex items-center justify-between gap-3">
          <span className="text-mist/50 text-xs tabular-nums">
            {body.length}/{MAX_CHAT}
          </span>
          <button
            type="submit"
            disabled={send.isPending || !body.trim()}
            className="bg-fire rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.12em] text-white uppercase transition hover:brightness-110 disabled:opacity-40"
          >
            {send.isPending ? "Sending…" : "Send"}
          </button>
        </div>
        {send.error ? (
          <p className="text-coral text-xs">Couldn&apos;t send — try again.</p>
        ) : null}
      </form>
    </aside>
  );
}
