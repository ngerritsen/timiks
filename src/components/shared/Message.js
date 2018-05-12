import styled from 'styled-components';

const Message = styled.p`
  margin: ${props => props.theme.sizes.xl} 0;
  text-align: center;
  color: ${props => props.theme.colors.subtleFg};
`;

export default Message;
