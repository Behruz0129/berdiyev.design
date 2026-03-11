 "use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLocale } from "@/contexts/LocaleContext";

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export function HeroVisual() {
  const { t } = useLocale();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const x = useSpring(mx, { stiffness: 220, damping: 24, mass: 0.8 });
  const y = useSpring(my, { stiffness: 220, damping: 24, mass: 0.8 });
  const rx = useTransform(y, (v) => clamp(-v / 2, -10, 10));
  const ry = useTransform(x, (v) => clamp(v / 2, -10, 10));

  return (
    <div
      className="relative h-[360px] md:h-[440px] lg:h-[520px]"
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        mx.set((px - 0.5) * 26);
        my.set((py - 0.5) * 26);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div
        className="absolute -inset-6"
        style={{
          translateX: x,
          translateY: y,
        }}
      >
        {/* background gradients */}
        <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[color:var(--grad-a)]/15 via-[color:var(--grad-b)]/10 to-[color:var(--grad-c)]/10 blur-2xl" />
        <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-[color:var(--grad-b)]/20 blur-3xl" />
        <div className="absolute left-8 bottom-8 h-36 w-36 rounded-full bg-[color:var(--grad-a)]/18 blur-3xl" />
      </motion.div>

      {/* Web-page glass skeleton */}
      <motion.div
        className="absolute inset-0"
        style={{
          translateX: x,
          translateY: y,
        }}
      >
        <motion.div
          className="absolute inset-[10%] md:inset-[8%] rounded-[26px] bg-background/40 border border-white/8 shadow-[0_22px_60px_rgba(15,23,42,0.55)] backdrop-blur-xl"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* top bar */}
          <div className="flex items-center justify-between gap-4 border-b border-white/5 px-4 py-3 md:px-5 md:py-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-400/80" />
              <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
              <span className="ml-3 text-[11px] md:text-xs text-foreground/55 truncate max-w-[140px] md:max-w-[220px]">
                berdiyev.dev / portfolio
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-foreground/55">
              <span className="rounded-full bg-foreground/5 px-2 py-1">
                UI/UX
              </span>
              <span className="rounded-full bg-foreground/5 px-2 py-1">
                Frontend
              </span>
            </div>
          </div>

          <div className="grid h-full grid-cols-[0.75fr_1.25fr] gap-4 px-4 py-4 md:px-5 md:py-5">
            {/* left sidebar */}
            <div className="flex flex-col gap-3">
              <div className="h-7 w-24 rounded-xl bg-foreground/10" />
              <div className="space-y-2">
                <div className="h-2.5 w-28 rounded-full bg-foreground/10" />
                <div className="h-2.5 w-20 rounded-full bg-foreground/6" />
                <div className="h-2.5 w-24 rounded-full bg-foreground/6" />
              </div>
              <div className="mt-3 space-y-2">
                <div className="h-7 rounded-xl bg-foreground/7" />
                <div className="h-7 rounded-xl bg-foreground/5" />
                <div className="h-7 rounded-xl bg-foreground/4" />
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="h-2 w-16 rounded-full bg-foreground/10" />
                <div className="h-2 w-14 rounded-full bg-foreground/8" />
              </div>
            </div>

            {/* main content */}
            <div className="relative flex flex-col gap-3">
              {/* hero title block */}
              <div className="rounded-2xl bg-foreground/6 p-3 md:p-4">
                <div className="h-2.5 w-28 rounded-full bg-foreground/14" />
                <div className="mt-2 h-4 w-44 rounded-full bg-foreground/18" />
                <div className="mt-2 h-2.5 w-32 rounded-full bg-foreground/10" />
              </div>

              {/* cards row */}
              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  className="rounded-2xl bg-foreground/5 p-3"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="h-16 rounded-xl bg-foreground/10" />
                  <div className="mt-2 h-2.5 w-20 rounded-full bg-foreground/14" />
                  <div className="mt-1 h-2 w-24 rounded-full bg-foreground/8" />
                </motion.div>
                <motion.div
                  className="rounded-2xl bg-foreground/4 p-3"
                  animate={{ y: [3, -3, 3] }}
                  transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="h-10 rounded-xl bg-foreground/10" />
                  <div className="mt-2 grid grid-cols-3 gap-1.5">
                    <div className="h-2.5 rounded-full bg-foreground/10" />
                    <div className="h-2.5 rounded-full bg-foreground/8" />
                    <div className="h-2.5 rounded-full bg-foreground/6" />
                  </div>
                </motion.div>
              </div>

              {/* bottom bar */}
              <div className="mt-auto flex items-center justify-between gap-3">
                <div className="flex gap-1.5">
                  <div className="h-6 w-14 rounded-xl bg-foreground/8" />
                  <div className="h-6 w-14 rounded-xl bg-foreground/6" />
                </div>
                <div className="h-2 w-20 rounded-full bg-foreground/8" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          rotateX: rx,
          rotateY: ry,
          transformPerspective: 900,
        }}
      />
    </div>
  );
}

