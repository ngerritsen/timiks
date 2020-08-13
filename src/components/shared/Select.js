import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSize, getColor } from '../../helpers/theme';

const Select = ({ onChange, options, value, numeric }) => (
  <SelectContainer>
    <SelectIcon>
      <FontAwesomeIcon icon={faCaretDown} />
    </SelectIcon>
    <SelectInput
      value={value}
      onChange={event => {
        const value = event.target.value;
        onChange(numeric ? Number(value) : value);
      }}
    >
      {options.map(({ label, value }, index) => (
        <option key={index} value={value}>
          {label}
        </option>
      ))}
    </SelectInput>
  </SelectContainer>
);

const SelectContainer = styled.span`
  display: block;
  position: relative;
`;

const SelectInput = styled.select`
  display: flex;
  align-items: center;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  font-size: 1.4rem;
  height: 2.6rem;
  border-radius: 0.4rem;
  box-sizing: border-box;
  padding: 0 ${getSize('lg')} 0 ${getSize('xs')};
  border: 1px solid ${getColor('grey')};
  color: ${getColor('fg')};
  background-color: ${getColor('bg')};

  &::-ms-expand {
    display: none;
  }

  &:hover {
    border-color: ${getColor('subtleFg')};
  }

  &:focus {
    border-color: ${getColor('blue')};
    box-shadow: 0 0 0 1px ${getColor('blue')};
    box-shadow: 0 0 0 1px -moz-mac-focusring;
    color: ${getColor('fg')};
    outline: none !important;
  }

  &:hover {
    cursor: pointer;
  }
`;

const SelectIcon = styled.div`
  pointer-events: none;
  position: absolute;
  font-size: 0.9em;
  right: 1rem;
  top: 0.5rem;
`;

Select.propTypes = {
  fullWidth: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  numeric: PropTypes.bool
};

export default Select;
