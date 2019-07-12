export const categories = [
  {
    name: 'All Edges Oriented',
    id: 'OCLL'
  },
  {
    name: 'T-Shapes',
    id: 'T'
  },
  {
    name: 'Squares',
    id: 'S'
  },
  {
    name: 'C-Shapes',
    id: 'C'
  },
  {
    name: 'W-Shapes',
    id: 'W'
  },
  {
    name: 'Corners Correct, Edges Flipped',
    id: 'E'
  },
  {
    name: 'P-Shapes',
    id: 'P'
  },
  {
    name: 'I-Shapes',
    id: 'I'
  },
  {
    name: 'Fish Shapes',
    id: 'F'
  },
  {
    name: 'Knight Move Shapes',
    id: 'K'
  },
  {
    name: 'Awkward Shapes',
    id: 'A'
  },
  {
    name: 'L-Shapes',
    id: 'L'
  },
  {
    name: 'Lightning Bolts',
    id: 'B'
  },
  {
    name: 'No Edges Oriented',
    id: 'O'
  }
];

export const cases = [
  {
    name: 'OCLL6',
    category: 'OCLL',
    id: 26,
    probability: 1 / 54,
    algs: [`R U2 R' U' R U' R'`, `y' R' U' R U' R' U2 R`],
    preview: 'XXX XXY XXY XXY XYY YYY XYX'
  },
  {
    name: 'OCLL7',
    category: 'OCLL',
    id: 27,
    probability: 1 / 54,
    algs: [`R U R' U R U2' R'`, `y' R' U2' R U R' U R`],
    preview: 'YXX YXX YXX XXX XYX YYY YYX'
  },
  {
    name: 'OCLL1',
    category: 'OCLL',
    id: 21,
    probability: 1 / 108,
    algs: [`(R U2 R') (U' R U R') (U' R U' R')`, `y (R U R' U) (R U' R' U) (R U2' R')`],
    preview: 'YXY XXX YXY XXX XYX YYY XYX'
  },
  {
    name: 'OCLL2',
    category: 'OCLL',
    id: 22,
    probability: 1 / 54,
    algs: [`R U2' R2' U' R2 U' R2' U2' R`],
    preview: 'XXY XXX YXX YXY XYX YYY XYX'
  },
  {
    name: 'OCLL4',
    category: 'OCLL',
    id: 24,
    probability: 1 / 54,
    algs: [`(r U R' U') (r' F R F')`, `y (R U R D) (R' U' R D') R2'`],
    preview: 'YXX XXX XXY XXX XYY YYY XYY'
  },
  {
    name: 'OCLL5',
    category: 'OCLL',
    id: 25,
    probability: 1 / 54,
    algs: [`y F' (r U R' U') r' F R`, `x (R' U R) D' (R' U' R) D x'`],
    preview: 'XXX YXX XXY XXX YYX YYY XYY'
  },
  {
    name: 'OCLL3',
    category: 'OCLL',
    id: 23,
    probability: 1 / 54,
    algs: [`R2 D (R' U2 R) D' (R' U2 R'`, `y2 R2' D' (R U2 R') D (R U2 R)`],
    preview: 'XXX XXX YXY XXX YYY YYY XYX'
  },
  {
    name: 'T1',
    category: 'T',
    id: 33,
    probability: 1 / 54,
    algs: [`(R U R' U') (R' F R F')`],
    preview: 'YYX XXX XYY XXX XXY YYY XXY'
  },
  {
    name: 'T2',
    category: 'T',
    id: 45,
    probability: 1 / 54,
    algs: [`F (R U R' U') F'`],
    preview: 'XYX XXX XYX YXY XXY YYY XXY'
  },
  {
    name: 'S1',
    category: 'S',
    id: 5,
    probability: 1 / 54,
    algs: [`(r' U2' R U R' U r)`],
    preview: 'YYX YXX XXX YYX XXX XYY XYY'
  },
  {
    name: 'S2',
    category: 'S',
    id: 6,
    probability: 1 / 54,
    algs: [`(r U2 R' U' R U' r')`],
    preview: 'XXX XXY XYY XYY XYY XYY XXX'
  },
  {
    name: 'C1',
    category: 'C',
    id: 34,
    probability: 1 / 54,
    algs: [`(R U R2' U') (R' F R U) R U' F'`],
    preview: 'XYX YXX XYX XXY XXX YYY YXY'
  },
  {
    name: 'C2',
    category: 'C',
    id: 46,
    probability: 1 / 54,
    algs: [`R' U' (R' F R F') U R`],
    preview: 'XXX YYY XXX XYX YYX XYX YYX'
  },
  {
    name: 'W1',
    category: 'W',
    id: 36,
    probability: 1 / 54,
    algs: [
      `(R' U' R U') (R' U R U) l U' R' U x`,
      `y2 (R U R' F') (R U R' U') (R' F R U') (R' F R F')`
    ],
    preview: 'XYX YYX XXY XXX YXX YYX XYY'
  },
  {
    name: 'W2',
    category: 'W',
    id: 38,
    probability: 1 / 54,
    algs: [`(R U R' U) (R U' R' U') (R' F R F')`],
    preview: 'YXX XYY XYX XXX XYY YYX YXX'
  },
  {
    name: 'E1',
    category: 'E',
    id: 28,
    probability: 1 / 54,
    algs: [`(r U R' U') M (U R U' R')`],
    preview: 'XXX XYX XYX XXX YYY YYX YXY'
  },
  {
    name: 'E2',
    category: 'E',
    id: 57,
    probability: 1 / 108,
    algs: [`(R U R' U') M' (U R U' r')`],
    preview: 'XYX XXX XYX XXX YXY YYY YXY'
  },
  {
    name: 'P1',
    category: 'P',
    id: 31,
    probability: 1 / 54,
    algs: [`(R' U' F) (U R U' R') F' R`],
    preview: 'YXX XXX XYY XYX XYY XYY XXY'
  },
  {
    name: 'P2',
    category: 'P',
    id: 32,
    probability: 1 / 54,
    algs: [`R U B' (U' R' U) (R B R')`, `S (R U R' U') (R' F R f')`],
    preview: 'YYX XXX XXY XYX XXY XYY XYY'
  },
  {
    name: 'P3',
    category: 'P',
    id: 43,
    probability: 1 / 54,
    algs: [`y R' U' F' U F R`, `f' (L' U' L U) f`],
    preview: 'XYX YYY XXX XXX YXX YYX YYX'
  },
  {
    name: 'P4',
    category: 'P',
    id: 44,
    probability: 1 / 54,
    algs: [`f (R U R' U') f'`, `y2 F (U R U' R') F'`],
    preview: 'XYX XXX XXX YYY XXY XYY XYY'
  },
  {
    name: 'I1',
    category: 'I',
    id: 51,
    probability: 1 / 54,
    algs: [`f (R U R' U') (R U R' U') f'`, `y2 F (U R U' R') (U R U' R') F'`],
    preview: 'XYY XXX YYX YXY XXX YYY XXX'
  },
  {
    name: 'I4',
    category: 'I',
    id: 56,
    probability: 1 / 108,
    algs: [`r' U' r (U' R' U R) (U' R' U R) r' U r`],
    preview: 'XYX YXY XYX YXY XXX YYY XXX'
  },
  {
    name: 'I2',
    category: 'I',
    id: 52,
    probability: 1 / 54,
    algs: [`(R' U' R U' R' U) y' (R' U R) B`, `(R U R' U R U') y (R U' R') F' `],
    preview: 'YXX YYY XXY XYX XYX XYX XYX'
  },
  {
    name: 'I3',
    category: 'I',
    id: 55,
    probability: 1 / 108,
    algs: [`y (R' F R U) (R U' R2' F') R2 U' R' (U R U R')`],
    preview: 'YXY YYY XXX YYY XYX XYX XYX'
  },
  {
    name: 'F1',
    category: 'F',
    id: 9,
    probability: 1 / 54,
    algs: [`(R U R' U') R' F (R2 U R' U') F'`, `(R' U' R) y r U' r' U r U r'`],
    preview: 'XXY XYX XYY XXY XYX YYX XXY'
  },
  {
    name: 'F2',
    category: 'F',
    id: 10,
    probability: 1 / 54,
    algs: [`(R U R' U) (R' F R F') (R U2' R')`, `(R U R') y (R' F R U') (R' F' R)`],
    preview: 'YYX XYX YXX YXX XXY YYX XYX'
  },
  {
    name: 'F3',
    category: 'F',
    id: 35,
    probability: 1 / 54,
    algs: [`(R U2') (R2' F R F') (R U2' R')`],
    preview: 'XYX YXX XXY XYX YXX XYY XYY'
  },
  {
    name: 'F4',
    category: 'F',
    id: 37,
    probability: 1 / 54,
    algs: [`F (R U' R' U') (R U R' F')`],
    preview: 'XXX YYX XYY XXX YYX YYX XXY'
  },
  {
    name: 'K1',
    category: 'K',
    id: 13,
    probability: 1 / 54,
    algs: [`(r U' r') (U' r U r') y' (R' U R)`, `F U R U' R2' F' R U (R U' R')`],
    preview: 'YYX YXX YYX XXX XXX YYY YXX'
  },
  {
    name: 'K2',
    category: 'K',
    id: 14,
    probability: 1 / 54,
    algs: [`(R' F R) (U R' F' R) (F U' F')`],
    preview: 'XXY XXX XYY XXY XXX YYY XXY'
  },
  {
    name: 'K4',
    category: 'K',
    id: 16,
    probability: 1 / 54,
    algs: [`(r U r') (R U R' U') (r U' r')`],
    preview: 'XYX XXY XYY XXY XXY YYY XXX'
  },
  {
    name: 'K3',
    category: 'K',
    id: 15,
    probability: 1 / 54,
    algs: [`(r' U' r) (R' U' R U) (r' U r)`],
    preview: 'YYX YXX XYX YXX XXX YYY XXY'
  },
  {
    name: 'A1',
    category: 'A',
    id: 29,
    probability: 1 / 54,
    algs: [`y (R U R' U') (R U' R') (F' U' F) (R U R')`, `M U (R U R' U')(R' F R F') M'`],
    preview: 'XYX XYY XXX YXX YXY YYX XYX'
  },
  {
    name: 'A2',
    category: 'A',
    id: 30,
    probability: 1 / 54,
    algs: [`y' F U (R U2 R' U') (R U2 R' U') F'`, `y' (F R' F) (R2 U' R' U') (R U R') F2`],
    preview: 'XXY XXX YYX XYX YYX XYY YXX'
  },
  {
    name: 'A3',
    category: 'A',
    id: 41,
    probability: 1 / 54,
    algs: [`(R U R' U R U2' R') F (R U R' U') F'`],
    preview: 'YXY XYX XYX XXX XYX YYX YXY'
  },
  {
    name: 'A4',
    category: 'A',
    id: 42,
    probability: 1 / 54,
    algs: [
      `(R' U' R U' R' U2 R) F (R U R' U') F'`,
      `y (R' F R F') (R' F R F') (R U R' U') (R U R')`
    ],
    preview: 'XYX XYX YXY XXX YXY YYX XYX'
  },
  {
    name: 'L2',
    category: 'L',
    id: 48,
    probability: 1 / 54,
    algs: [`F (R U R' U') (R U R' U') F'`],
    preview: 'XXY XYX YYX YXY XYX YYX XXX'
  },
  {
    name: 'L1',
    category: 'L',
    id: 47,
    probability: 1 / 54,
    algs: [`F' (L' U' L U) (L' U' L U) F`, `R' U' (R' F R F') (R' F R F') U R`],
    preview: 'YXX YXY XYY XYX XYX XYY XXX'
  },
  {
    name: 'L3',
    category: 'L',
    id: 49,
    probability: 1 / 54,
    algs: [`r U' r2' U r2 U r2' U' r`],
    preview: 'XXY XXX YYX YYY XYX XYY XXX'
  },
  {
    name: 'L4',
    category: 'L',
    id: 50,
    probability: 1 / 54,
    algs: [`r' U r2 U' r2' U' r2 U r'`, `y' (R U2 R' U' R U' R') F (R U R' U') F'`],
    preview: 'XYY XXX YXX YYY XXX XYY XYX'
  },
  {
    name: 'L5',
    category: 'L',
    id: 53,
    probability: 1 / 54,
    algs: [`(r' U' R U') (R' U R U') R' U2 r`, `y r' U2' R (U R' U' R) (U R' U r)`],
    preview: 'XYX YXY XXX YYY XXX XYY XYX'
  },
  {
    name: 'L6',
    category: 'L',
    id: 54,
    probability: 1 / 54,
    algs: [`(r U R' U) (R U' R' U) R U2' r'`, `y' (r U2 R' U') (R U R' U') R U' r'`],
    preview: 'XXX YXY XYX YYY XYX XYY XXX'
  },
  {
    name: 'B1',
    category: 'B',
    id: 7,
    probability: 1 / 54,
    algs: [`(r U R' U R U2' r')`],
    preview: 'YXX YYX YYX XXX XYX YYX YXX'
  },
  {
    name: 'B2',
    category: 'B',
    id: 8,
    probability: 1 / 54,
    algs: [`(r' U' R U' R' U2 r)`, `y2 l' U' L U' L' U2 l`],
    preview: 'XYY XYY XXY XXX YXX YYX XYX'
  },
  {
    name: 'B3',
    category: 'B',
    id: 11,
    probability: 1 / 54,
    algs: [`r' (R2 U R' U R U2 R') U M'`],
    preview: 'YYX YXX YXX XYX XXX XYY YYX'
  },
  {
    name: 'B4',
    category: 'B',
    id: 12,
    probability: 1 / 54,
    algs: [`M' (R' U' R U' R' U2 R) U' M`, `y F (R U R' U') F' U F (R U R' U') F'`],
    preview: 'XXY XXY XYY XYX YYX XYY XXX'
  },
  {
    name: 'B5',
    category: 'B',
    id: 39,
    probability: 1 / 54,
    algs: [`(L F') (L' U' L U) F U' L'`, `F (R U R' U') F' (R' U' R U' R' U2 R)`],
    preview: 'YYX XXY XYX XXX XXY YYY YXX'
  },
  {
    name: 'B6',
    category: 'B',
    id: 40,
    probability: 1 / 54,
    algs: [`(R' F) (R U R' U') F' U R`],
    preview: 'XXY XXX XYX YXX YXX YYY XXY'
  },
  {
    name: 'O1',
    category: 'O',
    id: 1,
    probability: 1 / 108,
    algs: [`(R U2') (R2' F R F') U2' (R' F R F')`],
    preview: 'XYX YYY XYX XXX XXX XYX XXX'
  },
  {
    name: 'O2',
    category: 'O',
    id: 2,
    probability: 1 / 54,
    algs: [`F (R U R' U') F' f (R U R' U') f'`, `y (r U r') U2 R U2' R' U2 (r U' r')`],
    preview: 'XYY XYX YYX YYY XXX XYX XXX'
  },
  {
    name: 'O3',
    category: 'O',
    id: 3,
    probability: 1 / 54,
    algs: [`f (R U R' U') f' U' F (R U R' U') F'`],
    preview: 'YYX YYX XYX YYX XXX XYX XXY'
  },
  {
    name: 'O4',
    category: 'O',
    id: 4,
    probability: 1 / 54,
    algs: [`f (R U R' U') f' U F (R U R' U') F'`],
    preview: 'XYX XYY XYY XYY XXY XYX XXX'
  },
  {
    name: 'O6',
    category: 'O',
    id: 18,
    probability: 1 / 54,
    algs: [`y R U2' (R2' F R F') U2' M' (U R U' r')`, `(r U R' U R U2 r') (r' U' R U' R' U2 r)`],
    preview: 'XYX XYX YYY XYX YXY XYX XXX'
  },
  {
    name: 'O7',
    category: 'O',
    id: 19,
    probability: 1 / 54,
    algs: [`M U (R U R' U') M' (R' F R F')`],
    preview: 'XYX XYY XXX YYX YXY XYX XXX'
  },
  {
    name: 'O5',
    category: 'O',
    id: 17,
    probability: 1 / 54,
    algs: [`(R U R' U) (R' F R F') U2' (R' F R F')`],
    preview: 'XYY XYX XYX YYX YXX XYX XXY'
  },
  {
    name: 'O8',
    category: 'O',
    id: 20,
    probability: 1 / 216,
    algs: [`M U (R U R' U') M2' (U R U' r')`, `(r U R' U') M2' (U R U' R') U' M'`],
    preview: 'XYX XYX XYX XYX YXY XYX YXY'
  }
];
