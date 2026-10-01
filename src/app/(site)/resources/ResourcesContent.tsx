"use client";

import { useMemo, useState } from "react";
import {
  MagnifyingGlass,
  X,
  ArrowUpRight,
  Star,
  Binoculars,
} from "@phosphor-icons/react";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { useLocale } from "@/contexts/LocaleContext";
import {
  resources,
  resourceCategories,
  type Resource,
  type ResourceCategory,
  type ResourcePrice,
} from "@/data/resources";
import type { Locale } from "@/lib/i18n";

/** `https://www.figma.com/community/...` → `figma.com`. */
function domainOf(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const PRICE_KEYS: Record<ResourcePrice, string> = {
  free: "resources.priceFree",
  freemium: "resources.priceFreemium",
  paid: "resources.pricePaid",
};

/**
 * Resurslar sahifasi: qidiruv, kategoriya chiplari va ikki filtr, ostida
 * kategoriya bo'yicha guruhlangan kartochkalar.
 *
 * Butun ro'yxat `src/data/resources.ts` da. Bu yerda ma'lumot yo'q — faqat
 * uni saralash va chizish, shuning uchun yangi resurs qo'shish uchun bu
 * faylga tegish shart emas.
 */
export function ResourcesContent() {
  const { t, locale } = useLocale();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ResourceCategory | "all">("all");
  const [freeOnly, setFreeOnly] = useState(false);
  const [topOnly, setTopOnly] = useState(false);

  /*
    Qidiruv uchun matn oldindan tayyorlanadi: nom + joriy tildagi tavsif +
    domen. Har bosilgan harfda uni qaytadan yig'ish bekorga ish bo'lardi,
    shuning uchun til o'zgarmaguncha bir marta hisoblanadi.
  */
  const indexed = useMemo(
    () =>
      resources.map((r) => ({
        resource: r,
        haystack: `${r.name} ${r.description[locale as Locale]} ${domainOf(r.url)}`.toLowerCase(),
      })),
    [locale],
  );

  /** Narx va «Top» filtrlari — kategoriya chiplarining sanog'i ham shundan. */
  const preFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return indexed
      .filter(({ resource, haystack }) => {
        if (freeOnly && resource.price !== "free") return false;
        if (topOnly && !resource.featured) return false;
        return !q || haystack.includes(q);
      })
      .map(({ resource }) => resource);
  }, [indexed, query, freeOnly, topOnly]);

  /*
    Chiplardagi son kategoriyadan TASHQARI hamma filtr qo'llangandan keyin
    hisoblanadi. Shuning uchun «Faqat bepul» bosilganda sonlar ham o'zgaradi
    va chipda yozilgani bosganda chiqadigani bilan bir xil bo'ladi.
  */
  const counts = useMemo(() => {
    const map = new Map<ResourceCategory, number>();
    for (const r of preFiltered) map.set(r.category, (map.get(r.category) ?? 0) + 1);
    return map;
  }, [preFiltered]);

  const visible = useMemo(
    () => (category === "all" ? preFiltered : preFiltered.filter((r) => r.category === category)),
    [preFiltered, category],
  );

  /** Kategoriya tartibi `resources.ts` dagidek qoladi. */
  const groups = useMemo(
    () =>
      resourceCategories
        .map((c) => ({ ...c, items: visible.filter((r) => r.category === c.key) }))
        .filter((g) => g.items.length > 0),
    [visible],
  );

  const filtersOn = Boolean(query) || category !== "all" || freeOnly || topOnly;

  const clearAll = () => {
    setQuery("");
    setCategory("all");
    setFreeOnly(false);
    setTopOnly(false);
  };

  return (
    <main>
      <PageHeader
        eyebrow={`${resources.length} ${t("resources.countLabel")} · ${resourceCategories.length} ${t("resources.categoryLabel")}`}
        title={t("resources.title")}
        subtitle={t("resources.subtitle")}
      />

      <Container className="pb-16">
        {/* ── Boshqaruv ────────────────────────────────────────────────── */}
        <Reveal className="card p-4 sm:p-5">
          <div className="relative">
            <MagnifyingGlass
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("resources.searchPlaceholder")}
              aria-label={t("resources.searchPlaceholder")}
              className="h-12 w-full rounded-xl border border-line bg-background pl-11 pr-11 text-[15px] text-foreground placeholder:text-muted/70 transition-colors hover:border-foreground/20 focus:border-accent/60 focus-visible:focus-ring"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={t("resources.clearSearch")}
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground focus-visible:focus-ring"
              >
                <X size={14} weight="bold" />
              </button>
            ) : null}
          </div>

          {/*
            Tor ekranda chiplar yon tomonga suriladi, chetida yumshoq
            so'nish qoladi — ro'yxat davom etishi shundan bilinadi. Keng
            ekranda esa surish keraksiz: qator oddiygina ikki-uch qatorga
            yoyiladi, shunda hammasi bir qarashda ko'rinadi.
          */}
          <div className="scroll-fade-x sm:scroll-fade-x-off -mx-1 mt-4 px-1 pb-1">
            <div className="flex w-max items-center gap-2 sm:w-full sm:flex-wrap">
              <Chip
                active={category === "all"}
                onClick={() => setCategory("all")}
                label={t("resources.all")}
                count={preFiltered.length}
              />
              {resourceCategories.map((c) => {
                const n = counts.get(c.key) ?? 0;
                return (
                  <Chip
                    key={c.key}
                    active={category === c.key}
                    onClick={() => setCategory(c.key)}
                    label={c.label[locale as Locale]}
                    count={n}
                    muted={n === 0}
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
            <Toggle
              active={freeOnly}
              onClick={() => setFreeOnly((v) => !v)}
              label={t("resources.freeOnly")}
            />
            <Toggle
              active={topOnly}
              onClick={() => setTopOnly((v) => !v)}
              label={t("resources.topOnly")}
              icon={<Star size={13} weight="fill" />}
            />
            {filtersOn ? (
              <button
                type="button"
                onClick={clearAll}
                className="ml-auto text-[13px] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-foreground focus-visible:focus-ring"
              >
                {t("resources.clearFilters")}
              </button>
            ) : null}
          </div>
        </Reveal>

        {/* ── Natija ───────────────────────────────────────────────────── */}
        {groups.length ? (
          <div className="mt-10 space-y-10">
            {groups.map((group) => (
              <section key={group.key}>
                <div className="flex items-baseline gap-3">
                  <h2 className="card-label">{group.label[locale as Locale]}</h2>
                  <span className="font-mono text-[12px] tabular-nums text-muted">
                    {group.items.length}
                  </span>
                </div>

                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((r, i) => (
                    <Reveal as="li" key={r.url} delay={Math.min(i, 5) * 50}>
                      <Card resource={r} />
                    </Reveal>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <Reveal className="card mt-10 px-6 py-16 text-center">
            <Binoculars size={28} className="mx-auto text-muted" aria-hidden />
            <p className="mt-4 text-[17px] font-medium text-foreground">
              {t("resources.emptyTitle")}
            </p>
            <p className="mx-auto mt-2 max-w-sm text-[14px] leading-6 text-muted">
              {t("resources.emptyText")}
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="btn-accent mt-6 hover:brightness-105 focus-visible:focus-ring"
            >
              {t("resources.clearFilters")}
            </button>
          </Reveal>
        )}
      </Container>
    </main>
  );
}

function Chip({
  active,
  onClick,
  label,
  count,
  muted = false,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  muted?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`pill flex-shrink-0 whitespace-nowrap focus-visible:focus-ring ${
        active
          ? "border-accent/50 bg-accent/12 text-foreground"
          : muted
            ? "text-muted/60 hover:bg-surface-2"
            : "hover:bg-surface-2"
      }`}
    >
      {label}
      <span className="font-mono text-[11px] tabular-nums text-muted">{count}</span>
    </button>
  );
}

function Toggle({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`pill focus-visible:focus-ring ${
        active ? "border-accent/50 bg-accent/12 text-foreground" : "hover:bg-surface-2"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

/**
 * Butun kartochka bitta havola — ichida ikkinchi havola yo'q. Sayt yangi
 * oynada ochiladi: odam ro'yxatni yo'qotmasdan bir nechta resursni ketma-ket
 * ochadi. `noreferrer` ham qo'shilgan — `noopener` yolg'iz o'zi eski
 * brauzerlarda yetarli emas.
 */
function Card({ resource }: { resource: Resource }) {
  const { t, locale } = useLocale();

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card group flex h-full flex-col p-4 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-accent/40 focus-visible:focus-ring"
    >
      <div className="flex items-start gap-2">
        <h3 className="min-w-0 flex-1 text-[15.5px] font-medium leading-snug tracking-[-0.01em] text-foreground">
          {resource.name}
        </h3>
        {resource.featured ? (
          <Star
            size={14}
            weight="fill"
            className="mt-0.5 flex-shrink-0 text-accent"
            aria-label={t("resources.featuredLabel")}
          />
        ) : null}
        <ArrowUpRight
          size={14}
          weight="bold"
          className="mt-0.5 flex-shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100"
          aria-hidden
        />
      </div>

      <p className="mt-2 line-clamp-3 text-[13.5px] leading-6 text-foreground/75">
        {resource.description[locale as Locale]}
      </p>

      <div className="mt-4 flex items-center justify-between gap-2 pt-1">
        <span
          className={`rounded-full px-2.5 py-1 text-[11.5px] font-medium ${
            resource.price === "free"
              ? "bg-ok/12 text-ok"
              : resource.price === "paid"
                ? "bg-surface-2 text-muted"
                : "bg-accent/12 text-accent"
          }`}
        >
          {t(PRICE_KEYS[resource.price])}
        </span>
        {/* Domen monospace da — saytdagi boshqa «ma'lumot» bilan bir tilda */}
        <span className="truncate font-mono text-[11.5px] tracking-[-0.01em] text-muted">
          {domainOf(resource.url)}
        </span>
      </div>

      <span className="sr-only">{t("resources.opensInNewTab")}</span>
    </a>
  );
}
