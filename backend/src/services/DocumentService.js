const DocumentRepository = require('../repositories/DocumentRepository');
const AssetRepository = require('../repositories/AssetRepository');
const { NotFoundError } = require('../errors');

const LocalStorageService = require('./LocalStorageService');

class DocumentService {
  async getDocuments(assetId, query) {
    // 1. Verify asset existence
    const assetExists = await AssetRepository.exists(assetId);
    if (!assetExists) {
      throw new NotFoundError(`Asset with ID ${assetId} not found`, 'ASSET_NOT_FOUND');
    }

    const { page, limit, sortBy, order, documentType, category, uploadedBy, startDate, endDate } = query;
    
    // 2. Map filters to Firestore options
    const options = {
      where: [],
      orderBy: []
    };

    if (documentType) {
      options.where.push({ field: 'documentType', op: '==', value: documentType });
    }

    if (category) {
      options.where.push({ field: 'category', op: '==', value: category });
    }

    if (uploadedBy) {
      options.where.push({ field: 'uploadedBy', op: '==', value: uploadedBy });
    }

    if (startDate) {
      options.where.push({ field: 'uploadedAt', op: '>=', value: startDate });
    }

    if (endDate) {
      options.where.push({ field: 'uploadedAt', op: '<=', value: endDate });
    }

    // Default sorting logic for most recent uploads
    const sortField = sortBy || 'uploadedAt';
    const sortOrder = order || 'desc';
    options.orderBy.push({ field: sortField, direction: sortOrder });

    // Pagination bounds
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 20;
    options.limit = limitNumber;
    
    // 3. Database execution (Metadata only, strictly no Storage logic)
    const records = await DocumentRepository.findByAssetId(assetId, options);
    const total = await DocumentRepository.countByAssetId(assetId, { where: options.where });
    
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

  async getDocumentDownloadUrl(assetId, documentId) {
    const assetExists = await AssetRepository.exists(assetId);
    if (!assetExists) {
      throw new NotFoundError(`Asset with ID ${assetId} not found`, 'ASSET_NOT_FOUND');
    }

    const document = await DocumentRepository.findById(documentId);
    if (!document || document.assetId !== assetId) {
      throw new NotFoundError(`Document ${documentId} not found for asset ${assetId}`, 'DOCUMENT_NOT_FOUND');
    }
    
    if (!document.storagePath) {
      throw new NotFoundError(`No storage file linked to document ${documentId}`, 'FILE_NOT_FOUND');
    }
    
    // Validate local existence and fetch static URL route
    const url = await LocalStorageService.getLocalUrl(document.storagePath);
    if (!url) {
      throw new NotFoundError(`Local file missing at physical path: ${document.storagePath}. Please place the file in the public directory before demoing.`, 'FILE_MISSING');
    }
    
    // Static local files don't expire, returning standard shape
    return { url };
  }
}

module.exports = new DocumentService();
