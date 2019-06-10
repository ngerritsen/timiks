import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../shared/Input';
import ManualTimeEntryExplanation from './ManualTimeEntryExplanation';
import { getColor, getSize, getFont } from '../../helpers/theme';

const TimeEntry = ({ value, onKeyPress, onChange }) => (
  <TimeInputContainer>
    <TimeInput
      type="text"
      placeholder="00:00.000"
      value={value}
      onKeyPress={onKeyPress}
      onChange={onChange}
    />
    <HelperText>
      Append <strong>+2</strong> for plus 2; enter <strong>dnf</strong> for a DNF &nbsp;
      <ManualTimeEntryExplanation />
    </HelperText>
  </TimeInputContainer>
);

TimeEntry.propTypes = {
  value: PropTypes.string.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

const TimeInputContainer = styled.div`
  position: relative;
`;

const HelperText = styled.p`
  position: absolute;
  font-size: 1.5rem;
  top: 7.2rem;
  margin: 0;
  color: ${getColor('subtleFg')};
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
`;

const TimeInput = Input.extend`
  display: block;
  font-size: 5.4rem;
  text-align: center;
  -webkit-appearance: none;
  height: 6rem;
  font-family: ${getFont('default')};
  padding: 0 ${getSize('xs')};
`;

export default TimeEntry;
