import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getLuminance, darken } from 'polished';

const Tag = ({ children, color, onClick }) => (
  <TagTag color={color} hoverable={Boolean(onClick)} onClick={e => onClick && onClick(e)}>
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

export default Tag;
