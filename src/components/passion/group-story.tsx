"use client";

import {
  type ClipboardEvent,
  type KeyboardEvent,
  useRef,
  useState,
} from "react";

import { GroupStoryChat } from "~/components/passion/group-story-chat";
import { api } from "~/trpc/react";

const MAX_SENTENCE = 250;

function truncate(value: string) {
  return value.length <= MAX_SENTENCE ? value : value.slice(0, MAX_SENTENCE);
}

function readDraftText(el: HTMLElement) {
  return el.innerText.replace(/\r\n/g, "\n");
}

function placeCaretAtEnd(el: HTMLElement) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(false);
  sel?.removeAllRanges();
  sel?.addRange(range);
}

function insertTextAtSelection(el: HTMLElement, chunk: string) {
  el.focus();
  const sel = window.getSelection();
  if (!sel) return;

  if (sel.rangeCount === 0 || !el.contains(sel.anchorNode)) {
    placeCaretAtEnd(el);
  }

  const range = sel.getRangeAt(0);
  if (!el.contains(range.commonAncestorContainer)) {
    placeCaretAtEnd(el);
  }

  const active = sel.getRangeAt(0);
  const before = readDraftText(el);
  const selectionLength = active.toString().length;
  const room = MAX_SENTENCE - (before.length - selectionLength);
  if (room <= 0) return;

  const toInsert = chunk.slice(0, room);
  active.deleteContents();
  active.insertNode(document.createTextNode(toInsert));
  active.collapse(false);
  sel.removeAllRanges();
  sel.addRange(active);
}

