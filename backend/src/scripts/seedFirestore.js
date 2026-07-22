const admin = require('firebase-admin');

// Force the Admin SDK to point to the local Emulator instead of Production
process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080';

admin.initializeApp({
  projectId: 'assetdna-2a6f0' // Emulator ignores credentials but requires a project ID
});

const db = admin.firestore();

const COLLECTIONS = {
  ASSETS: 'assets',
  TIMELINE: 'timelineEvents',
  MAINTENANCE: 'maintenanceRecords',
  INSPECTION: 'inspectionReports',
  ENGINEERING_CHANGES: 'engineeringChanges',
  DOCUMENTS: 'documents',
  EVIDENCE: 'evidenceLinks'
};

const seedData = async () => {
  console.log('🚀 Starting AssetDNA Firestore Seed Process...\n');

  const assetId = 'asset-turbine-gtx9000';

  // 1. ASSETS
  const assets = [
    {
      _id: assetId,
      assetTag: 'GTX-9000',
      name: 'High-Pressure Gas Turbine',
      equipmentType: 'turbine',
      status: 'operational',
      location: 'Plant Alpha - Block 4',
      commissionDate: new Date('2021-03-15T08:00:00Z').toISOString(),
      manufacturer: 'AeroDynamics Industrial',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // 2. DOCUMENTS (Manuals, Policies, Drawings)
  const docManualId = 'doc-manual-001';
  const docDrawingId = 'doc-drawing-001';
  const documents = [
    {
      _id: docManualId,
      assetId,
      title: 'GTX-9000 Thermal Calibration Manual',
      documentType: 'pdf',
      category: 'manual',
      version: 'v2.1',
      uploadedBy: 'System Admin',
      uploadedAt: new Date('2021-03-20T10:00:00Z').toISOString(),
      storagePath: `documents/manuals/thermal-calib-v2.pdf`,
      mimeType: 'application/pdf',
      fileSize: 2048576,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: docDrawingId,
      assetId,
      title: 'Combustion Chamber Schematic',
      documentType: 'cad',
      category: 'drawing',
      version: 'v1.0',
      uploadedBy: 'Jane Doe (Engineering)',
      uploadedAt: new Date('2021-03-22T14:30:00Z').toISOString(),
      storagePath: `documents/engineering/combustion-schematic.dwg`,
      mimeType: 'application/acad',
      fileSize: 8402911,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // 3. MAINTENANCE RECORDS
  const maintenanceId = 'maint-2023-01';
  const maintenanceRecords = [
    {
      _id: maintenanceId,
      assetId,
      workOrderNumber: 'WO-2023-4491',
      maintenanceType: 'preventive',
      status: 'completed',
      technician: 'Marcus Johnson',
      performedAt: new Date('2023-05-10T09:00:00Z').toISOString(),
      summary: 'Replaced thermal sensors in combustion chamber and recalibrated output.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // 4. INSPECTION REPORTS
  const inspectionId = 'insp-2023-01';
  const inspectionReports = [
    {
      _id: inspectionId,
      assetId,
      inspectionType: 'ultrasonic',
      status: 'conditional_pass',
      inspector: 'Sarah Connor',
      performedAt: new Date('2023-06-01T11:15:00Z').toISOString(),
      summary: 'Ultrasonic scan detected micro-abrasions on blade 4. Monitor closely over next 6 months.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // 5. ENGINEERING CHANGES
  const engChangeId = 'ec-2023-01';
  const engineeringChanges = [
    {
      _id: engChangeId,
      assetId,
      changeType: 'parameter_change',
      approvalStatus: 'implemented',
      engineer: 'Dr. Emily Chen',
      implementedAt: new Date('2023-07-20T16:45:00Z').toISOString(),
      summary: 'Adjusted fuel-air mixture thresholds to prevent excessive thermal wear detected during Q2 inspection.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // 6. TIMELINE EVENTS (Chronological log connecting the dots)
  const timelineEvents = [
    {
      _id: 'time-001',
      assetId,
      eventType: 'maintenance',
      title: 'Sensor Replacement',
      description: 'Routine replacement of thermal sensors.',
      eventDate: new Date('2023-05-10T09:00:00Z').toISOString(),
      severity: 'low',
      referenceId: maintenanceId,
      referenceType: 'maintenanceRecord',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: 'time-002',
      assetId,
      eventType: 'inspection',
      title: 'Ultrasonic Blade Scan',
      description: 'Detected micro-abrasions on blade 4.',
      eventDate: new Date('2023-06-01T11:15:00Z').toISOString(),
      severity: 'medium',
      referenceId: inspectionId,
      referenceType: 'inspectionReport',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: 'time-003',
      assetId,
      eventType: 'engineeringChange',
      title: 'Fuel Mixture Adjustment',
      description: 'Updated operating parameters to reduce thermal wear.',
      eventDate: new Date('2023-07-20T16:45:00Z').toISOString(),
      severity: 'medium',
      referenceId: engChangeId,
      referenceType: 'engineeringChange',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // 7. EVIDENCE LINKS (Simulating AI Context/Citations)
  const evidenceLinks = [
    {
      _id: 'ev-001',
      assetId,
      referenceType: 'document',
      referenceId: maintenanceId, // Linked to the maintenance action
      documentId: docManualId, // Sourced from the manual
      title: 'Thermal Sensor Calibration Thresholds',
      pageNumber: 42,
      confidence: 0.98,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: 'ev-002',
      assetId,
      referenceType: 'engineering',
      referenceId: engChangeId, // The engineering change
      documentId: docDrawingId, // Sourced from the CAD drawing
      title: 'Combustion Chamber Flow Dynamics',
      pageNumber: 1, // CAD usually single sheet or specific view
      confidence: 0.95,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // Helper function to safely execute Firestore Batches
  const insertBatch = async (collectionName, dataArray) => {
    const batch = db.batch();
    dataArray.forEach(item => {
      const { _id, ...docData } = item;
      const ref = db.collection(collectionName).doc(_id);
      batch.set(ref, docData);
    });
    
    await batch.commit();
    console.log(`✅ Seeded ${dataArray.length} records into [${collectionName}]`);
  };

  try {
    await insertBatch(COLLECTIONS.ASSETS, assets);
    await insertBatch(COLLECTIONS.DOCUMENTS, documents);
    await insertBatch(COLLECTIONS.MAINTENANCE, maintenanceRecords);
    await insertBatch(COLLECTIONS.INSPECTION, inspectionReports);
    await insertBatch(COLLECTIONS.ENGINEERING_CHANGES, engineeringChanges);
    await insertBatch(COLLECTIONS.TIMELINE, timelineEvents);
    await insertBatch(COLLECTIONS.EVIDENCE, evidenceLinks);
    
    console.log('\n🎉 Database Seed Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Database Seed Failed:', error);
    process.exit(1);
  }
};

seedData();
