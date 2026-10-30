import { useLanguage } from "../i18n/LanguageProvider";

export function BackToTop({ visible }: { visible: boolean }) {
  const { t } = useLanguage();

  return (
    <button
      type="button"
      aria-label={t.common.backToTop}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-mint/40 bg-mint/15 text-mint shadow-[0_0_34px_-8px_rgba(46,242,182,0.8)] backdrop-blur-md transition-all duration-300 hover:bg-mint hover:text-ink ${
        visible
          ? "visible translate-y-0 scale-100 opacity-100 animate-[backToTopPulse_0.6s_ease-out]"
          : "invisible translate-y-5 scale-75 opacity-0"
      }`}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5,12 12,5 19,12" />
      </svg>
    </button>
  );
}
