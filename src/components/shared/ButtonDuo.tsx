import styled from "styled-components";
import { getSize } from "../../helpers/theme";

type ButtonDuoProps = {
  center?: boolean;
};

type ButtonDuoItemProps = {
  center?: boolean;
};

export const ButtonDuo = styled.div<ButtonDuoProps>`
  display: flex;
  justify-content: ${(props) => (props.center ? "center" : "initial")};
`;

export const ButtonDuoItem = styled.div<ButtonDuoItemProps>`
  flex-grow: ${(props) => (props.center ? "0" : "1")};
  margin-right: ${getSize("xs")};

  &:last-child {
    margin-right: 0;
  }
`;
