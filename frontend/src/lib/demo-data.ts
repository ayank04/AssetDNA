import { 
  Asset, 
  TimelineEvent, 
  MaintenanceRecord, 
  Inspection, 
  EngineeringChange, 
  Document,
  Evidence
} from "@/types/models"

const now = new Date().toISOString()
const yesterday = new Date(Date.now() - 86400000).toISOString()
const lastWeek = new Date(Date.now() - 7 * 86400000).toISOString()

export const DEMO_ASSETS: Asset[] = [
  {
    id: "PX-100",
    name: "Pump PX-100",
    description: "Centrifugal pump for primary coolant loop. High criticality.",
    type: "Pump",
    status: "maintenance",
    location: "Plant A - Section 1",
    createdAt: lastWeek,
    updatedAt: now,
    metadata: { manufacturer: "FlowServe", installDate: "2018-05-12" }
  },
  {
    id: "PX-101",
    name: "Pump PX-101",
    description: "Backup centrifugal pump for primary coolant loop.",
    type: "Pump",
    status: "active",
    location: "Plant A - Section 1",
    createdAt: lastWeek,
    updatedAt: now,
    metadata: { manufacturer: "FlowServe", installDate: "2018-05-12" }
  },
  {
    id: "C-17",
    name: "Compressor C-17",
    description: "Multi-stage rotary compressor.",
    type: "Compressor",
    status: "inactive",
    location: "Plant B - Utilities",
    createdAt: lastWeek,
    updatedAt: yesterday,
    metadata: { manufacturer: "Atlas Copco" }
  },
  {
    id: "B-04",
    name: "Boiler B-04",
    description: "High pressure steam boiler.",
    type: "Boiler",
    status: "active",
    location: "Plant A - Power",
    createdAt: lastWeek,
    updatedAt: now
  },
  {
    id: "CT-2",
    name: "Cooling Tower CT-2",
    description: "Evaporative cooling tower.",
    type: "Cooling System",
    status: "active",
    location: "Exterior pad",
    createdAt: lastWeek,
    updatedAt: now
  },
  {
    id: "G-01",
    name: "Generator G-01",
    description: "Emergency diesel generator.",
    type: "Generator",
    status: "active",
    location: "Plant B - Basement",
    createdAt: lastWeek,
    updatedAt: now
  }
]

export const DEMO_TIMELINE: TimelineEvent[] = [
  {
    id: "t1",
    assetId: "PX-100",
    type: "status_change",
    title: "Asset Status Changed",
    description: "Status changed from Active to Maintenance",
    date: yesterday,
    createdAt: yesterday,
    updatedAt: yesterday
  },
  {
    id: "t2",
    assetId: "PX-100",
    type: "maintenance",
    title: "Emergency Shutdown",
    description: "Triggered due to excessive vibration",
    date: lastWeek,
    createdAt: lastWeek,
    updatedAt: lastWeek
  }
]

export const DEMO_MAINTENANCE: MaintenanceRecord[] = [
  {
    id: "m1",
    assetId: "PX-100",
    title: "Seal Replacement",
    description: "Replace degraded mechanical seals due to leakage.",
    status: "scheduled",
    scheduledDate: now,
    technician: "John Doe",
    cost: 1200,
    partsReplaced: ["Mechanical Seal Type 4"],
    createdAt: yesterday,
    updatedAt: now
  },
  {
    id: "m2",
    assetId: "PX-101",
    title: "Routine Lubrication",
    description: "Quarterly bearing lubrication.",
    status: "completed",
    scheduledDate: lastWeek,
    completedDate: yesterday,
    technician: "Jane Smith",
    createdAt: lastWeek,
    updatedAt: yesterday
  }
]

export const DEMO_INSPECTIONS: Inspection[] = [
  {
    id: "i1",
    assetId: "PX-100",
    title: "Vibration Analysis",
    date: lastWeek,
    inspector: "Alice Tech",
    status: "fail",
    findings: "Vibration exceeds 4.5 mm/s on non-drive end bearing.",
    recommendations: "Replace bearing immediately.",
    createdAt: lastWeek,
    updatedAt: lastWeek
  }
]

export const DEMO_ENGINEERING: EngineeringChange[] = [
  {
    id: "ec1",
    assetId: "PX-100",
    title: "Upgrade to Ceramic Bearings",
    description: "Replace steel bearings with ceramic to handle higher thermal loads.",
    status: "proposed",
    proposedDate: yesterday,
    author: "Bob Engineer",
    impact: "Downtime required: 24h. Expected MTBF increase: 50%.",
    createdAt: yesterday,
    updatedAt: yesterday
  }
]

export const DEMO_DOCUMENTS: Document[] = [
  {
    id: "d1",
    assetId: "PX-100",
    title: "OEM Manual - PX Series",
    type: "manual",
    url: "#",
    fileSize: 4096,
    mimeType: "application/pdf",
    createdAt: lastWeek,
    updatedAt: lastWeek
  },
  {
    id: "d2",
    assetId: "PX-100",
    title: "Vibration Baseline Report",
    type: "report",
    url: "#",
    createdAt: lastWeek,
    updatedAt: lastWeek
  }
]

export const DEMO_EVIDENCE: Evidence[] = [
  {
    id: "e1",
    assetId: "PX-100",
    sourceType: "Maintenance Log",
    content: "Previous seal failure noted 6 months ago under similar load conditions.",
    confidence: 0.95,
    referenceId: "m1",
    referenceType: "maintenance",
    createdAt: yesterday,
    updatedAt: yesterday
  }
]

// Expose a unified getter
export const getDemoData = (endpoint: string): any => {
  const path = endpoint.split('?')[0];

  if (path.includes('/investigate') || path.includes('/summary')) return null; // handled separately
  
  if (path.endsWith('/api/assets')) return { data: DEMO_ASSETS, meta: { total: DEMO_ASSETS.length } };
  
  const assetMatch = path.match(/\/api\/assets\/([^\/]+)/);
  if (!assetMatch) return { data: [] };
  
  const assetId = assetMatch[1];
  
  if (path.endsWith(`/timeline`)) return { data: DEMO_TIMELINE.map(x => ({ ...x, assetId })) };
  if (path.endsWith(`/maintenance`)) return { data: DEMO_MAINTENANCE.map(x => ({ ...x, assetId })) };
  if (path.endsWith(`/inspections`)) return { data: DEMO_INSPECTIONS.map(x => ({ ...x, assetId })) };
  if (path.endsWith(`/engineering-changes`)) return { data: DEMO_ENGINEERING.map(x => ({ ...x, assetId })) };
  if (path.endsWith(`/documents`)) return { data: DEMO_DOCUMENTS.map(x => ({ ...x, assetId })) };
  if (path.endsWith(`/evidence`)) return { data: DEMO_EVIDENCE.map(x => ({ ...x, assetId })) };
  
  // Single asset
  const asset = DEMO_ASSETS.find(x => x.id === assetId);
  if (asset) return { data: asset };
  
  return { data: [] };
}
