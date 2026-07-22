const ContextRetrievalService = require('../context/ContextRetrievalService');
const PromptBuilder = require('../PromptBuilder');
const AIClient = require('../AIClient');
const env = require('../../config/env');

class InvestigationService {
  /**
   * Orchestrates the complete AI Investigation Workflow.
   * 
   * @param {string} assetId 
   * @param {string} question 
   * @returns {Promise<Object>} Investigation Result
   */
  async investigate(assetId, question) {
    if (!assetId) throw new Error('assetId is required for investigation');
    if (!question) throw new Error('question is required for investigation');

    const workflowStartTime = Date.now();
    
    // 1. Retrieve structured context
    const context = await ContextRetrievalService.getContextForAsset(assetId);
    const retrievalDuration = Date.now() - workflowStartTime;

    // 2. Build the strict investigation prompt
    const promptStartTime = Date.now();
    const prompt = PromptBuilder.buildInvestigationPrompt(question, context);

    // 3. Perform AI Inference
    const aiResponse = await AIClient.generateText(prompt);
    
    const aiDuration = Date.now() - promptStartTime;
    const totalDuration = Date.now() - workflowStartTime;

    // 4. Extract evidence and documents utilized
    const evidenceCount = context.evidence?.length || 0;
    const documentsUsed = context._metadata?.documentsLoaded || 0;

    // 5. Structure final unified output
    const result = {
      answer: aiResponse.text,
      sources: context.evidence || [],
      metadata: {
        provider: env.ai.provider,
        model: aiResponse.model,
        retrievalLatency: retrievalDuration,
        inferenceLatency: aiDuration,
        latency: totalDuration,
        tokenUsage: aiResponse.usage,
        timestamp: new Date().toISOString(),
        evidenceCount,
        documentsUsed
      }
    };

    this._logInvestigation(assetId, question, result.metadata);

    return result;
  }

  _logInvestigation(assetId, question, meta) {
    console.log('\n[InvestigationService] Workflow Complete');
    console.log(`- Asset ID: ${assetId}`);
    console.log(`- Question: "${question}"`);
    console.log(`- Retrieval Time: ${meta.retrievalLatency}ms`);
    console.log(`- AI Inference Time: ${meta.inferenceLatency}ms`);
    console.log(`- Total Time: ${meta.latency}ms`);
    console.log(`- Provider: ${meta.provider}`);
    console.log(`- Model: ${meta.model}`);
    if (meta.tokenUsage) {
      console.log(`- Tokens: ${JSON.stringify(meta.tokenUsage)}`);
    }
  }
}

module.exports = new InvestigationService();
