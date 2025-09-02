// Helper: set active nav link by current page
function setActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll('[data-nav]').forEach(a => {
    const href = a.getAttribute('href');
    const match = (path === "" && href.endsWith("index.html")) || href.endsWith(path);
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

// External opener buttons (demo/code)
function setupExternalOpeners(){
  document.querySelectorAll('[data-open-window]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const url = btn.getAttribute('data-url');
      if(url && url !== '#') window.open(url, '_blank', 'noopener');
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
  setActiveNav();
  setupDrawer();
  closeDrawerOnLinkClicks();
  setupProjectsFilter();
  setupExternalOpeners();
});
