import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/pro-solid-svg-icons/faCircle';
import { faCircle as faEmptyCircle } from '@fortawesome/pro-regular-svg-icons/faCircle';

import { PREPARATION_STAGES } from '../../constants/timer';
import { generateArr } from '../../helpers/general';
import { getSize } from '../../helpers/theme';

const PrepartionCircles = ({ preparationStage }) =>
  generateArr(PREPARATION_STAGES).map(index => (
    <PrepartionCircle key={index}>
      <FontAwesomeIcon icon={index < preparationStage ? faCircle : faEmptyCircle} size="xs" />
    </PrepartionCircle>
  ));

PrepartionCircles.propTypes = {
  preparationStage: PropTypes.number.isRequired
};

const PrepartionCircle = styled.span`
  margin: 0 ${getSize('sm')};
`;

export default PrepartionCircles;
