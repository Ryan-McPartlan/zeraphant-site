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
  ctx.globalAlpha = 1 - t;
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);

  switch (p.shape) {
    case "heart": {
      drawHeart(ctx, p.size, p.color);
      // flame tip
      ctx.globalAlpha = (1 - t) * 0.85;
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
        ctx.globalAlpha = (1 - t) * 0.5;
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
    case "ray": {
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size * 0.15, -p.size * 1.4, p.size * 0.3, p.size * 2.8);
      ctx.globalAlpha = (1 - t) * 0.45;
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

    const spawn = (x: number, y: number) => {
      const theme = themeRef.current;
      const count =
        theme.id === "passion"
          ? 22 + Math.floor(Math.random() * 12)
          : 16 + Math.floor(Math.random() * 10);

      if (theme.glow) {
        flashes.current.push({
          x,
          y,
          life: 0,
          maxLife: theme.id === "passion" ? 28 : 18,
          color: theme.glow,
          radius:
            theme.id === "passion"
              ? 90 + Math.random() * 50
              : 50 + Math.random() * 30,
        });
      }

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed =
          theme.id === "passion"
            ? 2.5 + Math.random() * 8
            : 2 + Math.random() * 7;
        const shape =
          theme.shapes[Math.floor(Math.random() * theme.shapes.length)]!;
        const rising =
          theme.id === "passion" || theme.id === "connection"
            ? -2.2 - Math.random() * 2
            : -1.2;

        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed + rising,
          life: 0,
          maxLife:
            theme.id === "passion"
              ? 45 + Math.random() * 30
              : 35 + Math.random() * 25,
          size:
            shape === "heart"
              ? 10 + Math.random() * 10
              : 3 + Math.random() * (shape === "orb" ? 10 : 6),
          color:
            theme.particleColors[
              Math.floor(Math.random() * theme.particleColors.length)
            ]!,
          spin: (Math.random() - 0.5) * (shape === "heart" ? 0.25 : 0.4),
          rot: Math.random() * Math.PI * 2,
          shape,
          themeId: theme.id,
        });
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      spawn(e.clientX, e.clientY);
    };
    window.addEventListener("pointerdown", onPointerDown);

    let frame = 0;
    const tick = () => {
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
