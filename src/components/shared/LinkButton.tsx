import styled from "styled-components";
import Button from "./Button";

const LinkButton = styled(Button.withComponent("a"))`
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
