const express = require('express');
const documentController = require('../controllers/documentController');
const { authenticate } = require('../middleware/authenticate');
const validate = require('../middleware/validate');
const { getDocumentSchema, getDocumentDownloadSchema } = require('../validators/documentValidators');

// mergeParams is required because router is mounted dynamically under /:assetId/documents
const router = express.Router({ mergeParams: true });

router.use(authenticate);

// GET /api/assets/:assetId/documents
router.get('/', validate(getDocumentSchema), documentController.getDocuments);

// GET /api/assets/:assetId/documents/:documentId/download
router.get('/:documentId/download', validate(getDocumentDownloadSchema), documentController.getDownloadUrl);

module.exports = router;
