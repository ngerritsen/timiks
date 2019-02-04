import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from '@fortawesome/react-fontawesome';
import { faTimes, faThumbsUp, faInfoCircle, faQuestionCircle } from '@fortawesome/fontawesome-pro-solid';

import * as CustomPropTypes from '../../propTypes';
import Time from '../shared/Time';
import TimeGraph from './TimeGraph';
import ModalContainer from '../../containers/shared/ModalContainer';
import IconButton from '../shared/IconButton';
import TimeDetails from './TimeDetails';
import Section from '../shared/Section';
import Tag from '../shared/Tag';

const STATS = ['ao5', 'ao12', 'ao25', 'ao50', 'ao100', 'mo3'];

const TimeTable = ({ stats, editable = true, removeTime, times, zeroBasedGraph }) => {
  const noDnfTimes = times.filter(time => !time.dnf);
  const showGraph = noDnfTimes.length > 1;

  return (
    <TimeTableContainer>
      <TimeTableColumn>
        <Table>
          <thead>
            <tr>
              <HeadingCell>
                Stats
              </HeadingCell>
              <SubtleHeadingCell>
                Current
              </SubtleHeadingCell>
              <SubtleHeadingCell>
                Best
              </SubtleHeadingCell>
              <HeadingCell rightAlign>
                <ModalContainer
                  title="Stats"
                  id="statsInfo"
                  toggle={openModal => (
                    <QuestionIconButton onClick={openModal}>
                      <FontAwesome icon={faQuestionCircle} size="sm" />
                    </QuestionIconButton>
                  )}
                  content={() => (
                    <Section margin="sm">
                      <p>After 2 valid solves (excluding DNF{`'`}s) a trend graph will be shown.</p>

                      <p>When a minimum of 3 solves are present the mean of 3 (<strong>mo3</strong>) will be shown (best average of 3 consecutive solves).</p>

                      <p>After 5 solves the average of the <i>last</i> 5 solves (without the best and the worst solve) will be shown (<strong>ao5</strong>). After that it will continue with: <strong>ao12, ao25, ao50* and ao100*</strong>.</p>

                      <i>*The a50 will exclude the best and worst 3 solves, the ao100 will exclude 5.</i>
                    </Section>
                  )}
                />
              </HeadingCell>
            </tr>
          </thead>
          <tbody>
            {
              (STATS.filter(stat => stats[stat]).length === 0 && !showGraph) &&
              <tr>
                <Cell colSpan="2">
                  <i>Not enough solves yet.</i>
                </Cell>
              </tr>
            }
            {
              STATS
                .filter(stat => stats[stat])
                .map(stat => {
                  const { current, best } = stats[stat];

                  return (
                    <tr key={stat}>
                      <Cell>
                        <TimeIndex>{stat}</TimeIndex>
                      </Cell>
                      <Cell>
                        <strong>
                          <Time
                            time={{
                              ms: current === 'DNF' ? Infinity : current,
                              dnf: current === 'DNF'
                            }}
                          />
                        </strong>
                      </Cell>
                      <Cell colSpan="2">
                        <strong>
                          <Time
                            time={{
                              ms: best === 'DNF' ? Infinity : best,
                              dnf: best === 'DNF'
                            }}
                          />
                        </strong>
                      </Cell>
                    </tr>
                  );
                })
            }
          </tbody>
        </Table>
        {
          showGraph &&
          <Section margin="xs">
            <GraphContainer>
              <TimeGraph times={noDnfTimes} zeroBased={zeroBasedGraph}/>
            </GraphContainer>
          </Section>
        }
      </TimeTableColumn>
      <TimeTableColumn>
        <Table>
          <thead>
            <tr>
              <HeadingCell colSpan="3">
                Times <Tag>{times.length}</Tag>
              </HeadingCell>
            </tr>
          </thead>
          <tbody>
            {times.map((time, index) => (
              <tr key={index}>
                <Cell>
                  <TimeIndex>{index + 1}.</TimeIndex>
                </Cell>
                <Cell>
                  <Time time={time}/>
                  {
                    (time.best && times.length > 1) &&
                    <TimeInfo>
                      <BestTimeIcon><FontAwesome icon={faThumbsUp}/></BestTimeIcon>
                    </TimeInfo>
                  }
                </Cell>
                <Cell rightAlign>
                  <ModalContainer
                    title="Details"
                    id={'timeDetails.' + time.id}
                    toggle={openModal => (
                      <InfoIconButton onClick={openModal}>
                        <FontAwesome icon={faInfoCircle} size="sm" />
                      </InfoIconButton>
                    )}
                    content={() => <TimeDetails time={time}/>}
                  />
                  {
                    editable &&
                    <RemoveItemIconButton onClick={() => removeTime(time.id)}>
                      <FontAwesome icon={faTimes} size="sm" />
                    </RemoveItemIconButton>
                  }
                </Cell>
              </tr>
            ))}
          </tbody>
        </Table>
      </TimeTableColumn>
    </TimeTableContainer>
  )
}

TimeTable.propTypes = {
  stats: PropTypes.object.isRequired,
  editable: PropTypes.bool,
  removeTime: PropTypes.func,
  zeroBasedGraph: PropTypes.bool,
  times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired
};

const TimeTableContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 512px) {
    flex-direction: row;
  }
`;

const TimeTableColumn = styled.div`
  margin-bottom: ${props => props.theme.sizes.sm};
  overflow: auto;

  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (min-width: 512px) {
    width: 50%;
    margin-right: ${props => props.theme.sizes.md};
    margin-bottom: 0;

    &:last-child {
      margin-right: 0;
    }
  }
}
`;

const GraphContainer = styled.div`
  padding-top: ${props => props.theme.sizes.sm};
  border-bottom: 1px solid ${props => props.theme.colors.grey};
`;

const Table = styled.table`
  width: 100%;
  overflow: auto;
  border-spacing: 0;
  border-collapse: collapse;
`;

const Cell = styled.td`
  text-align: ${props => props.rightAlign ? 'right' : 'left'};
  border-bottom: 1px solid ${props => props.theme.colors.grey};
  height: 3.6rem;
`;

const HeadingCell = styled.th`
  text-align: ${props => props.rightAlign ? 'right' : 'left'};
  border-bottom: 2px solid ${props => props.theme.colors.grey};
  height: 3.6rem;
  font-weight: bold;
`;

const SubtleHeadingCell = HeadingCell.extend`
  font-weight: normal;
`;

const TimeInfo = styled.small`
  padding-left: ${props => props.theme.sizes.xs};
  color: ${props => props.theme.colors.subtleFg};
  font-size: 1.5rem;
`;

const TimeIndex = styled.span`
  color: ${props => props.theme.colors.subtleFg};
`;

const BestTimeIcon = styled.span`
  color: ${props => props.theme.colors.green};
`;

const InfoIconButton = IconButton.extend`
  color: ${props => props.theme.colors.blue};
`;

const QuestionIconButton = IconButton.extend`
  color: ${props => props.theme.colors.blue};
  margin-left: ${props => props.theme.sizes.xs};
`;

const RemoveItemIconButton = IconButton.extend`
  margin-left: 1rem;
  color: ${props => props.theme.colors.red};
`;

export default TimeTable;
