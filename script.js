// ===== Theme toggle (localStorage) =====
const htmlEl = document.documentElement;
const themeBtn = document.getElementById('theme');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) htmlEl.setAttribute('data-theme', savedTheme);
if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const next = htmlEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

// ===== Print =====
const printBtn = document.getElementById('print');
if (printBtn) printBtn.addEventListener('click', () => window.print());

// ===== Search filter (/) =====
const q = document.getElementById('q');
if (q) {
  addEventListener('keydown', e => { if (e.key === '/') { e.preventDefault(); q.focus(); }});
  q.addEventListener('input', () => {
    const term = q.value.toLowerCase();
    document.querySelectorAll('.section, details.acc').forEach(el => {
      const show = el.textContent.toLowerCase().includes(term);
      el.style.display = show ? '' : 'none';
    });
  });
}

// ===== Reveal on scroll =====
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }});
}, {threshold: .1});
document.querySelectorAll('.card, .stat, .g-item').forEach(el => el.classList.add('reveal'));
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Animated counters =====
document.querySelectorAll('.num[data-count]').forEach(el => {
  const target = +el.dataset.count; let cur = 0; const step = Math.max(1, Math.round(target / 40));
  const ticker = () => { cur += step; if (cur > target) cur = target; el.textContent = cur; if (cur < target) requestAnimationFrame(ticker); };
  const obs = new IntersectionObserver(es => { if (es[0].isIntersecting){ requestAnimationFrame(ticker); obs.disconnect(); }});
  obs.observe(el);
});

// ===== Skill bars animate =====
document.querySelectorAll('.bar > i').forEach(i => {
  const w = i.style.getPropertyValue('--w') || '75%';
  i.style.width = '0%';
  const o = new IntersectionObserver(es => {
    if (es[0].isIntersecting) { i.animate([{width:'0%'},{width:w}], {duration:900, fill:'forwards', easing:'ease-out'}); o.disconnect(); }
  });
  o.observe(i);
});

// ===== Copy link / Web Share =====
const copyBtn = document.getElementById('copyLink');
if (copyBtn) copyBtn.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(location.href);
    copyBtn.textContent = '✅ Đã copy'; setTimeout(() => copyBtn.textContent = '🔗 Copy link CV', 1500);
  } catch { alert('Không copy được, vui lòng thử thủ công.'); }
});

const shareBtn = document.getElementById('share');
if (shareBtn && navigator.share) {
  shareBtn.disabled = false;
  shareBtn.addEventListener('click', () => navigator.share({title: document.title, text:'CV của Nguyễn Phạm Hà Khanh', url: location.href}));
}

// ===== Back to top =====
const topBtn = document.getElementById('scrollTopBtn');
if (topBtn) {
  topBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
  addEventListener('scroll', () => { topBtn.style.display = window.scrollY > 600 ? 'inline-flex' : 'none'; });
}

// ===== Keyboard shortcuts =====
addEventListener('keydown', e => {
  if (['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;
  if (e.key.toLowerCase() === 'd') themeBtn?.click();
  if (e.key.toLowerCase() === 'p') window.print();
});

// ===== Avatar click -> mở URL (kế thừa ý tưởng cũ) =====
document.addEventListener('DOMContentLoaded', () => {
  const avatar = document.querySelector('.avatar');
  if (!avatar || avatar.closest('a')) return;
  const url = avatar.getAttribute('data-url'); if (!url) return;
  avatar.style.cursor = 'pointer';
  const openLink = () => window.open(url, '_blank', 'noopener');
  avatar.addEventListener('click', openLink);
  avatar.setAttribute('tabindex', '0');
  avatar.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLink(); }});
});
// Sticky quick panel wiring
(function(){
  const share2 = document.getElementById('share2');
  if (share2 && navigator.share){
    share2.disabled = false;
    share2.addEventListener('click', () =>
      navigator.share({ title: document.title, text: 'CV của Nguyễn Phạm Hà Khanh', url: location.href })
    );
  }
  const copy2 = document.getElementById('copyLink2');
  if (copy2){
    copy2.addEventListener('click', async ()=>{
      try{ await navigator.clipboard.writeText(location.href);
           copy2.textContent = '✅'; setTimeout(()=> copy2.textContent='🔗', 1200);
      }catch{ alert('Không copy được, vui lòng thử thủ công.'); }
    });
  }
  const theme2 = document.getElementById('theme2');
  if (theme2){
    theme2.addEventListener('click', ()=>{
      const htmlEl = document.documentElement;
      const next = htmlEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      htmlEl.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }
})();
// ===== Collapse / Expand sticky panel with persistence (REPLACE) =====
(function(){
  const root = document.querySelector('.sticky-right');
  const toggleBtn = document.getElementById('stickyToggle');
  const tabBtn = document.getElementById('stickyTab');
  const LS_KEY = 'stickyRightCollapsed';

  if (!root) return;

  // Restore state
  try {
    if (localStorage.getItem(LS_KEY) === '1') root.classList.add('collapsed');
  } catch {}

  const collapse = () => { root.classList.add('collapsed'); try{localStorage.setItem(LS_KEY, '1');}catch{} };
  const expand   = () => { root.classList.remove('collapsed'); try{localStorage.setItem(LS_KEY, '0');}catch{} };

  toggleBtn?.addEventListener('click', collapse);
  tabBtn?.addEventListener('click', expand);

  // Keyboard (Enter/Space) cho tab
  tabBtn?.setAttribute('tabindex','0');
  tabBtn?.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); expand(); }
  });
})();

