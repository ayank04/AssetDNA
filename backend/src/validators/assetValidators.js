const {
  assetIdValidator,
  paginationQueryValidator,
  sortOrderValidator,
  searchQueryValidator
} = require('./commonValidators');
const { isString } = require('../utils/validatorHelper');

const getAssetSchema = {
  params: {
    assetId: assetIdValidator,
    _strict: true
  }
};

const listAssetsSchema = {
  query: {
    ...paginationQueryValidator,
    ...sortOrderValidator,
    ...searchQueryValidator,
    equipmentType: [isString],
    status: [isString],
    _strict: false // Allows benign unknown parameters to exist without crashing
  }
};

module.exports = {
  getAssetSchema,
  listAssetsSchema
};
