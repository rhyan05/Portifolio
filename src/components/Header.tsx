import { useEffect, useState } from "react";

const navItems = [
  { href: "#home", label: "Início" },
  { href: "#about-me", label: "Sobre" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certificações" },
  { href: "#projects", label: "Projetos" },
  { href: "#talks", label: "Palestras" },
  { href: "#contact", label: "Contato" },
];

export function Header({ hidden }: { hidden: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (hidden) setMenuOpen(false);
  }, [hidden]);

  return (
    <header
      className={`fixed left-0 top-0 z-50 flex w-full justify-center bg-[rgba(6,40,70,0.95)] px-10 py-3 shadow-md backdrop-blur-sm transition-transform duration-300 max-md:px-4 max-md:py-2.5 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex w-full max-w-[1200px] items-center justify-between">
        <div className="shrink-0">
          <a href="#home" className="text-[1.6rem] font-bold text-mint transition-colors hover:text-wheat">
            Rhyan.dev
          </a>
        </div>

        <nav
          className={`flex items-center max-md:absolute max-md:left-0 max-md:top-full max-md:w-full max-md:overflow-hidden max-md:bg-navy max-md:transition-all max-md:duration-500 ${
            menuOpen ? "max-md:max-h-[400px] max-md:opacity-100" : "max-md:max-h-0 max-md:opacity-0"
          }`}
        >
          <ul className="flex gap-10 max-md:flex-col max-md:items-center max-md:gap-3 max-md:py-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="nav-link" onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="https://www.linkedin.com/in/rhyan-lemos-silveira/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <img src="/img-home/contact/linkedin.png" alt="LinkedIn" className="h-5 w-5 align-middle" />
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          aria-label="Abrir menu"
          className="hidden cursor-pointer flex-col justify-center gap-1 max-md:flex"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`h-[3px] w-[26px] bg-white transition-transform duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-[3px] w-[26px] bg-white transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`h-[3px] w-[26px] bg-white transition-transform duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>
    </header>
  );
}
