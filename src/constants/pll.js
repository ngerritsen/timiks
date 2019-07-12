export const categories = [
  {
    name: 'Permutations of Edges Only',
    id: 'EO'
  },
  {
    name: 'Permutations of Corners Only',
    id: 'CO'
  },
  {
    name: 'Swap One Set of Adjacent Corners ',
    id: 'AC'
  },
  {
    name: 'Swap One Set of Diagonal Corners',
    id: 'DC'
  },
  {
    name: 'G Permutations (Double cycles)',
    id: 'G'
  }
];

export const cases = [
  {
    name: 'Ub',
    id: 'Ub',
    category: 'EO',
    probability: 1 / 18,
    algs: [`R2 U (R U R' U') R' U' (R' U R')`, `y2 (R' U R' U') R' U' (R' U R U) R2'`],
    preview: 'BBB OGO GRG ROR YYY YYY YYY'
  },
  {
    name: 'Ua',
    id: 'Ua',
    category: 'EO',
    probability: 1 / 18,
    algs: [
      `(R U' R U) R U (R U' R' U') R2`,
      `y2 (R U R' U) (R' U' R2 U') R' U R' U R [U2]`,
      `y2 (R2 U' R' U') R U R U (R U' R)`
    ],
    preview: 'BBB ORO GOG RGR YYY YYY YYY'
  },
  {
    name: 'Z',
    id: 'Z',
    category: 'EO',
    probability: 1 / 36,
    algs: [`(M2' U M2' U) (M' U2) (M2' U2 M') [U2]`, `y' M' U (M2' U M2') U (M' U2 M2) [U']`],
    preview: 'BRB OGO GOG RBR YYY YYY YYY'
  },
  {
    name: 'H',
    id: 'H',
    category: 'EO',
    probability: 1 / 72,
    algs: [`(M2' U M2') U2 (M2' U M2')`],
    preview: 'ORO GBG ROR BGB YYY YYY YYY'
  },
  {
    name: 'Aa',
    id: 'Aa',
    category: 'CO',
    probability: 1 / 18,
    algs: [`x (R' U R') D2 (R U' R') D2 R2 x'`, `y x' R2 D2 (R' U' R) D2 (R' U R') x`],
    preview: 'GOG RGB ORR BBO YYY YYY YYY'
  },
  {
    name: 'Ab',
    id: 'Ab',
    category: 'CO',
    probability: 1 / 18,
    algs: [`x R2' D2 (R U R') D2 (R U' R) x'`, `y x' (R U' R) D2 (R' U R) D2 R2' x`],
    preview: 'ROB OGO GRR BBG YYY YYY YYY'
  },
  {
    name: 'E',
    id: 'E',
    category: 'CO',
    probability: 1 / 36,
    algs: [`x' (R U' R' D) (R U R' D') (R U R' D) (R U' R' D') x`],
    preview: 'BOG RGO GRB OBR YYY YYY YYY'
  },
  {
    name: 'Ra',
    id: 'Ra',
    category: 'AC',
    probability: 1 / 18,
    algs: [
      `(R U' R' U') (R U R D) (R' U' R D') (R' U2 R') [U']`,
      `y' (L U2 L' U2) L F' (L' U' L U) L F L2' [U]`,
      `(R U R' F') (R U2' R' U2') (R' F R U) (R U2' R') [U']`
    ],
    preview: 'BRO GOB OGG RBR YYY YYY YYY'
  },
  {
    name: 'Rb',
    id: 'Rb',
    category: 'AC',
    probability: 1 / 18,
    algs: [
      `(R' U2 R U2') R' F (R U R' U') R' F' R2 [U']`,
      `(R' U2 R' D') (R U' R' D) (R U R U') (R' U' R) [U']`
    ],
    preview: 'GOB ORG RGR BBO YYY YYY YYY'
  },
  {
    name: 'Ja',
    id: 'Ja',
    category: 'AC',
    probability: 1 / 18,
    algs: [`(R' U L' U2) (R U' R' U2 R) L [U']`, `y' (L' U' L F) (L' U' L U) L F' L2' U L [U]`],
    preview: 'ORR BOO GGG RBB YYY YYY YYY'
  },
  {
    name: 'Jb',
    id: 'Jb',
    category: 'AC',
    probability: 1 / 18,
    algs: [`(R U R' F') (R U R' U') R' F R2 U' R' [U']`],
    preview: 'OOG RRO GGB BBB YYY YYY YYY'
  },
  {
    name: 'T',
    id: 'T',
    category: 'AC',
    probability: 1 / 18,
    algs: [`(R U R' U') (R' F R2 U') R' U' (R U R' F')`],
    preview: 'OOG RBO GRR BGB YYY YYY YYY'
  },
  {
    name: 'F',
    id: 'F',
    category: 'AC',
    probability: 1 / 18,
    algs: [
      `(R' U' F')(R U R' U')(R' F R2 U')(R' U' R U)(R' U R)`,
      `y (R' U2 R' U') y (R' F' R2 U') (R' U R' F) R U' F`
    ],
    preview: 'BGO GOB OBG RRR YYY YYY YYY'
  },
  {
    name: 'V',
    id: 'V',
    category: 'DC',
    probability: 1 / 18,
    algs: [`(R' U R' U') y (R' F' R2 U') (R' U R' F) R F`],
    preview: 'RGO GOB ORR BBG YYY YYY YYY'
  },
  {
    name: 'Y',
    id: 'Y',
    category: 'DC',
    probability: 1 / 18,
    algs: [`F (R U' R' U') (R U R' F') (R U R' U') (R' F R F')`],
    preview: 'RBO GGB ORR BOG YYY YYY YYY'
  },
  {
    name: 'Na',
    id: 'Na',
    category: 'DC',
    probability: 1 / 72,
    algs: [
      `(RUR'U)(RUR'F')(RUR'U')(R'FR2U') R' U2 (RU'R')`,
      `z (U R' D) (R2 U' R D') (U R' D) (R2 U' R D') [R'] z'`
    ],
    preview: 'OOR BBG RRO GGB YYY YYY YYY'
  },
  {
    name: 'Nb',
    id: 'Nb',
    category: 'DC',
    probability: 1 / 72,
    algs: [
      `(R' U R U') (R' F' U' F) (R U R' F) R' F' (R U' R)`,
      `(R' U L' U2 R U' L) (R' U L' U2 R U' L) [U]`
    ],
    preview: 'ROO GBB ORR BGG YYY YYY YYY'
  },
  {
    name: 'Ga',
    id: 'Ga',
    category: 'G',
    probability: 1 / 18,
    algs: [
      `R2 U (R' U R' U') (R U' R2) D U' (R' U R D') [U]`,
      `R2 u (R' U R' U') R u' R2 y' (R' U R)`
    ],
    preview: 'OBR BOG RRB OGO YYY YYY YYY'
  },
  {
    name: 'Gb',
    id: 'Gb',
    category: 'G',
    probability: 1 / 18,
    algs: [
      `(F' U' F) (R2 u R' U) (R U' R u') R2'`,
      `y' R' U' y F (R2 u R' U) (R U' R u') R2'`,
      `y' D (R' U' R U) D' (R2 U R' U) (R U' R U') R2' [U']`
    ],
    preview: 'ORO GOR BBG RGB YYY YYY YYY'
  },
  {
    name: 'Gc',
    id: 'Gc',
    category: 'G',
    probability: 1 / 18,
    algs: [
      `R2 U' (R U' R U) (R' U R2 D') (U R U' R') D [U']`,
      `y2 R2' F2 (R U2' R U2') R' F (R U R' U') R' F R2`
    ],
    preview: 'GRR BOG RGB OBO YYY YYY YYY'
  },
  {
    name: 'Gd',
    id: 'Gd',
    category: 'G',
    probability: 1 / 18,
    algs: [
      `D' (R U R' U') D (R2 U' R U') (R' U R' U) R2 [U]`,
      `(R U R') y' (R2 u' R U') (R' U R' u) R2`
    ],
    preview: 'GBR BGG ROB ORO YYY YYY YYY'
  }
];
