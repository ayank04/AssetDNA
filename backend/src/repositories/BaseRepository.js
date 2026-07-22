const db = require('../firebase/firestore');
const { mapDocument, mapSnapshot, toFirestoreTimestamp } = require('../utils/firestoreHelpers');
const { buildQuery } = require('../utils/queryUtils');
const { handleFirestoreError } = require('../errors/firebaseErrorMapper');

class BaseRepository {
  constructor(collectionName) {
    if (!collectionName) {
      throw new Error('Collection name is required');
    }
    this.collectionName = collectionName;
    this.collection = db.collection(collectionName);
  }

  async findById(id) {
    try {
      const doc = await this.collection.doc(id).get();
      return mapDocument(doc);
    } catch (error) {
      handleFirestoreError(error, this.collectionName);
    }
  }

  async findAll(options = {}) {
    try {
      const query = buildQuery(this.collection, options);
      const snapshot = await query.get();
      return mapSnapshot(snapshot);
    } catch (error) {
      handleFirestoreError(error, this.collectionName);
    }
  }

  async create(id, data = {}) {
    try {
      const docRef = id ? this.collection.doc(id) : this.collection.doc();
      const payload = {
        ...data,
        createdAt: toFirestoreTimestamp(),
        updatedAt: toFirestoreTimestamp()
      };
      
      await docRef.set(payload);
      const createdDoc = await docRef.get();
      return mapDocument(createdDoc);
    } catch (error) {
      handleFirestoreError(error, this.collectionName);
    }
  }

  async update(id, data = {}) {
    try {
      const docRef = this.collection.doc(id);
      const payload = {
        ...data,
        updatedAt: toFirestoreTimestamp()
      };
      
      await docRef.update(payload);
      const updatedDoc = await docRef.get();
      return mapDocument(updatedDoc);
    } catch (error) {
      handleFirestoreError(error, this.collectionName);
    }
  }

  async delete(id) {
    try {
      await this.collection.doc(id).delete();
      return true;
    } catch (error) {
      handleFirestoreError(error, this.collectionName);
    }
  }

  async exists(id) {
    try {
      const doc = await this.collection.doc(id).get();
      return doc.exists;
    } catch (error) {
      handleFirestoreError(error, this.collectionName);
    }
  }

  async count(options = {}) {
    try {
      const query = buildQuery(this.collection, options);
      // Utilizing native Count() aggregation for efficiency
      const snapshot = await query.count().get();
      return snapshot.data().count;
    } catch (error) {
      handleFirestoreError(error, this.collectionName);
    }
  }
}

module.exports = BaseRepository;
