const { isRequired, isId, isNumber, isString, isEnum, isDate } = require('../utils/validatorHelper');

// Entity ID standard validation rules for parameters
const assetIdValidator = [isRequired, isId];
const documentIdValidator = [isRequired, isId];
const evidenceIdValidator = [isRequired, isId];
const maintenanceIdValidator = [isRequired, isId];
const inspectionIdValidator = [isRequired, isId];
const engineeringChangeIdValidator = [isRequired, isId];

// Common Query validators across list endpoints
const paginationQueryValidator = {
  page: [isNumber],
  limit: [isNumber],
  _strict: false 
};

const sortOrderValidator = {
  sortBy: [isString],
  order: [isEnum(['asc', 'desc'])],
  _strict: false
};

const dateRangeValidator = {
  startDate: [isDate],
  endDate: [isDate],
  _strict: false
};

const searchQueryValidator = {
  q: [isString],
  _strict: false
};

module.exports = {
  assetIdValidator,
  documentIdValidator,
  evidenceIdValidator,
  maintenanceIdValidator,
  inspectionIdValidator,
  engineeringChangeIdValidator,
  paginationQueryValidator,
  sortOrderValidator,
  dateRangeValidator,
  searchQueryValidator
};
