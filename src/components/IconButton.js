import styled from 'styled-components';

export default styled.button`
  border: none;
  background: transparent;
  opacity: 0.95;
  padding: 0;
  color: ${props => props.theme.colors[props.color] || 'inherit'};

  &:focus,
  &:hover {
    outline: none;
    opacity: 1;
    cursor: pointer;
  }
`
