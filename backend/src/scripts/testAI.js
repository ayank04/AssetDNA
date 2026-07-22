const env = require('../config/env');
const AIClient = require('../ai/AIClient');

let sdkVersion = 'Unknown';
try {
  const sdkPackage = require('groq-sdk/package.json');
  sdkVersion = sdkPackage.version;
} catch (e) {
  sdkVersion = 'Error reading version';
}

async function testConnection() {
  console.log('\n===========================================================');
  console.log('🤖 AI CONNECTIVITY DIAGNOSTIC');
  console.log('===========================================================');
  
  console.log(`📦 SDK Version: groq-sdk v${sdkVersion}`);
  console.log(`🧠 Configured Model: ${env.ai.model}`);
  
  const hasKey = !!env.ai.apiKey;
  const keyPreview = hasKey ? `${env.ai.apiKey.substring(0, 5)}... (Length: ${env.ai.apiKey.length})` : 'MISSING';
  console.log(`🔑 API Key Detected: ${hasKey} [Preview: ${keyPreview}]`);
  console.log(`🌐 Provider: ${env.ai.provider}`);
  
  console.log('\n🔄 Initializing request...');
  try {
    const prompt = "Say hello in one sentence.";
    const startTime = Date.now();
    const response = await AIClient.generateText(prompt);
    const latency = Date.now() - startTime;
    
    console.log('\n===========================================================');
    console.log('AI CONNECTIVITY DIAGNOSTIC');
    console.log('===========================================================');
    console.log(`API Key Detected: ✅`);
    console.log(`SDK Initialized: ✅`);
    console.log(`Model Available: ✅`);
    console.log(`Request Sent: ✅`);
    console.log(`Response Received: ✅`);
    console.log(`Finish Reason: ${response.finishReason}`);
    console.log(`Token Usage: ${JSON.stringify(response.usage)}`);
    console.log(`Latency: ${latency}ms`);
    console.log(`Response Text: ${response.text}`);
    console.log('\n✅ AI Infrastructure Fully Operational');
    console.log('===========================================================');
  } catch (error) {
    console.error('\n❌ --- FINAL NORMALIZED ERROR ---');
    console.error(`Error Class: ${error.constructor.name}`);
    console.error(`Status Code: ${error.statusCode || 'N/A'}`);
    console.error(`Message: ${error.message}`);
    
    console.error('\n🔍 --- EXPLICIT ROOT CAUSE ANALYSIS ---');
    const lowerMessage = error.message.toLowerCase();
    
    if (lowerMessage.includes('quota') || error.statusCode === 429) {
      console.error('Diagnosis: Rate Limiting / Quota Exceeded.');
    } else if (lowerMessage.includes('api key not valid') || lowerMessage.includes('unauthorized') || error.statusCode === 401 || error.statusCode === 403) {
      console.error('Diagnosis: Authentication/Permission Failure. The API key is invalid or lacks permission to access this model.');
    } else if (lowerMessage.includes('not found') || lowerMessage.includes('no longer available') || error.statusCode === 404) {
      console.error('Diagnosis: Model Not Found. The requested model name does not exist on Groq.');
    } else {
      console.error('Diagnosis: Unknown fault. Review the RAW Groq response logs above for exact details.');
    }
  }
}

testConnection();
