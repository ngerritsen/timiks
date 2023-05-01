import styled from "styled-components";
import { getSize } from "../../helpers/theme";

export const ButtonDuo = styled.div`
  display: flex;
  justify-content: ${(props) => (props.center ? "center" : "initial")};
`;

export const ButtonDuoItem = styled.div`
  flex-grow: ${(props) => (props.center ? "0" : "1")};
  margin-right: ${getSize("xs")};

  &:last-child {
    margin-right: 0;
  }
`;
