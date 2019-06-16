import styled from 'styled-components';
import { getSize, getColor } from '../../helpers/theme';

const Warning = styled.p`
  margin: 0;
  padding: ${getSize('xs')} ${getSize('sm')};
  background-color: ${getColor('orange')};
  color: ${getColor('white')};
  border-radius: 0.3rem;
`;

export default Warning;
