const express = require('express');
const { getMe } = require('../controllers/authController');
const { authenticate } = require('../middleware/authenticate');

const router = express.Router();

// The /me endpoint is protected by the authenticate middleware
router.get('/me', authenticate, getMe);

module.exports = router;
