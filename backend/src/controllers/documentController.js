const DocumentService = require('../services/DocumentService');
const { formatSuccess } = require('../utils/responseFormatter');
const asyncHandler = require('../utils/asyncHandler');

const getDocuments = asyncHandler(async (req, res) => {
  const { assetId } = req.params;
  
  // Downstream delegation of purely sanitized/validated query blocks
  const result = await DocumentService.getDocuments(assetId, req.query);
  
  res.status(200).json(formatSuccess('Documents retrieved successfully', result.items, result.meta));
});

const getDownloadUrl = asyncHandler(async (req, res) => {
  const { assetId, documentId } = req.params;
  
  const result = await DocumentService.getDocumentDownloadUrl(assetId, documentId);
  
  res.status(200).json(formatSuccess('Download URL generated successfully', result));
});

module.exports = {
  getDocuments,
  getDownloadUrl
};
