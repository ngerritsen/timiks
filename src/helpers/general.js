export function generateArr(n) {
  let arr = [];

  for (let i = 0; i < n; i++) {
    arr = [...arr, i];
  }

  return arr;
}
