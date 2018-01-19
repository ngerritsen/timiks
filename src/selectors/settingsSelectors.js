export function getCubeSize(state) {
  const dimensions = state.settings.puzzle.split('x');

  if (dimensions.length !== 3) {
    return undefined;
  }

  return Number(dimensions[0]);
}
