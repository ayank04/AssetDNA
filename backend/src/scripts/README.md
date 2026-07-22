# AssetDNA Seed System

This directory contains scripts to populate the Firestore database with a professional, highly realistic industrial dataset for hackathon demonstrations and local development.

## Setup

Ensure your `.env` file in the `backend/` directory is properly configured. By default, the scripts will run against the **Local Firebase Emulator**.

## Running the Seed System

To populate the database with realistic assets, maintenance records, timelines, documents, and engineering changes:

```bash
cd backend
npm run seed
```

*Note: The script is deterministic. If you run it multiple times, it will overwrite the records with the exact same IDs.*

## Resetting the Database

To completely wipe all collections (`assets`, `timelineEvents`, `maintenanceRecords`, `inspectionReports`, `engineeringChanges`, `documents`, `evidenceLinks`, `investigations`):

```bash
cd backend
npm run reset
```

## Running Against Production

**⚠️ WARNING: Use with extreme caution. This will modify live data. ⚠️**

To run these scripts against your production Firebase instance instead of the local emulator, you must explicitly disable the emulator flag in your environment:

```bash
cd backend
USE_EMULATOR=false npm run seed
```

Or for resetting:
```bash
cd backend
USE_EMULATOR=false npm run reset
```

When targeting production, the script will pause and ask you to type a confirmation phrase before proceeding to prevent accidental data loss.
