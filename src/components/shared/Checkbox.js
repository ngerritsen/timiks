import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { faCheck } from '@fortawesome/pro-solid-svg-icons/faCheck';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getColor, getSize } from '../../helpers/theme';

const Checkbox = ({ onChange, checked, inverse, name, label }) => {
  const isChecked = inverse ? !checked : checked;

  return (
    <Label htmlFor={name}>
      <HiddenCheckbox
        id={name}
        checked={isChecked}
        onChange={() => onChange(!checked)}
        type="checkbox"
      />
      <CheckboxBox name={name} checked={isChecked}>
        <CheckboxCheck>{isChecked && <FontAwesomeIcon icon={faCheck} size="xs" />}</CheckboxCheck>
      </CheckboxBox>
      {label && <TextLabel>{label}</TextLabel>}
    </Label>
  );
};

const HiddenCheckbox = styled.input`
  display: none;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const TextLabel = styled.span`
  margin-left: ${getSize('xs')};
`;

const CheckboxCheck = styled.div`
  position: absolute;
  top: -0.32rem;
  left: 0.15rem;
  height: 1.1rem;
  width: 1.1rem;
  font-size: 1.3rem;
  text-align: center;
`;

const CheckboxBox = styled.div`
  position: relative;
  height: 1.5rem;
  width: 1.5rem;
  overflow: hidden;
  border-radius: 0.3rem;
  border: 1px solid ${props => getColor(props.checked ? 'blue' : 'grey')(props)};
  background-color: ${props => getColor(props.checked ? 'blue' : 'bg')(props)};
  color: ${getColor('white')};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    border: 1px solid ${props => getColor(props.checked ? 'blue' : 'subtleFg')(props)};
  }
`;

Checkbox.propTypes = {
  checked: PropTypes.bool,
  inverse: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  label: PropTypes.string
};

export default Checkbox;
