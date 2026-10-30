import { useMemo, useState } from "react";
import { certifications, certificationTotal } from "../data/certifications";
import { useShowMore } from "../hooks/useShowMore";
import { useLanguage } from "../i18n/LanguageProvider";
import type { Certification, CertificationCategory } from "../types";
import { Lightbox } from "./Lightbox";
import { SectionHeader } from "./SectionHeader";
import { ShowMoreButton } from "./ShowMoreButton";

type Filter = "all" | CertificationCategory;

export function Certifications() {
  const { lang, t } = useLanguage();
  const linkedinUrl =
    lang === "en"
      ? "https://www.linkedin.com/in/rhyan-lemos-silveira/details/certifications/?locale=en-US"
      : "https://www.linkedin.com/in/rhyan-lemos-silveira/details/certifications/";
  const [preview, setPreview] = useState<Certification | null>(null);
  const [category, setCategory] = useState<Filter>("all");
  const items = certifications[lang];

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: t.certifications.filters.all },
    { value: "cloud", label: t.certifications.filters.cloud },
    { value: "security", label: t.certifications.filters.security },
    { value: "development", label: t.certifications.filters.development },
    { value: "ai", label: t.certifications.filters.ai },
    { value: "management", label: t.certifications.filters.management },
    { value: "language", label: t.certifications.filters.language },
  ];

  const filtered = useMemo(
    () => items.filter((cert) => category === "all" || cert.category === category),
    [category, items],
  );

  const { visible, expanded, hasMore, toggle, reset } = useShowMore(filtered.length, 8);

  if (items.length === 0) return null;

  return (
    <section id="certifications" className="section-shell bg-night">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-24 h-[420px] w-[420px] rounded-full bg-magenta/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-[1200px] px-5">
        <SectionHeader
          eyebrow={t.certifications.eyebrow}
          title={t.certifications.title}
          subtitle={
            <>
              {t.certifications.selection} {certificationTotal}+ {t.certifications.countLabel}{" "}
              {t.certifications.on}{" "}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-mint underline-offset-4 hover:underline"
              >
                {t.certifications.linkedin}
              </a>
              .
            </>
          }
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2" data-reveal>
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => {
                setCategory(filter.value);
                reset();
              }}
              className={`filter-pill ${category === filter.value ? "filter-pill-active" : ""}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6" data-reveal>
          {filtered.slice(0, visible).map((cert) => (
            <article
              key={cert.title}
              className="group glass flex flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:border-mint/30 hover:shadow-[0_24px_60px_-28px_rgba(46,242,182,0.5)]"
            >
              <button
                type="button"
                onClick={() => setPreview(cert)}
                aria-label={`${t.certifications.enlarge} ${cert.title}`}
                className="relative flex h-[190px] cursor-zoom-in items-center justify-center overflow-hidden bg-gradient-to-br from-[#eef2f8] to-[#d9e3f0] p-4"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  className="max-h-full max-w-full rounded-lg object-contain shadow-sm transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-night/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
              <div className="flex flex-1 flex-col gap-1.5 p-5">
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-mint">
                  {cert.issuer}
                </span>
                <h3 className="text-[1.02rem] font-semibold leading-snug text-fg">{cert.title}</h3>
                {cert.year && <span className="mt-auto pt-2 text-[0.8rem] text-muted">{cert.year}</span>}
              </div>
            </article>
          ))}
        </div>

        {hasMore && <ShowMoreButton expanded={expanded} onToggle={toggle} />}

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary bg-gradient-to-r from-mint via-mint-strong to-mint text-[1.05rem] font-bold shadow-[0_0_36px_-6px_rgba(46,242,182,0.95)] ring-2 ring-mint-strong/60 hover:scale-[1.03]"
          >
            {t.certifications.viewAllPrefix} {certificationTotal}+ {t.certifications.viewAllSuffix}
          </a>
        </div>
      </div>

      <Lightbox
        image={preview ? { src: preview.image, alt: preview.title } : null}
        onClose={() => setPreview(null)}
      />
    </section>
  );
}
