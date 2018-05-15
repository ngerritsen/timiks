import styled from 'styled-components';

const Tag = styled.span`
  background-color: ${props => props.theme.colors[props.color || 'blue']};
  color: white;
  padding: 0.2rem ${props => props.theme.sizes.xs};
  text-align: center;
  font-size: 1.3rem;
  font-weight: bold;
  border-radius: 99rem;
`;

export default Tag;
