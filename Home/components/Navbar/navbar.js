/* ---------------- NAVBAR INTERAÇÕES ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const header = document.querySelector(".site-header");

  /* Menu Mobile */
  mobileToggle?.addEventListener("click", () => {
    mobileToggle.classList.toggle("open");
    navMenu?.classList.toggle("open");
  });

  /* Esconde/mostra navbar ao rolar */
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const current = window.pageYOffset;
    if (current > lastScroll && current > 150) {
      header.style.transform = "translateY(-100%)";
      navMenu?.classList.remove("open");
      mobileToggle?.classList.remove("open");
    } else {
      header.style.transform = "translateY(0)";
    }
    lastScroll = current;
  });
});
