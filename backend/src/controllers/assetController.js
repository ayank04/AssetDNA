const AssetService = require('../services/AssetService');
const { formatSuccess } = require('../utils/responseFormatter');
const asyncHandler = require('../utils/asyncHandler');

const getAssets = asyncHandler(async (req, res) => {
  // Pass only the pre-validated query parameters
  const result = await AssetService.getAssets(req.query);
  res.status(200).json(formatSuccess('Assets retrieved successfully', result.items, result.meta));
});

const getAssetById = asyncHandler(async (req, res) => {
  const { assetId } = req.params;
  const asset = await AssetService.getAssetById(assetId);
  res.status(200).json(formatSuccess('Asset retrieved successfully', asset));
});

module.exports = {
  getAssets,
  getAssetById
};
