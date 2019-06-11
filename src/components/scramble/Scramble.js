import styled from 'styled-components';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import * as CustomPropTypes from '../../propTypes';
import Section from '../shared/Section';
import { CUBE, RELAY } from '../../constants/puzzle';
import { getPuzzle } from '../../helpers/puzzle';
import { splitRelayScramble } from '../../helpers/scramble';
import CubePreview from '../cube/CubePreview';
import ScrambleDetails from './ScrambleDetails';
import { getColor, getSize, getFont } from '../../helpers/theme';

const Scramble = ({ scramble, withDetails, withPreview, puzzle, expand }) => {
  const isRelay = getPuzzle(puzzle).type === RELAY;
  const splitScrambles = isRelay ? splitRelayScramble(puzzle, scramble) : [{ scramble, puzzle }];

  const [activePuzzle, setActivePuzzle] = useState(splitScrambles[0].puzzle);
  const [scrambles, setScrambles] = useState(splitScrambles);

  useEffect(() => {
    setActivePuzzle(splitScrambles[0].puzzle);
    setScrambles(splitScrambles);
  }, [scramble, puzzle]);

  const { type, size } = getPuzzle(activePuzzle);
  const activeScramble = scrambles.find(s => s.puzzle === activePuzzle).scramble;
  const showPreview = withPreview && type === CUBE;
  const showDetails = withDetails && type === CUBE;

  return (
    <>
      <Section margin={showPreview ? 'md' : ''}>
        {isRelay && (
          <ScrambleTabs>
            {scrambles.map(({ puzzle }) => (
              <ScrambleTab
                onClick={() => setActivePuzzle(puzzle)}
                active={puzzle === activePuzzle}
                key={puzzle}
              >
                {getPuzzle(puzzle).title}
              </ScrambleTab>
            ))}
          </ScrambleTabs>
        )}
        <ScrambleBox withTabs={isRelay} expand={expand}>
          {showDetails && (
            <ScrambleIconButtonContainer>
              <ScrambleDetails scramble={activeScramble} puzzle={activePuzzle} />
            </ScrambleIconButtonContainer>
          )}
          {activeScramble.map((move, i) => (
            <Move key={i}>{move}</Move>
          ))}
        </ScrambleBox>
      </Section>
      {showPreview && <CubePreview cubeSize={size} scramble={activeScramble} />}
    </>
  );
};

Scramble.propTypes = {
  withDetails: PropTypes.bool,
  withPreview: PropTypes.bool,
  scramble: CustomPropTypes.Scramble,
  small: PropTypes.bool,
  puzzle: PropTypes.string,
  expand: PropTypes.bool
};

const ScrambleTabs = styled.div`
  display: flex;
  overflow-y: hidden;
  overflow-x: auto;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
`;

const ScrambleTab = styled.div`
  background-color: ${getColor('subtleBg')};
  opacity: ${props => (props.active ? 1 : 0.4)};
  padding: 0.6rem 1.2rem;
  font-size: 1.4rem;
  cursor: pointer;

  &:hover {
    opacity: ${props => (props.active ? 1 : 0.6)};
  }

  &:first-of-type {
    border-top-left-radius: 0.3rem;
  }

  &:last-of-type {
    border-top-right-radius: 0.3rem;
  }
`;

const ScrambleBox = styled.div`
  font-size: 1.8rem;
  text-align: center;
  font-family: ${getFont('mono')};
  line-height: 1.25;
  background-color: ${getColor('subtleBg')};
  padding: ${getSize('xs')};
  margin: 0;
  font-weight: bold;
  border-bottom-right-radius: 0.3rem;
  border-bottom-left-radius: 0.3rem;
  border-top-right-radius: ${props => (props.withTabs ? '0' : '0.3rem')};
  border-top-left-radius: ${props => (props.withTabs ? '0' : '0.3rem')};
  max-height: ${props => (props.expand ? '' : '14.5rem')};
  overflow-y: auto;
`;

const Move = styled.span`
  display: inline-block;
  whitespace: nowrap;
  margin-right: 0.5em;

  &:last-child {
    margin-right: 0;
  }
`;

const ScrambleIconButtonContainer = styled.span`
  float: right;
  display: inline-block;
  font-size: 1.8rem;
  margin: 0 ${getSize('xxs')};
`;

export default React.memo(Scramble);
