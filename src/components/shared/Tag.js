import styled from 'styled-components';
import { getLuminance } from 'polished';

const Tag = styled.span.attrs({
  bg: props => props.theme.colors[props.color] || props.theme.colors.grey
})`
  display: inline-block;
  position: relative;
  top: -0.1rem;
  height: 2.2rem;
  line-height: 2.15rem;
  left: ${props => props.theme.sizes.xxs};
  background-color: ${props => props.bg};
  color: ${props =>
    getLuminance(props.bg) > 0.5 ? props.theme.colors.black : props.theme.colors.white};
  padding: 0 ${props => props.theme.sizes.xs};
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 99rem;
`;

export default Tag;
