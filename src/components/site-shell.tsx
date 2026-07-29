"use client";

import { usePathname } from "next/navigation";

import { ClickParticles } from "~/components/click-particles";
import { FunnyCursor } from "~/components/funny-cursor";
import { NavBubble } from "~/components/nav-bubble";
import { themeFromPath } from "~/lib/themes";

const ORB_A: Record<string, string> = {
  home: "bg-silver/25",
  passion: "bg-fire/35",
  honor: "bg-iron-bright/15",
  connection: "bg-gold/30",
  past: "bg-sky/15",
  default: "bg-sky/20",
};

const ORB_B: Record<string, string> = {
  home: "bg-silver-bright/10",
  passion: "bg-fire-gold/30",
  honor: "bg-iron/50",
  connection: "bg-gold/20",
  past: "bg-iron/30",
  default: "bg-coral/15",
};

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const theme = themeFromPath(pathname);

  return (
    <div
      className={`site-grain site-noise relative min-h-dvh ${theme.shellClass}`}
    >
      <div
        aria-hidden
        className={`animate-float-orb pointer-events-none fixed top-[12%] right-[8%] size-40 rounded-full blur-3xl ${ORB_A[theme.id]}`}
      />
      <div
        aria-hidden
        className={`animate-float-orb pointer-events-none fixed bottom-[18%] left-[10%] size-52 rounded-full blur-3xl ${ORB_B[theme.id]}`}
        style={{ animationDelay: "1.4s" }}
      />

      <div
        aria-hidden
        className="fire-hearth pointer-events-none fixed inset-x-0 bottom-0 z-[2] h-[45vh]"
      >
        <div className="animate-fire-flicker absolute inset-x-[-10%] bottom-0 h-full bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,90,20,0.55),rgba(255,40,0,0.2)_45%,transparent_70%)] blur-2xl" />
        <div className="animate-fire-flicker-slow absolute inset-x-[10%] bottom-0 h-[70%] bg-[radial-gradient(ellipse_at_40%_100%,rgba(255,200,60,0.45),transparent_60%)] blur-xl" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <NavBubble />
      <FunnyCursor themeId={theme.id} />
      <ClickParticles pathname={pathname} />

      <div key={pathname} className="animate-page-in relative z-10">
        {children}
      </div>
    </div>
  );
}
