const express = require('express');
const inspectionController = require('../controllers/inspectionController');
const { authenticate } = require('../middleware/authenticate');
const validate = require('../middleware/validate');
const { getInspectionSchema } = require('../validators/inspectionValidators');

// Mandatory mergeParams for accessing :assetId inside this nested router block
const router = express.Router({ mergeParams: true });

// Protect all Inspection routes
router.use(authenticate);

// GET /api/assets/:assetId/inspections
router.get('/', validate(getInspectionSchema), inspectionController.getInspectionHistory);

module.exports = router;
