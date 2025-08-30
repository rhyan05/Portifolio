document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------- PROJETOS: FILTRO & BUSCA ------------------------- */
  const projectCards = document.querySelectorAll(".project-card");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("projectSearch");

  // Aplica filtro combinado (categoria + texto)
  function applyFilters() {
    const term = searchInput.value.toLowerCase().trim();
    const activeCategory = document.querySelector(".filter-btn.active").dataset.category;

    projectCards.forEach(card => {
      const cardTitle = card.dataset.title.toLowerCase();
      const cardCategory = card.dataset.category;
      const matchCategory = activeCategory === "all" || cardCategory === activeCategory;
      const matchSearch = cardTitle.includes(term);

      card.style.display = matchCategory && matchSearch ? "block" : "none";
    });
  }

  // Clique nos botões de categoria
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".filter-btn.active").classList.remove("active");
      btn.classList.add("active");
      applyFilters();
    });
  });

  // Digitação no campo de busca
  searchInput.addEventListener("input", applyFilters);

  /* ------------------------------ MENU MOBILE ------------------------------ */
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  mobileToggle.addEventListener("click", () => {
    mobileToggle.classList.toggle("open");

    // Animação com max-height: se estiver aberto, fecha; se fechado, abre
    if (navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
    } else {
      navMenu.classList.add("open");
    }
  });

  const header = document.querySelector(".site-header");
  const backToTop = document.getElementById("backToTop");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const current = window.pageYOffset;

    // navbar hide/show
    if (current > lastScroll && current > 150) {
      header.style.transform = "translateY(-100%)";
      // fecha menu mobile se aberto
      if (navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        mobileToggle.classList.remove("open");
      }
    } else {
      header.style.transform = "translateY(0)";
    }
    lastScroll = current;

    // back to top visibility
    if (current < lastScroll && current > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}); 