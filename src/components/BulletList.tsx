import { cn } from "@/lib/cn";

/** Oddiy ro'yxat — belgi CSS bilan chiziladi, matn ichida "-" yozilmaydi. */
export function BulletList({
  items,
  className,
}: {
  items: string[];
  className?: string;
  /** Eski chaqiruvlar bilan moslik uchun qoldirilgan, ko'rinishga ta'sir qilmaydi. */
  accent?: "a" | "b" | "c";
}) {
  const visible = items.filter(Boolean);
  if (!visible.length) return null;

  return (
    <ul className={cn("list-disc space-y-2 pl-5 text-[15px] leading-7 text-foreground/85", className)}>
      {visible.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
