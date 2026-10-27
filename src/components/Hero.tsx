import { lazy, Suspense } from "react";
import { certifications } from "../data/certifications";

const HeroScene = lazy(() => import("./HeroScene"));

const floatingTechs = [
  {
    name: "React",
    icon: "/img-home/icon-skills/framework/React.png",
    className: "-right-4 -top-2 animate-float sm:-right-8",
  },
  {
    name: "TypeScript",
    icon: "/img-home/icon-skills/hard-skills/TypeScript.png",
    className: "-left-4 bottom-16 animate-float-slow sm:-left-10 [animation-delay:1.4s]",
  },
];

const stats = [
  { value: `${certifications.length}+`, label: "Certificações" },
  { value: "20+", label: "Palestras & eventos" },
  { value: "Full Stack", label: "Web & Cloud" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative -mt-[76px] flex min-h-[100svh] items-center overflow-hidden pt-[120px] pb-24 max-md:mt-0 max-md:min-h-0 max-md:pt-[110px] max-md:pb-16"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/img-home/banner-photo.jpg')] bg-cover bg-center opacity-[0.16]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-aurora" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#05080f_88%)]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-16 px-5 lg:grid-cols-[1.15fr_0.85fr] max-md:gap-12 max-md:text-center">
        <div className="flex flex-col items-start gap-6 max-md:items-center">
          <span className="eyebrow">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
            </span>
            Disponível para novos desafios
          </span>

          <h1 className="max-w-[720px] text-[3.4rem] font-bold leading-[1.04] tracking-tight max-md:text-[2.55rem]">
            Olá, eu sou <span className="text-gradient">Rhyan Lemos</span>
          </h1>

          <p className="max-w-[600px] text-[1.35rem] font-medium leading-snug text-fg/90 max-md:text-[1.15rem]">
            Desenvolvedor Full Stack apaixonado por criar soluções inovadoras e experiências digitais
            excepcionais.
          </p>

          <p className="max-w-[560px] text-[1rem] leading-relaxed text-muted">
            Especializado em desenvolvimento web moderno, gestão de projetos e metodologias ágeis. Busco
            constantemente novos desafios para expandir meus conhecimentos e contribuir para projetos impactantes.
          </p>

          <div className="flex flex-wrap gap-3 max-md:justify-center">
            <a
              href="/img-home/curriculo/Curriculo%20-%20escrito%203.0%202025.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              <img src="/img-home/contact/curriculo.png" alt="" />
              Ver Currículo
            </a>
            <a
              href="https://www.linkedin.com/in/rhyan-lemos-silveira/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              <img src="/img-home/contact/linkedin.png" alt="" />
              LinkedIn
            </a>
            <a href="#apresentacao" className="btn btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.29-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
              </svg>
              Ver apresentação
            </a>
          </div>

          <dl className="mt-4 grid w-full max-w-[520px] grid-cols-3 gap-4 border-t border-white/10 pt-6 max-md:max-w-[420px]">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[1.45rem] font-bold text-mint max-md:text-[1.2rem]">
                  {stat.value}
                </dd>
                <dd className="text-[0.78rem] uppercase tracking-wide text-muted max-md:text-[0.68rem]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto flex w-[320px] max-w-full items-center justify-center max-md:w-[290px]">
          <div
            aria-hidden="true"
            className="absolute h-[300px] w-[300px] rounded-full bg-mint/15 blur-3xl animate-pulse-glow"
          />
          <div
            aria-hidden="true"
            className="absolute h-[315px] w-[315px] rounded-full border border-dashed border-mint/25 animate-spin-slow"
          />
          <div
            aria-hidden="true"
            className="absolute h-[355px] w-[355px] rounded-full border border-violet/20 animate-spin-reverse"
          />

          <div className="group relative rounded-full bg-[conic-gradient(from_0deg,#2ef2b6,#9be8ff,#8b5cf6,#ff4d8d,#2ef2b6)] p-[3px] shadow-[0_0_70px_-12px_rgba(46,242,182,0.65)] transition-transform duration-500 hover:[transform:perspective(900px)_rotateY(-8deg)_rotateX(4deg)]">
            <img
              src="/img-home/eu/rhyan.png"
              alt="Rhyan Lemos"
              className="h-[250px] w-[250px] rounded-full border-4 border-ink object-cover max-md:h-[215px] max-md:w-[215px]"
            />
            <div className="absolute inset-x-6 -bottom-4 rounded-full border border-white/15 bg-night/90 px-4 py-2 text-center text-[0.82rem] font-semibold text-mint shadow-lg backdrop-blur-md">
              Full Stack Developer
            </div>
          </div>

          {floatingTechs.map((tech) => (
            <div
              key={tech.name}
              className={`absolute flex items-center gap-2 rounded-full border border-white/15 bg-night/85 px-3 py-2 text-[0.78rem] font-semibold text-fg shadow-xl backdrop-blur-md ${tech.className}`}
            >
              <img src={tech.icon} alt="" className="h-4 w-4 object-contain" />
              {tech.name}
            </div>
          ))}
        </div>
      </div>

      <a
        href="#about-me"
        aria-label="Ir para a seção Sobre"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-mint md:flex"
      >
        <span className="text-[0.68rem] uppercase tracking-[0.22em]">Explore</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-current pt-1.5">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
        </span>
      </a>
    </section>
  );
}
