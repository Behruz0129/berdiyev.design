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
        <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[color:var(--grad-a)]/15 via-[color:var(--grad-b)]/10 to-[color:var(--grad-c)]/10 blur-2xl" />
        <div className="absolute right-8 top-10 h-32 w-32 rounded-full bg-[color:var(--grad-b)]/16 blur-2xl" />
        <div className="absolute left-10 bottom-10 h-40 w-40 rounded-full bg-[color:var(--grad-a)]/14 blur-2xl" />
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          translateX: x,
          translateY: y,
        }}
      >
        <motion.div
          className="glass absolute inset-0 rounded-[28px] p-4 md:p-6 overflow-hidden"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[color:var(--grad-b)]/18 blur-3xl" />
          <div className="absolute -left-12 bottom-0 h-52 w-52 rounded-full bg-[color:var(--grad-a)]/14 blur-3xl" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-foreground/10 grid place-items-center">
                <div className="h-2 w-2 rounded-full bg-[color:var(--grad-c)] shadow-[0_0_18px_color-mix(in_oklab,var(--grad-c)_55%,transparent)]" />
              </div>
              <div>
                <div className="text-sm font-medium tracking-tight text-foreground">
                  {t("heroVisual.productUIPreview")}
                </div>
                <div className="text-xs text-foreground/55">
                  {t("heroVisual.cleanLayout")}
                </div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-foreground/55">
              <div className="rounded-full bg-foreground/8 px-3 py-1">{t("heroVisual.grid")}</div>
              <div className="rounded-full bg-foreground/8 px-3 py-1">{t("heroVisual.tokens")}</div>
              <div className="rounded-full bg-foreground/8 px-3 py-1">{t("heroVisual.ux")}</div>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-12">
            <div className="md:col-span-7 space-y-3">
              <div className="hairline rounded-2xl p-4 bg-foreground/4">
                <div className="text-xs text-foreground/55">{t("heroVisual.primaryMetric")}</div>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <div className="text-2xl font-semibold tracking-tight text-foreground">
                    96%
                  </div>
                  <div className="text-xs text-foreground/55">{t("heroVisual.consistencyScore")}</div>
                </div>
                <div className="mt-3 h-2 rounded-full bg-foreground/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[color:var(--grad-a)] to-[color:var(--grad-b)]"
                    initial={{ width: "0%" }}
                    animate={{ width: "96%" }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { k: "heroVisual.layout", v: "heroVisual.responsive" },
                  { k: "heroVisual.motion", v: "heroVisual.subtle" },
                  { k: "heroVisual.style", v: "heroVisual.glass" },
                  { k: "heroVisual.system", v: "heroVisual.scalable" },
                ].map((pair) => (
                  <div key={pair.k} className="hairline rounded-2xl p-4 bg-foreground/3">
                    <div className="text-xs text-foreground/55">{t(pair.k)}</div>
                    <div className="mt-2 text-sm font-medium text-foreground/80">
                      {t(pair.v)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 space-y-3">
              <div className="hairline rounded-2xl p-4 bg-foreground/3">
                <div className="text-xs text-foreground/55">{t("heroVisual.components")}</div>
                <div className="mt-3 space-y-2">
                  {[72, 54, 40, 28].map((w, i) => (
                    <div key={i} className="h-2 rounded-full bg-foreground/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-foreground/25"
                        initial={{ width: "18%" }}
                        animate={{ width: `${w}%` }}
                        transition={{
                          duration: 0.9,
                          delay: 0.1 + i * 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="hairline rounded-2xl p-4 bg-foreground/3">
                <div className="text-xs text-foreground/55">{t("heroVisual.microInteraction")}</div>
                <div className="mt-3 flex items-center gap-3">
                  <motion.div
                    className="h-10 flex-1 rounded-2xl bg-foreground/8"
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.14)" }}
                    transition={{ duration: 0.25 }}
                  />
                  <motion.div
                    className="h-10 w-10 rounded-2xl bg-foreground/10"
                    animate={{ rotate: [0, 4, 0] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
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

