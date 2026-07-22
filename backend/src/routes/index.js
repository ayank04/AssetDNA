const express = require('express');
const { formatSuccess } = require('../utils/responseFormatter');
const env = require('../config/env');
const { publicRoute } = require('../middleware/authenticate');
const authRoutes = require('./authRoutes');
const assetRoutes = require('./assetRoutes');

const router = express.Router();

router.get('/health', publicRoute, (req, res) => {
  const healthData = {
    status: 'OK',
    environment: env.nodeEnv,
    applicationVersion: env.version,
    serverTimestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
  
  res.status(200).json(formatSuccess('API is healthy', healthData));
});

router.use('/auth', authRoutes);
router.use('/assets', assetRoutes);

module.exports = router;
