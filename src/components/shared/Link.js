import styled from 'styled-components';
import { getSize, getColor } from '../../helpers/theme';

const Link = styled.a`
  margin: ${getSize('xs')} 0 0;
  font-size: 1.4rem;
  color: ${getColor('blue')};
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

export default Link;
