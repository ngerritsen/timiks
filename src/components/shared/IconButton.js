import styled from 'styled-components';

export default styled.button`
  border: none;
  background: transparent;
  padding: 0;
  color: ${props => props.theme.colors[props.color] || 'inherit'};
  cursor: pointer;

  &:focus,
  &:hover {
    opacity: 0.8;
  }
`;
