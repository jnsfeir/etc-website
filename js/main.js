/* ETC — Shared JS */

// ── NAV ──
function toggleMob() { document.getElementById('mob').classList.toggle('open'); }
function closeMob()  { document.getElementById('mob').classList.remove('open'); }

// Active nav link
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') && a.getAttribute('href').includes(path)) a.classList.add('active');
  });
})();

// ── SCROLL REVEAL ──
const rvo = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rvo.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.rv').forEach(el => rvo.observe(el));

// ── STAT COUNTER ──
function animStat(el) {
  const target = +el.dataset.target, suffix = el.dataset.suffix || '';
  let start = null;
  (function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / 1500, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  })(performance.now());
}
const statObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('[data-target]').forEach(animStat);
    statObs.unobserve(e.target);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stats-strip, .stats-row').forEach(el => statObs.observe(el));

// ── TABS ──
function initTabs(barSel, panelSel) {
  const bars   = document.querySelectorAll(barSel + ' .tab');
  const panels = document.querySelectorAll(panelSel);
  bars.forEach(btn => {
    btn.addEventListener('click', () => {
      bars.forEach(b => b.classList.remove('on'));
      panels.forEach(p => p.classList.remove('show'));
      btn.classList.add('on');
      const id = btn.dataset.tab;
      const panel = document.getElementById(id);
      if (panel) panel.classList.add('show');
    });
  });
}
