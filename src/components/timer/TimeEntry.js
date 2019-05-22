import Input from '../shared/Input';

const TimeEntry = Input.extend`
  display: block;
  font-size: 5.4rem;
  text-align: center;
  -webkit-appearance: none;
  height: 6.3rem;
  font-family: ${props => props.theme.font};
  padding: 0 ${props => props.theme.sizes.xs};
`;

export default TimeEntry;
