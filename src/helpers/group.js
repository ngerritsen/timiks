import { deserializeTimes, serializeTimes } from './time';

export function deserializeGroups(groups) {
  return groups.map(group => ({
    title: group.title,
    times: deserializeTimes(group.times)
  }));
}

export function serializeGroups(groups) {
  return groups.map(group => ({
    title: group.title,
    times: serializeTimes(group.times)
  }));
}
