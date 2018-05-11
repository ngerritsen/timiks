import styled from 'styled-components';
import { transparentize } from 'polished';

const Input = styled.input`
  background: transparent;
  width: 100%;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.fg};
  border: 1px solid ${props => props.theme.colors.subtleBg};
  border-radius: 0.3rem;
  padding: ${props => props.theme.sizes.xs};
  margin: 0;

  &:hover {
    border: 1px solid ${props => props.theme.colors.grey};
  }

  &:focus {
    outline: none;
    border: 1px solid ${props => transparentize(0.2, props.theme.colors.blue)};
  }
`;

export default Input;
