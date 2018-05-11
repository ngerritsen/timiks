import Textarea from './Textarea';

const CodeTextarea = Textarea.extend`
  background-color: ${props => props.theme.colors.subtleBg};
  font-family: ${props => props.theme.monoFont};
`;

export default CodeTextarea;
