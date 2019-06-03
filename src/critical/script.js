const settings = JSON.parse(localStorage.getItem('settings') || '{}');

if (settings.theme === 'dark') {
  document.body.classList.add('is-dark');
}

document.querySelector('[data-reload]').addEventListener('click', event => {
  event.preventDefault();
  window.location.reload(true);
});
