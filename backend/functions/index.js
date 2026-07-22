const { onRequest } = require('firebase-functions/v2/https');
const app = require('../src/app');

// Expose the Express app as a single HTTPS Firebase function
exports.api = onRequest(app);
