const settings = JSON.parse(localStorage.getItem("settings") || "{}");

if (
  settings.theme === "dark" ||
  (settings.theme === "auto" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.body.classList.add("is-dark");
}

document.querySelector("[data-reload]").addEventListener("click", (event) => {
  event.preventDefault();
  window.location.reload(true);
});
