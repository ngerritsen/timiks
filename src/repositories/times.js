import {
  getFirestore,
  collection,
  where,
  query,
  onSnapshot,
  writeBatch,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { serializeTime, parseTimes } from "../helpers/serialization";
import { Observable } from "rxjs";
import { getDateForDaysAgo } from "../helpers/dateTime";
import app from "../firebase";

const MAX_BATCH_SIZE = 500;

const db = getFirestore(app);

export function listenForChanges(userId, current, puzzle, days) {
  return new Observable((observer) => {
    const statements = [
      where("userId", "==", userId),
      where("current", "==", current),
    ];

    if (puzzle) {
      statements.push(where("puzzle", "==", puzzle));
    }

    if (days) {
      const fromDate = getDateForDaysAgo(days);
      statements.push(where("timestamp", ">=", fromDate));
    }

    return onSnapshot(
      query(collection(db, "times"), ...statements),
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
  return setDoc(doc(db, "times", time.id), {
    ...stripUndefined(serializeTime(time)),
    userId,
  });
}

export function saveAll(userId, times) {
  const chunk = times.slice(0, MAX_BATCH_SIZE);
  const batch = writeBatch(db);

  chunk.forEach((time) => {
    const timeRef = doc(db, "times", time.id);
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
  return setDoc(doc(db, "times", timeId), fields, { merge: true });
}

export function updateAll(timeIds, fields) {
  const chunk = timeIds.slice(0, MAX_BATCH_SIZE);
  const batch = writeBatch(db);

  chunk.forEach((id) => {
    const timeRef = doc(db, "times", id);
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
  return deleteDoc(doc(db, "times", timeId));
}

export function removeAll(timeIds) {
  const batch = writeBatch(db);

  timeIds.forEach((id) => {
    const timeRef = doc(db, "times", id);
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
