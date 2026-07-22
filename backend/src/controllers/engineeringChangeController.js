const EngineeringChangeService = require('../services/EngineeringChangeService');
const { formatSuccess } = require('../utils/responseFormatter');
const asyncHandler = require('../utils/asyncHandler');

const getEngineeringChanges = asyncHandler(async (req, res) => {
  const { assetId } = req.params;
  
  // Directly passes purely sanitized query blocks from the validation middleware
  const result = await EngineeringChangeService.getEngineeringChanges(assetId, req.query);
  
  res.status(200).json(formatSuccess('Engineering changes retrieved successfully', result.items, result.meta));
});

module.exports = {
  getEngineeringChanges
};
