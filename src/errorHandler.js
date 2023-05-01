window.addEventListener("error", () => {
  if (document.querySelector("[data-error-message]")) {
    return;
  }

  document.body.innerHTML =
    `
    <div class="error-message" data-error-message>
      <div class="container">
        An error occured, <strong data-error-message-reload class="error-message-reload">reload now</strong>.
      </div>
    </div>
  ` + document.body.innerHTML;

  document
    .querySelector("[data-error-message-reload]")
    .addEventListener("click", (e) => {
      e.preventDefault();
      window.location.reload(true);
    });
});
