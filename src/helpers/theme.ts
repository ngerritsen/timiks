import { Breakpoint, Font, Size, ZIndex } from "../theme";
import { Theme, Color } from "../theme";

type Props = { theme: Theme };

export const getBreakpoint = (breakpoint: Breakpoint) => (props: Props) =>
  props.theme.breakpoints[breakpoint];
export const getSize = (size: Size) => (props: Props) =>
  props.theme.sizes[size];
export const getColor = (color: Color) => (props: Props) =>
  props.theme.colors[color];
export const getZIndex = (zIndex: ZIndex) => (props: Props) =>
  props.theme.zIndices[zIndex];
export const isDark = (props: Props) => Boolean(props.theme.dark);
export const getFont = (font: Font) => (props: Props) =>
  props.theme.fonts[font];
