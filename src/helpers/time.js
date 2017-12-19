import shortid from 'shortid';

export function createTime(ms, scramble, date = new Date().toISOString()) {
  return {
    id: shortid.generate(),
    ms,
    scramble,
    date
  }
}
