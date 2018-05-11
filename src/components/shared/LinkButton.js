import Button from './Button';

const LinkButton = Button.withComponent('a').extend`
  display: inline-block;
  text-align: center;
  text-decoration: none;

  &:focus,
  &:hover,
  &:active,
  &:visited {
    text-decoration: none;
  }
`;

export default LinkButton;
