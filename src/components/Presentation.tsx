import { useEffect, useRef, useState } from "react";
import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import { deckSlides, presentationUrl } from "../data/presentation";
import { DeckSlide, SlideCanvas } from "./DeckSlide";
import { SectionHeader } from "./SectionHeader";

const total = deckSlides.length;
const half = Math.floor(total / 2);

export function Presentation() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [open, setOpen] = useState(false);

  const dragX = useRef<number | null>(null);
  const suppressClick = useRef(false);

  const go = (direction: number) => {
    setIndex((current) => (current + direction + total) % total);
  };

  useEffect(() => {
    if (!playing || hovering || open) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, 4500);
    return () => window.clearInterval(id);
  }, [playing, hovering, open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") setIndex((current) => (current + 1) % total);
      if (event.key === "ArrowLeft") setIndex((current) => (current - 1 + total) % total);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const onStageKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragX.current = event.clientX;
    suppressClick.current = false;
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragX.current === null) return;
    const delta = event.clientX - dragX.current;
    dragX.current = null;
    if (Math.abs(delta) < 50) return;
    suppressClick.current = true;
    go(delta < 0 ? 1 : -1);
  };

  const onClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!suppressClick.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick.current = false;
  };

  return (
    <section id="apresentacao" className="section-shell bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 h-[460px] w-[720px] -translate-x-1/2 rounded-full bg-violet/10 blur-[150px]"
      />

      <div className="relative mx-auto max-w-[1200px] px-5">
        <SectionHeader
          eyebrow="Em slides"
          title="Minha trajetória em slides"
          subtitle="Uma visão rápida da minha jornada, competências e plano de carreira. Arraste, use as setas ou ative o carrossel."
        />

        <div data-reveal>
          <div className="relative mx-auto max-w-[1040px]">
            <div
              role="region"
              aria-roledescription="carrossel"
              aria-label="Apresentação profissional em slides"
              tabIndex={0}
              onKeyDown={onStageKeyDown}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => (dragX.current = null)}
              onClickCapture={onClickCapture}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              onFocus={() => setHovering(true)}
              onBlur={() => setHovering(false)}
              className="perspective-deck relative mx-auto aspect-[16/9] w-full max-w-[960px] touch-pan-y select-none"
            >
              {deckSlides.map((slide, slideIndex) => {
                const rawOffset = (slideIndex - index + total + half) % total;
                const offset = rawOffset - half;
                const distance = Math.abs(offset);
                const hidden = distance > 2;

                const style: CSSProperties = {
                  transform: `translateX(${offset * 70}%) translateZ(${-distance * 130}px) rotateY(${
                    offset * -28
                  }deg) scale(${1 - distance * 0.05})`,
                  opacity: hidden ? 0 : 1 - distance * 0.28,
                  zIndex: 20 - distance,
                  pointerEvents: hidden ? "none" : "auto",
                  filter: distance === 0 ? undefined : `brightness(${1 - distance * 0.18}) saturate(0.85)`,
                };

                return (
                  <div
                    key={slide.id}
                    aria-hidden={hidden}
                    style={style}
                    className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out"
                  >
                    <div
                      className={`relative aspect-video w-[78%] overflow-hidden rounded-2xl border border-white/15 bg-night shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)] ${
                        slideIndex === index
                          ? "cursor-zoom-in transition-transform duration-300 hover:scale-[1.01]"
                          : ""
                      }`}
                    >
                      <div aria-hidden={slideIndex !== index} className="absolute inset-0">
                        <SlideCanvas>
                          <DeckSlide slide={slide} index={slideIndex} />
                        </SlideCanvas>
                      </div>
                      <button
                        type="button"
                        tabIndex={-1}
                        aria-hidden="true"
                        onClick={() => {
                          if (slideIndex === index) {
                            setOpen(true);
                          } else {
                            setIndex(slideIndex);
                          }
                        }}
                        aria-label={
                          slideIndex === index
                            ? `Abrir apresentação em tela cheia: ${slide.navTitle}`
                            : `Ir para o slide ${slideIndex + 1}: ${slide.navTitle}`
                        }
                        className="absolute inset-0 z-10"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Slide anterior"
              className="absolute left-0 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-night/80 text-fg backdrop-blur-md transition-all hover:border-mint/50 hover:text-mint sm:flex"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <polyline points="15,18 9,12 15,6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próximo slide"
              className="absolute right-0 top-1/2 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-night/80 text-fg backdrop-blur-md transition-all hover:border-mint/50 hover:text-mint sm:flex"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </button>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <p aria-live="polite" className="text-center text-[0.92rem] text-muted">
              <span className="font-semibold text-fg">{deckSlides[index].navTitle}</span>
              <span className="mx-2 text-white/20">·</span>
              {index + 1} de {total}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                aria-label={playing ? "Pausar carrossel" : "Ativar carrossel"}
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-mint"
              >
                {playing ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.29-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
                  </svg>
                )}
              </button>

              <div className="flex items-center gap-1 px-1">
                {deckSlides.map((slide, slideIndex) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setIndex(slideIndex)}
                    aria-label={`Ir para o slide ${slideIndex + 1}: ${slide.navTitle}`}
                    aria-current={slideIndex === index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      slideIndex === index ? "w-6 bg-mint" : "w-1.5 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Abrir apresentação em tela cheia"
                className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/10 hover:text-mint"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polyline points="15,3 21,3 21,9" />
                  <polyline points="9,21 3,21 3,15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </button>

              <a
                href={presentationUrl}
                download="Rhyan-Lemos-Apresentacao.pptx"
                title="Baixar apresentação em PowerPoint"
                className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[0.72rem] font-semibold uppercase tracking-wide text-muted transition-colors hover:bg-white/10 hover:text-mint"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                PPTX
              </a>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Apresentação em tela cheia"
          className="fixed inset-0 z-[1100] flex flex-col bg-ink/95 backdrop-blur-md"
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
            <div className="min-w-0">
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-mint">Apresentação</p>
              <p className="truncate font-display text-[1.05rem] font-semibold text-fg">
                {deckSlides[index].navTitle}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={presentationUrl}
                download="Rhyan-Lemos-Apresentacao.pptx"
                className="hidden items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[0.8rem] font-semibold text-fg transition-colors hover:border-mint/40 hover:text-mint sm:inline-flex"
              >
                Baixar apresentação (.pptx)
              </a>
              <button
                type="button"
                autoFocus
                onClick={() => setOpen(false)}
                aria-label="Fechar apresentação"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-2xl leading-none text-fg transition-colors hover:border-mint/40 hover:text-mint"
              >
                &times;
              </button>
            </div>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Slide anterior"
              className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-night/80 text-fg backdrop-blur-md transition-colors hover:border-mint/50 hover:text-mint sm:left-6"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <polyline points="15,18 9,12 15,6" />
              </svg>
            </button>

            <div className="relative h-full w-full max-w-[1280px] overflow-hidden rounded-xl border border-white/10 bg-night/40 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
              <SlideCanvas>
                <DeckSlide slide={deckSlides[index]} index={index} />
              </SlideCanvas>
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próximo slide"
              className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-night/80 text-fg backdrop-blur-md transition-colors hover:border-mint/50 hover:text-mint sm:right-6"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </button>
          </div>

          <div className="border-t border-white/10 px-5 py-4">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {deckSlides.map((slide, slideIndex) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setIndex(slideIndex)}
                  aria-label={`Ir para o slide ${slideIndex + 1}: ${slide.navTitle}`}
                  aria-current={slideIndex === index}
                  className={`shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                    slideIndex === index
                      ? "border-mint shadow-[0_0_20px_-4px_rgba(46,242,182,0.7)]"
                      : "border-transparent opacity-55 hover:opacity-100"
                  }`}
                >
                  <div className="h-14 w-24" aria-hidden="true">
                    <SlideCanvas>
                      <DeckSlide slide={slide} index={slideIndex} />
                    </SlideCanvas>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
