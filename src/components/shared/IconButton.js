import styled from 'styled-components';

export default styled.button`
  border: none;
  background: transparent;
  opacity: 0.9;
  padding: 0;
  color: ${props => props.theme.colors[props.color] || 'inherit'};

  &:focus,
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;
