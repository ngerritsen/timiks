/* eslint-disable no-console */
import * as firebase from 'firebase/app';
import { serializeTime, parseTimes } from '../helpers/serialization';
import { Observable } from 'rxjs';

const db = firebase.firestore();

db.enablePersistence().catch(() => {});

export function listenForChanges(userId, current, puzzle) {
  return new Observable(observer => {
    let collection = db
      .collection('times')
      .where('userId', '==', userId)
      .where('current', '==', current);

    if (puzzle) {
      collection = collection.where('puzzle', '==', puzzle);
    }

    return collection.onSnapshot({ includeMetadataChanges: true }, querySnapshot => {
      const data = [];

      querySnapshot.forEach(snapshot =>
        data.push(
          snapshot.metadata.hasPendingWrites ? { ...snapshot.data(), dirty: true } : snapshot.data()
        )
      );

      observer.next(parseTimes(data));
    });
  });
}

export function save(userId, time) {
  return db
    .collection('times')
    .doc(time.id)
    .set({ ...stripUndefined(serializeTime(time)), userId });
}

export function saveAll(userId, times) {
  const batch = db.batch();

  times.forEach(time => {
    const timeRef = db.collection('times').doc(time.id);
    batch.set(timeRef, { ...stripUndefined(serializeTime(time)), userId });
  });

  return batch.commit();
}

export function update(userId, timeId, fields) {
  return db
    .collection('times')
    .doc(timeId)
    .set(fields, { merge: true });
}

export function updateAll(userId, timeIds, fields) {
  const batch = db.batch();

  timeIds.forEach(id => {
    const timeRef = db.collection('times').doc(id);
    batch.set(timeRef, fields, { merge: true });
  });

  return batch.commit();
}

export function remove(userId, timeId) {
  return db
    .collection('times')
    .doc(timeId)
    .delete();
}

export function removeAll(userId, timeIds) {
  const batch = db.batch();

  timeIds.forEach(id => {
    const timeRef = db.collection('times').doc(id);
    batch.delete(timeRef);
  });

  return batch.commit();
}

function stripUndefined(object) {
  return Object.keys(object).reduce(
    (obj, key) => (object[key] === undefined ? obj : { ...obj, [key]: object[key] }),
    {}
  );
}
