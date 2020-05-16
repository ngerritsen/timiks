export function generateArr(n) {
  let arr = [];

  for (let i = 0; i < n; i++) {
    arr.push(i);
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

export function multiMatch(patterns, inputString) {
  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i];
    const match = inputString.match(pattern.regex);

    if (!match) continue;

    return pattern.fields.reduce(
      (fields, key, idx) => ({
        ...fields,
        [key]: match[idx + 1]
      }),
      {}
    );
  }

  return null;
}

export function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function unique(array) {
  return array.filter((item, i, ar) => ar.indexOf(item) === i);
}
