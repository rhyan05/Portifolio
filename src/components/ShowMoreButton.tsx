export function ShowMoreButton({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) {
  return (
    <div className="mt-10 flex justify-center">
      <button
        type="button"
        onClick={onToggle}
        className="cursor-pointer rounded-[20px] border-2 border-navy px-6 py-2.5 font-semibold text-navy transition-colors hover:bg-navy hover:text-white"
      >
        {expanded ? "Ver menos" : "Ver mais"}
      </button>
    </div>
  );
}
