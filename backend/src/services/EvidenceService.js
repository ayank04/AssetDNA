const EvidenceRepository = require('../repositories/EvidenceRepository');
const AssetRepository = require('../repositories/AssetRepository');
const { NotFoundError } = require('../errors');

class EvidenceService {
  async getEvidence(assetId, query) {
    // 1. Verify asset existence before querying AI evidence trees
    const assetExists = await AssetRepository.exists(assetId);
    if (!assetExists) {
      throw new NotFoundError(`Asset with ID ${assetId} not found`, 'ASSET_NOT_FOUND');
    }

    const { page, limit, sortBy, order, referenceType, documentId } = query;
    
    // 2. Map strict API filters directly to Firestore query bounds
    const options = {
      where: [],
      orderBy: []
    };

    if (referenceType) {
      options.where.push({ field: 'referenceType', op: '==', value: referenceType });
    }

    if (documentId) {
      options.where.push({ field: 'documentId', op: '==', value: documentId });
    }

    // Sort logically by creation timestamp unless overridden
    const sortField = sortBy || 'createdAt';
    const sortOrder = order || 'desc';
    options.orderBy.push({ field: sortField, direction: sortOrder });

    // Pagination
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 20;
    options.limit = limitNumber;
    
    // 3. Database execution (Metadata only, intentionally agnostic of Gemini AI runtimes)
    const records = await EvidenceRepository.findByAssetId(assetId, options);
    const total = await EvidenceRepository.countByAssetId(assetId, { where: options.where });
    
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

module.exports = new EvidenceService();
