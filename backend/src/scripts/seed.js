require('dotenv').config();
const admin = require('firebase-admin');
const crypto = require('crypto');

// -----------------------------------------------------------------------------
// ENVIRONMENT CONFIGURATION
// -----------------------------------------------------------------------------
const isEmulator = process.env.USE_EMULATOR !== 'false';
if (isEmulator) {
  process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080';
  console.log(`[SEED] Connecting to Local Firestore Emulator at ${process.env.FIRESTORE_EMULATOR_HOST}`);
} else {
  console.log(`[SEED] ⚠️ WARNING ⚠️ Connecting to PRODUCTION FIRESTORE!`);
}

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || 'assetdna-2a6f0'
    });
  }
} catch (error) {
  console.error('[SEED] Failed to initialize Firebase Admin:', error);
  process.exit(1);
}

const db = admin.firestore();

// -----------------------------------------------------------------------------
// ENUMS FROM VALIDATORS
// -----------------------------------------------------------------------------
const MAINTENANCE_TYPES = ['preventive', 'corrective', 'predictive', 'reactive'];
const MAINTENANCE_STATUSES = ['scheduled', 'in_progress', 'completed', 'cancelled'];
const INSPECTION_TYPES = ['visual', 'ultrasonic', 'magnetic', 'thermal', 'routine'];
const INSPECTION_STATUSES = ['pass', 'fail', 'conditional_pass', 'pending'];
const CHANGE_TYPES = ['design_revision', 'software_update', 'hardware_replacement', 'parameter_change'];
const APPROVAL_STATUSES = ['pending', 'approved', 'rejected', 'implemented'];
const DOCUMENT_TYPES = ['pdf', 'image', 'cad', 'spreadsheet', 'text', 'other'];
const CATEGORIES = ['manual', 'drawing', 'report', 'policy', 'specification', 'other'];
const EVENT_TYPES = ['maintenance', 'inspection', 'engineeringChange', 'incident'];
const SEVERITIES = ['low', 'medium', 'high', 'critical'];
const REFERENCE_TYPES = ['document', 'timeline', 'maintenance', 'inspection', 'engineering'];

// -----------------------------------------------------------------------------
// SEED DATA CONFIGURATION
// -----------------------------------------------------------------------------
const PLANT_NAME = 'ABC Chemicals Manufacturing Plant';
const AREAS = ['Utility Plant', 'Cooling System', 'Steam Generation', 'Packaging Line', 'Raw Material Handling', 'Power Distribution', 'Water Treatment'];
const TECHNICIANS = ['Marcus Johnson', 'Sarah Connor', 'David Chen', 'Elena Rodriguez', 'James Miller', 'Aisha Patel'];

