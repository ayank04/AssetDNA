const { formatSuccess } = require('../utils/responseFormatter');
const asyncHandler = require('../utils/asyncHandler');

const getMe = asyncHandler(async (req, res) => {
  // Extract strictly from the securely decoded Firebase token attached by the middleware
  const { uid, email, name, picture, email_verified } = req.user;
  
  const userData = {
    uid,
    email: email || null,
    name: name || null,
    picture: picture || null,
    emailVerified: email_verified || false
  };

  res.status(200).json(formatSuccess('Authenticated user', userData));
});

module.exports = {
  getMe
};
