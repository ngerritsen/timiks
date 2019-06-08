import styled from 'styled-components';
import { darken, transparentize, desaturate } from 'polished';

const sizeToHeight = {
  sm: '2.6rem',
  md: '4.2rem',
  lg: '6.2rem'
};

const sizeToRadius = {
  sm: '0.3rem',
  md: '0.3rem',
  lg: '0.5rem'
};

const sizeToPadding = {
  sm: '1.2rem',
  md: '1.4rem',
  lg: '1.8rem'
};

const sizeToFontSize = {
  sm: '1.2rem',
  md: '1.4rem',
  lg: '1.8rem'
};

const Button = styled.button.attrs({
  color: props => props.theme.colors[(props.disabled && 'grey') || props.color]
})`
  display: inline-block;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  margin: 0;
  font-weight: bold;
  height: ${props => sizeToHeight[props.size]};
  line-height: calc(${props => sizeToHeight[props.size]} - 0.1rem);
  width: ${props => (props.tag ? 'auto' : '100%')};
  background-color: ${props => (props.outline ? 'transparent' : props.color)};
  padding: 0 ${props => sizeToPadding[props.size]};
  font-size: ${props => sizeToFontSize[props.size]};
  border: ${props => (props.outline ? `1px solid ${props.color}` : 'none')};
  border-radius: ${props => sizeToRadius[props.size]};
  color: ${props => (props.outline ? props.theme.colors.fg : 'white')};
  text-transform: uppercase;
  transition: background-color 0.2s ease;

  &:focus,
  &:hover {
    background-color: ${props =>
      props.outline
        ? transparentize(0.75, props.color)
        : desaturate(props.disabled ? 0 : 0.06, darken(props.disabled ? 0 : 0.06, props.color))};
  }
`;

Button.defaultProps = {
  size: 'md',
  color: 'blue'
};

const ButtonIcon = styled.span`
  margin-right: ${props => props.theme.sizes.xs};
`;

const LinkButton = Button.withComponent('a');

export { ButtonIcon, LinkButton };

export default Button;
