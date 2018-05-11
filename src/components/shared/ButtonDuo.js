import styled from 'styled-components';

export const ButtonDuo = styled.div`
  display: flex;
`;

export const ButtonDuoItem = styled.div`
  flex-grow: 1;
  margin-right: ${props => props.theme.sizes.xs};

  &:last-child {
    margin-right: 0;
  }
`;
