import { Container } from "@/components/Container";

/**
 * Ichki sahifalar boshi: kichkina yorliq → katta sarlavha → tavsif.
 *
 * Bosh sahifadagi bento tili bilan bir xil o'lcham kontrasti (11px yorliq ↔
 * katta sarlavha), lekin bezaksiz — bu sahifalarda asosiysi matn.
 */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  size = "reading",
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  size?: "reading" | "wide";
  children?: React.ReactNode;
}) {
  return (
    <section>
      <Container size={size} className="pb-8 pt-8 sm:pt-10">
        {eyebrow ? <p className="card-label">{eyebrow}</p> : null}
        <h1 className="mt-4 text-[clamp(1.9rem,5.5vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-foreground">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-[16px] leading-7 text-foreground/75">{subtitle}</p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
