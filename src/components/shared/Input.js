import styled from 'styled-components';
import { transparentize } from 'polished';
import { getColor, getSize } from '../../helpers/theme';

const Input = styled.input`
  background: transparent;
  box-shadow: none;
  -webkit-appearance: none;
  width: 100%;
  font-size: 1.5rem;
  color: ${getColor('fg')};
  border: 1px solid ${getColor('grey')};
  border-radius: 0.3rem;
  padding: ${getSize('xs')};
  margin: 0;

  &:focus {
    outline: none;
    border: 1px solid ${props => transparentize(0.2, getColor('blue')(props))};
  }
`;

export default Input;
