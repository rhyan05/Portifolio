export function ShowMoreButton({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) {
  return (
    <div className="mt-10 flex justify-center">
      <button
        type="button"
        onClick={onToggle}
        className="cursor-pointer rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-[0.9rem] font-semibold text-fg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-mint/50 hover:text-mint"
      >
        {expanded ? "Ver menos" : "Ver mais"}
      </button>
    </div>
  );
}
