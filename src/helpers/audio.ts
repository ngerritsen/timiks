export function playSound(url: string) {
  const audio = new Audio(url);

  audio.play();
}
