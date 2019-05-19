import React from 'react';
import PropTypes from 'prop-types';
import { darken, lighten } from 'polished';
import moment from 'moment';

import * as CustomPropTypes from '../../propTypes';
import styled from 'styled-components';
import TimeDetails from '../timeTable/TimeDetails';
import TimeGraph from '../timeTable/TimeGraph';
import Section from '../shared/Section';
import Time from '../shared/Time';
import ArchiveOptions from './ArchiveOptions';
import Modal from '../shared/Modal';
import ToggleContent from '../ToggleContent';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faCloud, faCloudUpload } from '@fortawesome/fontawesome-pro-solid';
import WithAuthentication from '../../containers/WithAuthentication';

const Archive = ({ times, stats, changePuzzle, puzzle, removeTime, timesPerDay }) => (
  <div>
    <Section margin="sm">
      <ArchiveOptions changePuzzle={changePuzzle} puzzle={puzzle} />
    </Section>
    {times.length === 0 && <Message>No {puzzle} solves in the archive.</Message>}
    {times.length > 1 && (
      <Section margin="xs">
        <TimeGraph times={times} stats={stats} />
      </Section>
    )}
    {timesPerDay.length > 0 && (
      <Section>
        {timesPerDay.map(({ date, times }) => (
          <div key={date.toISOString()}>
            <h3>{moment(date).format('LL')}</h3>
            <TimeTiles>
              {times.map(time => (
                <ToggleContent
                  key={time.id}
                  toggle={({ show }) => (
                    <TimeTile onClick={show}>
                      <strong>
                        <Time time={time} />
                      </strong>
                      <DateTag>{moment(time.date).format('LT')}</DateTag>
                      <WithAuthentication>
                        {({ isLoggedIn }) =>
                          isLoggedIn ? (
                            <SyncStatusIcon stored={time.stored}>
                              <FontAwesome
                                icon={time.stored && !time.dirty ? faCloud : faCloudUpload}
                                size="xs"
                              />
                            </SyncStatusIcon>
                          ) : null
                        }
                      </WithAuthentication>
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
  padding: ${props => props.theme.sizes.lg} 0;
  text-align: center;
`;

const DateTag = styled.div`
  font-size: 0.7em;
  opacity: 0.7;
  margin-top: 0.4rem;
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
  color: ${props => (props.stored ? props.theme.colors.cloudBlue : props.theme.colors.grey)};
  top: 0.1rem;
  right: 0.5rem;
`;

const TimeTile = styled.div`
  position: relative;
  text-align: center;
  border: 1px solid ${props => props.theme.colors.grey};
  padding: ${props => props.theme.sizes.sm} ${props => props.theme.sizes.sm};
  border-radius: 3px;
  cursor: pointer;

  :hover {
    background-color: ${props =>
      (props.theme.dark ? lighten : darken)(0.075, props.theme.colors.bg)};
  }
`;

export default Archive;
