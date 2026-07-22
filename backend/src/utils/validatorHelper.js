// Validation rule factories
const isRequired = { name: 'isRequired', message: 'Field is required' };

const isString = { validator: (val) => typeof val === 'string', message: 'Must be a string' };

const isNumber = { 
  validator: (val) => {
    if (typeof val === 'number') return !isNaN(val);
    if (typeof val === 'string') return !isNaN(Number(val)) && val.trim() !== '';
    return false;
  }, 
  message: 'Must be a valid number' 
};

const isBoolean = { 
  validator: (val) => {
    if (typeof val === 'boolean') return true;
    if (val === 'true' || val === 'false' || val === '1' || val === '0') return true;
    return false;
  }, 
  message: 'Must be a boolean' 
};

const isEnum = (allowedValues) => ({
  validator: (val) => allowedValues.includes(val),
  message: `Must be one of: ${allowedValues.join(', ')}`
});

const isArray = { validator: (val) => Array.isArray(val), message: 'Must be an array' };

const isDate = { 
  validator: (val) => {
    if (!val) return false;
    const d = new Date(val);
    return d instanceof Date && !isNaN(d.valueOf());
  }, 
  message: 'Must be a valid date string' 
};

const isObject = { 
  validator: (val) => val !== null && typeof val === 'object' && !Array.isArray(val), 
  message: 'Must be an object' 
};

const isId = { 
  validator: (val) => typeof val === 'string' && val.trim().length >= 10, 
  message: 'Must be a valid ID string' 
};

const trimString = (val) => typeof val === 'string' ? val.trim() : val;

const checkRequired = (val) => val !== undefined && val !== null && val !== '';

module.exports = {
  isRequired,
  isString,
  isNumber,
  isBoolean,
  isEnum,
  isArray,
  isDate,
  isObject,
  isId,
  trimString,
  checkRequired
};
