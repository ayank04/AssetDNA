const TimelineRepository = require('../repositories/TimelineRepository');
const AssetRepository = require('../repositories/AssetRepository');
const { NotFoundError } = require('../errors');

class TimelineService {
  async getTimeline(assetId, query) {
    // 1. Verify asset existence before querying timeline
    const assetExists = await AssetRepository.exists(assetId);
    if (!assetExists) {
      throw new NotFoundError(`Asset with ID ${assetId} not found`, 'ASSET_NOT_FOUND');
    }

    const { page, limit, sortBy, order, eventType, severity, startDate, endDate } = query;
    
    // 2. Build filter constraints
    const options = {
      where: [],
      orderBy: []
    };

    if (eventType) {
      options.where.push({ field: 'eventType', op: '==', value: eventType });
    }

    if (severity) {
      options.where.push({ field: 'severity', op: '==', value: severity });
    }

    // Firestore requires compound indices for inequality filters across multiple fields,
    // so we apply standard date range operators
    if (startDate) {
      options.where.push({ field: 'eventDate', op: '>=', value: startDate });
    }

    if (endDate) {
      options.where.push({ field: 'eventDate', op: '<=', value: endDate });
    }

    // 3. Apply sorting (Chronological default)
    const sortField = sortBy || 'eventDate';
    const sortOrder = order || 'desc';
    options.orderBy.push({ field: sortField, direction: sortOrder });

    // 4. Apply pagination logic
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 20;
    options.limit = limitNumber;
    
    // 5. Database execution
    const events = await TimelineRepository.findByAssetId(assetId, options);
    
    // Total count for metadata calculation uses the native count aggregation
    const total = await TimelineRepository.countByAssetId(assetId, { where: options.where });
    
    const totalPages = Math.ceil(total / limitNumber);

    return {
      items: events,
      meta: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages
      }
    };
  }
}

module.exports = new TimelineService();
