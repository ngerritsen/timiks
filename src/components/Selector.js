import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Selector = ({ label, onChange, options, value }) => (
  <span>
    <label>{label}:</label>
    <Select value={value} onChange={event => onChange(event.target.value)}>
      {options.map(({ label, value }, index) =>
        <option key={index} value={value}>
          {label}
        </option>
      )}
    </Select>
  </span>
);

const Select = styled.select`
  font-size: 1.4rem;
  height: 1.8em;
  margin-left: ${props => props.theme.sizes.xs};

  &:hover {
    cursor: pointer;
  }
`;

Selector.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired,
  value: PropTypes.string.isRequired

};

export default Selector;
