require('dotenv').config();

const requiredVariables = ['GROQ_API_KEY']; // Enforce Groq initialization requirement

requiredVariables.forEach((variable) => {
  if (!process.env[variable]) {
    throw new Error(`FATAL: Environment variable missing: ${variable}`);
  }
});

const env = {
  port: parseInt(process.env.PORT || '8080', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  version: process.env.npm_package_version || '1.0.0',
  ai: {
    provider: process.env.AI_PROVIDER || 'groq',
    apiKey: process.env.GROQ_API_KEY,
    model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
    timeout: parseInt(process.env.AI_TIMEOUT || '30000', 10)
  }
};

module.exports = env;
