import styled from "styled-components";
import { getSize } from "../../helpers/theme";
import type { Size } from "../../theme";

const Section = styled.div<{
  margin?: Size,
  textAlign?: AlignSetting
}>`
  margin-bottom: ${(props) =>
    props.margin ? getSize(props.margin)(props) : 0};
  text-align: ${(props) => props.textAlign || "inherit"};
  position: relative;
`;

export default Section;
