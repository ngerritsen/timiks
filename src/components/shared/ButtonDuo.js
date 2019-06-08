import styled from 'styled-components';

export const ButtonDuo = styled.div`
  display: flex;
  justify-content: ${props => (props.center ? 'center' : 'initial')};
`;

export const ButtonDuoItem = styled.div`
  flex-grow: ${props => (props.center ? '0' : '1')};
  margin-right: ${props => props.theme.sizes.xs};

  &:last-child {
    margin-right: 0;
  }
`;
