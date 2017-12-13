import styled from 'styled-components';

const Button = styled.button`
  margin: 0 0 1rem;
  height: 6rem;
  line-height: 6rem;
  width: 100%;
  background-color: ${props => props.theme.colors.blue};
  padding: 0 4rem;
  font-size: 1.8rem;
  border: none;
  border-radius: 0.4rem;
  color: white;
  font-weight: bold;

  &:hover {
    background-color: ${props => props.theme.colors.blue};
    cursor: pointer;
  }
`;

export default Button;
