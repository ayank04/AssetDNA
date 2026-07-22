const {
  assetIdValidator,
  paginationQueryValidator,
  sortOrderValidator
} = require('./commonValidators');
const { isEnum, isString } = require('../utils/validatorHelper');

// Strongly typed reference domains connecting the evidence citations to the underlying records
const REFERENCE_TYPES = ['document', 'timeline', 'maintenance', 'inspection', 'engineering'];

const getEvidenceSchema = {
  params: {
    assetId: assetIdValidator,
    _strict: true
  },
  query: {
    ...paginationQueryValidator,
    ...sortOrderValidator,
    referenceType: [isString, isEnum(REFERENCE_TYPES)],
    documentId: [isString],
    _strict: false
  }
};

module.exports = {
  getEvidenceSchema,
  REFERENCE_TYPES
};
