const express = require('express');
const aiController = require('../controllers/aiController');
const validate = require('../../../middleware/validate');
const { investigateSchema, summarySchema } = require('../validators/aiValidators');

// mergeParams is crucial here because assetId is in the parent router (/api/assets/:assetId)
const router = express.Router({ mergeParams: true });

// POST /api/assets/:assetId/investigate
router.post('/investigate', validate(investigateSchema), aiController.investigate);

// POST /api/assets/:assetId/summary
router.post('/summary', validate(summarySchema), aiController.summary);

module.exports = router;
