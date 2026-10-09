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
    <section id="about-me" className="bg-surface py-[60px]">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionHeader title="Sobre Mim" subtitle="Conheça um pouco mais sobre minha jornada e expertise" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[30px]">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex cursor-pointer flex-col items-center rounded-[20px] bg-white px-5 py-[30px] text-center shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img src={card.icon} alt={card.title} className="mb-5 h-20 w-20" />
              <h3 className="mb-3 text-[1.3rem] font-semibold">{card.title}</h3>
              <p className="text-base leading-relaxed text-[#333]">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
