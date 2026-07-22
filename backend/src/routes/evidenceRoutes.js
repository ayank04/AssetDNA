const express = require('express');
const evidenceController = require('../controllers/evidenceController');
const { authenticate } = require('../middleware/authenticate');
const validate = require('../middleware/validate');
const { getEvidenceSchema } = require('../validators/evidenceValidators');

// mergeParams required for correct context when nested under /:assetId/evidence
const router = express.Router({ mergeParams: true });

router.use(authenticate);

// GET /api/assets/:assetId/evidence
router.get('/', validate(getEvidenceSchema), evidenceController.getEvidence);

module.exports = router;
