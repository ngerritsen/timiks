import { EMPTY, Observable } from 'rxjs';
import { DARK, LIGHT } from '../constants/theme';

export const getBreakpoint = breakpoint => props => props.theme.breakpoints[breakpoint];
export const getSize = size => props => props.theme.sizes[size];
export const getColor = color => props => props.theme.colors[color];
export const getZIndex = zIndex => props => props.theme.zIndices[zIndex];
export const isDark = props => Boolean(props.theme.dark);
export const getFont = font => props => props.theme.fonts[font];

export function listenForPreferredTheme() {
  return window.matchMedia
    ? Observable.create(observer =>
        window
          .matchMedia('(prefers-color-scheme: dark)')
          .addListener(event => observer.next(event.matches ? DARK : LIGHT))
      )
    : EMPTY;
}

export function getPreferredTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? DARK
    : LIGHT;
}
