import React from 'react';
import PropTypes from 'prop-types';
import { darken, lighten } from 'polished';

import puzzles from '../../constants/puzzles';
import * as CustomPropTypes from '../../propTypes';
import styled from 'styled-components';
import TimeDetails from '../timeTable/TimeDetails';
import TimeGraph from '../timeTable/TimeGraph';
import Section from '../shared/Section';
import Time from '../shared/Time';
import ArchiveOptions from './ArchiveOptions';
import Modal from '../shared/Modal';
import ToggleContent from '../ToggleContent';
import CloudSyncIcon from '../shared/CloudSyncIcon';
import { formatLocalDate, formatLocalTime } from '../../helpers/dateTime';

const Archive = ({ times, stats, changePuzzle, puzzle, removeTime, timesPerDay }) => (
  <div>
    <Section margin="sm">
      <ArchiveOptions changePuzzle={changePuzzle} puzzle={puzzle} />
    </Section>
    {times.length === 0 && (
      <Message>No {puzzles.find(p => p.name === puzzle).title} solves in the archive.</Message>
    )}
    {times.length > 1 && <TimeGraph times={times} stats={stats} />}
    {timesPerDay.length > 0 && (
      <Section>
        {timesPerDay.map(({ date, times }) => (
          <div key={date.toISOString()}>
            <h3>{formatLocalDate(date)}</h3>
            <TimeTiles>
              {times.map(time => (
                <ToggleContent
                  key={time.id}
                  toggle={({ show }) => (
                    <TimeTile onClick={show}>
                      <TimeTileTime>
                        <Time time={time} />
                      </TimeTileTime>
                      <DateTag>{formatLocalTime(time.date)}</DateTag>
                      {time.stored && (
                        <SyncStatusIcon>
                          <CloudSyncIcon time={time} size="xs" />
                        </SyncStatusIcon>
                      )}
                    </TimeTile>
                  )}
                  content={({ hide }) => (
                    <Modal title="Details" onClose={hide}>
                      <TimeDetails
                        time={time}
                        onClose={hide}
                        onRemoveTime={() => {
                          hide();
                          removeTime(time.id);
                        }}
                      />
                    </Modal>
                  )}
                />
              ))}
            </TimeTiles>
          </div>
        ))}
      </Section>
    )}
  </div>
);

Archive.propTypes = {
  times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired,
  timesPerDay: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date),
      times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired
    })
  ).isRequired,
  stats: PropTypes.object.isRequired,
  changePuzzle: PropTypes.func.isRequired,
  puzzle: PropTypes.string.isRequired,
  removeTime: PropTypes.func.isRequired
};

const Message = styled.p`
  color: ${props => props.theme.colors.grey};
  font-weight: bold;
  padding: 15vh 0;
  text-align: center;
`;

const TimeTileTime = styled.strong`
  position: relative;
  top: 0.3rem;
`;

const DateTag = styled.div`
  font-size: 0.7em;
  opacity: 0.7;
  margin-top: 0.3rem;
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

const SyncStatusIcon = styled.span`
  position: absolute;
  font-size: 0.9em;
  top: 0.2rem;
  right: 0.5rem;
`;

const TimeTile = styled.div`
  position: relative;
  text-align: center;
  border: 1px solid ${props => props.theme.colors.grey};
  padding: ${props => props.theme.sizes.sm};
  border-radius: 3px;
  cursor: pointer;

  :hover {
    background-color: ${props =>
      (props.theme.dark ? lighten : darken)(0.075, props.theme.colors.bg)};
  }
`;

export default Archive;
