const InspectionRepository = require('../repositories/InspectionRepository');
const AssetRepository = require('../repositories/AssetRepository');
const { NotFoundError } = require('../errors');

class InspectionService {
  async getInspectionHistory(assetId, query) {
    // 1. Verify asset existence before doing any business logic
    const assetExists = await AssetRepository.exists(assetId);
    if (!assetExists) {
      throw new NotFoundError(`Asset with ID ${assetId} not found`, 'ASSET_NOT_FOUND');
    }

    const { page, limit, sortBy, order, inspectionType, status, inspector, startDate, endDate } = query;
    
    // 2. Map explicitly requested query bounds to Firestore filters
    const options = {
      where: [],
      orderBy: []
    };

    if (inspectionType) {
      options.where.push({ field: 'inspectionType', op: '==', value: inspectionType });
    }

    if (status) {
      options.where.push({ field: 'status', op: '==', value: status });
    }

    if (inspector) {
      options.where.push({ field: 'inspector', op: '==', value: inspector });
    }

    if (startDate) {
      options.where.push({ field: 'performedAt', op: '>=', value: startDate });
    }

    if (endDate) {
      options.where.push({ field: 'performedAt', op: '<=', value: endDate });
    }

    // Default sorting for chronology
    const sortField = sortBy || 'performedAt';
    const sortOrder = order || 'desc';
    options.orderBy.push({ field: sortField, direction: sortOrder });

    // Pagination calculations
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 20;
    options.limit = limitNumber;
    
    // 3. Retrieve payload & total counts
    const records = await InspectionRepository.findByAssetId(assetId, options);
    const total = await InspectionRepository.countByAssetId(assetId, { where: options.where });
    
    const totalPages = Math.ceil(total / limitNumber);

    return {
      items: records,
      meta: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages
      }
    };
  }
}

module.exports = new InspectionService();
