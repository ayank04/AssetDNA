const EngineeringChangeRepository = require('../repositories/EngineeringChangeRepository');
const AssetRepository = require('../repositories/AssetRepository');
const { NotFoundError } = require('../errors');

class EngineeringChangeService {
  async getEngineeringChanges(assetId, query) {
    // 1. Verify asset existence before execution
    const assetExists = await AssetRepository.exists(assetId);
    if (!assetExists) {
      throw new NotFoundError(`Asset with ID ${assetId} not found`, 'ASSET_NOT_FOUND');
    }

    const { page, limit, sortBy, order, changeType, approvalStatus, engineer, startDate, endDate } = query;
    
    // 2. Map business constraints to database filters
    const options = {
      where: [],
      orderBy: []
    };

    if (changeType) {
      options.where.push({ field: 'changeType', op: '==', value: changeType });
    }

    if (approvalStatus) {
      options.where.push({ field: 'approvalStatus', op: '==', value: approvalStatus });
    }

    if (engineer) {
      options.where.push({ field: 'engineer', op: '==', value: engineer });
    }

    if (startDate) {
      options.where.push({ field: 'implementedAt', op: '>=', value: startDate });
    }

    if (endDate) {
      options.where.push({ field: 'implementedAt', op: '<=', value: endDate });
    }

    // Default sorting logic for chronology
    const sortField = sortBy || 'implementedAt';
    const sortOrder = order || 'desc';
    options.orderBy.push({ field: sortField, direction: sortOrder });

    // Pagination bounds
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 20;
    options.limit = limitNumber;
    
    // 3. Database retrieval
    const records = await EngineeringChangeRepository.findByAssetId(assetId, options);
    const total = await EngineeringChangeRepository.countByAssetId(assetId, { where: options.where });
    
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

module.exports = new EngineeringChangeService();
