/* LOADER */
const bar = document.getElementById('lb'), loader = document.getElementById('loader');
let p = 0;
const lt = setInterval(() => {
  p += Math.random() * 16;
  if (p >= 100) {
    p = 100;
    clearInterval(lt);
    setTimeout(() => loader.classList.add('done'), 380);
  }
  bar.style.width = p + '%';
}, 80);

/* CURSOR */
const cd = document.getElementById('cd'), cr = document.getElementById('cr');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function a() {
  rx += (mx - rx) * .12;
  ry += (my - ry) * .12;
  cd.style.left = mx + 'px';
  cd.style.top = my + 'px';
  cr.style.left = rx + 'px';
  cr.style.top = ry + 'px';
  requestAnimationFrame(a);
})();
document.querySelectorAll('button,a,.catc,.pcard,.fc,.tecard,.di,.dcrd,.tcard,.sb2,.bname,.floatc').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cr.style.transform = 'translate(-50%,-50%) scale(2)';
    cr.style.opacity = '1';
    cr.style.borderColor = 'var(--gm)';
    cr.style.background = 'rgba(34,168,79,.08)';
  });
  el.addEventListener('mouseleave', () => {
    cr.style.transform = 'translate(-50%,-50%) scale(1)';
    cr.style.opacity = '.5';
    cr.style.borderColor = 'var(--g)';
    cr.style.background = 'transparent';
  });
});

/* SCROLL REVEAL */
const rvEls = document.querySelectorAll('.rv');
const rObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('up');
      rObs.unobserve(e.target);
    }
  });
}, { threshold: .1 });
rvEls.forEach(r => rObs.observe(r));

/* CAROUSELS */
const CM = {
  cat:   { el: document.getElementById('catC'),   dots: document.getElementById('catDots'),   size: 233 },
  prod:  { el: document.getElementById('prodC'),  dots: document.getElementById('prodDots'),  size: 297 },
  deal:  { el: document.getElementById('dealC'),  dots: document.getElementById('dealDots'),  size: 253 },
  trend: { el: document.getElementById('trendC'), dots: document.getElementById('trendDots'), size: 213 },
  test:  { el: document.getElementById('testC'),  dots: document.getElementById('testDots'),  size: 377 },
};

function sc(id, dir) {
  const c = CM[id];
  c.el.scrollBy({ left: dir * c.size * 2, behavior: 'smooth' });
  setTimeout(() => ud(id), 360);
}

function ud(id) {
  const c = CM[id];
  const ratio = c.el.scrollLeft / (c.el.scrollWidth - c.el.clientWidth) || 0;
  const dots = c.dots.querySelectorAll('.cdot');
  const active = Math.round(ratio * (dots.length - 1));
  dots.forEach((d, i) => d.classList.toggle('active', i === active));
}

Object.keys(CM).forEach(id => CM[id].el.addEventListener('scroll', () => ud(id)));

/* COUNTDOWN */
function ucd() {
  const now = new Date(), end = new Date();
  end.setHours(23, 59, 59, 0);
  const diff = Math.max(0, end - now);
  document.getElementById('ch').textContent = String(Math.floor(diff / 3600000)).padStart(2, '0');
  document.getElementById('cm').textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
  document.getElementById('cs').textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
}
setInterval(ucd, 1000);
ucd();

/* ADD TO CART */
function ac(btn) {
  const o = btn.textContent;
  btn.textContent = '✓ Added!';
  btn.style.background = '#16a34a';
  setTimeout(() => { btn.textContent = o; btn.style.background = ''; }, 1600);
}

/* WISHLIST */
document.querySelectorAll('.pwish').forEach(b => {
  b.addEventListener('click', () => {
    const liked = b.textContent === '♥';
    b.textContent = liked ? '♡' : '♥';
    b.style.color = liked ? '' : '#e74c3c';
  });
});

/* COUNT-UP */
const coObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = parseInt(el.dataset.count), suf = el.dataset.suffix || '';
    let cur = 0;
    const step = target / 50;
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      if (target >= 1000000) el.textContent = (cur / 1000000).toFixed(1) + 'M' + suf;
      else if (target >= 1000) el.textContent = (cur / 1000).toFixed(0) + 'K' + suf;
      else el.textContent = Math.round(cur) + suf;
      if (cur >= target) clearInterval(t);
    }, 28);
    coObs.unobserve(el);
  });
}, { threshold: .5 });
document.querySelectorAll('.sn[data-count]').forEach(el => coObs.observe(el));
