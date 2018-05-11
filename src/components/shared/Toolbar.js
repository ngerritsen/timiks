import styled from 'styled-components';

export const Toolbar = styled.p`
  text-align: right;
  font-size: 1.75rem;
  margin: 0;
`;

export const ToolbarItem = styled.span`
  margin-left: ${props => props.theme.sizes.xs};
`;
