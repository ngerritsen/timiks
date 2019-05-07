import React from 'react';
import PropTypes from 'prop-types';
import { darken } from 'polished';

import * as CustomPropTypes from '../../propTypes';
import styled from 'styled-components';
import TimeDetails from '../timeTable/TimeDetails';
import TimeGraph from '../timeTable/TimeGraph';
import Section from '../shared/Section';
import ModalContainer from '../../containers/shared/ModalContainer';
import { fillZeroes } from '../../helpers/formatting';
import Time from '../shared/Time';
import ArchiveOptions from './ArchiveOptions';

const Archive = ({ times, stats, changePuzzle, puzzle, removeArchivedTime }) => (
  <div>
    <Section margin="sm">
      <ArchiveOptions changePuzzle={changePuzzle} puzzle={puzzle} />
    </Section>
    {
      times.length === 0 &&
      <Message>No {puzzle} solves in the archive.</Message>
    }
    {
      times.length > 1 && 
      <Section margin="xs">
        <TimeGraph times={times} stats={stats} />
      </Section>
    }
    {
      times.length > 0 &&
      <Section>
      <TimeTiles>
        {times.map((time, index) =>
          <ModalContainer
            key={index}
            title="Details"
            id={'timeDetails.' + time.id}
            toggle={openModal => (
              <TimeTile onClick={openModal}>
                <DateTag>{fillZeroes(String(time.date.getMonth()), 2)}/{fillZeroes(String(time.date.getDate()), 2)}</DateTag>
                <strong><Time time={time}/></strong>
              </TimeTile>
            )}
            content={(close) => <TimeDetails time={time} onRemoveTime={() => {
              close();
              removeArchivedTime(time.id);
            }}/>}
          />
        )}
      </TimeTiles>
    </Section>
    }
  </div>
);

Archive.propTypes = {
  times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired,
  stats: PropTypes.object.isRequired,
  changePuzzle: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired,
  removeArchivedTime: PropTypes.func.isRequired
}

const Message = styled.p`
  color: ${props => props.theme.colors.grey};
  font-weight: bold;
  padding: ${props => props.theme.sizes.lg} 0;
  text-align: center;
`;

const DateTag = styled.div`
  position: absolute;
  top: ${props => props.theme.sizes.xs};
  left: ${props => props.theme.sizes.xs};
  font-size: 0.8em;
`;

const TimeTiles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: ${props => props.theme.sizes.xs};
  grid-row-gap: ${props => props.theme.sizes.xs};

  @media screen and (min-width: 620px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
`;

const TimeTile = styled.div`
  position: relative;
  text-align: center;
  padding: ${props => props.theme.sizes.md} ${props => props.theme.sizes.sm};
  background-color: ${props => props.theme.colors.subtleBg};
  border-radius: 3px;
  cursor: pointer;

  :hover {
    background-color: ${props => darken(0.1, props.theme.colors.subtleBg)};
  }
`;

export default Archive;
