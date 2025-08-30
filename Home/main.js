// Carrega componentes HTML e injeta na #app na ordem desejada
(async () => {
  const order = [
    'components/Navbar/navbar.html',
    'components/Banner/banner.html',
    'components/About/about.html',
    'components/Contact/contact.html',
    'components/Footer/footer.html'
  ];
  
  const app = document.getElementById('app');
  
  for (const path of order) {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      const div = document.createElement('div');
      div.innerHTML = html;
      app.appendChild(div);
    } else {
      console.error('Erro ao carregar', path);
    }
  }
  
  // Adiciona seções de Skills e Projects após carregar componentes básicos
  await loadSkillsSection();
  await loadProjectsSection();
  
  // Adiciona botão de voltar ao topo
  addBackToTopButton();
})();

// Carrega seção de Skills
async function loadSkillsSection() {
  const skillsHTML = `
    <section class="skills" id="skills">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Minhas Habilidades</h2>
          <p class="section-subtitle">Tecnologias e ferramentas que domino</p>
        </div>
        <div class="skills-container">
          <div id="skills-languages"></div>
          <div id="skills-frameworks"></div>
          <div id="skills-databases"></div>
        </div>
      </div>
    </section>
  `;
  
  const div = document.createElement('div');
  div.innerHTML = skillsHTML;
  document.getElementById('app').appendChild(div);
  
  // Carrega componentes de skills
  const skillComponents = [
    'components/Skills/Languages/languages.html',
    'components/Skills/Frameworks/frameworks.html',
    'components/Skills/Databases/databases.html'
  ];
  
  for (const path of skillComponents) {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      const targetId = path.includes('Languages') ? 'skills-languages' :
                     path.includes('Frameworks') ? 'skills-frameworks' : 'skills-databases';
      document.getElementById(targetId).innerHTML = html;
    }
  }
}

// Carrega seção de Projects
async function loadProjectsSection() {
  const projectsHTML = `
    <section class="projects" id="projects">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Meus Projetos</h2>
          <p class="section-subtitle">Alguns dos trabalhos que desenvolvi</p>
        </div>
        <div class="projects-filter">
          <div class="search-container">
            <input type="text" id="projectSearch" class="search-input" placeholder="Buscar projetos...">
            <button class="search-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>
          <div class="filter-buttons">
            <button class="filter-btn active" data-category="all">Todos</button>
            <button class="filter-btn" data-category="frontend">Front-end</button>
            <button class="filter-btn" data-category="backend">Back-end</button>
            <button class="filter-btn" data-category="machine-learning">Machine Learning</button>
          </div>
        </div>
        <div class="projects-grid" id="projects-grid"></div>
      </div>
    </section>
  `;
  
  const div = document.createElement('div');
  div.innerHTML = projectsHTML;
  document.getElementById('app').appendChild(div);
  
  // Carrega componentes de projetos
  const projectComponents = [
    'components/Projects/Frontend/frontend.html',
    'components/Projects/Backend/backend.html',
    'components/Projects/MachineLearning/machineLearning.html'
  ];
  
  const projectsGrid = document.getElementById('projects-grid');
  for (const path of projectComponents) {
    const res = await fetch(path);
    if (res.ok) {
      const html = await res.text();
      projectsGrid.innerHTML += html;
    }
  }
}

// Adiciona botão de voltar ao topo
function addBackToTopButton() {
  const backToTopHTML = `
    <button id="backToTop" aria-label="Voltar ao topo">
      ↑
    </button>
  `;
  
  document.body.insertAdjacentHTML('beforeend', backToTopHTML);
  
  const backToTop = document.getElementById("backToTop");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const current = window.pageYOffset;
    
    // Mostra/esconde botão baseado na posição do scroll
    if (current > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ 
      top: 0, 
      behavior: "smooth" 
    });
  });
}
