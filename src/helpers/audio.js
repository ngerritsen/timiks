export function playSound(url) {
  const audio = new Audio(url);

  audio.play();
}
