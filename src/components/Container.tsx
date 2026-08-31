import { cn } from "@/lib/cn";

/**
 * Sahifaning yon chekkasi. Butun sayt bitta kenglikda turadi: navbar,
 * footer, bosh sahifa va ichki sahifalar — hammasi `wide`. Shuning uchun
 * u standart qiymat: sahifadan sahifaga o'tganda chap chekka joyida
 * qoladi, sarlavha kontentdan siljib ketmaydi.
 *
 * `reading` — istisno: uzun matn uchun tor ustun. Lekin uni sahifa
 * darajasida ishlatmaslik kerak, aks holda chekka yana siljiydi; matn
 * ustunini ichkarida `max-w-*` bilan cheklash to'g'riroq.
 */
export function Container({
  className,
  size = "wide",
  children,
}: {
  className?: string;
  size?: "reading" | "wide";
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6",
        size === "wide" ? "max-w-6xl" : "max-w-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
