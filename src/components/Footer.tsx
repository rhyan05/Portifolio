export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink py-8">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-5 text-center sm:flex-row sm:text-left">
        <a href="#home" className="text-[1.1rem] font-bold tracking-tight text-fg">
          Rhyan<span className="text-mint">.dev</span>
        </a>
        <p className="text-[0.88rem] text-muted">
          &copy; {new Date().getFullYear()}{" "}
          <strong className="font-semibold text-fg">Rhyan Lemos Silveira</strong>. Todos os direitos
          reservados.
        </p>
        <a
          href="#home"
          className="text-[0.82rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-mint"
        >
          Voltar ao topo
        </a>
      </div>
    </footer>
  );
}
