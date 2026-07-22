const BaseRepository = require('./BaseRepository');
const { COLLECTIONS } = require('../constants');
const { handleFirestoreError } = require('../errors/firebaseErrorMapper');

class InspectionRepository extends BaseRepository {
  constructor() {
    super(COLLECTIONS.INSPECTION_REPORTS);
  }

  async findByAssetId(assetId, options = {}) {
    try {
      const queryOptions = {
        ...options,
        where: [
          ...(options.where || []),
          { field: 'assetId', op: '==', value: assetId }
        ]
      };
      return this.findAll(queryOptions);
    } catch (error) {
      handleFirestoreError(error, this.collectionName);
    }
  }

  async countByAssetId(assetId, options = {}) {
    try {
      const queryOptions = {
        ...options,
        where: [
          ...(options.where || []),
          { field: 'assetId', op: '==', value: assetId }
        ]
      };
      return this.count(queryOptions);
    } catch (error) {
      handleFirestoreError(error, this.collectionName);
    }
  }
}

module.exports = new InspectionRepository();
