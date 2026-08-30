import { cn } from "@/lib/cn";

export function Section({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <section className={cn("py-10", className)}>{children}</section>;
}
