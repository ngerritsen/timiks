import styled from 'styled-components';
import { getColor } from '../../helpers/theme';

export const Table = styled.table`
  width: 100%;
  overflow: auto;
  border-spacing: 0;
  border-collapse: collapse;
`;

export const Cell = styled.td`
  text-align: ${props => (props.rightAlign ? 'right' : 'left')};
  border-top: 1px solid ${getColor('grey')};
  padding: 0.7rem 0;
`;

export const HeadingCell = styled.th`
  text-align: ${props => (props.rightAlign ? 'right' : 'left')};
  border-bottom: 2px solid ${getColor('grey')};
  font-weight: bold;
  padding: 0.7rem 0;
`;

export const SubtleHeadingCell = HeadingCell.extend`
  font-weight: normal;
`;
