import styled from 'styled-components';
import { darken, transparentize, desaturate } from 'polished';

const propColorMap = {
  primary: 'primary',
  danger: 'red',
  neutral: 'subtleFg',
  google: 'googleRed'
};

const Button = styled.button.attrs({
  color: props =>
    props.theme.colors[
      (props.disabled && 'grey') ||
        Object.keys(props).reduce((color, key) => propColorMap[key] || color, 'blue')
    ],
  height: props => (props.big ? '6.2rem' : props.tiny ? '2.6rem' : '4.2rem'),
  sidepadding: props => (props.big ? 'lg' : props.tiny ? 'sm' : 'md'),
  radius: props => (props.big ? '0.5rem' : '0.3rem')
})`
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  margin: 0;
  height: ${props => props.height};
  line-height: ${props => props.height};
  width: ${props => (props.tag ? 'auto' : '100%')};
  background-color: ${props => (props.empty ? 'transparent' : props.color)};
  padding: 0 ${props => props.theme.sizes[props.sidepadding]};
  font-size: ${props => (props.big ? '1.8rem' : props.tiny ? '1.2rem' : '1.4rem')};
  border: ${props => (props.empty ? `1px solid ${props.color}` : 'none')};
  border-radius: ${props => props.radius};
  color: ${props => (props.empty ? props.theme.colors.fg : 'white')};
  font-weight: normal;
  text-transform: uppercase;
  transition: background-color 0.2s ease;

  &:focus,
  &:hover {
    background-color: ${props =>
      props.empty
        ? transparentize(0.75, props.color)
        : desaturate(props.disabled ? 0 : 0.06, darken(props.disabled ? 0 : 0.06, props.color))};
  }
`;

const ButtonIcon = styled.span`
  margin-right: ${props => props.theme.sizes.sm};
`;

export { ButtonIcon };

export default Button;
