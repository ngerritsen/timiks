import * as firebase from 'firebase/app';
import { serializeTime, parseTimes } from '../helpers/serialization';

const db = firebase.firestore();

export function getAll() {
  return db
    .collection('times')
    .get()
    .then(parseTimes);
}

export function add(time, userId) {
  return db
    .collection('times')
    .doc(time.id)
    .set({ ...stripUndefined(serializeTime(time)), userId });
}

export function remove(id) {
  return db
    .collection('times')
    .doc(id)
    .delete();
}

function stripUndefined(object) {
  return Object.keys(object).reduce((obj, key) =>
    object[key] === undefined ? obj : { ...obj, [key]: object[key] }
  );
}
