// 1. Coins les cartes et le panneau GitHub
for (const el of document.querySelectorAll('.tarot, .panel')) {
  el.insertAdjacentHTML('beforeend',
    [1, 2, 3, 4].map(i => `<svg class="corner c${i}" aria-hidden="true"><use href="#corner"/></svg>`).join(''));
}

// un clic sur une compétence met en avant les projets qui l’utilisent
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.tarot');
const hint = document.getElementById('hint');

chips.forEach(chip => chip.addEventListener('click', () => {
  const wasOn = chip.getAttribute('aria-pressed') === 'true';
  chips.forEach(c => c.setAttribute('aria-pressed', 'false'));
  chip.setAttribute('aria-pressed', String(!wasOn));

  let count = 0;
  cards.forEach(card => {
    const match = !wasOn && (card.dataset.tech ?? '').split(' ').includes(chip.dataset.k);
    card.classList.toggle('hit', match);
    card.classList.toggle('dim', !wasOn && !match);
    count += match;
  });
  hint.textContent = wasOn ? '' : count
    ? `${chip.textContent} : utilisé dans ${count} projet${count > 1 ? 's' : ''} ci-dessus.`
    : `${chip.textContent} : pas encore associé à un projet ci-dessus.`;
}));

// Initialisation du calendrier GitHub (sans les streaks)
GitHubCalendar(".calendar", "BULUT-Melissa-25006748", { 
  responsive: true, 
  global_stats: false 
});