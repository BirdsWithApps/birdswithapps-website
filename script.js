const toggle = document.querySelector('.theme-toggle');
const logoSource = document.querySelector('#logo-source');

function isDark() {
  return document.documentElement.dataset.theme === 'dark' ||
    (!document.documentElement.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

function updateThemeButton() {
  const dark = isDark();
  toggle.setAttribute('aria-pressed', String(dark));
  toggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
  toggle.querySelector('.theme-label').textContent = dark ? 'Light mode' : 'Dark mode';
  // Explicit selection overrides the system appearance used by <picture>.
  logoSource.media = document.documentElement.dataset.theme ? (dark ? 'all' : 'not all') : '(prefers-color-scheme: dark)';
}

toggle.addEventListener('click', () => {
  document.documentElement.dataset.theme = isDark() ? 'light' : 'dark';
  updateThemeButton();
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeButton);
updateThemeButton();
