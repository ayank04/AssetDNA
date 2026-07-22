const AppError = require('./AppError');
const { HTTP_STATUS } = require('../constants');

class AIServiceUnavailableError extends AppError {
  constructor(message = 'AI Service is currently unavailable', details = {}) {
    super(message, HTTP_STATUS.SERVICE_UNAVAILABLE, 'AI_SERVICE_UNAVAILABLE', details);
  }
}

class AIRateLimitError extends AppError {
  constructor(message = 'AI Rate limit exceeded', details = {}) {
    super(message, HTTP_STATUS.TOO_MANY_REQUESTS, 'AI_RATE_LIMIT', details);
  }
}

class AIInvalidResponseError extends AppError {
  constructor(message = 'Invalid response from AI Service', details = {}) {
    super(message, HTTP_STATUS.BAD_GATEWAY, 'AI_INVALID_RESPONSE', details);
  }
}

class AITimeoutError extends AppError {
  constructor(message = 'AI Request timed out', details = {}) {
    super(message, HTTP_STATUS.GATEWAY_TIMEOUT, 'AI_TIMEOUT', details);
  }
}

module.exports = {
  AIServiceUnavailableError,
  AIRateLimitError,
  AIInvalidResponseError,
  AITimeoutError
};
