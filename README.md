# AssetDNA

AssetDNA is an AI-First Industrial Knowledge Intelligence Platform. It shifts traditional maintenance and asset management into a proactive, intelligent experience designed for modern industrial environments.

## Features

- **AI Briefing Dashboard**: A mission-control dashboard that immediately surfaces critical findings, high-risk assets, and recommended actions.
- **Asset Intelligence**: Each asset features a deep AI Health Summary, prioritizing risk assessment over raw operational timelines.
- **Knowledge Assistant**: A fleet-wide conversational AI capable of answering complex questions, summarizing maintenance histories, and retrieving specific documentation.
- **Maintenance Planner**: AI-prioritized global schedule for maintenance.
- **Zero-Touch Demo Mode**: Seamlessly falls back to a realistic industrial dataset (Pump PX-100, Compressor C-17, etc.) if the backend is unavailable, ensuring a flawless zero-empty-state experience.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion
- **Backend**: Express.js, Node.js
- **Database**: Firebase / Firestore

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:3000`. 
If the backend is not running, the application will automatically enter **Demo Mode** and populate with realistic mock data.

### Backend

```bash
cd backend
npm install
npm run dev
```

The backend runs on `http://localhost:8080`.

## Architecture

AssetDNA leverages a zero-touch interceptor on the frontend API client. This allows the UI components to remain completely agnostic of whether they are rendering live production data or deterministic demo mock data, ensuring high reliability during presentations and demonstrations.
