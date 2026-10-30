import { useLanguage } from "../i18n/LanguageProvider";

export function ShowMoreButton({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) {
  const { t } = useLanguage();

  return (
    <div className="mt-10 flex justify-center">
      <button
        type="button"
        onClick={onToggle}
        className="cursor-pointer rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-[0.9rem] font-semibold text-fg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-mint/50 hover:text-mint"
      >
        {expanded ? t.common.showLess : t.common.showMore}
      </button>
    </div>
  );
}
