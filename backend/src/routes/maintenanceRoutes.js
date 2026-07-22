const express = require('express');
const maintenanceController = require('../controllers/maintenanceController');
const { authenticate } = require('../middleware/authenticate');
const validate = require('../middleware/validate');
const { getMaintenanceSchema } = require('../validators/maintenanceValidators');

// Mandatory mergeParams for accessing :assetId inside this nested router block
const router = express.Router({ mergeParams: true });

// Require Token Authentication
router.use(authenticate);

// GET /api/assets/:assetId/maintenance
router.get('/', validate(getMaintenanceSchema), maintenanceController.getMaintenanceHistory);

module.exports = router;
