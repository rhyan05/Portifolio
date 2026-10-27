import { SectionHeader } from "./SectionHeader";

const socials: { href: string; label: string; icon: string; iconClass?: string }[] = [
  {
    href: "https://github.com/rhyan05",
    label: "GitHub",
    icon: "/img-home/contact/github.png",
    iconClass: "brightness-0 invert",
  },
  {
    href: "https://www.linkedin.com/in/rhyan-lemos-silveira/",
    label: "LinkedIn",
    icon: "/img-home/contact/linkedin.png",
  },
  {
    href: "/img-home/curriculo/Curriculo%20-%20escrito%203.0%202025.pdf",
    label: "Currículo",
    icon: "/img-home/contact/curriculo.png",
    iconClass: "brightness-0 invert",
  },
];

export function Contact() {
  return (
    <section id="contact" className="section-shell bg-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-mint/10 blur-[140px]"
      />

      <div className="relative mx-auto max-w-[1000px] px-5">
        <div
          data-reveal
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-panel via-night to-ink px-6 py-12 text-center shadow-[0_40px_100px_-50px_rgba(46,242,182,0.5)] md:px-14 md:py-16"
        >
          <div aria-hidden="true" className="absolute inset-0 bg-aurora opacity-50" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-mint/70 to-transparent"
          />

          <div className="relative">
            <SectionHeader
              eyebrow="Contato"
              title="Vamos Trabalhar Juntos?"
              subtitle="Estou sempre aberto a novas oportunidades e desafios interessantes. Se você tem um projeto em mente ou gostaria de discutir possibilidades de colaboração, não hesite em entrar em contato."
            />

            <div className="flex flex-col items-center gap-6">
              <a
                href="mailto:rhyan05@outlook.com"
                className="btn btn-primary text-[1.02rem]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                rhyan05@outlook.com
              </a>

              <div className="flex flex-wrap justify-center gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-[0.9rem] font-semibold text-fg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-mint/40 hover:bg-white/10"
                  >
                    <img
                      src={social.icon}
                      alt=""
                      className={`h-5 w-5 object-contain ${social.iconClass ?? ""}`}
                    />
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>

              <p className="text-[0.82rem] uppercase tracking-[0.18em] text-muted">
                Guarulhos · SP · Brasil
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
