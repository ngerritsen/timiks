import React from "react";
import styled from "styled-components";

import { layoutScramble } from "../../helpers/cube";
import CubeFace from "./CubeFace";
import { getSize, getColor } from "../../helpers/theme";
import Warning from "../shared/Warning";
import { CubeDirection } from "../../types";

const CUBE_LAYOUT: (CubeDirection | null)[][] = [
  [null, "U", null, null],
  ["L", "F", "R", "B"],
  [null, "D", null, null],
];

type CubePreviewProps = {
  cubeSize?: number;
  scramble: string;
};

const CubePreview = ({ scramble, cubeSize }: CubePreviewProps) => {
  const cube = layoutScramble(scramble, cubeSize);

  if (!cube) {
    return <Warning>Invalid scramble for cube preview.</Warning>;
  }

  return (
    <>
      <CubePreviewScrollContainer>
        <CubePreviewContainer>
          {CUBE_LAYOUT.map((row, y) => (
            <Row key={y}>
              {row.map((face, x) => (
                <Col key={x}>
                  <CubeFace
                    key={x}
                    cubeSize={cubeSize}
                    tiles={face !== null ? cube[face] : []}
                  />
                </Col>
              ))}
            </Row>
          ))}
        </CubePreviewContainer>
      </CubePreviewScrollContainer>
      <Note>
        * Scrambled <strong>white</strong> up, <strong>green</strong> front.
      </Note>
    </>
  );
};

const Col = styled.div`
  width: 9rem;
  height: 9rem;
  margin-right: ${getSize("xs")};
`;

const CubePreviewScrollContainer = styled.div`
  overflow-x: auto;
  text-align: center;
`;

const CubePreviewContainer = styled.div`
  display: inline-block;
`;

const Note = styled.span`
  display: block;
  margin-top: ${getSize("xs")};
  color: ${getColor("subtleFg")};
  text-align: left;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: ${getSize("xs")};
`;

export default CubePreview;
