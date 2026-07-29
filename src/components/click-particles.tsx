"use client";

import { useEffect, useRef } from "react";

import {
  type ParticleShape,
  type ThemeConfig,
  themeFromPath,
} from "~/lib/themes";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  spin: number;
  rot: number;
  shape: ParticleShape;
  themeId: ThemeConfig["id"];
};

type Flash = {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  color: string;
  radius: number;
};

function drawHeart(ctx: CanvasRenderingContext2D, size: number, color: string) {
  const s = size / 16;
  ctx.beginPath();
  ctx.moveTo(0, 4 * s);
  ctx.bezierCurveTo(0, 1.5 * s, -4 * s, -4 * s, -8 * s, -4 * s);
  ctx.bezierCurveTo(-14 * s, -4 * s, -14 * s, 4 * s, -14 * s, 4 * s);
  ctx.bezierCurveTo(-14 * s, 9 * s, -8 * s, 13.5 * s, 0, 18 * s);
  ctx.bezierCurveTo(8 * s, 13.5 * s, 14 * s, 9 * s, 14 * s, 4 * s);
  ctx.bezierCurveTo(14 * s, 4 * s, 14 * s, -4 * s, 8 * s, -4 * s);
  ctx.bezierCurveTo(4 * s, -4 * s, 0, 1.5 * s, 0, 4 * s);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle, t: number) {
  ctx.save();
  // Passion sparks stay bright while alive, then snuff out near the end
  const fade =
    p.themeId === "passion"
      ? t < 0.55
        ? 1
        : Math.max(0, 1 - (t - 0.55) / 0.45)
      : 1 - t;
  ctx.globalAlpha = fade;
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);

  switch (p.shape) {
    case "heart": {
      drawHeart(ctx, p.size, p.color);
      // flame tip
      ctx.globalAlpha = fade * 0.85;
      ctx.fillStyle = "#ffd166";
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.35);
      ctx.quadraticCurveTo(p.size * 0.2, -p.size * 0.7, 0, -p.size);
      ctx.quadraticCurveTo(-p.size * 0.2, -p.size * 0.7, 0, -p.size * 0.35);
      ctx.fill();
      break;
    }
    case "ember": {
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
      g.addColorStop(0, "#fff2c8");
      g.addColorStop(0.35, p.color);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size * 0.55, p.size, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "shard": {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.lineTo(p.size * 0.35, 0);
      ctx.lineTo(0, p.size * 0.7);
      ctx.lineTo(-p.size * 0.25, 0);
      ctx.closePath();
      ctx.fill();
      if (p.themeId === "home" || p.themeId === "honor") {
        ctx.globalAlpha = fade * 0.5;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      break;
    }
    case "flake": {
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.4;
      for (let i = 0; i < 3; i++) {
        ctx.rotate((Math.PI * 2) / 3);
        ctx.beginPath();
        ctx.moveTo(-p.size, 0);
        ctx.lineTo(p.size, 0);
        ctx.stroke();
      }
      ctx.fillStyle = p.color;
      ctx.fillRect(-1.2, -1.2, 2.4, 2.4);
      break;
    }
    case "orb": {
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
      g.addColorStop(0, "#fffdf0");
      g.addColorStop(0.4, p.color);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "sand": {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(
        0,
        0,
        p.size * 0.55,
        p.size * 0.35,
        p.rot * 0.3,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.globalAlpha = fade * 0.45;
      ctx.beginPath();
      ctx.arc(p.size * 0.15, -p.size * 0.1, p.size * 0.2, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "ray": {
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size * 0.15, -p.size * 1.4, p.size * 0.3, p.size * 2.8);
      ctx.globalAlpha = fade * 0.45;
      ctx.fillRect(-p.size * 0.5, -p.size * 0.2, p.size, p.size * 0.4);
      break;
    }
    case "spark":
    default: {
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      break;
    }
  }

  ctx.restore();
}

export function ClickParticles({ pathname }: { pathname: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const flashes = useRef<Flash[]>([]);
  const themeRef = useRef(themeFromPath(pathname));

  useEffect(() => {
    themeRef.current = themeFromPath(pathname);
  }, [pathname]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Burn = {
      x: number;
      y: number;
      startedAt: number;
      lastEmitAt: number;
      durationMs: number;
      emitEveryMs: number;
      ended: boolean;
    };
    const burns: Burn[] = [];

    const pushFlash = (x: number, y: number, sustained = false) => {
      const theme = themeRef.current;
      if (!theme.glow) return;
      flashes.current.push({
        x,
        y,
        life: 0,
        maxLife: sustained
          ? theme.id === "passion"
            ? 18
            : 14
          : theme.id === "passion"
            ? 28
            : 18,
        color: theme.glow,
        radius:
          theme.id === "passion"
            ? (sustained ? 55 : 90) + Math.random() * (sustained ? 35 : 50)
            : 50 + Math.random() * 30,
      });
    };

    const spawnParticles = (x: number, y: number, count: number) => {
      const theme = themeRef.current;

      for (let i = 0; i < count; i++) {
        const shape =
          theme.shapes[Math.floor(Math.random() * theme.shapes.length)]!;
        const isSand = theme.id === "past" || shape === "sand";

        // Sand mostly falls down in a narrow cone
        const angle = isSand
          ? Math.PI / 2 + (Math.random() - 0.5) * 0.7
          : theme.id === "passion"
            ? // Bias upward so the fire reads as a continuous flame column
              -Math.PI / 2 + (Math.random() - 0.5) * 1.1
            : Math.random() * Math.PI * 2;
        const speed = isSand
          ? 1.2 + Math.random() * 4.5
          : theme.id === "passion"
            ? 1.4 + Math.random() * 3.2
            : 2 + Math.random() * 7;
        const rising = isSand
          ? 0.8 + Math.random() * 1.5
          : theme.id === "passion"
            ? -1.6 - Math.random() * 1.8
            : theme.id === "connection"
              ? -2.2 - Math.random() * 2
              : -1.2;

        particles.current.push({
          x: theme.id === "passion" ? x + (Math.random() - 0.5) * 18 : x,
          y: theme.id === "passion" ? y + (Math.random() - 0.5) * 10 : y,
          vx: Math.cos(angle) * speed * (isSand ? 0.35 : 1),
          vy: Math.sin(angle) * speed + rising,
          life: 0,
          maxLife: isSand
            ? 40 + Math.random() * 28
            : theme.id === "passion"
              ? // Short-lived sparks; continuous emit keeps the flame full
                16 + Math.random() * 50
              : 35 + Math.random() * 25,
          size: isSand
            ? 1.6 + Math.random() * 2.8
            : shape === "heart"
              ? 8 + Math.random() * 8
              : 3 + Math.random() * (shape === "orb" ? 10 : 6),
          color:
            theme.particleColors[
              Math.floor(Math.random() * theme.particleColors.length)
            ]!,
          spin:
            (Math.random() - 0.5) *
            (isSand ? 0.12 : shape === "heart" ? 0.25 : 0.4),
          rot: Math.random() * Math.PI * 2,
          shape,
          themeId: theme.id,
        });
      }
    };

    const spawnBurst = (x: number, y: number) => {
      const count = 16 + Math.floor(Math.random() * 10);
      pushFlash(x, y);
      spawnParticles(x, y, count);
    };

    const startBurn = (x: number, y: number) => {
      const now = performance.now();
      burns.push({
        x,
        y,
        startedAt: now,
        lastEmitAt: now,
        // Keep a continuous burn feel, but let duration wander widely
        durationMs: 450 + Math.random() * 1600,
        emitEveryMs: 22 + Math.random() * 55,
        ended: false,
      });
      pushFlash(x, y, true);
      // Immediate kick so the flame appears on the first frame
      spawnParticles(x, y, 6 + Math.floor(Math.random() * 4));
    };

    const onPointerDown = (e: PointerEvent) => {
      if (themeRef.current.id === "passion") {
        startBurn(e.clientX, e.clientY);
      } else {
        spawnBurst(e.clientX, e.clientY);
      }
    };
    window.addEventListener("pointerdown", onPointerDown);

    let frame = 0;
    const tick = () => {
      const now = performance.now();

      for (const burn of burns) {
        if (burn.ended) continue;
        const age = now - burn.startedAt;
        if (age >= burn.durationMs) {
          burn.ended = true;
          continue;
        }
        if (now - burn.lastEmitAt >= burn.emitEveryMs) {
          burn.lastEmitAt = now;
          spawnParticles(burn.x, burn.y, 2 + Math.floor(Math.random() * 3));
          // Soft sustained glow while burning
          if (Math.random() < 0.45) pushFlash(burn.x, burn.y, true);
        }
      }
      // Drop finished burns once their emit window is over
      for (let i = burns.length - 1; i >= 0; i--) {
        if (burns[i]!.ended) burns.splice(i, 1);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      flashes.current = flashes.current.filter((f) => {
        f.life += 1;
        const t = f.life / f.maxLife;
        if (t >= 1) return false;
        const radius = f.radius * (0.55 + t * 0.9);
        const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, radius);
        g.addColorStop(0, f.color);
        g.addColorStop(1, "transparent");
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(f.x, f.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        return true;
      });

      particles.current = particles.current.filter((p) => {
        p.life += 1;
        p.x += p.vx;
        p.y += p.vy;
        if (p.themeId === "passion") {
          p.vy -= 0.04;
          p.vx *= 0.985;
        } else if (p.themeId === "connection") {
          p.vy -= 0.02;
          p.vx *= 0.99;
        } else if (p.themeId === "past") {
          p.vy += 0.22;
          p.vx *= 0.96;
        } else {
          p.vy += 0.12;
          p.vx *= 0.98;
        }
        p.rot += p.spin;
        const t = p.life / p.maxLife;
        if (t >= 1) return false;
        if (p.themeId === "passion" || p.themeId === "connection") {
          ctx.globalCompositeOperation = "lighter";
        }
        drawParticle(ctx, p, t);
        ctx.globalCompositeOperation = "source-over";
        return true;
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onPointerDown);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9998]"
    />
  );
}
