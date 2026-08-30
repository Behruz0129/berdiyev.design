import { cn } from "@/lib/cn";

/**
 * Ikki kenglik: `reading` — matn uchun qulay tor ustun (maqola, case study),
 * `wide` — bento grid va ro'yxatlar uchun. Bosh sahifa keng, qolgani tor.
 */
export function Container({
  className,
  size = "reading",
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
