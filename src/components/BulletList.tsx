import { cn } from "@/lib/cn";

/**
 * Ro'yxatlar uchun yagona ko'rinish. Avval matn ichida qo'lda `- ` va `•`
 * aralash yozilardi — endi belgi CSS bilan chiziladi, shuning uchun ekran
 * o'quvchilar ham ortiqcha tinish belgisini o'qimaydi.
 */
export function BulletList({
  items,
  className,
  accent = "a",
}: {
  items: string[];
  className?: string;
  /** Nuqta rangi — globals.css dagi gradient tokenlaridan. */
  accent?: "a" | "b" | "c";
}) {
  if (!items.length) return null;

  return (
    <ul className={cn("space-y-2.5 text-sm leading-6 text-foreground/70", className)}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span
            aria-hidden
            className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full"
            style={{ background: `var(--grad-${accent})` }}
          />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}
