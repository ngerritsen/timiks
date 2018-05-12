import Input from '../shared/Input';

const TimeEntry = Input.extend`
  display: block;
  font-size: 5.4rem;
  text-align: center;
  height: 6.2rem;
  font-family: ${props => props.theme.font};
  padding: ${props => props.theme.sizes.xs};
`;

export default TimeEntry;
