export function Hero() {
  return (
    <section
      id="home"
      className="relative -mt-[70px] flex min-h-[700px] items-center justify-center bg-[url('/img-home/banner-photo.jpg')] bg-cover bg-center p-5 text-white max-md:mt-0 max-md:min-h-[500px] max-md:px-2.5 max-md:py-10 max-md:pt-[70px]"
    >
      <div className="absolute inset-0 z-0 bg-black/40" />
      <div className="relative z-10 flex w-full max-w-[1000px] flex-wrap items-center justify-center gap-[50px] max-md:flex-col max-md:gap-[30px]">
        <div className="flex max-w-[500px] flex-col gap-5">
          <h1 className="text-[3em] font-bold leading-[1.2] max-md:text-[2.2em]">
            Olá, eu sou <span className="text-mint">Rhyan Lemos</span>
          </h1>
          <p className="text-[1.5em] font-medium">
            Desenvolvedor Full Stack apaixonado por criar soluções inovadoras e experiências digitais excepcionais
          </p>
          <p className="text-[1.2em] leading-relaxed">
            Especializado em desenvolvimento web moderno, gestão de projetos e metodologias ágeis. Busco
            constantemente novos desafios para expandir meus conhecimentos e contribuir para projetos impactantes.
          </p>
          <div className="flex flex-wrap gap-5">
            <a
              href="/img-home/curriculo/Curriculo%20-%20escrito%203.0%202025.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              <img src="/img-home/contact/curriculo.png" alt="Currículo" />
              Ver Currículo
            </a>
            <a
              href="https://www.linkedin.com/in/rhyan-lemos-silveira/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              <img src="/img-home/contact/linkedin.png" alt="LinkedIn" />
              LinkedIn
            </a>
            <a href="#projects" className="btn btn-secondary">
              Ver Projetos
            </a>
          </div>
        </div>

        <div className="relative flex flex-col items-center gap-[15px]">
          <img
            src="/img-home/eu/rhyan.png"
            alt="Rhyan Lemos"
            className="h-[220px] w-[220px] rounded-full border-[5px] border-white object-cover shadow-lg max-md:h-[150px] max-md:w-[150px]"
          />
          <div className="absolute -bottom-2.5 rounded-full bg-brand px-3 py-1.5 text-[0.9rem] font-semibold text-white">
            Full Stack Developer
          </div>
        </div>
      </div>
    </section>
  );
}
