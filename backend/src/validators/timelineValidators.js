const {
  assetIdValidator,
  paginationQueryValidator,
  sortOrderValidator,
  dateRangeValidator
} = require('./commonValidators');
const { isEnum, isString } = require('../utils/validatorHelper');

// Strongly typed according to the DDS documents
const EVENT_TYPES = ['maintenance', 'inspection', 'engineeringChange', 'incident'];
const SEVERITIES = ['low', 'medium', 'high', 'critical'];

const getTimelineSchema = {
  params: {
    assetId: assetIdValidator,
    _strict: true
  },
  query: {
    ...paginationQueryValidator,
    ...sortOrderValidator,
    ...dateRangeValidator,
    eventType: [isString, isEnum(EVENT_TYPES)],
    severity: [isString, isEnum(SEVERITIES)],
    _strict: false
  }
};

module.exports = {
  getTimelineSchema,
  EVENT_TYPES,
  SEVERITIES
};
