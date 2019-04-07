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

const Archive = ({ times }) => (
  <div>
    <Section margin="xs">
      <TimeGraph times={times}/>
    </Section>
    <Section>
      <TimeTiles>
        {times.reverse().map((time, index) =>
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
            content={() => <TimeDetails time={time}/>}
          />
        )}
      </TimeTiles>
    </Section>
  </div>
);

Archive.propTypes = {
  times: PropTypes.arrayOf(CustomPropTypes.Time).isRequired
}

const DateTag = styled.div`
  position: absolute;
  top: ${props => props.theme.sizes.xs};
  left: ${props => props.theme.sizes.xs};
  font-size: 0.8em;
`;

const TimeTiles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: ${props => props.theme.sizes.xs};
  grid-row-gap: ${props => props.theme.sizes.xs};

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
