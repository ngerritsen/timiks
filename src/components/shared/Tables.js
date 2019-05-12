import styled from 'styled-components';

export const Tables = styled.table`
  width: 100%;
  overflow: auto;
  border-spacing: 0;
  border-collapse: collapse;
`;

export const Cell = styled.td`
  text-align: ${props => (props.rightAlign ? 'right' : 'left')};
  border-bottom: 1px solid ${props => props.theme.colors.grey};
  height: 3.6rem;
`;
