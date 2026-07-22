const MaintenanceRepository = require('../repositories/MaintenanceRepository');
const AssetRepository = require('../repositories/AssetRepository');
const { NotFoundError } = require('../errors');

class MaintenanceService {
  async getMaintenanceHistory(assetId, query) {
    // 1. Rigorous asset verification before processing
    const assetExists = await AssetRepository.exists(assetId);
    if (!assetExists) {
      throw new NotFoundError(`Asset with ID ${assetId} not found`, 'ASSET_NOT_FOUND');
    }

    const { page, limit, sortBy, order, maintenanceType, status, technician, startDate, endDate } = query;
    
    // 2. Build explicit query abstractions mapped to Firestore constraints
    const options = {
      where: [],
      orderBy: []
    };

    if (maintenanceType) {
      options.where.push({ field: 'maintenanceType', op: '==', value: maintenanceType });
    }

    if (status) {
      options.where.push({ field: 'status', op: '==', value: status });
    }

    if (technician) {
      options.where.push({ field: 'technician', op: '==', value: technician });
    }

    if (startDate) {
      options.where.push({ field: 'performedAt', op: '>=', value: startDate });
    }

    if (endDate) {
      options.where.push({ field: 'performedAt', op: '<=', value: endDate });
    }

    // Default sorting logic for chronology
    const sortField = sortBy || 'performedAt';
    const sortOrder = order || 'desc';
    options.orderBy.push({ field: sortField, direction: sortOrder });

    // Ensure valid numerical pagination values
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 20;
    options.limit = limitNumber;
    
    // 3. Database execution abstracted through the Repository
    const records = await MaintenanceRepository.findByAssetId(assetId, options);
    const total = await MaintenanceRepository.countByAssetId(assetId, { where: options.where });
    
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

module.exports = new MaintenanceService();
