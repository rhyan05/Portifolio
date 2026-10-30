import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { certificationTotal } from "../data/certifications";
import { timeline } from "../data/timeline";
import { email, portfolioUrl, presentation } from "../data/presentation";
import type { Accent, DeckSlide as DeckSlideData } from "../data/presentation";
import { deckText } from "../i18n/deck";
import { useLanguage } from "../i18n/LanguageProvider";

const accentText: Record<Accent, string> = {
  mint: "text-mint",
  violet: "text-violet",
  magenta: "text-magenta",
};

const accentBorder: Record<Accent, string> = {
  mint: "border-mint/30",
  violet: "border-violet/30",
  magenta: "border-magenta/30",
};

const accentBg: Record<Accent, string> = {
  mint: "bg-mint/[0.06]",
  violet: "bg-violet/[0.06]",
  magenta: "bg-magenta/[0.06]",
};

const accentDot: Record<Accent, string> = {
  mint: "bg-mint",
  violet: "bg-violet",
  magenta: "bg-magenta",
};

export function SlideCanvas({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const update = () => {
      const width = element.clientWidth;
      const height = element.clientHeight;
      if (!width || !height) return;
      setScale(Math.min(width / 1280, height / 720));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
    >
      <div className="shrink-0" style={{ width: 1280, height: 720, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

function SlideBackdrop() {
  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 bg-aurora" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_80%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#05080f_92%)]"
      />
    </>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-mint via-violet to-magenta text-[12px] font-black text-ink shadow-[0_0_20px_-4px_rgba(46,242,182,0.7)]">
        R
      </span>
      <span className="text-[15px] font-bold tracking-tight text-fg">
        Rhyan<span className="text-mint">.dev</span>
      </span>
    </div>
  );
}

function SlideTopBar({ number }: { number: number }) {
  const { lang } = useLanguage();
  const { deckSlides } = presentation[lang];

  return (
    <header className="relative flex items-center justify-between px-12 pt-8">
      <Brand />
      <span className="text-[9px] uppercase tracking-[0.22em] text-muted">
        Rhyan Lemos Â· {String(number).padStart(2, "0")} / {deckSlides.length}
      </span>
    </header>
  );
}

function SlideFrame({
  number,
  title,
  subtitle,
  children,
}: {
  number: number;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-ink text-fg">
      <SlideBackdrop />
      <SlideTopBar number={number} />
      <main className="relative flex flex-1 flex-col px-12 pb-10 pt-7">
        <div className="mb-5">
          <h2 className="font-display text-[34px] font-bold leading-tight text-fg">{title}</h2>
          {subtitle && <p className="mt-1 text-[13px] text-muted">{subtitle}</p>}
        </div>
        <div className="flex flex-1 flex-col">{children}</div>
      </main>
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.04] p-4 ${className}`}>
      {children}
    </div>
  );
}

function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium text-muted ${className}`}
    >
      {children}
    </span>
  );
}

function CoverSlide() {
  const { lang } = useLanguage();
  const deck = deckText[lang];
  const { deckSlides, profile } = presentation[lang];

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink text-fg">
      <SlideBackdrop />
      <div className="relative flex h-full items-center justify-between gap-4 px-14">
        <div className="max-w-[600px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-mint">
            {deck.cover.eyebrow}
          </span>
          <h1 className="mt-6 font-display text-[88px] font-bold leading-[0.92] tracking-tight text-fg">
            {deck.cover.title1}
            <br />
            <span className="text-gradient">{deck.cover.title2}</span>
          </h1>
          <p className="mt-4 text-[28px] font-medium text-fg/80">{deck.cover.subtitle}</p>
          <div className="mt-6 h-px w-40 bg-gradient-to-r from-mint to-transparent" />
          <p className="mt-5 text-[16px] leading-relaxed text-muted">
            {profile.name}
            <br />
            <span className="text-fg/80">{deck.cover.role}</span>
          </p>
        </div>

        <div className="relative flex h-[400px] w-[400px] shrink-0 items-center justify-center">
          <div className="absolute h-[340px] w-[340px] rounded-full bg-mint/10 blur-3xl" />
          <div className="absolute h-[345px] w-[345px] animate-spin-slow rounded-full border border-dashed border-mint/25" />
          <div className="absolute h-[385px] w-[385px] animate-spin-reverse rounded-full border border-violet/20" />

          <div className="relative rounded-full bg-[conic-gradient(from_0deg,#2ef2b6,#9be8ff,#8b5cf6,#ff4d8d,#2ef2b6)] p-[3px] shadow-[0_0_60px_-12px_rgba(46,242,182,0.6)]">
            <img
              src="/img-home/eu/rhyan.png"
              alt="Rhyan Lemos"
              className="h-[300px] w-[300px] rounded-full border-4 border-ink object-cover"
            />
            <span className="absolute inset-x-8 -bottom-4 rounded-full border border-white/15 bg-night/90 px-4 py-2 text-center text-[10px] font-semibold text-mint backdrop-blur-md">
              Full Stack Developer
            </span>
          </div>

          <div className="absolute -right-2 top-6 flex items-center gap-1.5 rounded-full border border-white/15 bg-night/85 px-3 py-1.5 text-[10px] font-semibold shadow-xl backdrop-blur-md">
            <img src="/img-home/icon-skills/framework/React.png" alt="" className="h-3.5 w-3.5" />
            React
          </div>
          <div className="absolute -left-6 bottom-16 flex items-center gap-1.5 rounded-full border border-white/15 bg-night/85 px-3 py-1.5 text-[10px] font-semibold shadow-xl backdrop-blur-md">
            <img
              src="/img-home/icon-skills/hard-skills/typescript.svg"
              alt=""
              className="h-3.5 w-3.5"
            />
            TypeScript
          </div>
        </div>
      </div>

      <div className="absolute inset-x-12 bottom-7 flex items-center justify-between">
        <Brand />
        <span className="text-[9px] uppercase tracking-[0.22em] text-muted">
          01 / {deckSlides.length}
        </span>
      </div>
    </div>
  );
}

function ProfileSlide() {
  const { lang } = useLanguage();
  const deck = deckText[lang];
  const { profile } = presentation[lang];

  return (
    <SlideFrame
      number={2}
      title={deck.profile.title}
      subtitle={`${profile.name} Â· ${profile.role}`}
    >
      <div className="grid flex-1 grid-cols-[0.72fr_1.28fr] gap-5">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-[14px] leading-relaxed text-muted">{profile.summary}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {profile.stack.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </div>

          <div className="mt-auto rounded-2xl border border-mint/20 bg-mint/[0.06] p-3.5">
            <p className="text-[9px] uppercase tracking-[0.18em] text-mint">{deck.profile.base}</p>
            <p className="mt-1 text-[18px] font-semibold text-fg">{profile.location}</p>
            <p className="mt-1 text-[10.5px] text-muted">
              {profile.graduation.course} Â· {profile.graduation.school}
            </p>
          </div>
        </div>

        <div className="flex min-h-0 flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-mint/20 bg-mint/[0.05]">
              <p className="text-[9px] uppercase tracking-[0.18em] text-mint">{deck.profile.current}</p>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <p className="text-[17px] font-bold leading-tight text-fg">
                  {profile.current.company}
                </p>
                <p className="shrink-0 text-[8px] text-muted">{profile.current.period}</p>
              </div>
              <p className="mt-0.5 text-[10.5px] text-fg/80">{profile.current.role}</p>
              <p className="mt-1.5 text-[9.5px] leading-snug text-muted">
                {profile.current.description}
              </p>
              <ul className="mt-2 flex flex-col gap-1">
                {profile.current.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-1.5 text-[9px] leading-snug text-fg/80"
                  >
                    <span className="mt-[3px] h-1 w-1 shrink-0 rounded-full bg-mint" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="border-violet/20 bg-violet/[0.05]">
              <p className="text-[9px] uppercase tracking-[0.18em] text-violet">{deck.profile.education}</p>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <p className="text-[17px] font-bold leading-tight text-fg">
                  {profile.graduation.course}
                </p>
                <p className="shrink-0 text-[8px] text-muted">{profile.graduation.period}</p>
              </div>
              <p className="mt-0.5 text-[10.5px] text-fg/80">{profile.graduation.school}</p>
              <p className="mt-1.5 text-[9.5px] leading-snug text-muted">
                {profile.graduation.description}
              </p>
              <ul className="mt-2 flex flex-col gap-1">
                {profile.graduation.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-1.5 text-[9px] leading-snug text-fg/80"
                  >
                    <span className="mt-[3px] h-1 w-1 shrink-0 rounded-full bg-violet" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="flex flex-1 flex-col">
            <p className="text-[9px] uppercase tracking-[0.18em] text-muted">{deck.profile.work}</p>
            <div className="mt-3 grid grid-cols-3 gap-x-4 gap-y-3">
              {profile.workStyle.map((item, index) => (
                <div key={item.title} className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9.5px] font-bold text-mint">0{index + 1}</span>
                    <p className="text-[11px] font-semibold text-fg">{item.title}</p>
                  </div>
                  <p className="mt-0.5 text-[9.5px] leading-snug text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </SlideFrame>
  );
}

function EvolutionSlide() {
  const { lang } = useLanguage();
  const deck = deckText[lang];

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-ink text-fg">
      <SlideBackdrop />
      <SlideTopBar number={3} />

      <div className="relative flex flex-1 flex-col items-center justify-center px-20 text-center">
        <span className="inline-flex items-center rounded-full border border-mint/25 bg-mint/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-mint">
          {deck.evolution.eyebrow}
        </span>
        <h2 className="mt-5 font-display text-[58px] font-bold leading-[1.04] text-fg">
          {deck.evolution.title1}
          <br />
          <span className="text-gradient">{deck.evolution.title2}</span>
        </h2>
        <p className="mt-4 max-w-[660px] text-[14px] leading-relaxed text-muted">
          {deck.evolution.subtitle}
        </p>

        <div className="mt-10 w-full max-w-[900px]">
          <div className="relative">
            <div className="absolute inset-x-0 top-[5px] h-px bg-gradient-to-r from-mint via-violet to-magenta/30" />
            <div className="grid grid-cols-5 gap-3">
              {timeline[lang].map((entry) => (
                <div key={entry.period} className="flex flex-col items-center">
                  <span
                    className={`relative z-10 h-2.5 w-2.5 rounded-full ${
                      entry.current
                        ? "bg-mint shadow-[0_0_0_4px_rgba(46,242,182,0.16)]"
                        : entry.future
                          ? "bg-violet"
                          : "border-2 border-mint/60 bg-ink"
                    }`}
                  />
                  <span className="mt-3 font-display text-[22px] font-bold text-fg">{entry.period}</span>
                  <span className="mt-1 text-[8px] uppercase tracking-[0.12em] text-muted">
                    {deck.evolution.labels[entry.period as keyof typeof deck.evolution.labels]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrajectorySlide() {
  const { lang } = useLanguage();
  const deck = deckText[lang];

  return (
    <SlideFrame
      number={4}
      title={deck.trajectory.title}
      subtitle={deck.trajectory.subtitle}
    >
      <div className="flex flex-1 flex-col justify-center">
        <div className="relative">
          <div className="absolute inset-x-0 top-[5px] h-px bg-gradient-to-r from-mint via-violet to-magenta/30" />
          <div className="grid grid-cols-5 gap-3">
            {timeline[lang].map((entry) => (
              <div key={entry.period} className="min-w-0">
                <span
                  className={`relative z-10 block h-2.5 w-2.5 rounded-full ${
                    entry.current
                      ? "bg-mint shadow-[0_0_0_4px_rgba(46,242,182,0.16)]"
                      : entry.future
                        ? "bg-violet"
                        : "border-2 border-mint/60 bg-ink"
                  }`}
                />
                <div
                  className={`mt-3 flex h-[270px] flex-col rounded-2xl border p-3 ${
                    entry.current
                      ? "border-mint/30 bg-mint/[0.05]"
                      : entry.future
                        ? "border-dashed border-white/15 bg-white/[0.03]"
                        : "border-white/10 bg-white/[0.04]"
                  }`}
                >
                  <p
                    className={`font-display text-[25px] font-bold leading-none ${
                      entry.current ? "text-mint" : "text-fg"
                    }`}
                  >
                    {entry.period}
                  </p>
                  {entry.current && (
                    <span className="mt-1 w-fit rounded-full border border-mint/30 bg-mint/10 px-1.5 py-0.5 text-[6.5px] font-semibold uppercase tracking-[0.1em] text-mint">
                      {deck.trajectory.current}
                    </span>
                  )}
                  {entry.future && (
                    <span className="mt-1 w-fit rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[6.5px] font-semibold uppercase tracking-[0.1em] text-muted">
                      {deck.trajectory.plan}
                    </span>
                  )}
                  <p className="mt-2 text-[10px] font-semibold leading-tight text-fg">{entry.title}</p>
                  {entry.company && (
                    <p className="mt-1 text-[7px] uppercase leading-snug tracking-[0.08em] text-muted">
                      {entry.company}
                    </p>
                  )}
                  <ul className="mt-2 flex flex-col gap-1">
                    {entry.highlights.slice(0, 3).map((highlight) => (
                      <li key={highlight} className="flex gap-1 text-[8px] leading-[1.35] text-muted">
                        <span className="text-mint">â–¸</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-1 pt-2">
                    {entry.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[6px] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function CertificatesSlide() {
  const { lang } = useLanguage();
  const deck = deckText[lang];
  const { certificateGroups, certificateHighlightCount, skillGroups } = presentation[lang];

  return (
    <SlideFrame
      number={5}
      title={deck.certificates.title}
      subtitle={`${certificateHighlightCount} ${deck.certificates.highlighted} Â· ${certificationTotal}+ ${deck.certificates.total}.`}
    >
      <div className="grid flex-1 grid-cols-[0.62fr_1.38fr] gap-5">
        <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div>
            <p className="font-display text-[62px] font-bold leading-none text-gradient">
              {certificationTotal}+
            </p>
            <p className="mt-1 text-[15px] font-semibold text-fg">{deck.certificates.countLabel}</p>
            <p className="mt-2 text-[11.5px] leading-relaxed text-muted">
              {deck.certificates.description}
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p className="text-[8.5px] uppercase tracking-[0.16em] text-muted">{group.label}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9.5px] text-fg/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {certificateGroups.map((group) => (
            <div
              key={group.label}
              className={`flex flex-col rounded-2xl border p-3 ${accentBorder[group.accent]} ${accentBg[group.accent]}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-[8.5px] uppercase tracking-[0.14em] ${accentText[group.accent]}`}
                >
                  {group.label}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[8.5px] text-muted">
                  {group.items.length}
                </span>
              </div>

              <div className="mt-2.5 flex flex-1 flex-col justify-between gap-2.5">
                {group.items.map((item) => (
                  <div
                    key={item.title}
                    className="border-t border-white/5 pt-2 first:border-0 first:pt-0"
                  >
                    <p className="text-[8px] uppercase tracking-[0.1em] text-muted">
                      {item.issuer}
                    </p>
                    <p className="text-[10.5px] font-semibold leading-snug text-fg">{item.title}</p>
                    <p className="mt-0.5 text-[9.5px] leading-snug text-muted">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

function TalksSlide() {
  const { lang } = useLanguage();
  const deck = deckText[lang];
  const { talkHighlights } = presentation[lang];
  const highlight = talkHighlights.find((talk) => talk.highlight) ?? talkHighlights[0];
  const others = talkHighlights.filter((talk) => talk !== highlight);
  const years = [...new Set(talkHighlights.map((talk) => talk.year).filter(Boolean))].join(" Â· ");

  return (
    <SlideFrame
      number={6}
      title={deck.talks.title}
      subtitle={`${talkHighlights.length} ${deck.talks.events}${years ? ` Â· ${years}` : ""}.`}
    >
      <div className="flex flex-1 flex-col gap-3">
        <div className="rounded-2xl border border-magenta/30 bg-magenta/[0.06] p-4">
          <p className="text-[8.5px] uppercase tracking-[0.16em] text-magenta">{highlight.event}</p>
          <h3 className="mt-1 text-[20px] font-semibold text-fg">{highlight.title}</h3>
          {highlight.description && (
            <p className="mt-1 max-w-[1020px] text-[10.5px] leading-snug text-muted">
              {highlight.description}
            </p>
          )}
        </div>

        <div className="grid flex-1 grid-cols-2 gap-3">
          {others.map((talk) => (
            <div
              key={talk.title}
              className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.04] p-3"
            >
              <p className="text-[8.5px] uppercase tracking-[0.14em] text-muted">{talk.event}</p>
              <h3 className="mt-1 line-clamp-2 text-[11px] font-semibold leading-snug text-fg">
                {talk.title}
              </h3>
              {talk.description && (
                <p className="mt-1 line-clamp-2 text-[9.5px] leading-snug text-muted">
                  {talk.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

function ProjectsSlide() {
  const { lang } = useLanguage();
  const deck = deckText[lang];
  const { projectCount, projectGroups } = presentation[lang];

  return (
    <SlideFrame
      number={7}
      title={deck.projects.title}
      subtitle={`${projectCount} ${deck.projects.subtitle}`}
    >
      <div className="grid flex-1 grid-cols-3 gap-3">
        {projectGroups.map((group) => (
          <div
            key={group.category}
            className={`flex flex-col rounded-2xl border p-4 ${accentBorder[group.accent]} ${accentBg[group.accent]}`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className={`text-[8.5px] uppercase tracking-[0.16em] ${accentText[group.accent]}`}>
                {group.label}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[8.5px] text-muted">
                {group.projects.length}
              </span>
            </div>

            <div className="mt-3 flex flex-1 flex-col gap-3">
              {group.projects.map((project) => (
                <div
                  key={project.title}
                  className="border-t border-white/5 pt-2.5 first:border-0 first:pt-0"
                >
                  <h3 className="text-[11.5px] font-semibold leading-snug text-fg">{project.title}</h3>
                  <p className="mt-0.5 text-[9.5px] leading-snug text-muted">{project.summary}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[8.5px] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-2 text-center text-[8.5px] uppercase tracking-[0.14em] text-muted">
        {projectCount} {deck.projects.footer}
      </p>
    </SlideFrame>
  );
}

function MetricsSlide() {
  const { lang } = useLanguage();
  const deck = deckText[lang];
  const { metrics } = presentation[lang];

  return (
    <SlideFrame
      number={8}
      title={deck.metrics.title}
      subtitle={deck.metrics.subtitle}
    >
      <div className="flex flex-1 flex-col justify-center gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-[12px] leading-relaxed text-fg/85">{deck.metrics.quote}</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={metric.title}
              className={`flex flex-col rounded-3xl border p-5 ${accentBorder[metric.accent]} ${accentBg[metric.accent]}`}
            >
              <span className={`font-display text-[36px] font-bold leading-none ${accentText[metric.accent]}`}>
                0{index + 1}
              </span>
              <h3 className="mt-2 text-[17px] font-semibold text-fg">{metric.title}</h3>
              <p className="mt-2 text-[10px] leading-relaxed text-muted">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

function MatrixSlide() {
  const { lang } = useLanguage();
  const deck = deckText[lang];
  const { competencyMatrix } = presentation[lang];

  return (
    <SlideFrame
      number={9}
      title={deck.matrix.title}
      subtitle={deck.matrix.subtitle}
    >
      <div className="flex flex-1 flex-col gap-4">
        <div className="grid flex-1 grid-cols-3 gap-4">
          {competencyMatrix.map((column) => (
          <div
            key={column.title}
            className={`flex flex-col rounded-3xl border p-5 ${accentBorder[column.accent]} ${accentBg[column.accent]}`}
          >
            <span className={`text-[7px] uppercase tracking-[0.16em] ${accentText[column.accent]}`}>
              {column.subtitle}
            </span>
            <h3 className="mt-1 text-[20px] font-bold text-fg">{column.title}</h3>
            <div className="mt-4 flex flex-col gap-1.5">
              {column.items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1.5 text-[9px] text-fg/85"
                >
                  <span className={`h-1 w-1 shrink-0 rounded-full ${accentDot[column.accent]}`} />
                  {item}
                </div>
              ))}
            </div>
          </div>
          ))}
        </div>
        <p className="text-center text-[8px] uppercase tracking-[0.18em] text-muted">
          {deck.matrix.footer}
        </p>
      </div>
    </SlideFrame>
  );
}

function RoadmapSlide() {
  const { lang } = useLanguage();
  const deck = deckText[lang];
  const { roadmap } = presentation[lang];

  return (
    <SlideFrame
      number={10}
      title={deck.roadmap.title}
      subtitle={deck.roadmap.subtitle}
    >
      <div className="relative flex flex-1 flex-col justify-center">
        <div className="absolute inset-x-0 top-[18px] h-px bg-gradient-to-r from-mint via-violet to-magenta/40" />
        <div className="grid grid-cols-3 gap-5">
          {roadmap.map((phase, index) => (
            <div key={phase.title} className="flex flex-col">
              <div className="flex items-center gap-3">
                <span
                  className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink text-[11px] font-bold ${accentBg[phase.accent]} ${accentText[phase.accent]}`}
                >
                  {index + 1}
                </span>
                <span className="text-[9px] uppercase tracking-[0.14em] text-muted">{phase.period}</span>
              </div>
              <div
                className={`mt-4 flex min-h-[240px] flex-1 flex-col rounded-2xl border p-4 ${accentBorder[phase.accent]} ${accentBg[phase.accent]}`}
              >
                <p className="text-[7px] uppercase tracking-[0.16em] text-muted">{phase.phase}</p>
                <h3 className="mt-1 text-[16px] font-semibold text-fg">{phase.title}</h3>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {phase.items.map((item) => (
                    <li key={item} className="flex gap-1.5 text-[9px] leading-snug text-muted">
                      <span className={accentText[phase.accent]}>â–¸</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto border-t border-white/5 pt-3 text-[8px] leading-snug text-fg/75">
                  {phase.outcome}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

function LinkIcon({ link }: { link: { icon: string; invert?: boolean } }) {
  if (link.icon === "blog") {
    return (
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-mint">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      </span>
    );
  }

  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
      <img
        src={link.icon}
        alt=""
        className={`h-6 w-6 object-contain ${link.invert ? "brightness-0 invert" : ""}`}
      />
    </span>
  );
}

function LinksSlide() {
  const { lang } = useLanguage();
  const deck = deckText[lang];
  const { links } = presentation[lang];

  return (
    <SlideFrame
      number={11}
      title={deck.links.title}
      subtitle={deck.links.subtitle}
    >
      <div className="flex flex-1 flex-col justify-center gap-5">
        <div className="grid grid-cols-2 gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-mint/30 hover:bg-white/[0.07]"
            >
              <LinkIcon link={link} />
              <div className="min-w-0">
                <p className="text-[16px] font-semibold text-fg">{link.label}</p>
                <p className="truncate text-[10px] text-muted">{link.handle}</p>
              </div>
            </a>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2">
          <Chip className="border-mint/20 bg-mint/[0.06] text-mint">{email}</Chip>
          <Chip>{deck.links.available}</Chip>
        </div>
      </div>
    </SlideFrame>
  );
}

function ClosingSlide() {
  const { lang } = useLanguage();
  const deck = deckText[lang];

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-ink text-fg">
      <SlideBackdrop />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-28 font-display text-[380px] font-black leading-none text-white/[0.03]"
      >
        R
      </span>

      <SlideTopBar number={12} />

      <div className="relative flex flex-1 flex-col items-center justify-center px-16 text-center">
        <span className="inline-flex items-center rounded-full border border-mint/25 bg-mint/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-mint">
          {deck.closing.eyebrow}
        </span>
        <h2 className="mt-5 font-display text-[66px] font-bold leading-none text-fg">
          {deck.closing.title1} <span className="text-gradient">{deck.closing.title2}</span>
        </h2>
        <p className="mt-4 max-w-[600px] text-[14px] leading-relaxed text-muted">
          {deck.closing.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Chip className="border-mint/20 bg-mint/[0.06] text-mint">{email}</Chip>
          <Chip>linkedin.com/in/rhyan-lemos-silveira</Chip>
          <Chip>github.com/rhyan05</Chip>
        </div>

        <p className="mt-5 max-w-[700px] break-all text-[8px] text-muted/70">{portfolioUrl}</p>
      </div>
    </div>
  );
}

export function DeckSlide({ slide, index }: { slide: DeckSlideData; index: number }) {
  const { lang } = useLanguage();
  const deck = deckText[lang];

  switch (slide.variant) {
    case "cover":
      return <CoverSlide />;
    case "profile":
      return <ProfileSlide />;
    case "evolution":
      return <EvolutionSlide />;
    case "trajectory":
      return <TrajectorySlide />;
    case "certificates":
      return <CertificatesSlide />;
    case "talks":
      return <TalksSlide />;
    case "projects":
      return <ProjectsSlide />;
    case "metrics":
      return <MetricsSlide />;
    case "matrix":
      return <MatrixSlide />;
    case "roadmap":
      return <RoadmapSlide />;
    case "links":
      return <LinksSlide />;
    case "closing":
      return <ClosingSlide />;
    default:
      return (
        <SlideFrame number={index + 1} title={slide.navTitle}>
          <div className="flex flex-1 items-center justify-center text-muted">{deck.underConstruction}</div>
        </SlideFrame>
      );
  }
}

