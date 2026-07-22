const { HTTP_STATUS } = require('../constants');
const { formatError } = require('../utils/responseFormatter');

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Internal Server Error';
  let code = err.code || 'INTERNAL_SERVER_ERROR';
  let details = err.details || {};

  if (!err.isOperational && process.env.NODE_ENV === 'production') {
    message = 'Something went wrong on our end';
    code = 'INTERNAL_SERVER_ERROR';
    details = {};
  }

  // Inject stack trace into details only when not in production
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    details.stack = err.stack;
  }

  console.error(`[Error] [ReqID: ${req.requestId || 'system'}] ${code}: ${message}`);
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json(formatError(message, code, details));
};

module.exports = errorHandler;
