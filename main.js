function getTheme() {
  if (document.documentElement.getAttribute('data-theme') === 'dark') return 'dark';
  try {
    if (localStorage.getItem('theme') === 'light') return 'light';
  } catch (e) { /* ignore */ }
  return 'dark';
}

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  try { localStorage.setItem('theme', theme); } catch (e) { /* ignore */ }
  document.querySelectorAll('#theme-toggle').forEach(btn => {
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('title', theme === 'dark' ? 'Light mode' : 'Dark mode');
  });
}

function setupThemeToggle() {
  if (document.getElementById('theme-toggle')) return;

  const header = document.querySelector('.site-header .container');
  const menuToggle = document.getElementById('menu-toggle');
  if (!header) return;

  let tools = header.querySelector('.header-tools');
  if (!tools) {
    tools = document.createElement('div');
    tools.className = 'header-tools';
    header.appendChild(tools);
    if (menuToggle) tools.appendChild(menuToggle);
  }

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'theme-toggle';
  btn.className = 'btn btn-icon theme-toggle';
  btn.innerHTML = [
    '<svg class="theme-icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">',
    '<circle cx="12" cy="12" r="4" stroke-width="2"/>',
    '<path stroke-width="2" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
    '</svg>',
    '<svg class="theme-icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">',
    '<path stroke-width="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>',
    '</svg>'
  ].join('');

  if (menuToggle && menuToggle.parentElement === tools) {
    tools.insertBefore(btn, menuToggle);
  } else {
    tools.appendChild(btn);
  }

  setTheme(getTheme());

  btn.addEventListener('click', () => {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  });
}

// Helper: set active nav link by current page
function setActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  const researchDetail = /^project-(geoint|urban-heat|geolineage|water-leak|zurich-trees|wars-in-all-world)\.html$/.test(path);
  const softwareDetail = /^project-(arborist|battleship|supportdesk|user-request-export)\.html$/.test(path);
  document.querySelectorAll('[data-nav]').forEach(a => {
    const href = a.getAttribute('href');
    const hrefFile = href.split('/').pop();
    let match = (path === "" && href.endsWith("index.html")) || href.endsWith(path);
    if (researchDetail && hrefFile === 'research.html') match = true;
    if (softwareDetail && hrefFile === 'projects.html') match = true;
    a.classList.toggle('active', !!match);
  });
}

// Mobile drawer
function setupDrawer(){
  const toggle = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtns = drawer ? drawer.querySelectorAll('[data-close-drawer]') : [];
  if(!toggle || !drawer) return;
  toggle.addEventListener('click', ()=> drawer.classList.toggle('open'));
  closeBtns.forEach(btn => btn.addEventListener('click', ()=> drawer.classList.remove('open')));
  // Close on ESC
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') drawer.classList.remove('open'); });
}

// Projects filter (on projects.html only)
function setupProjectsFilter(){
  const filterWrap = document.querySelector('[data-filter-wrap]');
  if(!filterWrap) return;
  const buttons = filterWrap.querySelectorAll('[data-category]');
  const cards = document.querySelectorAll('[data-project-card]');
  const setActive = (btn)=> {
    buttons.forEach(b=> b.classList.remove('btn-primary'));
    buttons.forEach(b=> b.classList.add('btn-outline'));
    btn.classList.remove('btn-outline'); btn.classList.add('btn-primary');
  };
  buttons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const cat = btn.getAttribute('data-category');
      setActive(btn);
      cards.forEach(card=>{
        const cardCat = card.getAttribute('data-category');
        const show = (cat === 'All') || (cardCat === cat);
        card.classList.toggle('hidden', !show);
      });
    });
  });
}


// Close drawer on link click (mobile)
function closeDrawerOnLinkClicks(){
  const drawer = document.getElementById('mobile-drawer');
  if(!drawer) return;
  drawer.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=> drawer.classList.remove('open'));
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  setupThemeToggle();
  setActiveNav();
  setupDrawer();
  closeDrawerOnLinkClicks();
  setupProjectsFilter();
});
