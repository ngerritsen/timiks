import styled from 'styled-components';
import { lighten } from 'polished';

const Button = styled.button`
  margin: 0;
  height: 6rem;
  line-height: 6rem;
  width: 100%;
  background-color: ${props => props.theme.colors.primary};
  padding: 0 ${props => props.theme.sizes.lg};
  font-size: 1.8rem;
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-weight: normal;
  text-transform: uppercase;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => lighten(0.02, props.theme.colors.primary)};
    cursor: pointer;
  }
`;

export default Button;
