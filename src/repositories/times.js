import * as firebase from 'firebase/app';
import { serializeTime, parseTimes } from '../helpers/serialization';

const db = firebase.firestore();

export function getAll(userId) {
  return db
    .collection('times')
    .where('userId', '==', userId)
    .get()
    .then(querySnapshot => parseTimes(querySnapshot.docs.map(snapshot => snapshot.data())));
}

export function save(userId, time) {
  return db
    .collection('times')
    .doc(time.id)
    .set({ ...stripUndefined(serializeTime(time)), userId });
}

export function remove(userId, timeId) {
  return db
    .collection('times')
    .doc(timeId)
    .delete();
}

export function saveAll(userId, times) {
  const batch = db.batch();

  times.forEach(time => {
    const timeRef = db.collection('times').doc(time.id);
    batch.set(timeRef, { ...stripUndefined(serializeTime(time)), userId });
  });

  return batch.commit();
}

export function removeAll(userId, timeIds) {
  const batch = db.batch();

  timeIds.forEach(id => {
    const timeRef = db.collection('times').doc(id);
    batch.delete(timeRef);
  });

  return batch.commit();
}

export function updateAll(userId, timeIds, fields) {
  const batch = db.batch();

  timeIds.forEach(id => {
    const timeRef = db.collection('times').doc(id);
    batch.set(timeRef, fields, { merge: true });
  });

  return batch.commit();
}

function stripUndefined(object) {
  return Object.keys(object).reduce(
    (obj, key) => (object[key] === undefined ? obj : { ...obj, [key]: object[key] }),
    {}
  );
}
