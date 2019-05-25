import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { faCaretDown } from '@fortawesome/fontawesome-pro-solid';
import FontAwesome from '@fortawesome/react-fontawesome';

const Selector = ({ onChange, options, value, numeric }) => (
  <SelectContainer>
    <SelectIcon>
      <FontAwesome icon={faCaretDown} />
    </SelectIcon>
    <Select
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
    </Select>
  </SelectContainer>
);

const SelectContainer = styled.span`
  display: inline-block;
  position: relative;
`;

const Select = styled.select`
  display: inline-block;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  font-size: 1.4rem;
  height: 2.6rem;
  border-radius: 0.4rem;
  box-sizing: border-box;
  margin-left: ${props => props.theme.sizes.xs};
  padding: 0 ${props => props.theme.sizes.lg} 0 ${props => props.theme.sizes.xs};
  border: 1px solid ${props => props.theme.colors.grey};
  color: ${props => props.theme.colors.fg};
  background-color: ${props => props.theme.colors.bg};

  &::-ms-expand {
    display: none;
  }

  &:hover {
    border-color: ${props => props.theme.colors.subtleFg};
  }

  &:focus {
    border-color: ${props => props.theme.colors.blue};
    box-shadow: 0 0 0 1px ${props => props.theme.colors.blue};
    box-shadow: 0 0 0 1px -moz-mac-focusring;
    color: ${props => props.theme.colors.fg};
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

Selector.propTypes = {
  label: PropTypes.string.isRequired,
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

export default Selector;
