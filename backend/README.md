# AssetDNA Backend

## Project Overview
AssetDNA Backend provides the core server infrastructure for the AssetDNA application. It is built using Node.js, Express, and Firebase Cloud Functions. This repository follows Clean Architecture principles, ensuring a modular, layered, and scalable design.

## Folder Structure
- `src/` - Application source code
  - `config/` - Configuration variables and setup
  - `routes/` - Express route definitions
  - `controllers/` - Request handlers
  - `services/` - Business logic and use cases
  - `repositories/` - Data access layer
  - `middleware/` - Express middlewares
  - `validators/` - Input validation schemas
  - `utils/` - Utility functions
  - `constants/` - System-wide constants
  - `helpers/` - Helper functions
  - `errors/` - Custom error classes and handlers
  - `types/` - Type definitions (JSDoc/TypeScript)
  - `ai/` - AI service integrations
  - `firebase/` - Firebase specific initializations
  - `app.js` - Express application bootstrap
- `functions/` - Cloud Functions specific code

## Installation
1. Ensure Node.js is installed.
2. Navigate to the `backend` directory.
3. Run `npm install` to install dependencies.

## Running Locally
To start the Express server locally:
```bash
npm start
```
