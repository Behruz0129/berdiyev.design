import { cn } from "@/lib/cn";

/**
 * Bento gridning bir katagi: yumaloq oq kartochka, ichida yuqori chapda
 * kichkina yorliq. Yorliq referensdagi asosiy naqsh — u bir qarashda
 * "bu blok nima haqida?" degan savolga javob beradi, sarlavha kerak emas.
 */
export function Card({
  label,
  className,
  bodyClassName,
  children,
}: {
  label?: string;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("card flex flex-col p-4 sm:p-5", className)}>
      {label ? <p className="card-label self-start">{label}</p> : null}
      <div className={cn("min-h-0 flex-1", label && "mt-4", bodyClassName)}>{children}</div>
    </section>
  );
}
