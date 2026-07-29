"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { NAV_ITEMS } from "~/lib/nav";

export function NavBubble() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={rootRef} className="fixed top-4 left-4 z-50 sm:top-6 sm:left-6">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((v) => !v)}
        className={`group border-foam/20 bg-moss/80 text-foam focus-visible:ring-chartreuse relative size-14 overflow-hidden rounded-full border shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition-transform duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:outline-none sm:size-16 ${
          open ? "scale-95 rotate-[-8deg]" : "animate-wiggle"
        }`}
      >
        <Image
          src="/zeraph.png"
          alt=""
          width={64}
          height={64}
          priority
          className="size-full object-cover"
        />
        <span
          aria-hidden
          className={`bg-coral absolute -right-0.5 -bottom-0.5 size-3 rounded-full transition-transform ${
            open ? "scale-125" : "scale-100"
          }`}
        />
      </button>

      <nav
        id={panelId}
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className={`absolute top-0 left-0 origin-top-left pt-16 transition-all duration-300 sm:pt-[4.5rem] ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-90 opacity-0"
        }`}
      >
        <ul className="border-foam/15 bg-ink/90 min-w-[15rem] overflow-hidden rounded-[1.75rem] border p-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:min-w-[17rem]">
          <li>
            <Link
              href="/"
              onClick={close}
              className={`hover:bg-foam/10 block rounded-2xl px-4 py-3 transition-colors ${
                pathname === "/" ? "bg-chartreuse/15 text-chartreuse" : ""
              }`}
            >
              <span className="font-display text-lg">Home</span>
              <span className="text-mist mt-0.5 block text-sm">
                The front porch
              </span>
            </Link>
          </li>
          {NAV_ITEMS.map((item, index) => {
            const active = pathname === item.href;
            return (
              <li
                key={item.href}
                className={open ? "animate-pop-in" : undefined}
                style={
                  open ? { animationDelay: `${60 + index * 40}ms` } : undefined
                }
              >
                <Link
                  href={item.href}
                  onClick={close}
                  className={`hover:bg-foam/10 block rounded-2xl px-4 py-3 transition-colors ${
                    active ? "bg-chartreuse/15 text-chartreuse" : ""
                  }`}
                >
                  <span className="font-display text-lg">{item.label}</span>
                  <span className="text-mist mt-0.5 block text-sm">
                    {item.blurb}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
