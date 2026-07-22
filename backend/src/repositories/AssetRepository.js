const BaseRepository = require('./BaseRepository');
const { COLLECTIONS } = require('../constants');
const { buildQuery } = require('../utils/queryUtils');
const { mapSnapshot } = require('../utils/firestoreHelpers');
const { handleFirestoreError } = require('../errors/firebaseErrorMapper');

class AssetRepository extends BaseRepository {
  constructor() {
    super(COLLECTIONS.ASSETS);
  }

  async findByAssetTag(tag) {
    try {
      const query = buildQuery(this.collection, {
        where: [{ field: 'tag', op: '==', value: tag }],
        limit: 1
      });
      const snapshot = await query.get();
      const mapped = mapSnapshot(snapshot);
      return mapped.length > 0 ? mapped[0] : null;
    } catch (error) {
      handleFirestoreError(error, this.collectionName);
    }
  }

  async findByEquipmentType(equipmentType, options = {}) {
    try {
      const queryOptions = {
        ...options,
        where: [
          ...(options.where || []),
          { field: 'equipmentType', op: '==', value: equipmentType }
        ]
      };
      return this.findAll(queryOptions);
    } catch (error) {
      handleFirestoreError(error, this.collectionName);
    }
  }

  async searchAssets(searchQuery, options = {}) {
    try {
      // Basic prefix searching natively supported by Firestore
      const queryOptions = {
        ...options,
        where: [
          ...(options.where || []),
          { field: 'name', op: '>=', value: searchQuery },
          { field: 'name', op: '<=', value: searchQuery + '\uf8ff' }
        ]
      };
      return this.findAll(queryOptions);
    } catch (error) {
      handleFirestoreError(error, this.collectionName);
    }
  }
}

module.exports = new AssetRepository();
