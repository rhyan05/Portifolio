import { SectionHeader } from "./SectionHeader";

const cards = [
  {
    icon: "/img-home/icons/programmer-icon.png",
    title: "Desenvolvimento Full Stack",
    description:
      "Sou um desenvolvedor apaixonado por tecnologia, com experiência sólida em desenvolvimento web completo. Trabalho com as mais modernas tecnologias para criar aplicações robustas, escaláveis e com excelente experiência do usuário.",
  },
  {
    icon: "/img-home/icons/design-icon.png",
    title: "Design & UX/UI",
    description:
      "Possuo expertise em design de interfaces e experiência do usuário, criando layouts intuitivos e visualmente atrativos. Desenvolvo posts profissionais e apresentações animadas que comunicam efetivamente a mensagem desejada.",
  },
  {
    icon: "/img-home/icons/methodology-icon.png",
    title: "Gestão & Metodologias Ágeis",
    description:
      "Experiência prática em gestão de pessoas e projetos, aplicando metodologias ágeis no dia a dia. Busco constantemente novos conhecimentos e conexões para evoluir profissionalmente e contribuir para o sucesso das equipes.",
  },
];

export function About() {
  return (
    <section id="about-me" className="section-shell bg-night">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[420px] rounded-full bg-violet/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1200px] px-5">
        <SectionHeader
          eyebrow="Sobre mim"
          title="Como eu trabalho"
          subtitle="Conheça um pouco mais sobre minha jornada e expertise"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => (
            <article
              key={card.title}
              data-reveal
              className="group glass glass-hover relative overflow-hidden rounded-[var(--radius-card)] p-7"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-mint/10 blur-2xl transition-colors duration-500 group-hover:bg-mint/20"
              />

              <div className="relative mb-6 flex items-start justify-between">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent shadow-inner">
                  <img
                    src={card.icon}
                    alt=""
                    className="h-10 w-10 object-contain brightness-0 invert opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </span>
                <span className="font-display text-[3.4rem] font-bold leading-none text-white/[0.06] transition-colors duration-500 group-hover:text-mint/20">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mb-3 text-[1.35rem] font-semibold text-fg">{card.title}</h3>
              <p className="text-[0.98rem] leading-relaxed text-muted">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
