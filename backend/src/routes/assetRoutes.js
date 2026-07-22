const express = require('express');
const assetController = require('../controllers/assetController');
const { authenticate } = require('../middleware/authenticate');
const validate = require('../middleware/validate');
const { getAssetSchema, listAssetsSchema } = require('../validators/assetValidators');
const timelineRoutes = require('./timelineRoutes');
const maintenanceRoutes = require('./maintenanceRoutes');
const inspectionRoutes = require('./inspectionRoutes');
const engineeringChangeRoutes = require('./engineeringChangeRoutes');
const documentRoutes = require('./documentRoutes');
const evidenceRoutes = require('./evidenceRoutes');
const aiRoutes = require('../modules/ai/routes/aiRoutes'); // NEW: Import the AI REST API layer

const router = express.Router();

// Apply Authentication middleware to ALL asset routes globally
router.use(authenticate);

// Mount nested sub-routers securely bound to the asset ID
router.use('/:assetId/timeline', timelineRoutes);
router.use('/:assetId/maintenance', maintenanceRoutes);
router.use('/:assetId/inspections', inspectionRoutes);
router.use('/:assetId/engineering-changes', engineeringChangeRoutes);
router.use('/:assetId/documents', documentRoutes);
router.use('/:assetId/evidence', evidenceRoutes);

// NEW: Mount AI endpoints (investigate, summary) directly onto the assetId path
router.use('/:assetId', aiRoutes);

// List assets with search, sorting, filtering, and pagination schemas
router.get('/', validate(listAssetsSchema), assetController.getAssets);

// Fetch specific asset by ID
router.get('/:assetId', validate(getAssetSchema), assetController.getAssetById);

module.exports = router;
