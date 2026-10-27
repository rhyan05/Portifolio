import { useEffect } from "react";

export interface LightboxImage {
  src: string;
  alt: string;
}

export function Lightbox({ image, onClose }: { image: LightboxImage | null; onClose: () => void }) {
  useEffect(() => {
    if (!image) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Fechar"
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-2xl leading-none text-fg backdrop-blur-md transition-colors hover:border-mint/40 hover:text-mint"
        onClick={onClose}
      >
        &times;
      </button>
      <img
        src={image.src}
        alt={image.alt}
        className="max-h-[90vh] max-w-[92vw] rounded-2xl border border-white/10 object-contain shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}
