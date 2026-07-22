const formatSuccess = (message, data = {}, meta = {}) => {
  return {
    success: true,
    message,
    data,
    meta,
    timestamp: new Date().toISOString()
  };
};

const formatError = (message, code = 'INTERNAL_ERROR', details = {}) => {
  return {
    success: false,
    message,
    error: {
      code,
      details
    },
    timestamp: new Date().toISOString()
  };
};

module.exports = {
  formatSuccess,
  formatError
};
