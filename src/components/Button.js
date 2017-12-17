import styled from 'styled-components';
import { lighten } from 'polished';

const propColorMap = {
  primary: 'primary',
  danger: 'red'
}

const Button = styled.button.attrs({
  color: props => (
    (props.disabled && 'grey') ||
    Object.keys(props)
      .reduce((color, key) => (propColorMap[key] || color), 'blue')
  ),
  fontSize: props => props.big ? '1.8rem': '1.4rem',
  height: props => props.big ? '6.2rem' : '3.6rem',
  sidepadding: props => props.big ? 'lg' : 'md',
  radius: props => props.big ? '0.5rem' : '0.3rem'
})`
  margin: 0;
  height: ${props => props.height};
  line-height: ${props => props.height};
  width: 100%;
  background-color: ${props => props.theme.colors[props.color]};
  padding: 0 ${props => props.theme.sizes[props.sidepadding]};
  font-size: ${props => props.fontSize};
  border: none;
  border-radius: ${props => props.radius};
  color: white;
  font-weight: normal;
  text-transform: uppercase;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => lighten(props.disabled ? 0 : 0.03, props.theme.colors[props.color])};
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
  }
`;

export default Button;
