export const getBreakpoint = breakpoint => props => props.theme.breakpoints[breakpoint];
export const getSize = size => props => props.theme.sizes[size];
export const getColor = color => props => props.theme.colors[color];
export const getZIndex = zIndex => props => props.theme.zIndices[zIndex];
export const isDark = props => Boolean(props.theme.dark);
export const getFont = font => props => props.theme.fonts[font];
