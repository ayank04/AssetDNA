const admin = require('firebase-admin');

// Initialize the Firebase Admin SDK as a singleton
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.FIREBASE_PROJECT_ID || 'demo-project'
  });
}

module.exports = admin;
