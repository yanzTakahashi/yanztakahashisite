const menuButton = document.getElementById('menuButton');
const nav = document.getElementById('nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '✕' : '☰';
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = '☰';
  });
});

// Tandai jadwal hari ini sebagai aktif. Jumat adalah hari libur.
const cards = document.querySelectorAll('.day-card');
const today = new Date().getDay();
cards.forEach(card => card.classList.remove('active'));
if (today !== 5) {
  const todayCard = document.querySelector(`.day-card[data-day="${today}"]`);
  todayCard?.classList.add('active');
}

// Reveal animation saat section masuk viewport.
const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12 });
revealItems.forEach(item => revealObserver.observe(item));

// Cahaya lembut mengikuti kursor desktop.
const cursorGlow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', event => {
  document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
  document.documentElement.style.setProperty('--my', `${event.clientY}px`);
  if (cursorGlow) {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }
});

// Tilt halus pada kartu utama.
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('pointermove', event => {
    if (window.innerWidth < 900) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const amount = card.classList.contains('character-card') ? 5 : 3;
    card.style.transform = `perspective(900px) rotateX(${(-y * amount).toFixed(2)}deg) rotateY(${(x * amount).toFixed(2)}deg) translateY(-2px)`;
  });
  card.addEventListener('pointerleave', () => {
    if (card.classList.contains('character-card')) card.style.transform = 'rotate(1deg)';
    else card.style.transform = '';
  });
});

// Partikel daun/bambu ringan.
const leafField = document.getElementById('leafField');
function spawnLeaf() {
  if (!leafField || document.hidden) return;
  const leaf = document.createElement('span');
  leaf.className = 'leaf';
  leaf.textContent = Math.random() > 0.38 ? '🍃' : '🌿';
  leaf.style.left = `${Math.random() * 100}vw`;
  leaf.style.animationDuration = `${7 + Math.random() * 6}s`;
  leaf.style.fontSize = `${13 + Math.random() * 10}px`;
  leaf.style.animationDelay = `${Math.random() * 1.2}s`;
  leafField.appendChild(leaf);
  window.setTimeout(() => leaf.remove(), 14500);
}
for (let i = 0; i < 8; i++) window.setTimeout(spawnLeaf, i * 800);
window.setInterval(spawnLeaf, 1500);
