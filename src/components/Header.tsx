import { useEffect, useState } from "react";

const navItems = [
  { href: "#about-me", label: "Sobre" },
  { href: "#trajetoria", label: "Trajetória" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certificações" },
  { href: "#projects", label: "Projetos" },
  { href: "#talks", label: "Palestras" },
  { href: "#apresentacao", label: "Apresentação" },
  { href: "#contact", label: "Contato" },
];

export function Header({ hidden }: { hidden: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (hidden) setMenuOpen(false);
  }, [hidden]);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full border-b border-white/5 bg-night/80 backdrop-blur-xl transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-mint/35 to-transparent"
      />
      <div
        aria-hidden="true"
        className="scroll-progress absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-mint via-violet to-magenta"
      />

      <div className="relative mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-3.5 max-lg:py-3">
        <a
          href="#home"
          className="group flex shrink-0 items-center gap-2 text-[1.45rem] font-bold tracking-tight text-fg"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-mint via-violet to-magenta text-[0.95rem] font-black text-ink shadow-[0_0_24px_-4px_rgba(46,242,182,0.7)] transition-transform duration-300 group-hover:rotate-6">
            R
          </span>
          <span>
            Rhyan<span className="text-mint">.dev</span>
          </span>
        </a>

        <nav
          aria-label="Navegação principal"
          className={`flex items-center max-lg:absolute max-lg:left-0 max-lg:top-full max-lg:w-full max-lg:overflow-hidden max-lg:border-b max-lg:border-white/10 max-lg:bg-night/95 max-lg:backdrop-blur-xl max-lg:transition-all max-lg:duration-500 ${
            menuOpen ? "max-lg:max-h-[500px] max-lg:opacity-100" : "max-lg:max-h-0 max-lg:opacity-0"
          }`}
        >
          <ul className="flex items-center gap-6 max-lg:w-full max-lg:flex-col max-lg:items-stretch max-lg:gap-1 max-lg:px-5 max-lg:py-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="nav-link block max-lg:rounded-lg max-lg:px-3 max-lg:py-2.5 max-lg:text-base"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="max-lg:hidden">
              <a
                href="https://www.linkedin.com/in/rhyan-lemos-silveira/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:border-mint/40 hover:bg-white/10"
              >
                <img src="/img-home/contact/linkedin.png" alt="" className="h-4 w-4 align-middle" />
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          className="hidden cursor-pointer flex-col justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 p-2 max-lg:flex"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`h-[2px] w-[24px] bg-white transition-transform duration-300 ${
              menuOpen ? "translate-y-[8px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-[24px] bg-white transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[2px] w-[24px] bg-white transition-transform duration-300 ${
              menuOpen ? "-translate-y-[8px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>
    </header>
  );
}
