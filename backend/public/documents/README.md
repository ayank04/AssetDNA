# AssetDNA Local Document Storage

This directory serves as the local document storage for the AssetDNA Hackathon MVP. 

Express is configured to serve this directory statically. Any files placed here will be accessible directly via the `/documents/...` URL route if requested.

### Directory Structure

Please place your demonstration PDF/CAD/Image files in the corresponding folders before running the demo:

- `manuals/` (e.g., `thermal-calib-v2.pdf`)
- `sop/` (e.g., `startup-procedure.pdf`)
- `maintenance/` 
- `inspections/`
- `engineering/` (e.g., `combustion-schematic.dwg`)

**Important Note for the Demo:**
The backend API explicitly verifies that these files exist on the physical disk before it will generate and return a download URL. If the file is missing, the API will intentionally throw a `404 FILE_MISSING` AppError.

To ensure your demo runs smoothly, make sure the `storagePath` fields in your seeded Firestore documents perfectly match the actual file paths placed in these folders.
