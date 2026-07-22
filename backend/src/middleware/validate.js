const { InvalidBodyError, InvalidQueryError, InvalidParameterError, ValidationError } = require('../errors');
const { trimString, checkRequired } = require('../utils/validatorHelper');

const validate = (schema) => (req, res, next) => {
  const errors = {};
  
  const validateTarget = (targetName, targetData, targetSchema) => {
    if (!targetSchema) return;
    
    // Reject unknown fields to secure boundaries
    if (targetSchema._strict) {
        Object.keys(targetData).forEach(key => {
            if (!targetSchema[key] && key !== '_strict') {
                if (!errors[targetName]) errors[targetName] = {};
                errors[targetName][key] = 'Unknown field is not permitted';
            }
        });
    }

    Object.keys(targetSchema).forEach(key => {
      if (key === '_strict') return;
      
      const rules = Array.isArray(targetSchema[key]) ? targetSchema[key] : [targetSchema[key]];
      let value = targetData[key];
      
      // Auto-trim and sanitize standard strings inside request
      if (typeof value === 'string') {
          value = trimString(value);
          req[targetName][key] = value;
      }

      const hasIsRequired = rules.find(r => r.name === 'isRequired');
      
      if (hasIsRequired && !checkRequired(value)) {
         if (!errors[targetName]) errors[targetName] = {};
         errors[targetName][key] = 'Field is required';
         return; 
      }

      if (!checkRequired(value)) return;

      for (let rule of rules) {
         if (rule.name === 'isRequired') continue;
         
         const isValid = rule.validator(value);
         
         if (!isValid) {
            if (!errors[targetName]) errors[targetName] = {};
            errors[targetName][key] = rule.message || 'Invalid format';
            break;
         }
      }
    });
  };

  // Run on all incoming injection vectors
  validateTarget('body', req.body, schema.body);
  validateTarget('query', req.query, schema.query);
  validateTarget('params', req.params, schema.params);

  // Return specific machine-readable validation errors blocking controller access
  if (Object.keys(errors).length > 0) {
     if (errors.body) next(new InvalidBodyError('Invalid request body', errors.body));
     else if (errors.query) next(new InvalidQueryError('Invalid query parameters', errors.query));
     else if (errors.params) next(new InvalidParameterError('Invalid route parameters', errors.params));
     else next(new ValidationError('Validation failed', 'VALIDATION_ERROR', errors));
     return;
  }
  
  next();
};

module.exports = validate;
