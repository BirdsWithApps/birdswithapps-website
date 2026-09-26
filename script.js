const toggle = document.querySelector('.theme-toggle');

function isDark() {
  return document.documentElement.dataset.theme === 'dark' ||
    (!document.documentElement.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

function updateThemeButton() {
  const dark = isDark();
  toggle.setAttribute('aria-pressed', String(dark));
  toggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
  toggle.querySelector('.theme-label').textContent = dark ? 'Light mode' : 'Dark mode';
}

toggle.addEventListener('click', () => {
  document.documentElement.dataset.theme = isDark() ? 'light' : 'dark';
  updateThemeButton();
});
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeButton);
updateThemeButton();

// The cards above are the single list of apps. New data-category values
// automatically become new filter buttons and results below.
const apps = [...document.querySelectorAll('.app-grid > .app-card')].map(card => ({
  category: card.dataset.category,
  name: card.querySelector('h3').textContent,
  description: card.querySelector('p').textContent,
  icon: card.querySelector('img').getAttribute('src'),
  url: card.getAttribute('href'),
  status: card.querySelector('.app-status').textContent
}));
const filters = document.querySelector('.category-filters');
const results = document.querySelector('.category-results');
const count = document.querySelector('.category-count');
const categories = ['All apps', ...new Set(apps.map(app => app.category))];

function showCategory(category) {
  filters.querySelectorAll('button').forEach(button => {
    button.setAttribute('aria-pressed', String(button.textContent === category));
  });
  const visible = category === 'All apps' ? apps : apps.filter(app => app.category === category);
  count.textContent = `${visible.length} ${visible.length === 1 ? 'app' : 'apps'}`;
  results.replaceChildren(...visible.map(app => {
    const item = document.createElement('li');
    const content = document.createElement(app.url ? 'a' : 'div');
    content.className = 'category-item';
    if (app.url) content.href = app.url;
    const icon = document.createElement('img');
    icon.src = app.icon;
    icon.alt = '';
    icon.loading = 'lazy';
    const details = document.createElement('div');
    const name = document.createElement('h3');
    name.textContent = app.name;
    const description = document.createElement('p');
    description.textContent = app.description;
    const action = document.createElement('span');
    action.className = 'category-action';
    action.textContent = app.status;
    details.append(name, description, action);
    content.append(icon, details);
    item.append(content);
    return item;
  }));
}

categories.forEach(category => {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = category;
  button.addEventListener('click', () => showCategory(category));
  filters.append(button);
});
showCategory('All apps');
