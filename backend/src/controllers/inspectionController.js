const InspectionService = require('../services/InspectionService');
const { formatSuccess } = require('../utils/responseFormatter');
const asyncHandler = require('../utils/asyncHandler');

const getInspectionHistory = asyncHandler(async (req, res) => {
  const { assetId } = req.params;
  
  // Directly passes validated query block downstream
  const result = await InspectionService.getInspectionHistory(assetId, req.query);
  
  // Format success payload per specification
  res.status(200).json(formatSuccess('Inspection history retrieved successfully', result.items, result.meta));
});

module.exports = {
  getInspectionHistory
};
