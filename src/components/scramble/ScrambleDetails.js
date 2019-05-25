import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getPuzzleSize, isCube } from '../../helpers/puzzle';
import CubePreview from '../cube/CubePreview';
import Scramble from './Scramble';
import Section from '../shared/Section';

const ScrambleDetails = ({ puzzle, scramble }) => (
  <div>
    <Section margin="md">
      <Scramble scramble={scramble} expand />
    </Section>
    {isCube(puzzle) ? (
      <CubePreview cubeSize={getPuzzleSize(puzzle)} scramble={scramble} />
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
