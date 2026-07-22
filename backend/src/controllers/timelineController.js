const TimelineService = require('../services/TimelineService');
const { formatSuccess } = require('../utils/responseFormatter');
const asyncHandler = require('../utils/asyncHandler');

const getTimeline = asyncHandler(async (req, res) => {
  const { assetId } = req.params;
  
  // Hand off validated query to service layer
  const result = await TimelineService.getTimeline(assetId, req.query);
  
  // Format success payload natively matching the exact TRD specification
  res.status(200).json(formatSuccess('Timeline retrieved successfully', result.items, result.meta));
});

module.exports = {
  getTimeline
};
