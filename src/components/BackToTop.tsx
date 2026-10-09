export function BackToTop({ visible }: { visible: boolean }) {
  return (
    <button
      type="button"
      aria-label="Voltar ao topo"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-navy to-brand text-[1.8rem] text-white shadow-lg transition-all duration-300 ${
        visible
          ? "visible translate-y-0 scale-100 opacity-100 animate-[backToTopPulse_0.6s_ease-out]"
          : "invisible translate-y-5 scale-75 opacity-0"
      }`}
    >
      &#8679;
    </button>
  );
}
