import * as firebase from "firebase/app";
import { serializeTime, parseTimes } from "../helpers/serialization";
import { Observable } from "rxjs";
import { getDateForDaysAgo } from "../helpers/dateTime";

const MAX_BATCH_SIZE = 500;

const db = firebase.firestore();

db.enablePersistence().catch(() => {});

export function listenForChanges(userId, current, puzzle, days) {
  return new Observable((observer) => {
    let collection = db
      .collection("times")
      .where("userId", "==", userId)
      .where("current", "==", current);

    if (puzzle) {
      collection = collection.where("puzzle", "==", puzzle);
    }

    if (days) {
      const fromDate = getDateForDaysAgo(days);
      collection = collection.where("timestamp", ">=", fromDate);
    }

    return collection.onSnapshot(
      { includeMetadataChanges: true },
      (querySnapshot) => {
        const data = [];

        querySnapshot.forEach((snapshot) =>
          data.push(
            snapshot.metadata.hasPendingWrites
              ? { ...snapshot.data(), dirty: true }
              : snapshot.data()
          )
        );

        observer.next(parseTimes(data));
      }
    );
  });
}

export function save(userId, time) {
  return db
    .collection("times")
    .doc(time.id)
    .set({ ...stripUndefined(serializeTime(time)), userId });
}

export function saveAll(userId, times) {
  const chunk = times.slice(0, MAX_BATCH_SIZE);
  const batch = db.batch();

  chunk.forEach((time) => {
    const timeRef = db.collection("times").doc(time.id);
    batch.set(timeRef, { ...stripUndefined(serializeTime(time)), userId });
  });

  return batch
    .commit()
    .then(
      () =>
        times.length > MAX_BATCH_SIZE &&
        saveAll(userId, times.slice(MAX_BATCH_SIZE))
    );
}

export function update(timeId, fields) {
  return db.collection("times").doc(timeId).set(fields, { merge: true });
}

export function updateAll(timeIds, fields) {
  const chunk = timeIds.slice(0, MAX_BATCH_SIZE);
  const batch = db.batch();

  chunk.forEach((id) => {
    const timeRef = db.collection("times").doc(id);
    batch.set(timeRef, fields, { merge: true });
  });

  return batch
    .commit()
    .then(
      () =>
        timeIds.length > MAX_BATCH_SIZE &&
        updateAll(timeIds.slice(MAX_BATCH_SIZE), fields)
    );
}

export function remove(timeId) {
  return db.collection("times").doc(timeId).delete();
}

export function removeAll(timeIds) {
  const batch = db.batch();

  timeIds.forEach((id) => {
    const timeRef = db.collection("times").doc(id);
    batch.delete(timeRef);
  });

  return batch.commit();
}

function stripUndefined(object) {
  return Object.keys(object).reduce(
    (obj, key) =>
      object[key] === undefined ? obj : { ...obj, [key]: object[key] },
    {}
  );
}
