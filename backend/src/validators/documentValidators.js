const {
  assetIdValidator,
  paginationQueryValidator,
  sortOrderValidator,
  dateRangeValidator
} = require('./commonValidators');
const { isEnum, isString } = require('../utils/validatorHelper');

// Standardized based on common industrial document management protocols
const DOCUMENT_TYPES = ['pdf', 'image', 'cad', 'spreadsheet', 'text', 'other'];
const CATEGORIES = ['manual', 'drawing', 'report', 'policy', 'specification', 'other'];

const getDocumentSchema = {
  params: {
    assetId: assetIdValidator,
    _strict: true
  },
  query: {
    ...paginationQueryValidator,
    ...sortOrderValidator,
    ...dateRangeValidator,
    documentType: [isString, isEnum(DOCUMENT_TYPES)],
    category: [isString, isEnum(CATEGORIES)],
    uploadedBy: [isString],
    _strict: false
  }
};

const getDocumentDownloadSchema = {
  params: {
    assetId: assetIdValidator,
    documentId: [isString],
    _strict: true
  },
  query: {
    _strict: false
  }
};

module.exports = {
  getDocumentSchema,
  getDocumentDownloadSchema,
  DOCUMENT_TYPES,
  CATEGORIES
};
