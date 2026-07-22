const AssetRepository = require('../repositories/AssetRepository');
const { NotFoundError } = require('../errors');

class AssetService {
  async getAssets(query) {
    const { limit, sortBy, order, q, equipmentType, status } = query;
    
    const options = {
      where: [],
      orderBy: []
    };

    if (equipmentType) {
      options.where.push({ field: 'equipmentType', op: '==', value: equipmentType });
    }

    if (status) {
      options.where.push({ field: 'status', op: '==', value: status });
    }

    if (sortBy) {
      options.orderBy.push({ field: sortBy, direction: order || 'asc' });
    }

    if (limit) {
      options.limit = parseInt(limit, 10);
    }

    let assets;
    if (q) {
      assets = await AssetRepository.searchAssets(q, options);
    } else {
      assets = await AssetRepository.findAll(options);
    }

    const total = await AssetRepository.count(options);

    return {
      items: assets,
      meta: {
        total,
        count: assets.length
      }
    };
  }

  async getAssetById(assetId) {
    const asset = await AssetRepository.findById(assetId);
    
    if (!asset) {
      throw new NotFoundError(`Asset with ID ${assetId} not found`, 'ASSET_NOT_FOUND');
    }

    return asset;
  }
}

module.exports = new AssetService();
