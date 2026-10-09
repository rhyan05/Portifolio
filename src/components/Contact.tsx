import { SectionHeader } from "./SectionHeader";

const socials = [
  { href: "https://github.com/rhyan05", label: "GitHub", icon: "/img-home/contact/github.png" },
  { href: "https://www.linkedin.com/in/rhyan-lemos-silveira/", label: "LinkedIn", icon: "/img-home/contact/linkedin.png" },
  {
    href: "/img-home/curriculo/Curriculo%20-%20escrito%203.0%202025.pdf",
    label: "Currículo",
    icon: "/img-home/contact/curriculo.png",
  },
];

export function Contact() {
  return (
    <section id="contact" className="bg-surface py-[60px]">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionHeader
          title="Vamos Trabalhar Juntos?"
          subtitle="Estou sempre aberto a novas oportunidades e desafios interessantes. Se você tem um projeto em mente ou gostaria de discutir possibilidades de colaboração, não hesite em entrar em contato."
        />

        <div className="flex flex-col items-center gap-[30px] text-center">
          <a
            href="mailto:rhyan05@outlook.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 font-semibold text-navy transition-colors hover:text-brand"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            rhyan05@outlook.com
          </a>

          <div className="flex flex-wrap justify-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-white px-5 py-2.5 font-semibold text-navy shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <img src={social.icon} alt={social.label} className="h-6 w-6" />
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
