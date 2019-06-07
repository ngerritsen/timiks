import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import faCheck from '@fortawesome/fontawesome-pro-solid/faCheck';
import FontAwesome from '@fortawesome/react-fontawesome';

const Checkbox = ({ onChange, checked, inverse }) => {
  const isChecked = inverse ? !checked : checked;

  return (
    <CheckboxBox onClick={() => onChange(!isChecked)} checked={isChecked}>
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
  border: 1px solid ${props => (props.checked ? props.theme.colors.blue : props.theme.colors.grey)};
  background-color: ${props => (props.checked ? props.theme.colors.blue : props.theme.colors.bg)};
  color: ${props => props.theme.colors.white};
  cursor: pointer;

  &:hover {
    border: 1px solid
      ${props => (props.checked ? props.theme.colors.blue : props.theme.colors.subtleFg)};
  }
`;

Checkbox.propTypes = {
  checked: PropTypes.bool,
  inverse: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default Checkbox;
