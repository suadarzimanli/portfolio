(function () {
  const thumbs = Array.from(document.querySelectorAll('.ss-card img'));
  if (!thumbs.length) return;

  const lb = document.getElementById('lightbox');
  const imgEl = document.getElementById('lb-img');
  const capEl = document.getElementById('lb-caption');
  const prevBtn = document.getElementById('lb-prev');
  const nextBtn = document.getElementById('lb-next');
  const closeBtn = document.getElementById('lb-close');
  if (!lb || !imgEl) return;

  const items = thumbs.map((img) => {
    const cap = img.parentElement?.querySelector('figcaption');
    return [img.getAttribute('src'), (cap?.textContent || img.getAttribute('alt') || '').trim()];
  });

  let i = 0;

  function open(n) {
    i = (n + items.length) % items.length;
    const [src, caption] = items[i];
    imgEl.src = src;
    imgEl.alt = caption || 'Screenshot';
    if (capEl) capEl.textContent = caption;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    imgEl.src = '';
  }

  thumbs.forEach((thumb, idx) => {
    thumb.addEventListener('click', (e) => {
      e.preventDefault();
      open(idx);
    });
  });

  prevBtn?.addEventListener('click', (e) => { e.stopPropagation(); open(i - 1); });
  nextBtn?.addEventListener('click', (e) => { e.stopPropagation(); open(i + 1); });
  closeBtn?.addEventListener('click', (e) => { e.stopPropagation(); close(); });
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') open(i + 1);
    if (e.key === 'ArrowLeft') open(i - 1);
  });
})();
