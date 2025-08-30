// Carrega componentes HTML e injeta na #app na ordem desejada
(async () => {
  const order = [
    'components/Navbar/navbar.html',
    'components/Banner/banner.html',
    'components/About/about.html',
    'components/Skills/Languages/languages.html',
    'components/Skills/Frameworks/frameworks.html',
    'components/Skills/Databases/databases.html',
    'components/Projects/Frontend/frontend.html',
    'components/Projects/Backend/backend.html',
    'components/Projects/MachineLearning/machineLearning.html',
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
})();
