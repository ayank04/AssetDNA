const path = require('path');
const fs = require('fs');

let pdfParse;
try {
  pdfParse = require('pdf-parse');
} catch (e) {
  pdfParse = null;
}

const AssetRepository = require('../../repositories/AssetRepository');
const TimelineRepository = require('../../repositories/TimelineRepository');
const MaintenanceRepository = require('../../repositories/MaintenanceRepository');
const InspectionRepository = require('../../repositories/InspectionRepository');
const EngineeringChangeRepository = require('../../repositories/EngineeringChangeRepository');
const DocumentRepository = require('../../repositories/DocumentRepository');
const EvidenceRepository = require('../../repositories/EvidenceRepository');
const LocalStorageService = require('../../services/LocalStorageService');

class ContextRetrievalService {
  /**
   * Assembles the complete context for an asset to feed into AI workflows.
   * STRICTLY handles fetching, mapping, and text-extraction, absolutely zero prompt logic.
   * 
   * @param {string} assetId 
   * @returns {Promise<Object>} Structured context 
   */
  async getContextForAsset(assetId) {
    const startTime = Date.now();
    const warnings = [];

    // 1. Fetch Root Asset
    const asset = await AssetRepository.findById(assetId);
    if (!asset) {
      throw new Error(`Asset not found with ID: ${assetId}`);
    }

    // 2. Fetch all dependent contexts concurrently
    const [
      timeline,
      maintenance,
      inspections,
      engineeringChanges,
      documentsMetadata,
      evidence
    ] = await Promise.all([
      TimelineRepository.findByAssetId(assetId),
      MaintenanceRepository.findByAssetId(assetId),
      InspectionRepository.findByAssetId(assetId),
      EngineeringChangeRepository.findByAssetId(assetId),
      DocumentRepository.findByAssetId(assetId),
      EvidenceRepository.findByAssetId(assetId)
    ]);

    // 3. Process documents to extract physical text content safely
    const documents = [];
    let docsLoaded = 0;
    let docsSkipped = 0;

    for (const docMeta of documentsMetadata) {
      const doc = { metadata: docMeta, text: null };
      
      if (docMeta.storagePath) {
        try {
          const normalizedPath = path.normalize(docMeta.storagePath).replace(/^(\.\.[\/\\])+/, '');
          const absolutePath = path.join(LocalStorageService.publicDir, normalizedPath);
          
          if (fs.existsSync(absolutePath)) {
            const ext = path.extname(absolutePath).toLowerCase();
            if (ext === '.pdf' && pdfParse) {
              const dataBuffer = fs.readFileSync(absolutePath);
              const pdfData = await pdfParse(dataBuffer);
              doc.text = pdfData.text;
            } else if (['.txt', '.md', '.csv', '.json', '.xml'].includes(ext)) {
              doc.text = fs.readFileSync(absolutePath, 'utf8');
            } else {
              warnings.push(`Text extraction unsupported for binary file type ${ext}: ${docMeta.storagePath}`);
              doc.text = `[Binary File - Extracted Text Unavailable]`;
            }
            docsLoaded++;
          } else {
            warnings.push(`Document file not found on local disk: ${docMeta.storagePath}`);
            docsSkipped++;
          }
        } catch (err) {
          warnings.push(`Failed to read document ${docMeta.storagePath}: ${err.message}`);
          docsSkipped++;
        }
      } else {
        warnings.push(`Document metadata missing storagePath: ${docMeta.id}`);
        docsSkipped++;
      }
      
      documents.push(doc);
    }

    const retrievalTime = Date.now() - startTime;

    // 4. Construct response payload
    const result = {
      asset,
      timeline,
      maintenance,
      inspections,
      engineeringChanges,
      documents,
      evidence,
      _metadata: {
        assetId,
        timelineCount: timeline.length,
        maintenanceCount: maintenance.length,
        inspectionCount: inspections.length,
        engineeringChangeCount: engineeringChanges.length,
        documentsLoaded: docsLoaded,
        documentsSkipped: docsSkipped,
        retrievalTimeMs: retrievalTime,
        warnings
      }
    };

    this._logRetrieval(result._metadata);

    return result;
  }

  _logRetrieval(meta) {
    console.log('\n[ContextRetrieval] Assembled successfully:');
    console.log(`- Asset ID: ${meta.assetId}`);
    console.log(`- Timeline: ${meta.timelineCount} events`);
    console.log(`- Maintenance: ${meta.maintenanceCount} records`);
    console.log(`- Inspections: ${meta.inspectionCount} reports`);
    console.log(`- Eng Changes: ${meta.engineeringChangeCount} records`);
    console.log(`- Documents: ${meta.documentsLoaded} loaded, ${meta.documentsSkipped} skipped`);
    console.log(`- Total Time: ${meta.retrievalTimeMs}ms`);
    if (meta.warnings.length > 0) {
      console.log(`- Warnings: ${meta.warnings.length}`);
    }
  }
}

module.exports = new ContextRetrievalService();
