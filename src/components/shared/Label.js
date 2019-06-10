import styled from 'styled-components';
import { getSize, getColor } from '../../helpers/theme';

const Label = styled.label`
  display: block;
  font-size: 0.9em;
  color: ${getColor('subtleFg')};
  margin-bottom: ${getSize('xxs')};
`;

export default Label;
