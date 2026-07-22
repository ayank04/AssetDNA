const Joi = require('joi');

const investigateSchema = Joi.object({
  params: Joi.object({
    assetId: Joi.string().required()
  }),
  body: Joi.object({
    question: Joi.string().min(3).max(2000).required()
  }),
  query: Joi.object({})
});

const summarySchema = Joi.object({
  params: Joi.object({
    assetId: Joi.string().required()
  }),
  body: Joi.object({}),
  query: Joi.object({})
});

module.exports = {
  investigateSchema,
  summarySchema
};
