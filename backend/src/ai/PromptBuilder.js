/**
 * Centralized utility for constructing strict AI prompts.
 * Guarantees uniform structure and reduces hallucination drift by standardizing templates.
 */
class PromptBuilder {
  /**
   * Baseline generic prompt wrapper
   */
  static buildGenericPrompt(query) {
    return `
You are an expert industrial asset investigator and data analyst.
Always be concise, professional, and base your answers strictly on provided data.

Query:
${query}
`;
  }

  /**
   * Complex investigation prompt heavily weighting context constraints and source citations.
   */
  static buildInvestigationPrompt(query, contextData) {
    return `
You are AssetDNA's primary AI investigator. 
Your task is to analyze the provided operational context regarding an industrial asset and definitively answer the user's query.

CRITICAL RULES:
1. ONLY use the provided context.
2. If the answer is not explicitly proven in the context, explicitly state that you do not have the data. Do NOT hallucinate.
3. You MUST cite your sources directly in the text using the provided Evidence Reference IDs. (e.g., "According to the manual [doc-manual-001]...")

--- ASSET CONTEXT ---
${JSON.stringify(contextData, null, 2)}
--- END CONTEXT ---

User Query:
${query}
`;
  }

  /**
   * Dedicated summarization template optimized for executive briefings.
   */
  static buildSummaryPrompt(contextData) {
    return `
Summarize the following industrial asset history context into a concise, professional executive summary.
Your response MUST highlight:
1. Key incidents and their outcomes
2. Recurring maintenance patterns
3. Overall equipment health status

Base this summary ONLY on the context provided below.

--- CONTEXT ---
${JSON.stringify(contextData, null, 2)}
`;
  }
}

module.exports = PromptBuilder;
