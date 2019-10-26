import styled from 'styled-components';
import Input from './Input';

const Textarea = styled(Input.withComponent('textarea'))`
  min-height: 16rem;
`;

export default Textarea;
