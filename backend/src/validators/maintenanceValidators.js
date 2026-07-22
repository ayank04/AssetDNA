const {
  assetIdValidator,
  paginationQueryValidator,
  sortOrderValidator,
  dateRangeValidator
} = require('./commonValidators');
const { isEnum, isString } = require('../utils/validatorHelper');

// Standardized industrial maintenance types and statuses mapped from the DDS
const MAINTENANCE_TYPES = ['preventive', 'corrective', 'predictive', 'reactive'];
const STATUSES = ['scheduled', 'in_progress', 'completed', 'cancelled'];

const getMaintenanceSchema = {
  params: {
    assetId: assetIdValidator,
    _strict: true
  },
  query: {
    ...paginationQueryValidator,
    ...sortOrderValidator,
    ...dateRangeValidator,
    maintenanceType: [isString, isEnum(MAINTENANCE_TYPES)],
    status: [isString, isEnum(STATUSES)],
    technician: [isString],
    _strict: false
  }
};

module.exports = {
  getMaintenanceSchema,
  MAINTENANCE_TYPES,
  STATUSES
};
