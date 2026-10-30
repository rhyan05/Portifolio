import { useState } from "react";
import { talks } from "../data/talks";
import { useShowMore } from "../hooks/useShowMore";
import { useLanguage } from "../i18n/LanguageProvider";
import { Lightbox, type LightboxImage } from "./Lightbox";
import { SectionHeader } from "./SectionHeader";
import { ShowMoreButton } from "./ShowMoreButton";

export function Talks() {
  const { lang, t } = useLanguage();
  const [preview, setPreview] = useState<LightboxImage | null>(null);
  const items = talks[lang];

  const highlight = items.find((talk) => talk.highlight);
  const others = items.filter((talk) => !talk.highlight);
  const { visible, expanded, hasMore, toggle } = useShowMore(others.length, 6);

  if (!highlight && others.length === 0) return null;

  return (
    <section id="talks" className="section-shell bg-night">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-magenta/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-[1200px] px-5">
        <SectionHeader
          eyebrow={t.talks.eyebrow}
          title={t.talks.title}
          subtitle={t.talks.subtitle}
        />

        {highlight && (
          <div
            data-reveal
            className="group relative mb-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-panel via-night to-ink shadow-[0_30px_80px_-40px_rgba(139,92,246,0.6)] md:flex md:min-h-[420px]"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint/60 to-transparent" />

            <div className="relative flex h-[260px] items-center justify-center overflow-hidden bg-ink/40 md:h-auto md:w-1/2">
              {highlight.image ? (
                <button
                  type="button"
                  onClick={() => setPreview({ src: highlight.image!, alt: highlight.title })}
                  aria-label={`${t.talks.enlarge} ${highlight.title}`}
                  className="absolute inset-0 cursor-zoom-in"
                >
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent md:bg-gradient-to-r" />
                </button>
              ) : (
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="text-[2.5rem]">★</span>
                  <span className="text-[1.3rem] font-bold">{highlight.event}</span>
                </div>
              )}
            </div>

            <div className="relative flex flex-col justify-center gap-3 p-8 md:w-1/2">
              <span className="eyebrow w-fit">{t.talks.highlight}</span>
              <h3 className="text-[1.8rem] font-bold leading-tight text-fg">{highlight.title}</h3>
              {highlight.description && (
                <p className="text-[0.98rem] leading-relaxed text-muted">{highlight.description}</p>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="chip">{highlight.event}</span>
                {highlight.year && <span className="text-[0.85rem] text-muted">{highlight.year}</span>}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
          {others.slice(0, visible).map((talk) => (
            <article
              key={talk.title}
              className="group glass flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:border-mint/30 hover:shadow-[0_24px_60px_-28px_rgba(46,242,182,0.5)]"
            >
              {talk.image && (
                <button
                  type="button"
                  onClick={() => setPreview({ src: talk.image!, alt: talk.title })}
                  aria-label={`${t.talks.enlarge} ${talk.title}`}
                  className="relative h-[180px] cursor-zoom-in overflow-hidden bg-ink/50"
                >
                  <img
                    src={talk.image}
                    alt={talk.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-night/70 to-transparent" />
                </button>
              )}
              <div className="flex flex-1 flex-col gap-1.5 p-5">
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-mint">
                  {talk.event}
                </span>
                <h3 className="text-[1rem] font-semibold leading-snug text-fg">{talk.title}</h3>
                {talk.year && <span className="mt-auto pt-2 text-[0.8rem] text-muted">{talk.year}</span>}
              </div>
            </article>
          ))}
        </div>

        {hasMore && <ShowMoreButton expanded={expanded} onToggle={toggle} />}

        <p className="mt-8 text-center text-[0.92rem] text-muted">
          {t.talks.more}
        </p>
      </div>

      <Lightbox image={preview} onClose={() => setPreview(null)} />
    </section>
  );
}
