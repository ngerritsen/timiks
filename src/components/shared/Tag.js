import styled from 'styled-components';

const Tag = styled.span`
  position: relative;
  top: -0.1rem;
  left: ${props => props.theme.sizes.xxs};
  background-color: ${props => props.theme.colors.grey};
  color: white;
  padding: 0.15rem ${props => props.theme.sizes.xs};
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 99rem;
`;

export default Tag;
