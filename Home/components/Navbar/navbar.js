/* ---------------- NAVBAR INTERAÇÕES ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const header = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".nav-link");

  /* Menu Mobile */
  mobileToggle?.addEventListener("click", () => {
    mobileToggle.classList.toggle("open");
    navMenu?.classList.toggle("open");
  });

  /* Fecha menu mobile ao clicar em um link */
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navMenu?.classList.contains("open")) {
        navMenu.classList.remove("open");
        mobileToggle?.classList.remove("open");
      }
    });
  });

  /* Esconde/mostra navbar ao rolar */
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const current = window.pageYOffset;
    
    /* Adiciona classe scrolled para efeitos visuais */
    if (current > 50) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
    
    if (current > lastScroll && current > 150) {
      header.style.transform = "translateY(-100%)";
      header.style.opacity = "0";
      navMenu?.classList.remove("open");
      mobileToggle?.classList.remove("open");
    } else {
      header.style.transform = "translateY(0)";
      header.style.opacity = "1";
    }
    lastScroll = current;
  });

  /* Smooth scroll para links internos */
  navLinks.forEach(link => {
    if (link.getAttribute("href")?.startsWith("#")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href")?.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      });
    }
  });
});
