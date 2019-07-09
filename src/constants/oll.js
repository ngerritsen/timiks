const ollCases = [
  {
    id: 'o1',
    probability: 1 / 108,
    algs: [`(R U2') (R2' F R F') U2' (R' F R F')`],
    scrambles: [
      `R' U' F R' F' R2 U R B' R' B`,
      `R' U' F R' F' R2 U R B' R' B`,
      `F' U F2 D B' R B D' F2 U' F`,
      `B U' B2 D' F R' F' D B2 U B'`,
      `F' U F2 D B' R B D' F2 U' F`,
      `B U' B2 D' F R' F' D B2 U B'`,
      `R2 B2 L' B R' B2 L2 U L' U B' R'`,
      `L2 B2 R B' L B2 R2 U' R U' B L`,
      `R2 B2 L' B R' B2 L2 U L' U B' R'`,
      `L2 B2 R B' L B2 R2 U' R U' B L`,
      `L F2 U2 F' U' R F U' F2 L' F R' F'`,
      `R' F2 U2 F U L' F' U F2 R F' L F`,
      `F' L' F U2 B' U2 B U2 R' F' L F R`,
      `B' U' R' U2 R U R' U' F R' F' R2 B`,
      `B U' F U2 B' U' B' R B2 U2 B' R' F'`,
      `B U L U2 L' U' L U F' L F L2 B'`,
      `B' U F' U2 B U B L' B2 U2 B L F`,
      `R' F2 U2 F U L' F' U F2 R F' L F`,
      `L F2 U2 F' U' R F U' F2 L' F R' F'`,
      `F' L' F U2 B' U2 B U2 R' F' L F R`
    ]
  },
  {
    id: 'o2',
    probability: 1 / 54,
    algs: [`F (R U R' U') F' f (R U R' U') f'`, `y (r U r') U2 R U2' R' U2 (r U' r')`],
    scrambles: [
      `F' L' B' U2 B2 L F' L2 B' L2 F2`,
      `L B' R2 F' R F2 R' F R2 B L'`,
      `L' F R2 B R' B2 R B' R2 F' L`,
      `L' U' L F R U B' R B R2 F'`,
      `L U L' B' R' U' F R' F' R2 B`,
      `B L F U2 F2 L' B L2 F L2 B2`,
      `B' U B2 D F' L' F D' B2 U' B`,
      `F U' F2 D' B L B' D F2 U F'`,
      `F R F' U2 B U2 B' U2 F R' F'`,
      `B' R' B U2 F' U2 F U2 B' R B`,
      `F' L F L' U' L2 B L B' U L`,
      `B L B2 D2 F R D F2 D B U' R2`,
      `F U2 B' R B2 U2 B' R' B U2 B' F'`,
      `L U F U2 F' L D R' F R D' L2`,
      `L F U2 R' F R F2 L' U B' U B`,
      `B2 D' F R F' D B R' U2 R U B`,
      `L U L' U B' R2 F R F' U2 R B`,
      `B L U' F U' F' L' B' U R' U R`,
      `L U F U' L' R U R' U' L F' L'`,
      `L' U' B' U L R' U' R U L' B L`
    ]
  }
];

export default ollCases;
