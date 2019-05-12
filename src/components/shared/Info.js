import styled from 'styled-components';

const Info = styled.span`
  font-size: 1.4rem;
  color: ${props => props.theme.colors.subtleFg};
`;

export const InfoItem = styled.span`
  margin-right: ${props => props.theme.sizes.sm};
`;

export const InfoIcon = styled.span`
  margin-right: ${props => props.theme.sizes.xxs};
`;

export default Info;
