import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { PREPARATION_STAGES } from '../../constants/app';
import { generateArr } from '../../helpers/general';
import { getSize } from '../../helpers/theme';

const PrepartionCircles = ({ preparationStage }) =>
  generateArr(PREPARATION_STAGES).map(index => (
    <PrepartionCircle key={index} active={index < preparationStage} />
  ));

PrepartionCircles.propTypes = {
  preparationStage: PropTypes.number.isRequired
};

const PrepartionCircle = styled.span`
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 0.6rem;
  line-height: 1.6rem;
  background-color: white;
  opacity: ${props => (props.active ? 1 : 0.3)};
  margin: 0 ${getSize('sm')};
`;

export default PrepartionCircles;
