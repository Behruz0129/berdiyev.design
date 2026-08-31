"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";
import { useLocale } from "@/contexts/LocaleContext";
import { projectFonts } from "@/lib/project-fonts";
import type { DesignSystem } from "@/data/projects";

/**
 * Loyihaning dizayn tili: shriftlar, ranglar, radius va jonli namuna.
 *
 * Shriftlar HAQIQATAN yuklanadi \u2014 nomini yozib qo'yish bilan uni ko'rsatish
 * boshqa narsa. Pastdagi namuna esa o'sha loyihaning ranglari, shrifti va
 * radiusi bilan chiziladi: portfolioning o'z uslubi u yerga o'tmaydi,
 * shuning uchun kichkina bo'lsa ham loyihaning o'zidan bir parcha
 * ko'ringandek bo'ladi.
 */
export function DesignSystemBlock({
  ds,
  projectTitle,
}: {
  ds: DesignSystem;
  projectTitle: string;
}) {
  const { t } = useLocale();

  const paper = ds.colors.find((c) => c.role === "paper")?.hex ?? "#ffffff";
  const ink = ds.colors.find((c) => c.role === "ink")?.hex ?? "#111111";
  const primary = ds.colors.find((c) => c.role === "primary")?.hex ?? "#000000";
  // Radius satridan birinchi raqam \u2014 namunadagi burchak uchun
  const radiusPx = Number(ds.radius.match(/\d+/)?.[0] ?? 12);

  return (
    <div className="grid gap-6">
      {/* ── Shriftlar ──────────────────────────────────────────────── */}
      <section>
        <p className="eyebrow">{t("projects.detail.dsFonts")}</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <FontCard
            role={t("projects.detail.dsFontDisplay")}
            name={ds.display.name}
            fontClass={projectFonts[ds.display.font]}
          />
          <FontCard
            role={t("projects.detail.dsFontBody")}
            name={ds.body.name}
            fontClass={projectFonts[ds.body.font]}
          />
        </div>
      </section>

      {/* ── Ranglar ────────────────────────────────────────────────── */}
      <section>
        <p className="eyebrow">{t("projects.detail.dsColors")}</p>
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {ds.colors.map((c) => (
            <Swatch key={c.hex} hex={c.hex} label={t(`projects.detail.dsRole.${c.role}`)} />
          ))}
        </ul>
      </section>

      {/* ── Radius va jonli namuna ─────────────────────────────────── */}
      <section className="grid gap-3 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-6">
        <div>
          <p className="eyebrow">{t("projects.detail.dsRadius")}</p>
          <p className="mt-2 font-mono text-[14px] tabular-nums text-foreground">{ds.radius}</p>
        </div>

        <div>
          <p className="eyebrow">{t("projects.detail.dsSample")}</p>
          {/*
            Namuna ataylab inline uslub bilan chiziladi: ranglar
            ma'lumotdan keladi va Tailwind ularni oldindan bila olmaydi.
          */}
          <div
            className="mt-3 border p-5"
            style={{
              background: paper,
              color: ink,
              borderColor: `${ink}1a`,
              borderRadius: radiusPx + 8,
            }}
          >
            <div
              className={`${projectFonts[ds.display.font]} text-[22px] leading-tight`}
              style={{ color: ink }}
            >
              {projectTitle}
            </div>
            <p
              className={`${projectFonts[ds.body.font]} mt-2 text-[13.5px] leading-6`}
              style={{ color: `${ink}b3` }}
            >
              {t("projects.detail.dsSampleBody")}
            </p>
            <span
              className={`${projectFonts[ds.body.font]} mt-4 inline-flex items-center px-4 py-2 text-[13px] font-medium`}
              style={{ background: primary, color: paper, borderRadius: radiusPx }}
            >
              {ds.sampleCta}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

function FontCard({
  role,
  name,
  fontClass,
}: {
  role: string;
  name: string;
  fontClass: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-card-2 p-4">
      {/*
        Namuna harflari: bosh harf, kichik harf va raqam. Shriftning
        xarakteri aynan shu uchtasida ko'rinadi \u2014 «Aa» yolg'iz o'zi kam.
      */}
      <div className={`${fontClass} text-[34px] leading-none text-foreground`}>Aa Bb 123</div>
      <div className="mt-3 text-[14px] font-medium text-foreground">{name}</div>
      <div className="mt-0.5 text-[12.5px] text-muted">{role}</div>
    </div>
  );
}

/** Rangni bosib ko'chirish mumkin \u2014 dizayner uchun eng kerakli amal. */
function Swatch({ hex, label }: { hex: string; label: string }) {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // Clipboard ruxsati yo'q (yoki HTTPS emas) \u2014 hech narsa qilmaymiz:
      // hex baribir ko'rinib turibdi, uni qo'lda ham ko'chirish mumkin.
    }
  }

  return (
    <li>
      <button
        type="button"
        onClick={copy}
        title={copied ? t("projects.detail.dsCopied") : t("projects.detail.dsCopy")}
        className="group w-full text-left focus-visible:focus-ring"
      >
        <span
          className="flex h-14 items-end justify-end rounded-xl border border-line p-1.5 transition-transform duration-300 group-hover:-translate-y-0.5"
          style={{ background: hex }}
        >
          <span className="rounded-md bg-black/25 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100">
            {copied ? <Check size={12} weight="bold" /> : <Copy size={12} weight="bold" />}
          </span>
        </span>
        <span className="mt-2 block font-mono text-[12px] uppercase tracking-[0.02em] text-foreground">
          {hex}
        </span>
        <span className="block text-[12px] text-muted">{label}</span>
      </button>
    </li>
  );
}
