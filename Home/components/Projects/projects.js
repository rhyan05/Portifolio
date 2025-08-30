/* ------------------------- PROJETOS: FILTRO & BUSCA ------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("projectSearch");

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
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".filter-btn.active").classList.remove("active");
      btn.classList.add("active");
      applyFilters();
    });
  });
  searchInput.addEventListener("input", applyFilters);
});
