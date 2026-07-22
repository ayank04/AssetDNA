const InvestigationService = require('../ai/investigation/InvestigationService');

async function testInvestigation() {
  const assetId = process.argv[2] || 'pump-px100';
  const question = process.argv[3] || 'Why was this pump shut down last month?';

  console.log(`\n🔄 Initializing AI Investigation...`);
  console.log(`Asset: ${assetId}`);
  console.log(`Question: "${question}"\n`);

  try {
    const result = await InvestigationService.investigate(assetId, question);
    const meta = result.metadata;

    console.log('\n===========================================================');
    console.log('AI INVESTIGATION REPORT');
    console.log('===========================================================');
    console.log(`Question:         ${question}`);
    console.log(`\nAnswer:\n${result.answer}\n`);
    console.log(`Evidence Count:   ${meta.evidenceCount}`);
    console.log(`Documents Used:   ${meta.documentsUsed}`);
    console.log(`Provider:         ${meta.provider}`);
    console.log(`Model:            ${meta.model}`);
    console.log(`Latency:          ${meta.latency}ms (Retrieval: ${meta.retrievalLatency}ms, AI: ${meta.inferenceLatency}ms)`);
    console.log(`Token Usage:      ${JSON.stringify(meta.tokenUsage)}`);
    console.log('===========================================================');

  } catch (error) {
    console.error('\n❌ --- INVESTIGATION FAILED ---');
    console.error(`Error Class: ${error.constructor.name}`);
    console.error(error.message);
    if (!error.message.includes('Asset not found')) {
      console.error(error.stack);
    }
  }
}

testInvestigation();