const ASSET_TEMPLATES = [
  { tag: 'P-101', name: 'Boiler Feed Pump P-101', type: 'pump', mfg: 'FlowTech Systems' },
  { tag: 'CT-01', name: 'Cooling Tower CT-01', type: 'chiller', mfg: 'ThermoCore Inc' },
  { tag: 'ST-02', name: 'Steam Turbine ST-02', type: 'turbine', mfg: 'Siemens Energy' },
  { tag: 'HX-12', name: 'Heat Exchanger HX-12', type: 'heat_exchanger', mfg: 'ThermoCore Inc' },
  { tag: 'DG-03', name: 'Diesel Generator DG-03', type: 'generator', mfg: 'GE Power' },
  { tag: 'CP-05', name: 'Cooling Pump CP-05', type: 'pump', mfg: 'FlowTech Systems' },
  { tag: 'AC-07', name: 'Air Compressor AC-07', type: 'compressor', mfg: 'Atlas Copco' },
  { tag: 'RB-02', name: 'Packaging Robot RB-02', type: 'robot', mfg: 'RoboMation Heavy' },
  { tag: 'CH-01', name: 'Chiller CH-01', type: 'chiller', mfg: 'ThermoCore Inc' },
  { tag: 'CV-04', name: 'Conveyor CV-04', type: 'conveyor', mfg: 'RoboMation Heavy' },
  { tag: 'TR-01', name: 'Transformer TR-01', type: 'transformer', mfg: 'ABB' },
  { tag: 'MCC-12', name: 'Motor MCC-12', type: 'motor', mfg: 'Siemens Energy' },
  { tag: 'IF-03', name: 'Industrial Fan IF-03', type: 'fan', mfg: 'AeroDynamics Industrial' },
  { tag: 'CV-204', name: 'Control Valve CV-204', type: 'valve', mfg: 'FlowTech Systems' },
  { tag: 'PLC-01', name: 'PLC Panel PLC-01', type: 'controller', mfg: 'Siemens Energy' },
  { tag: 'BL-01', name: 'Primary Boiler BL-01', type: 'boiler', mfg: 'GE Power' },
  { tag: 'PU-202', name: 'Chemical Dosing Pump PU-202', type: 'pump', mfg: 'FlowTech Systems' },
  { tag: 'TK-100', name: 'Storage Tank TK-100', type: 'tank', mfg: 'Atlas Copco' },
  { tag: 'MX-05', name: 'Industrial Mixer MX-05', type: 'mixer', mfg: 'RoboMation Heavy' },
  { tag: 'SR-01', name: 'Shredder SR-01', type: 'shredder', mfg: 'AeroDynamics Industrial' },
  { tag: 'FL-02', name: 'Filtration Unit FL-02', type: 'filter', mfg: 'ThermoCore Inc' },
  { tag: 'SC-10', name: 'Scrubber SC-10', type: 'scrubber', mfg: 'AeroDynamics Industrial' },
  { tag: 'RD-05', name: 'Reactor Drum RD-05', type: 'reactor', mfg: 'ThermoCore Inc' },
  { tag: 'HE-03', name: 'Heater HE-03', type: 'heater', mfg: 'Siemens Energy' },
  { tag: 'EX-01', name: 'Extractor EX-01', type: 'extractor', mfg: 'ABB' },
  { tag: 'CL-02', name: 'Clarifier CL-02', type: 'clarifier', mfg: 'Atlas Copco' },
  { tag: 'WP-01', name: 'Water Pump WP-01', type: 'pump', mfg: 'FlowTech Systems' },
  { tag: 'VF-04', name: 'Variable Frequency Drive VF-04', type: 'vfd', mfg: 'Siemens Energy' },
  { tag: 'SN-10', name: 'Sensor Array SN-10', type: 'sensor', mfg: 'ABB' },
  { tag: 'AG-02', name: 'Agitator AG-02', type: 'agitator', mfg: 'RoboMation Heavy' }
];

