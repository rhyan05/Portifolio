export function SectionHeader({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <div className="mb-12 text-center" data-reveal>
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className="text-[2.6rem] font-bold leading-tight text-fg max-md:text-[2rem]">{title}</h2>
      {subtitle && <p className="mx-auto mt-3 max-w-[640px] text-[1.05rem] text-muted">{subtitle}</p>}
      <div className="mx-auto mt-6 h-px w-28 bg-gradient-to-r from-transparent via-mint to-transparent" />
    </div>
  );
}
