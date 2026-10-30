import { timeline } from "../data/timeline";
import { useLanguage } from "../i18n/LanguageProvider";
import { SectionHeader } from "./SectionHeader";

export function Trajectory() {
  const { lang, t } = useLanguage();
  const entries = timeline[lang];

  return (
    <section id="trajetoria" className="section-shell bg-night">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[420px] w-[420px] rounded-full bg-mint/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-[1200px] px-5">
        <SectionHeader
          eyebrow={t.trajectory.eyebrow}
          title={t.trajectory.title}
          subtitle={t.trajectory.subtitle}
        />

        <div className="relative mx-auto max-w-[980px]">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[15px] top-0 w-px bg-gradient-to-b from-mint via-violet/50 to-transparent lg:left-1/2"
          />

          <div className="flex flex-col gap-6 lg:gap-10">
            {entries.map((entry, index) => {
              const right = index % 2 === 1;

              return (
                <article
                  key={entry.period}
                  data-reveal
                  className={`relative pl-12 lg:w-1/2 lg:pl-0 ${
                    right ? "lg:ml-auto lg:pl-14" : "lg:pr-14"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-8 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full left-[15px] ${
                      right ? "lg:left-0" : "lg:left-full"
                    } ${
                      entry.current
                        ? "bg-mint shadow-[0_0_0_5px_rgba(46,242,182,0.16)]"
                        : entry.future
                          ? "bg-violet"
                          : "border-2 border-mint/70 bg-night"
                    }`}
                  >
                    {entry.current && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-mint/60" />
                    )}
                  </span>

                  <span
                    aria-hidden="true"
                    className={`absolute top-8 hidden h-px w-14 lg:block ${
                      right
                        ? "left-0 bg-gradient-to-r from-mint/40 to-transparent"
                        : "right-0 bg-gradient-to-l from-mint/40 to-transparent"
                    }`}
                  />

                  <div
                    className={`glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-mint/30 hover:shadow-[0_24px_60px_-30px_rgba(46,242,182,0.45)] ${
                      entry.current ? "border-mint/25" : ""
                    } ${entry.future ? "border-dashed" : ""}`}
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`font-display text-[1.5rem] font-bold leading-none ${
                          entry.current ? "text-mint" : "text-fg"
                        }`}
                      >
                        {entry.period}
                      </span>
                      {entry.current && (
                        <span className="rounded-full border border-mint/30 bg-mint/10 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-mint">
                        {t.trajectory.current}
                        </span>
                      )}
                      {entry.future && <span className="chip">{t.trajectory.plan}</span>}
                    </div>

                    <h3 className="text-[1.18rem] font-semibold leading-snug text-fg">{entry.title}</h3>
                    {entry.company && (
                      <p className="mt-1 text-[0.76rem] font-medium uppercase tracking-[0.12em] text-muted">
                        {entry.company}
                      </p>
                    )}

                    <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">{entry.description}</p>

                    <ul className="mt-4 flex flex-col gap-2">
                      {entry.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2 text-[0.84rem] leading-snug text-fg/85"
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.6"
                            className="mt-0.5 shrink-0 text-mint"
                            aria-hidden="true"
                          >
                            <polyline points="20,6 9,17 4,12" />
                          </svg>
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    {entry.tags && entry.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[0.68rem] font-medium text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center" data-reveal>
          <a href="#apresentacao" className="btn btn-secondary">
            {t.trajectory.viewSlides}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12,5 19,12 12,19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
