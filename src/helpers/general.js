export function generateArr(n) {
  let arr = [];

  for (let i = 0; i < n; i++) {
    arr = [...arr, i];
  }

  return arr;
}

export function sortBy(array, value) {
  return [...array].sort((a, b) => {
    if (a[value] < b[value]) {
      return -1;
    } else if (a[value] > b[value]) {
      return 1;
    }

    return 0;
  });
}
