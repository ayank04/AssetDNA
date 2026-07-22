const {
  assetIdValidator,
  paginationQueryValidator,
  sortOrderValidator,
  dateRangeValidator
} = require('./commonValidators');
const { isEnum, isString } = require('../utils/validatorHelper');

// Standardized industrial inspection constraints mapped from the DDS
const INSPECTION_TYPES = ['visual', 'ultrasonic', 'magnetic', 'thermal', 'routine'];
const STATUSES = ['pass', 'fail', 'conditional_pass', 'pending'];

const getInspectionSchema = {
  params: {
    assetId: assetIdValidator,
    _strict: true
  },
  query: {
    ...paginationQueryValidator,
    ...sortOrderValidator,
    ...dateRangeValidator,
    inspectionType: [isString, isEnum(INSPECTION_TYPES)],
    status: [isString, isEnum(STATUSES)],
    inspector: [isString],
    _strict: false
  }
};

module.exports = {
  getInspectionSchema,
  INSPECTION_TYPES,
  STATUSES
};
