import { useState } from "react";
import { talks } from "../data/talks";
import { useShowMore } from "../hooks/useShowMore";
import { Lightbox, type LightboxImage } from "./Lightbox";
import { SectionHeader } from "./SectionHeader";
import { ShowMoreButton } from "./ShowMoreButton";

export function Talks() {
  const [preview, setPreview] = useState<LightboxImage | null>(null);

  const highlight = talks.find((talk) => talk.highlight);
  const others = talks.filter((talk) => !talk.highlight);
  const { visible, expanded, hasMore, toggle } = useShowMore(others.length, 6);

  if (!highlight && others.length === 0) return null;

  return (
    <section id="talks" className="bg-surface py-[60px]">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionHeader
          title="Palestras & Eventos"
          subtitle="Participação em palestras, oficinas e eventos de tecnologia e inovação"
        />

        {highlight && (
          <div className="mb-8 overflow-hidden rounded-[16px] bg-gradient-to-br from-navy to-brand text-white shadow-lg md:flex">
            <div className="flex h-[260px] items-center justify-center bg-white/10 p-4 md:h-auto md:w-1/2">
              {highlight.image ? (
                <button
                  type="button"
                  onClick={() => setPreview({ src: highlight.image!, alt: highlight.title })}
                  aria-label={`Ampliar: ${highlight.title}`}
                  className="flex h-full w-full cursor-zoom-in items-center justify-center"
                >
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="max-h-full max-w-full rounded-lg object-contain transition-transform duration-300 hover:scale-[1.02]"
                  />
                </button>
              ) : (
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="text-[2.5rem]">★</span>
                  <span className="text-[1.3rem] font-bold">{highlight.event}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center gap-3 p-8 md:w-1/2">
              <span className="text-[0.8rem] font-semibold uppercase tracking-wide text-mint">Destaque</span>
              <h3 className="text-[1.8rem] font-bold leading-tight">{highlight.title}</h3>
              {highlight.description && <p className="text-white/85">{highlight.description}</p>}
              {highlight.year && <span className="text-white/70">{highlight.year}</span>}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {others.slice(0, visible).map((talk) => (
            <article
              key={talk.title}
              className="group flex flex-col overflow-hidden rounded-[16px] bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {talk.image && (
                <button
                  type="button"
                  onClick={() => setPreview({ src: talk.image!, alt: talk.title })}
                  aria-label={`Ampliar: ${talk.title}`}
                  className="flex h-[170px] cursor-zoom-in items-center justify-center overflow-hidden bg-[#eef1f6] p-3"
                >
                  <img
                    src={talk.image}
                    alt={talk.title}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
              )}
              <div className="flex flex-1 flex-col gap-1 p-5">
                <span className="text-[0.8rem] font-semibold uppercase tracking-wide text-brand">
                  {talk.event}
                </span>
                <h3 className="text-[1rem] font-bold leading-snug">{talk.title}</h3>
                {talk.year && <span className="mt-auto pt-2 text-[0.85rem] text-[#6b7280]">{talk.year}</span>}
              </div>
            </article>
          ))}
        </div>

        {hasMore && <ShowMoreButton expanded={expanded} onToggle={toggle} />}

        <p className="mt-8 text-center text-[0.95rem] text-[#555]">
          E mais de 20 palestras, oficinas e eventos de tecnologia e inovação.
        </p>
      </div>

      <Lightbox image={preview} onClose={() => setPreview(null)} />
    </section>
  );
}
