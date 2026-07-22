require('dotenv').config();
const admin = require('firebase-admin');

// -----------------------------------------------------------------------------
// ENVIRONMENT CONFIGURATION
// -----------------------------------------------------------------------------
const isEmulator = process.env.USE_EMULATOR !== 'false';
if (isEmulator) {
  process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080';
  console.log(`[RESET] Connecting to Local Firestore Emulator at ${process.env.FIRESTORE_EMULATOR_HOST}`);
} else {
  console.log(`[RESET] ⚠️ WARNING ⚠️ Connecting to PRODUCTION FIRESTORE!`);
}

// Initialize Admin SDK
try {
  if (!admin.apps.length) {
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || 'assetdna-2a6f0'
    });
  }
} catch (error) {
  console.error('[RESET] Failed to initialize Firebase Admin:', error);
  process.exit(1);
}

const db = admin.firestore();

// -----------------------------------------------------------------------------
// COLLECTIONS TO CLEAR
// -----------------------------------------------------------------------------
const COLLECTIONS = [
  'assets',
  'timelineEvents',
  'maintenanceRecords',
  'inspectionReports',
  'engineeringChanges',
  'documents',
  'evidenceLinks',
  'investigations'
];

/**
 * Safely deletes all documents in a collection via batching
 */
async function clearCollection(collectionPath, batchSize = 500) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    resolve();
    return;
  }

  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(query, resolve);
  });
}

// -----------------------------------------------------------------------------
// MAIN EXECUTION
// -----------------------------------------------------------------------------
async function run() {
  console.log('\n🗑️  Starting AssetDNA Database Reset...');
  console.log('--------------------------------------------------');

  try {
    for (const collectionName of COLLECTIONS) {
      console.log(`Clearing collection: [${collectionName}]...`);
      await clearCollection(collectionName);
      console.log(`✅ Cleared [${collectionName}]`);
    }

    console.log('--------------------------------------------------');
    console.log('🎉 Database successfully reset. All collections are empty.\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error during database reset:', error);
    process.exit(1);
  }
}

// Safety prompt if running against production
if (!isEmulator) {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readline.question('You are about to clear PRODUCTION data. Type "DELETE" to continue: ', (answer) => {
    if (answer === 'DELETE') {
      readline.close();
      run();
    } else {
      console.log('Aborted.');
      readline.close();
      process.exit(0);
    }
  });
} else {
  run();
}
