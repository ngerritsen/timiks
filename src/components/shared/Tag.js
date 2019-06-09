import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getLuminance, darken } from 'polished';
import FontAwesome from '@fortawesome/react-fontawesome';
import faCheckCircle from '@fortawesome/fontawesome-pro-solid/faCheckCircle';
import faCircle from '@fortawesome/fontawesome-pro-solid/faCircle';

const Tag = ({ children, color, withCheckbox, checked, onClick }) => (
  <TagTag color={color} hoverable={withCheckbox} onClick={e => onClick && onClick(e)}>
    {withCheckbox && (
      <TagCheck>
        <FontAwesome icon={checked ? faCircle : faCheckCircle} />
      </TagCheck>
    )}
    {children}
  </TagTag>
);

Tag.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  color: PropTypes.string,
  withCheckbox: PropTypes.bool,
  checked: PropTypes.bool,
  onClick: PropTypes.func
};

const TagTag = styled.span.attrs({
  bg: props => props.theme.colors[props.color] || props.theme.colors.grey
})`
  display: inline-block;
  position: relative;
  top: -0.1rem;
  height: 2.2rem;
  line-height: 2.15rem;
  left: ${props => props.theme.sizes.xxs};
  background-color: ${props => props.bg};
  color: ${props =>
    getLuminance(props.bg) > 0.5 ? props.theme.colors.black : props.theme.colors.white};
  padding: 0 ${props => props.theme.sizes.xs};
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 99rem;
  cursor: ${props => (props.hoverable ? 'pointer' : 'normal')};

  &:hover,
  &:focus {
    background-color: ${props => darken(props.hoverable ? 0.07 : 0, props.bg)};
  }
`;

const TagCheck = styled.span`
  position: relative;
  top: 0.1rem;
  margin-right: 0.2rem;
  left: -0.2rem;
`;

export default Tag;
