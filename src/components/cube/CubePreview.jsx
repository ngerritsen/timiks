import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { UP, RIGHT, DOWN, LEFT, FRONT, BACK } from "../../constants/puzzles";
import { layoutScramble } from "../../helpers/cube";
import CubeFace from "./CubeFace";
import { getSize, getColor } from "../../helpers/theme";
import Warning from "../shared/Warning";

const CUBE_LAYOUT = [
  [null, UP, null, null],
  [LEFT, FRONT, RIGHT, BACK],
  [null, DOWN, null, null],
];

const CubePreview = ({ scramble, cubeSize }) => {
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

CubePreview.propTypes = {
  cubeSize: PropTypes.number,
  scramble: PropTypes.string.isRequired,
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
