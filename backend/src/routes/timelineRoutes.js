const express = require('express');
const timelineController = require('../controllers/timelineController');
const { authenticate } = require('../middleware/authenticate');
const validate = require('../middleware/validate');
const { getTimelineSchema } = require('../validators/timelineValidators');

// mergeParams is strictly required because this router will be mounted under /:assetId
const router = express.Router({ mergeParams: true });

// Ensure Timeline endpoints are globally authenticated
router.use(authenticate);

// GET /api/assets/:assetId/timeline
router.get('/', validate(getTimelineSchema), timelineController.getTimeline);

module.exports = router;
