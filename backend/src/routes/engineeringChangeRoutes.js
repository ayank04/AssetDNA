const express = require('express');
const engineeringChangeController = require('../controllers/engineeringChangeController');
const { authenticate } = require('../middleware/authenticate');
const validate = require('../middleware/validate');
const { getEngineeringChangeSchema } = require('../validators/engineeringChangeValidators');

// Mandatory mergeParams for accessing :assetId inside this nested router block
const router = express.Router({ mergeParams: true });

// Require Token Authentication
router.use(authenticate);

// GET /api/assets/:assetId/engineering-changes
router.get('/', validate(getEngineeringChangeSchema), engineeringChangeController.getEngineeringChanges);

module.exports = router;
