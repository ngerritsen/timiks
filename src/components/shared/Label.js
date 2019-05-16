import styled from 'styled-components';

const Label = styled.label`
  display: block;
  font-size: 0.9em;
  color: ${props => props.theme.colors.subtleFg};
  margin-bottom: ${props => props.theme.sizes.xxs};
`;

export default Label;
