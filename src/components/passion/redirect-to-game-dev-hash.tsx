"use client";

import { useEffect } from "react";

export function RedirectToGameDevHash({ hash }: { hash: string }) {
  useEffect(() => {
    window.location.replace(`/passion/game-dev#${hash}`);
  }, [hash]);

  return (
    <main className="relative flex min-h-dvh items-center justify-center px-6">
      <p className="text-mist text-sm tracking-[0.18em] uppercase">
        Taking you there…
      </p>
    </main>
  );
}
