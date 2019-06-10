import styled from 'styled-components';
import { getSize } from '../../helpers/theme';

const Section = styled.div`
  margin-bottom: ${props => (props.margin ? getSize(props.margin)(props) : 0)};
  text-align: ${props => props.textAlign || 'inherit'};
  position: relative;
`;

export default Section;
