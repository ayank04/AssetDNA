const admin = require('../firebase/admin');
const { 
  AuthTokenMissingError, 
  AuthTokenInvalidError, 
  AuthTokenExpiredError 
} = require('../errors');
const asyncHandler = require('../utils/asyncHandler');

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthTokenMissingError();
  }

  const token = authHeader.split('Bearer ')[1].trim();

  if (!token) {
    throw new AuthTokenMissingError();
  }

  // Bypass for Hackathon Demo Mode
  if (token === 'mock-token') {
    req.user = { uid: 'admin-mock-uid', email: 'admin', role: 'admin' };
    return next();
  }

  try {
    // Verify the token securely via Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Attach safely decoded user to the request
    req.user = decodedToken;
    next();
  } catch (error) {
    if (error.code === 'auth/id-token-expired') {
      throw new AuthTokenExpiredError();
    }
    
    // Any other error means the token is structurally invalid, revoked, etc.
    throw new AuthTokenInvalidError('Authentication token is invalid or malformed', {
      originalError: error.code
    });
  }
});

// Explicit marker middleware for public routes
const publicRoute = (req, res, next) => {
  next();
};

module.exports = {
  authenticate,
  publicRoute
};
