export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-[2.5rem] font-bold max-md:text-[2rem]">{title}</h2>
      {subtitle && <p className="mt-2 text-[1.1rem] text-[#555]">{subtitle}</p>}
    </div>
  );
}
