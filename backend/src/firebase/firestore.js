const admin = require('./admin');

// Ensure firestore is initialized as a strict singleton
const db = admin.firestore();

// Prevents silent failures when saving objects with undefined fields
db.settings({ ignoreUndefinedProperties: true });

module.exports = db;