export function GroupStory() {
  const utils = api.useUtils();
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [draftKey, setDraftKey] = useState(0);
  const draftRef = useRef<HTMLSpanElement>(null);

  const submit = api.groupStory.submit.useMutation({
    onSuccess: async () => {
      setText("");
      setDraftKey((key) => key + 1);
      await utils.groupStory.list.invalidate();
    },
  });

  const { data: sentences = [], isLoading } = api.groupStory.list.useQuery();

  function syncFromDraft(el: HTMLElement) {
    const raw = readDraftText(el);
    const next = truncate(raw);
    if (raw !== next) {
      el.replaceChildren(document.createTextNode(next));
      placeCaretAtEnd(el);
    }
    setText(next);
  }

  function trySubmit() {
    const el = draftRef.current;
    const current = truncate(el ? readDraftText(el) : text);
    if (submit.isPending || current.length < 1) return;
    if (!author.trim()) {
      window.alert("Add your name before sealing the line.");
      return;
    }

    const ok = window.confirm(
      "Double-check spelling, typos, and structure.\n\nThis change will be permanent. Add it to the story?",
    );
    if (!ok) return;

    submit.mutate({ text: current, author: author.trim() });
  }

  function onDraftKeyDown(e: KeyboardEvent<HTMLSpanElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      insertTextAtSelection(e.currentTarget, "\n");
      syncFromDraft(e.currentTarget);
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      insertTextAtSelection(e.currentTarget, "\t");
      syncFromDraft(e.currentTarget);
    }
  }

  function onPaste(e: ClipboardEvent<HTMLSpanElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text/plain").replace(/\r\n/g, "\n");
    insertTextAtSelection(e.currentTarget, pasted);
    syncFromDraft(e.currentTarget);
  }

  const hovered = sentences.find((s) => s.id === hoveredId) ?? null;

  return (
    <section className="mt-20 pb-24">
      <h2 className="font-display text-fire-gold text-3xl tracking-tight sm:text-4xl">
        Write a group story!
      </h2>
      <p className="text-mist mt-3 max-w-2xl text-lg">
        What happens next? Write a sentence to make a permanent addition to the
        story.
      </p>
      <p className="text-mist/75 mt-2 max-w-2xl space-y-2 text-sm">
        <span className="block">
          Double-check spelling, typos, and structure before you seal it — once
          added, the change is permanent. Hover a finished line to see who wrote
          it.
        </span>
        <span className="block">
          Have fun, and don&apos;t take it too seriously, your contribution is
          appreciated!
        </span>
        <span className="block">
          Consider giving someone a sentence fragment to start their writing.
        </span>
      </p>

      <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.9fr)]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            trySubmit();
          }}
          className="space-y-5"
        >
          <div
            className="border-fire-gold/25 focus-within:border-fire-gold/50 min-h-[28rem] rounded-[1.75rem] border bg-[#140806]/80 p-5 transition-colors sm:p-8"
            onClick={(e) => {
              if (e.target === e.currentTarget) draftRef.current?.focus();
            }}
          >
            {isLoading ? (
              <p className="text-mist/60 text-sm">Loading the tale…</p>
            ) : (
              <div className="font-display text-[1.15rem] leading-[1.85] whitespace-pre-wrap text-[#ffe8d6] sm:text-xl">
                {sentences.map((sentence, index) => {
                  const active = hoveredId === sentence.id;
                  return (
                    <span key={sentence.id}>
                      {index > 0 ? " " : null}
                      <span
                        className={`cursor-default rounded-sm px-0.5 transition-colors duration-150 ${
                          active
                            ? "bg-fire/35 text-fire-gold decoration-fire-gold/80 underline decoration-2 underline-offset-4"
                            : "hover:bg-fire/15 hover:text-fire-gold"
                        }`}
                        onMouseEnter={() => setHoveredId(sentence.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onFocus={() => setHoveredId(sentence.id)}
                        onBlur={() => setHoveredId(null)}
                        tabIndex={0}
                        title={sentence.author}
                      >
                        {sentence.text}
                      </span>
                    </span>
                  );
                })}
                {sentences.length > 0 ? " " : null}
                <span
                  key={draftKey}
                  ref={draftRef}
                  role="textbox"
                  aria-multiline="true"
                  aria-label="Next sentence of the group story"
                  contentEditable={!submit.isPending}
                  suppressContentEditableWarning
                  spellCheck
                  onInput={(e) => syncFromDraft(e.currentTarget)}
                  onKeyDown={onDraftKeyDown}
                  onPaste={onPaste}
                  data-empty={text.length === 0 ? "true" : "false"}
                  data-placeholder={
                    sentences.length === 0
                      ? "The page is blank. Type the first line…"
                      : "Continue here…"
                  }
                  className="group-story-draft text-fire-gold caret-fire inline whitespace-pre-wrap outline-none"
                />
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div
                className={`min-h-[1.5rem] text-sm tracking-wide transition-opacity ${
                  hovered ? "opacity-100" : "opacity-0"
                }`}
                aria-live="polite"
              >
                <span className="text-fire-gold/90">
                  {hovered ? `— ${hovered.author}` : "—"}
                </span>
              </div>
              <span className="text-mist/55 text-xs tabular-nums">
                {text.length}/{MAX_SENTENCE}
              </span>
            </div>
          </div>

          <label className="block max-w-md">
            <span className="text-fire-gold/80 text-sm tracking-[0.14em] uppercase">
              Your name
            </span>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              maxLength={80}
              required
              className="border-fire/35 focus:border-fire-gold focus:ring-fire-gold/30 mt-2 w-full rounded-2xl border bg-[#1a0604]/70 px-5 py-3 text-[#ffe8e0] outline-none placeholder:text-[#c08070]/70 focus:ring-2"
              placeholder="Who wrote this?"
              autoComplete="nickname"
            />
          </label>

          {submit.error ? (
            <p className="text-coral text-sm">
              Couldn&apos;t save that line — try again.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submit.isPending || text.length < 1 || !author.trim()}
            className="bg-fire rounded-full px-7 py-3 text-sm font-semibold tracking-[0.14em] text-white uppercase shadow-[0_0_28px_rgba(255,59,31,0.4)] transition hover:brightness-110 disabled:opacity-40"
          >
            {submit.isPending
              ? "Adding…"
              : "Add your words forever to our story"}
          </button>
        </form>

        <GroupStoryChat />
      </div>
    </section>
  );
}
