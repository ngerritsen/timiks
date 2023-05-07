import styled from "styled-components";
import { transparentize } from "polished";

import { getSize, getColor } from "../../helpers/theme";

type TileProps = {
  selected?: boolean;
};

const Tile = styled.div<TileProps>`
  position: relative;
  text-align: center;
  overflow: hidden;
  border: 1px solid
    ${(props) => getColor(props.selected ? "blue" : "grey")(props)};
  background-color: ${(props) =>
    props.selected
      ? transparentize(0.8, getColor("blue")(props))
      : "transparent"};
  padding: ${getSize("sm")};
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  :hover {
    background-color: ${(props) =>
      transparentize(0.7, getColor(props.selected ? "blue" : "grey")(props))};
  }
`;

export default Tile;
