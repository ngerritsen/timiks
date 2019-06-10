import styled from 'styled-components';
import { getSize, getColor } from '../../helpers/theme';

const Info = styled.span`
  font-size: 1.4rem;
  color: ${getColor('subtleFg')};
`;

export const InfoItem = styled.span`
  margin-right: ${getSize('sm')};
`;

export const InfoIcon = styled.span`
  margin-right: ${getSize('xxs')};
`;

export default Info;
