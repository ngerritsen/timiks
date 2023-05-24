import styled from "styled-components";
import { transparentize } from "polished";
import { getColor, getSize } from "../../helpers/theme";

type InputProps = {
  error?: boolean;
};

const Input = styled.input<InputProps>`
  background: transparent;
  box-shadow: none;
  -webkit-appearance: none;
  width: 100%;
  font-size: 1.5rem;
  color: ${(props) => getColor(props.error ? "red" : "fg")(props)};
  border: 1px solid
    ${(props) =>
      props.error
        ? transparentize(0.2, getColor("red")(props))
        : getColor("grey")(props)};
  border-radius: 0.3rem;
  padding: ${getSize("xs")};
  margin: 0;

  &:focus {
    outline: none;
    border: 1px solid
      ${(props) =>
        transparentize(0.2, getColor(props.error ? "red" : "blue")(props))};
  }
`;

export default Input;
