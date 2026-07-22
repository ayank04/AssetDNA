const EvidenceService = require('../services/EvidenceService');
const { formatSuccess } = require('../utils/responseFormatter');
const asyncHandler = require('../utils/asyncHandler');

const getEvidence = asyncHandler(async (req, res) => {
  const { assetId } = req.params;
  
  // Safe delegation of validated queries to the service layer
  const result = await EvidenceService.getEvidence(assetId, req.query);
  
  res.status(200).json(formatSuccess('Evidence retrieved successfully', result.items, result.meta));
});

module.exports = {
  getEvidence
};
