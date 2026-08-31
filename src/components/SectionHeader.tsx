/**
 * Bo'lim sarlavhasi: chapda nom va bir jumlalik izoh, o'ngda ixtiyoriy
 * harakat (masalan «Hammasini ko'rish»).
 *
 * Bitta komponent — chunki bosh sahifadagi barcha bo'limlar bir xil
 * ritmda boshlanishi kerak. Har birida qo'lda yozilsa oraliqlar
 * asta-sekin bir-biridan uzoqlashib ketardi.
 */
export function SectionHeader({
  title,
  lead,
  action,
}: {
  title: string;
  lead?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div className="max-w-xl">
        <h2 className="text-[clamp(1.5rem,3.2vw,2rem)] font-semibold tracking-[-0.03em] text-foreground">
          {title}
        </h2>
        {lead ? <p className="mt-2 text-[15px] leading-6 text-muted">{lead}</p> : null}
      </div>
      {action ? <div className="flex-shrink-0">{action}</div> : null}
    </div>
  );
}
