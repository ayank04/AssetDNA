const admin = require('../firebase/admin');
const db = require('../firebase/firestore');

// Standardize single document mapping
const mapDocument = (doc) => {
  if (!doc.exists) return null;
  const data = doc.data();
  
  const parseDate = (dateVal) => {
    if (!dateVal) return null;
    if (typeof dateVal.toDate === 'function') return dateVal.toDate();
    return new Date(dateVal);
  };

  return {
    id: doc.id,
    ...data,
    createdAt: parseDate(data.createdAt),
    updatedAt: parseDate(data.updatedAt),
  };
};

// Standardize query snapshot mapping
const mapSnapshot = (snapshot) => {
  if (snapshot.empty) return [];
  return snapshot.docs.map(mapDocument);
};

// Native timestamp converter
const toFirestoreTimestamp = (date) => {
  if (!date) return admin.firestore.FieldValue.serverTimestamp();
  return admin.firestore.Timestamp.fromDate(new Date(date));
};

// Batch wrapper
const getBatch = () => db.batch();

// Transaction wrapper
const runTransaction = (updateFunction) => db.runTransaction(updateFunction);

module.exports = {
  mapDocument,
  mapSnapshot,
  toFirestoreTimestamp,
  getBatch,
  runTransaction
};
