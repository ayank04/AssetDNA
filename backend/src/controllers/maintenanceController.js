const MaintenanceService = require('../services/MaintenanceService');
const { formatSuccess } = require('../utils/responseFormatter');
const asyncHandler = require('../utils/asyncHandler');

const getMaintenanceHistory = asyncHandler(async (req, res) => {
  const { assetId } = req.params;
  
  // Directly passes purely sanitized query blocks from the validation middleware
  const result = await MaintenanceService.getMaintenanceHistory(assetId, req.query);
  
  res.status(200).json(formatSuccess('Maintenance history retrieved successfully', result.items, result.meta));
});

module.exports = {
  getMaintenanceHistory
};
