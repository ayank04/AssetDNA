const { InternalServerError, NotFoundError, ConflictError, AppError } = require('./index');

const handleFirestoreError = (error, entityName = 'Resource') => {
  // If we threw a controlled AppError down the chain, surface it directly
  if (error instanceof AppError) {
    throw error;
  }

  // Map low-level gRPC/Firebase error codes cleanly
  if (error.code) {
    switch (error.code) {
      case 5: // NOT_FOUND 
        throw new NotFoundError(`${entityName} not found`);
      case 6: // ALREADY_EXISTS
        throw new ConflictError(`${entityName} already exists`);
      case 7: // PERMISSION_DENIED
        throw new AppError('Permission denied', 403, 'PERMISSION_DENIED');
      case 3: // INVALID_ARGUMENT
        throw new AppError('Invalid query argument passed to database', 400, 'INVALID_ARGUMENT');
      case 9: // FAILED_PRECONDITION
        throw new AppError('Database operation failed precondition', 400, 'FAILED_PRECONDITION');
      case 14: // UNAVAILABLE
        throw new InternalServerError('Database service is currently unavailable', 'DATABASE_UNAVAILABLE');
    }
  }

  // Failsafe for unhandled db crashes - completely obfuscates internal stack from the client
  console.error("FIREBASE MAPPED ERROR:", error);
  throw new InternalServerError('A database error occurred', 'DATABASE_ERROR');
};

module.exports = {
  handleFirestoreError
};
