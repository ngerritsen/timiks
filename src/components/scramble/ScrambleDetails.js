import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CubePreview from '../cube/CubePreview';
import Scramble from './Scramble';
import Section from '../shared/Section';
import { CUBE } from '../../constants/puzzle';
import { getPuzzle } from '../../helpers/puzzle';

const ScrambleDetails = ({ puzzle, scramble }) => (
  <div>
    <Section margin="md">
      <Scramble scramble={scramble} expand />
    </Section>
    {getPuzzle(puzzle).type === CUBE ? (
      <CubePreview cubeSize={getPuzzle(puzzle).size} scramble={scramble} />
    ) : (
      <Message>Scramble previews are only available for cubic puzzles.</Message>
    )}
  </div>
);

ScrambleDetails.propTypes = {
  puzzle: PropTypes.string.isRequired,
  scramble: PropTypes.arrayOf(PropTypes.string).isRequired
};

const Message = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.subtleFg};
`;

export default ScrambleDetails;
