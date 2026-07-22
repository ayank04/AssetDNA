const ContextRetrievalService = require('../ai/context/ContextRetrievalService');

async function testContextRetrieval() {
  // Use a mock ID or an ID from the seeder, let's just assume 'asset-001' is common.
  // The user can inject this via CLI args if needed.
  const assetId = process.argv[2] || 'asset-t600'; 
  
  console.log(`\n🔄 Initializing Context Retrieval for Asset: ${assetId}...\n`);
  
  try {
    const context = await ContextRetrievalService.getContextForAsset(assetId);
    const meta = context._metadata;

    console.log('\n===========================================================');
    console.log('CONTEXT RETRIEVAL REPORT');
    console.log('===========================================================');
    console.log(`Asset:               ${context.asset.name} (${context.asset.id})`);
    console.log(`Timeline:            ${meta.timelineCount} events`);
    console.log(`Maintenance:         ${meta.maintenanceCount} records`);
    console.log(`Inspections:         ${meta.inspectionCount} reports`);
    console.log(`Engineering Changes: ${meta.engineeringChangeCount} modifications`);
    console.log(`Documents:           ${meta.documentsLoaded} loaded, ${meta.documentsSkipped} skipped`);
    console.log(`Evidence:            ${context.evidence.length} citations`);
    console.log(`Warnings:            ${meta.warnings.length}`);
    console.log(`Retrieval Time:      ${meta.retrievalTimeMs}ms`);
    console.log('===========================================================');
    
    if (meta.warnings.length > 0) {
      console.log('\n⚠️ WARNING DETAILS:');
      meta.warnings.forEach(w => console.log(`  - ${w}`));
    }
    
    // Quick preview of the extracted text of the first loaded doc
    const textDoc = context.documents.find(d => d.text && !d.text.includes('Binary File'));
    if (textDoc) {
       console.log(`\n📄 Extracted Text Preview (${textDoc.metadata.title}):`);
       console.log(`   "${textDoc.text.substring(0, 150).replace(/\\n/g, ' ')}..."`);
    }

  } catch (error) {
    console.error('\n❌ --- RETRIEVAL FAILED ---');
    console.error(error.message);
    if (!error.message.includes('Asset not found')) {
      console.error(error.stack);
    }
  }
}

testContextRetrieval();
