import { light } from './theme';

window.addEventListener('error', () => {
  document.body.innerHTML =
    `
    <div style="
      background-color: ${light.colors.red};
      padding: ${light.sizes.md};
      color: ${light.colors.white}
    ">
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
