const {
  assetIdValidator,
  paginationQueryValidator,
  sortOrderValidator,
  dateRangeValidator
} = require('./commonValidators');
const { isEnum, isString } = require('../utils/validatorHelper');

// Standardized based on common engineering change control protocols
const CHANGE_TYPES = ['design_revision', 'software_update', 'hardware_replacement', 'parameter_change'];
const APPROVAL_STATUSES = ['pending', 'approved', 'rejected', 'implemented'];

const getEngineeringChangeSchema = {
  params: {
    assetId: assetIdValidator,
    _strict: true
  },
  query: {
    ...paginationQueryValidator,
    ...sortOrderValidator,
    ...dateRangeValidator,
    changeType: [isString, isEnum(CHANGE_TYPES)],
    approvalStatus: [isString, isEnum(APPROVAL_STATUSES)],
    engineer: [isString],
    _strict: false
  }
};

module.exports = {
  getEngineeringChangeSchema,
  CHANGE_TYPES,
  APPROVAL_STATUSES
};
