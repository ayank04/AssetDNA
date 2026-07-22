const Groq = require('groq-sdk');
const env = require('../config/env');
const {
  AIServiceUnavailableError,
  AIRateLimitError,
  AIInvalidResponseError,
  AITimeoutError
} = require('../errors');

class AIClient {
  constructor() {
    this.ai = new Groq({ apiKey: env.ai.apiKey });
    this.modelName = env.ai.model;
    this.timeout = env.ai.timeout;
    this.maxRetries = 3;
  }

  /**
   * Generates text based on prompt strictly handling retries, timeouts and error mapping.
   * Completely encapsulates the Groq SDK so calling services only ever see standard structures.
   * 
   * @param {string} prompt 
   * @returns {Promise<Object>} Normalized AI Response Object
   */
  async generateText(prompt) {
    return this._executeWithRetry(async () => {
      let timeoutId;
      
      const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error('AbortError')); 
        }, this.timeout);
      });

      const apiPromise = this.ai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: this.modelName
      });

      try {
        const response = await Promise.race([apiPromise, timeoutPromise]);
        clearTimeout(timeoutId);
        return this._normalizeResponse(response);
      } catch (error) {
        clearTimeout(timeoutId);
        this._mapError(error);
      }
    });
  }

  async _executeWithRetry(operation, attempt = 1) {
    try {
      return await operation();
    } catch (error) {
      if (this._isTransientError(error) && attempt <= this.maxRetries) {
        const backoff = Math.pow(2, attempt) * 1000 + Math.random() * 1000;
        console.warn(`[AIClient] Transient error encountered. Retrying in ${Math.round(backoff)}ms (Attempt ${attempt}/${this.maxRetries})`);
        
        await new Promise(resolve => setTimeout(resolve, backoff));
        return this._executeWithRetry(operation, attempt + 1);
      }
      throw error;
    }
  }

  _isTransientError(error) {
    return (
      error instanceof AIServiceUnavailableError ||
      error instanceof AIRateLimitError ||
      error instanceof AITimeoutError ||
      (error.message && error.message.includes('fetch failed')) ||
      (error.message && error.message.includes('ECONNRESET'))
    );
  }

  _mapError(error) {
    // DIAGNOSTIC LOGGING
    console.error('\n--- [AI_DIAGNOSTIC] RAW GROQ RESPONSE ---');
    console.error(JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    if (error.error) { // Groq SDK often wraps the raw error payload inside error.error
      console.error('\n--- [AI_DIAGNOSTIC] RAW GROQ API ERROR DATA ---');
      console.error(JSON.stringify(error.error, Object.getOwnPropertyNames(error.error), 2));
    }
    console.error('--------------------------------------------------\n');

    if (error.message === 'AbortError' || error.name === 'AbortError') {
      throw new AITimeoutError(`AI request exceeded configured ${this.timeout}ms timeout limit`);
    }
    
    // Attempt to parse HTTP status if the SDK exposes it in errors
    const status = error.status;
    
    if (status === 429) {
      throw new AIRateLimitError(`AI API rate limit exceeded. Raw Message: ${error.message}`);
    }
    
    if (status >= 500 && status <= 504) {
      throw new AIServiceUnavailableError(`AI API is currently unavailable. Raw Message: ${error.message}`);
    }
    
    // Fallback wrapper for unknown SDK errors
    throw new AIInvalidResponseError(`AI API Error: ${error.message || 'Unknown fault'}`);
  }

  _normalizeResponse(response) {
    const choice = response?.choices?.[0];
    const text = choice?.message?.content;
    
    if (!text) {
      throw new AIInvalidResponseError('AI returned an empty or completely malformed payload');
    }

    return {
      text: text,
      usage: response.usage || {},
      model: response.model || this.modelName,
      finishReason: choice.finish_reason || 'UNKNOWN'
    };
  }
}

module.exports = new AIClient();
