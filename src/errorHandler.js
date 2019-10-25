import { light } from './theme';

window.addEventListener('error', () => {
  if (document.querySelector('.js-error-message')) {
    return;
  }

  document.body.innerHTML =
    `
    <div style="
      background-color: ${light.colors.red};
      padding: ${light.sizes.md};
      color: ${light.colors.white};
    " class="js-error-message">
      <div class="container">
        An error occured,
        <strong
          href="#"
          style="cursor: pointer; text-decoration: underline"
          onclick="window.location.reload(true)"
        >
          reload
        </strong>.
      </div>
    </div>
  ` + document.body.innerHTML;
});
