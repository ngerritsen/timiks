import styled from 'styled-components';
import { darken, transparentize, getLuminance } from 'polished';
import { getColor, getSize } from '../../helpers/theme';

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
  bg: props => getColor(props.color)(props) || getColor('blue')(props)
})`
  display: inline-block;
  text-align: center;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  margin: 0;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  font-weight: bold;
  height: ${props => sizeToHeight[props.size]};
  line-height: calc(${props => sizeToHeight[props.size]} - 0.1rem);
  width: ${props => (props.tag ? 'auto' : '100%')};
  background-color: ${props => (props.outline ? 'transparent' : props.bg)};
  padding: 0 ${props => sizeToPadding[props.size]};
  font-size: ${props => sizeToFontSize[props.size]};
  border: ${props => (props.outline ? `1px solid ${props.bg}` : 'none')};
  border-radius: ${props => sizeToRadius[props.size]};
  text-decoration: none;
  color: ${props =>
    props.outline
      ? getColor('fg')(props)
      : getLuminance(props.bg) > 0.5
      ? getColor('black')(props)
      : getColor('white')(props)};
  text-transform: uppercase;
  transition: background-color 0.2s ease;

  &:focus,
  &:hover {
    background-color: ${props =>
      props.outline ? transparentize(0.8, props.bg) : darken(props.disabled ? 0 : 0.1, props.bg)};
  }
`;

Button.defaultProps = {
  size: 'md',
  color: 'blue'
};

export const ButtonIcon = styled.span`
  color: ${props => getColor(props.color)(props) || 'inherit'};
  margin-right: ${getSize('xs')};
`;

export const LinkButton = Button.withComponent('a');
export const LabelButton = Button.withComponent('label');

export default Button;
