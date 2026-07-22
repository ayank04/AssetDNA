const BaseRepository = require('./BaseRepository');
const { COLLECTIONS } = require('../constants');
const { handleFirestoreError } = require('../errors/firebaseErrorMapper');

class MaintenanceRepository extends BaseRepository {
  constructor() {
    super(COLLECTIONS.MAINTENANCE_RECORDS);
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

  // Explicit helper explicitly mapping the Work Order filter
  async findByWorkOrder(workOrderNumber) {
    try {
      const queryOptions = {
        where: [{ field: 'workOrderNumber', op: '==', value: workOrderNumber }],
        limit: 1
      };
      const results = await this.findAll(queryOptions);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      handleFirestoreError(error, this.collectionName);
    }
  }
}

module.exports = new MaintenanceRepository();
