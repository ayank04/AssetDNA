const AppError = require('./AppError');
const { HTTP_STATUS } = require('../constants');

class BadRequestError extends AppError {
  constructor(message = 'Bad Request', code = 'BAD_REQUEST', details = {}) {
    super(message, HTTP_STATUS.BAD_REQUEST, code, details);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', code = 'AUTH_UNAUTHORIZED', details = {}) {
    super(message, HTTP_STATUS.UNAUTHORIZED, code, details);
  }
}

class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', code = 'FORBIDDEN', details = {}) {
    super(message, HTTP_STATUS.FORBIDDEN, code, details);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Not Found', code = 'RESOURCE_NOT_FOUND', details = {}) {
    super(message, HTTP_STATUS.NOT_FOUND, code, details);
  }
}

class ConflictError extends AppError {
  constructor(message = 'Conflict', code = 'CONFLICT', details = {}) {
    super(message, HTTP_STATUS.CONFLICT, code, details);
  }
}

class InternalServerError extends AppError {
  constructor(message = 'Internal Server Error', code = 'INTERNAL_SERVER_ERROR', details = {}) {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, code, details);
  }
}

class AuthTokenMissingError extends UnauthorizedError {
  constructor(message = 'Authentication token is missing', details = {}) {
    super(message, 'AUTH_TOKEN_MISSING', details);
  }
}

class AuthTokenInvalidError extends UnauthorizedError {
  constructor(message = 'Authentication token is invalid or malformed', details = {}) {
    super(message, 'AUTH_TOKEN_INVALID', details);
  }
}

class AuthTokenExpiredError extends UnauthorizedError {
  constructor(message = 'Authentication token has expired', details = {}) {
    super(message, 'AUTH_TOKEN_EXPIRED', details);
  }
}

// -----------------------------------------
// Validation Errors
// -----------------------------------------

class ValidationError extends BadRequestError {
  constructor(message = 'Validation Error', code = 'VALIDATION_ERROR', details = {}) {
    super(message, code, details);
  }
}

class InvalidQueryError extends ValidationError {
  constructor(message = 'Invalid Query Parameters', details = {}) {
    super(message, 'INVALID_QUERY', details);
  }
}

class InvalidBodyError extends ValidationError {
  constructor(message = 'Invalid Request Body', details = {}) {
    super(message, 'INVALID_BODY', details);
  }
}

class InvalidParameterError extends ValidationError {
  constructor(message = 'Invalid Route Parameter', details = {}) {
    super(message, 'INVALID_PARAMETER', details);
  }
}

class MissingRequiredFieldError extends ValidationError {
  constructor(message = 'Missing Required Field', details = {}) {
    super(message, 'MISSING_REQUIRED_FIELD', details);
  }
}

const {
  AIServiceUnavailableError,
  AIRateLimitError,
  AIInvalidResponseError,
  AITimeoutError
} = require('./aiErrors');

module.exports = {
  AppError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
  AuthTokenMissingError,
  AuthTokenInvalidError,
  AuthTokenExpiredError,
  ValidationError,
  InvalidQueryError,
  InvalidBodyError,
  InvalidParameterError,
  MissingRequiredFieldError,
  AIServiceUnavailableError,
  AIRateLimitError,
  AIInvalidResponseError,
  AITimeoutError
};