// -----------------------------------------------------------------------------
// UTILITIES
// -----------------------------------------------------------------------------
function generateId(prefix, seedStr) {
  const hash = crypto.createHash('md5').update(seedStr).digest('hex').substring(0, 8);
  return `${prefix}-${hash}`;
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// -----------------------------------------------------------------------------
// DATA GENERATORS
// -----------------------------------------------------------------------------

function generateRandomAsset(template, idx) {
  const now = new Date();
  const installDate = new Date(now.getFullYear() - 5 + Math.random() * 2, now.getMonth(), now.getDate());
  const commissionDate = new Date(installDate.getTime() + 86400000 * 30); 
  
  let status = 'active';
  const rand = Math.random();
  if (rand > 0.85) status = 'maintenance';
  else if (rand > 0.95) status = 'inactive';

  return {
    _id: `asset-${template.tag.toLowerCase()}`,
    assetTag: template.tag,
    name: template.name,
    type: template.type,
    status: status,
    location: PLANT_NAME,
    area: sample(AREAS),
    commissionDate: commissionDate.toISOString(),
    installationDate: installDate.toISOString(),
    manufacturer: template.mfg,
    serialNumber: `SN-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
    model: `MOD-${Math.floor(Math.random() * 1000)}`,
    description: `Industrial ${template.type} located in ${PLANT_NAME}.`,
    healthScore: status === 'maintenance' ? Math.floor(Math.random() * 40) + 20 : Math.floor(Math.random() * 20) + 80,
    criticality: sample(['High', 'Medium', 'Low']),
    expectedLife: `${Math.floor(Math.random() * 10) + 15} years`,
    metadata: {
      powerRating: `${Math.floor(Math.random() * 500) + 50} kW`,
      operatingTemp: `${Math.floor(Math.random() * 100) + 20} C`
    },
    createdAt: commissionDate.toISOString(),
    updatedAt: now.toISOString()
  };
}

function generateP101Story(asset) {
  const timeline = [];
  const maint = [];
  const insp = [];
  const ec = [];
  const docs = [];
  const evidence = [];

  const year2022 = new Date('2022-01-15T08:00:00Z');
  
  // Doc: Manual
  const docManualId = generateId('doc', 'p101-manual');
  docs.push({
    _id: docManualId, assetId: asset._id, title: 'Boiler Feed Pump P-101 User Manual',
    category: 'manual', documentType: 'pdf', description: 'Original manufacturer operating manual.',
    fileName: 'P101-Manual.pdf', uploadedBy: 'Admin',
    createdAt: year2022.toISOString(), updatedAt: year2022.toISOString()
  });

  // Timeline: Installed
  const timeInstallId = generateId('time', 'p101-installed');
  timeline.push({
    _id: timeInstallId, assetId: asset._id, eventType: 'incident', severity: 'low',
    title: 'Asset Installed', description: 'Pump P-101 was installed and anchored.',
    date: year2022.toISOString(), createdAt: year2022.toISOString(), updatedAt: year2022.toISOString()
  });

  // Timeline: Commissioned
  const timeCommId = generateId('time', 'p101-commissioned');
  timeline.push({
    _id: timeCommId, assetId: asset._id, eventType: 'incident', severity: 'low',
    title: 'Asset Commissioned', description: 'Pump P-101 was commissioned and handed over to operations.',
    date: new Date(year2022.getTime() + 86400000*30).toISOString(), 
    createdAt: new Date(year2022.getTime() + 86400000*30).toISOString(), updatedAt: new Date(year2022.getTime() + 86400000*30).toISOString()
  });

  // 1 Year Later: Routine Inspection
  const insp1Id = generateId('insp', 'p101-insp1');
  const dInsp1 = new Date('2023-01-20T10:00:00Z');
  insp.push({
    _id: insp1Id, assetId: asset._id, title: 'Annual Routine Inspection', inspectionType: 'routine', status: 'pass',
    inspector: 'David Chen', findings: 'All operating parameters normal. Visual inspection passed.', recommendations: 'Continue regular operation.',
    date: dInsp1.toISOString(), createdAt: dInsp1.toISOString(), updatedAt: dInsp1.toISOString()
  });
  timeline.push({
    _id: generateId('time', 'p101-time-insp1'), assetId: asset._id, eventType: 'inspection', severity: 'low',
    title: 'Routine Inspection Passed', description: 'Annual inspection completed with no issues.', date: dInsp1.toISOString(),
    createdAt: dInsp1.toISOString(), updatedAt: dInsp1.toISOString()
  });

  // Incident: Bearing vibration increases
  const timeInc1Id = generateId('time', 'p101-inc1');
  const dInc1 = new Date('2023-06-15T14:30:00Z');
  timeline.push({
    _id: timeInc1Id, assetId: asset._id, eventType: 'incident', severity: 'medium',
    title: 'Bearing Vibration Alert', description: 'SCADA detected abnormal axial vibration on outboard bearing.', date: dInc1.toISOString(),
    createdAt: dInc1.toISOString(), updatedAt: dInc1.toISOString()
  });

  // Ultrasonic Inspection
  const insp2Id = generateId('insp', 'p101-insp2');
  const dInsp2 = new Date('2023-06-16T09:00:00Z');
  insp.push({
    _id: insp2Id, assetId: asset._id, title: 'Ultrasonic Bearing Inspection', inspectionType: 'ultrasonic', status: 'conditional_pass',
    inspector: 'Elena Rodriguez', findings: 'High frequency acoustic emissions detected. Early stages of outer race wear.', recommendations: 'Lubricate immediately and monitor.',
    date: dInsp2.toISOString(), createdAt: dInsp2.toISOString(), updatedAt: dInsp2.toISOString()
  });
  timeline.push({
    _id: generateId('time', 'p101-time-insp2'), assetId: asset._id, eventType: 'inspection', severity: 'medium',
    title: 'Ultrasonic Inspection', description: 'Inspection confirmed early stage wear.', date: dInsp2.toISOString(),
    createdAt: dInsp2.toISOString(), updatedAt: dInsp2.toISOString()
  });

  // Preventive Maintenance: Lubrication
  const maint1Id = generateId('maint', 'p101-maint1');
  const dMaint1 = new Date('2023-06-17T08:00:00Z');
  maint.push({
    _id: maint1Id, assetId: asset._id, title: 'Bearing Lubrication', maintenanceType: 'preventive', status: 'completed',
    technician: 'Marcus Johnson', description: 'Applied high-temp synthetic grease to outboard bearing to mitigate vibration.',
    scheduledDate: dMaint1.toISOString(), completedDate: new Date(dMaint1.getTime() + 7200000).toISOString(),
    createdAt: dMaint1.toISOString(), updatedAt: dMaint1.toISOString()
  });
  timeline.push({
    _id: generateId('time', 'p101-time-maint1'), assetId: asset._id, eventType: 'maintenance', severity: 'low',
    title: 'Preventive Lubrication', description: 'Lubrication applied to bearing.', date: dMaint1.toISOString(),
    createdAt: dMaint1.toISOString(), updatedAt: dMaint1.toISOString()
  });

  // Timeline: Temp improvement
  const dTemp = new Date('2023-06-25T10:00:00Z');
  timeline.push({
    _id: generateId('time', 'p101-time-temp'), assetId: asset._id, eventType: 'incident', severity: 'low',
    title: 'Vibration Normalized', description: 'Vibration levels returned to baseline following lubrication.', date: dTemp.toISOString(),
    createdAt: dTemp.toISOString(), updatedAt: dTemp.toISOString()
  });

  // Incident: Repeated Vibration
  const timeInc2Id = generateId('time', 'p101-inc2');
  const dInc2 = new Date('2023-09-10T11:15:00Z');
  timeline.push({
    _id: timeInc2Id, assetId: asset._id, eventType: 'incident', severity: 'high',
    title: 'Critical Vibration Alert', description: 'Severe vibration detected. Asset automatically tripped offline.', date: dInc2.toISOString(),
    createdAt: dInc2.toISOString(), updatedAt: dInc2.toISOString()
  });

  // Inspection: Oil Analysis
  const insp3Id = generateId('insp', 'p101-insp3');
  const dInsp3 = new Date('2023-09-11T09:00:00Z');
  insp.push({
    _id: insp3Id, assetId: asset._id, title: 'Oil Analysis', inspectionType: 'visual', status: 'fail',
    inspector: 'David Chen', findings: 'High particulate count and metal shavings found in bearing housing oil.', recommendations: 'Immediate bearing replacement required.',
    date: dInsp3.toISOString(), createdAt: dInsp3.toISOString(), updatedAt: dInsp3.toISOString()
  });
  
  // Engineering Change
  const ec1Id = generateId('ec', 'p101-ec1');
  const dEc1 = new Date('2023-09-12T14:00:00Z');
  ec.push({
    _id: ec1Id, assetId: asset._id, title: 'Bearing Specification Upgrade', changeType: 'hardware_replacement', approvalStatus: 'implemented',
    engineer: 'Sarah Connor', description: 'Upgrading bearing specification to sealed SKF bearings to prevent future contamination.',
    proposedDate: dEc1.toISOString(), implementationDate: new Date(dEc1.getTime() + 86400000*2).toISOString(),
    createdAt: dEc1.toISOString(), updatedAt: dEc1.toISOString()
  });

  // Maintenance: Corrective Replacement
  const maint2Id = generateId('maint', 'p101-maint2');
  const dMaint2 = new Date('2023-09-14T08:00:00Z');
  maint.push({
    _id: maint2Id, assetId: asset._id, title: 'Bearing Replacement', maintenanceType: 'corrective', status: 'completed',
    technician: 'James Miller', description: 'Replaced outboard bearing with new sealed unit per engineering change request.',
    scheduledDate: dMaint2.toISOString(), completedDate: new Date(dMaint2.getTime() + 28800000).toISOString(),
    createdAt: dMaint2.toISOString(), updatedAt: dMaint2.toISOString()
  });
  timeline.push({
    _id: generateId('time', 'p101-time-maint2'), assetId: asset._id, eventType: 'engineeringChange', severity: 'medium',
    title: 'Bearing Replaced & Upgraded', description: 'New sealed bearing installed.', date: dMaint2.toISOString(),
    createdAt: dMaint2.toISOString(), updatedAt: dMaint2.toISOString()
  });

  // Final Resolution
  const dRes = new Date('2023-09-15T09:00:00Z');
  timeline.push({
    _id: generateId('time', 'p101-time-res'), assetId: asset._id, eventType: 'incident', severity: 'low',
    title: 'Asset Restarted', description: 'Pump P-101 restarted. Vibration levels extremely low. Problem resolved.', date: dRes.toISOString(),
    createdAt: dRes.toISOString(), updatedAt: dRes.toISOString()
  });

  // Create Evidence
  evidence.push({
    _id: generateId('ev', 'p101-ev1'), assetId: asset._id, title: 'Vibration Trend Data',
    referenceType: 'timeline', referenceId: timeInc2Id, description: 'SCADA export showing severe vibration spike.',
    createdAt: dInc2.toISOString(), updatedAt: dInc2.toISOString()
  });
  evidence.push({
    _id: generateId('ev', 'p101-ev2'), assetId: asset._id, title: 'Oil Contamination Photo',
    referenceType: 'inspection', referenceId: insp3Id, description: 'Photo showing metal shavings in oil.',
    createdAt: dInsp3.toISOString(), updatedAt: dInsp3.toISOString()
  });

  return { timeline, maint, insp, ec, docs, evidence };
}

function generateRandomStory(asset) {
  const timeline = [];
  const maint = [];
  const insp = [];
  const ec = [];
  const docs = [];
  const evidence = [];

  const start = new Date(asset.commissionDate);
  const now = new Date();

  // Docs (5-8)
  const numDocs = Math.floor(Math.random() * 4) + 5;
  for (let i = 0; i < numDocs; i++) {
    const dId = generateId('doc', `${asset._id}-${i}`);
    docs.push({
      _id: dId, assetId: asset._id, title: `${asset.assetTag} ${sample(['Manual', 'SOP', 'P&ID Diagram', 'Calibration Certificate', 'Vendor Specs'])}`,
      category: sample(CATEGORIES), documentType: sample(DOCUMENT_TYPES), description: 'Standard engineering document for this asset.',
      fileName: `${asset.assetTag}_Doc_${i}.pdf`, uploadedBy: sample(TECHNICIANS),
      createdAt: start.toISOString(), updatedAt: start.toISOString()
    });
  }

  // Maint (5-10)
  const numMaint = Math.floor(Math.random() * 6) + 5;
  for (let i = 0; i < numMaint; i++) {
    const mId = generateId('maint', `${asset._id}-${i}`);
    const date = randomDate(start, now);
    const mStatus = sample(MAINTENANCE_STATUSES);
    maint.push({
      _id: mId, assetId: asset._id, title: `Routine Maintenance ${i}`, maintenanceType: sample(MAINTENANCE_TYPES), status: mStatus,
      technician: sample(TECHNICIANS), description: 'Standard maintenance activity.',
      scheduledDate: date.toISOString(), completedDate: mStatus === 'completed' ? new Date(date.getTime() + 86400000).toISOString() : null,
      createdAt: date.toISOString(), updatedAt: date.toISOString()
    });
  }

  // Insp (3-6)
  const numInsp = Math.floor(Math.random() * 4) + 3;
  for (let i = 0; i < numInsp; i++) {
    const iId = generateId('insp', `${asset._id}-${i}`);
    const date = randomDate(start, now);
    insp.push({
      _id: iId, assetId: asset._id, title: `Inspection ${i}`, inspectionType: sample(INSPECTION_TYPES), status: sample(INSPECTION_STATUSES),
      inspector: sample(TECHNICIANS), findings: 'Visual findings noted in log.', recommendations: 'Monitor over next quarter.',
      date: date.toISOString(), createdAt: date.toISOString(), updatedAt: date.toISOString()
    });
  }

  // EC (2-4)
  const numEC = Math.floor(Math.random() * 3) + 2;
  for (let i = 0; i < numEC; i++) {
    const ecId = generateId('ec', `${asset._id}-${i}`);
    const date = randomDate(start, now);
    ec.push({
      _id: ecId, assetId: asset._id, title: `Engineering Change ${i}`, changeType: sample(CHANGE_TYPES), approvalStatus: sample(APPROVAL_STATUSES),
      engineer: sample(TECHNICIANS), description: 'Proposed modification to improve reliability.',
      proposedDate: date.toISOString(), implementationDate: new Date(date.getTime() + 864000000).toISOString(),
      createdAt: date.toISOString(), updatedAt: date.toISOString()
    });
  }

  // Timeline (15-20)
  const numTime = Math.floor(Math.random() * 6) + 15;
  for (let i = 0; i < numTime; i++) {
    const tId = generateId('time', `${asset._id}-${i}`);
    const date = randomDate(start, now);
    timeline.push({
      _id: tId, assetId: asset._id, eventType: sample(EVENT_TYPES), severity: sample(SEVERITIES),
      title: `Event Log ${i}`, description: 'System recorded a notable event.', date: date.toISOString(),
      createdAt: date.toISOString(), updatedAt: date.toISOString()
    });
  }

  // Evidence (generate ~8-12 per asset)
  // Tie them to Maintenance and Inspections
  maint.forEach(m => {
    evidence.push({
      _id: generateId('ev', `m-${m._id}`), assetId: asset._id, title: 'Maintenance Work Order Receipt',
      referenceType: 'maintenance', referenceId: m._id, description: 'Signed receipt from the technician.',
      createdAt: m.createdAt, updatedAt: m.updatedAt
    });
  });

  insp.forEach(i => {
    evidence.push({
      _id: generateId('ev', `i-${i._id}`), assetId: asset._id, title: 'Inspection Image',
      referenceType: 'inspection', referenceId: i._id, description: 'Raw thermal/visual capture from inspection.',
      createdAt: i.createdAt, updatedAt: i.updatedAt
    });
  });

  ec.forEach(e => {
    evidence.push({
      _id: generateId('ev', `e-${e._id}`), assetId: asset._id, title: 'Engineering Approval Doc',
      referenceType: 'engineering', referenceId: e._id, description: 'Digitized signed approval form for EC.',
      createdAt: e.createdAt, updatedAt: e.updatedAt
    });
  });

  // Base evidence
  evidence.push({
    _id: generateId('ev', `${asset._id}-base`), assetId: asset._id, title: 'Log Export',
    referenceType: 'timeline', referenceId: timeline[0]._id, description: 'Raw exported log.',
    createdAt: start.toISOString(), updatedAt: start.toISOString()
  });

  return { timeline, maint, insp, ec, docs, evidence };
}

// -----------------------------------------------------------------------------
// MAIN EXECUTION
// -----------------------------------------------------------------------------

async function seedDatabase() {
  console.log('\n🌱 Starting AssetDNA Industrial Twin Seed...');
  console.log('--------------------------------------------------');

  const assets = [];
  const allDocs = [];
  const allMaint = [];
  const allInsp = [];
  const allEc = [];
  const allTimeline = [];
  const allEvidence = [];

  for (let i = 0; i < ASSET_TEMPLATES.length; i++) {
    const asset = generateRandomAsset(ASSET_TEMPLATES[i], i);
    assets.push(asset);

    let story;
    if (asset.assetTag === 'P-101') {
      story = generateP101Story(asset);
    } else {
      story = generateRandomStory(asset);
    }

    allDocs.push(...story.docs);
    allMaint.push(...story.maint);
    allInsp.push(...story.insp);
    allEc.push(...story.ec);
    allTimeline.push(...story.timeline);
    allEvidence.push(...story.evidence);
  }

  const insertBatch = async (collectionName, dataArray) => {
    console.log(`Writing ${dataArray.length} records to [${collectionName}]...`);
    const BATCH_LIMIT = 450; 
    let currentBatch = db.batch();
    let currentCount = 0;
    
    for (const item of dataArray) {
      const { _id, ...docData } = item;
      const ref = db.collection(collectionName).doc(_id);
      currentBatch.set(ref, docData);
      currentCount++;

      if (currentCount === BATCH_LIMIT) {
        await currentBatch.commit();
        currentBatch = db.batch();
        currentCount = 0;
      }
    }
    
    if (currentCount > 0) {
      await currentBatch.commit();
    }
    console.log(`✅ Completed [${collectionName}]`);
  };

  try {
    await insertBatch('assets', assets);
    await insertBatch('documents', allDocs);
    await insertBatch('maintenanceRecords', allMaint);
    await insertBatch('inspectionReports', allInsp);
    await insertBatch('engineeringChanges', allEc);
    await insertBatch('timelineEvents', allTimeline);
    await insertBatch('evidenceLinks', allEvidence);

    console.log('--------------------------------------------------');
    console.log(`🎉 Digital Twin Seed successful! Generated:`);
    console.log(`   - ${assets.length} Assets`);
    console.log(`   - ${allDocs.length} Documents`);
    console.log(`   - ${allMaint.length} Maintenance Records`);
    console.log(`   - ${allInsp.length} Inspection Reports`);
    console.log(`   - ${allEc.length} Engineering Changes`);
    console.log(`   - ${allTimeline.length} Timeline Events`);
    console.log(`   - ${allEvidence.length} Evidence Records`);
    console.log('\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error during database seed:', error);
    process.exit(1);
  }
}

if (!isEmulator) {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  readline.question('You are about to seed PRODUCTION data. Type "SEED" to continue: ', (answer) => {
    if (answer === 'SEED') {
      readline.close();
      seedDatabase();
    } else {
      console.log('Aborted.');
      readline.close();
      process.exit(0);
    }
  });
} else {
  seedDatabase();
}
