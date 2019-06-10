import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import faCheck from '@fortawesome/fontawesome-pro-solid/faCheck';
import FontAwesome from '@fortawesome/react-fontawesome';

import { getColor } from '../../helpers/theme';

const Checkbox = ({ onChange, checked, inverse }) => {
  const isChecked = inverse ? !checked : checked;

  return (
    <CheckboxBox onClick={() => onChange(!checked)} checked={isChecked}>
      {isChecked && <FontAwesome icon={faCheck} size="xs" />}
    </CheckboxBox>
  );
};

const CheckboxBox = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 1.5rem;
  width: 1.5rem;
  font-size: 0.8em;
  border-radius: 0.3rem;
  border: 1px solid ${props => getColor(props.checked ? 'blue' : 'grey')(props)};
  background-color: ${props => getColor(props.checked ? 'blue' : 'bg')(props)};
  color: ${getColor('white')};
  cursor: pointer;

  &:hover {
    border: 1px solid ${props => getColor(props.checked ? 'blue' : 'subtleFg')(props)};
  }
`;

Checkbox.propTypes = {
  checked: PropTypes.bool,
  inverse: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default Checkbox;
