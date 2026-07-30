"use client";

import Link from "next/link";
import { useState } from "react";

import {
  applicantRoleWord,
  CONNECTION_ROLES,
  type ConnectionRole,
  connectionRoleDescription,
  connectionRoleLabel,
  EXCLUSIVE_PARTNER_ERROR,
  ryanRoleWord,
} from "~/lib/connection/apply";
import { api } from "~/trpc/react";

type PickerChoice = ConnectionRole | "exclusive";

export function ConnectForm() {
  const [choice, setChoice] = useState<PickerChoice | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whyWant, setWhyWant] = useState("");
  const [whyGoodToMe, setWhyGoodToMe] = useState("");
  const [whyGoodToYou, setWhyGoodToYou] = useState("");
  const [sent, setSent] = useState(false);

  const submit = api.connectionApply.submit.useMutation({
    onSuccess: () => setSent(true),
  });

  const exclusiveBlocked = choice === "exclusive";
  const role = choice && choice !== "exclusive" ? choice : null;
  const youWord = role ? applicantRoleWord(role) : "_____";
  const meWord = role ? ryanRoleWord(role) : "_____";
  const title = `Apply to be my ${youWord}`;

  if (sent) {
    return (
      <div className="connection-notecard mx-auto max-w-xl rounded-sm px-8 py-12 sm:px-12">
        <p className="font-hand text-center text-3xl text-[#2a1f0a]">Sent!</p>
        <p className="font-hand mt-4 text-center text-xl text-[#2a1f0a]/90">
          I&apos;ll read it soon. Talk soon?
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/connection"
            className="font-hand text-lg text-[#6a4a18] underline decoration-[#6a4a18]/40 underline-offset-4 transition-colors hover:text-[#2a1f0a]"
          >
            ← Back to the garden
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      className="connection-notecard mx-auto max-w-xl rounded-sm px-6 py-8 sm:px-10 sm:py-10"
      onSubmit={(e) => {
        e.preventDefault();
        if (!role || exclusiveBlocked) return;
        submit.mutate({
          role,
          name,
          email,
          whyWant,
          whyGoodToMe,
          whyGoodToYou,
        });
      }}
    >
      <h1 className="font-hand text-3xl leading-tight text-[#2a1f0a] sm:text-4xl">
        {title}
      </h1>

      <fieldset className="mt-8">
        <legend className="font-hand text-lg text-[#2a1f0a]/85">
          What connection are you applying for?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {CONNECTION_ROLES.map((r) => (
            <button
              key={r}
              type="button"
              className="connection-role-chip font-hand rounded-full px-3 py-1 text-base"
              data-active={choice === r}
              onClick={() => setChoice(r)}
            >
              {connectionRoleLabel(r)}
            </button>
          ))}
          <button
            type="button"
            className="connection-role-chip font-hand rounded-full px-3 py-1 text-base"
            data-active={exclusiveBlocked}
            onClick={() => setChoice("exclusive")}
          >
            Romantic Partner (Exclusive)
          </button>
        </div>
        {exclusiveBlocked ? (
          <p className="font-hand mt-4 text-lg text-[#8b1a1a]">
            {EXCLUSIVE_PARTNER_ERROR}
          </p>
        ) : role && connectionRoleDescription(role) ? (
          <p className="font-hand mt-4 text-lg leading-snug text-[#2a1f0a]/80">
            {connectionRoleDescription(role)}
          </p>
        ) : null}
      </fieldset>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="font-hand block text-base text-[#2a1f0a]/85">
          Name
          <input
            className="mt-1 w-full px-0 py-1 text-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={80}
            autoComplete="name"
            disabled={exclusiveBlocked}
          />
        </label>
        <label className="font-hand block text-base text-[#2a1f0a]/85">
          Email
          <input
            type="email"
            className="mt-1 w-full px-0 py-1 text-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={200}
            autoComplete="email"
            disabled={exclusiveBlocked}
          />
        </label>
      </div>

      <label className="font-hand mt-8 block text-lg text-[#2a1f0a]">
        Why do you want to be my {youWord}?
        <textarea
          className="mt-2 w-full px-3 py-2 text-xl"
          rows={4}
          value={whyWant}
          onChange={(e) => setWhyWant(e.target.value)}
          required
          maxLength={4000}
          disabled={!role || exclusiveBlocked}
        />
      </label>

      <label className="font-hand mt-6 block text-lg text-[#2a1f0a]">
        Why would you be a good {youWord} to me?
        <textarea
          className="mt-2 w-full px-3 py-2 text-xl"
          rows={4}
          value={whyGoodToMe}
          onChange={(e) => setWhyGoodToMe(e.target.value)}
          required
          maxLength={4000}
          disabled={!role || exclusiveBlocked}
        />
      </label>

      <label className="font-hand mt-6 block text-lg text-[#2a1f0a]">
        Why would I be a good {meWord} to you?
        <textarea
          className="mt-2 w-full px-3 py-2 text-xl"
          rows={4}
          value={whyGoodToYou}
          onChange={(e) => setWhyGoodToYou(e.target.value)}
          required
          maxLength={4000}
          disabled={!role || exclusiveBlocked}
        />
      </label>

      {submit.error ? (
        <p className="font-hand mt-4 text-base text-[#8b1a1a]">
          {submit.error.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={!role || exclusiveBlocked || submit.isPending}
        className="font-hand mt-8 rounded-full border border-[#6a4a18]/50 bg-[rgba(255,210,80,0.35)] px-6 py-2 text-xl text-[#2a1f0a] transition-colors hover:bg-[rgba(255,210,80,0.55)] disabled:cursor-not-allowed disabled:opacity-45"
      >
        {submit.isPending ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
