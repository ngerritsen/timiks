export function generateArr(n) {
  let arr = [];

  for (let i = 0; i < n; i++) {
    arr = [...arr, i];
  }

  return arr;
}

export function createAscSorter(property) {
  return (a, b) => {
    if (a[property] < b[property]) {
      return -1;
    }

    if (a[property] > b[property]) {
      return 1;
    }

    return 0;
  };
}

export function createDescSorter(property) {
  return (a, b) => {
    if (a[property] < b[property]) {
      return 1;
    }

    if (a[property] > b[property]) {
      return -1;
    }

    return 0;
  };
}
