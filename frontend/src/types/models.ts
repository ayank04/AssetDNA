// Base Entity
export interface BaseEntity {
  id: string;
  createdAt: string; // ISO String
  updatedAt: string; // ISO String
}

// --------------------------------------------------
// Assets
// --------------------------------------------------
export interface Asset extends BaseEntity {
  name: string;
  description: string;
  type: string;
  status: "active" | "inactive" | "maintenance" | "decommissioned";
  location: string;
  metadata?: Record<string, any>;
}

// --------------------------------------------------
// Timeline & Events
// --------------------------------------------------
export type TimelineEventType = 
  | "maintenance" 
  | "inspection" 
  | "engineering_change" 
  | "status_change" 
  | "note";

export interface TimelineEvent extends BaseEntity {
  assetId: string;
  type: TimelineEventType;
  title: string;
  description: string;
  date: string;
  referenceId?: string; // ID of the specific record (e.g., maintenanceId)
  metadata?: Record<string, any>;
}

// --------------------------------------------------
// Maintenance
// --------------------------------------------------
export interface MaintenanceRecord extends BaseEntity {
  assetId: string;
  title: string;
  description: string;
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  scheduledDate: string;
  completedDate?: string;
  technician?: string;
  cost?: number;
  partsReplaced?: string[];
  notes?: string;
}

// --------------------------------------------------
// Inspections
// --------------------------------------------------
export interface Inspection extends BaseEntity {
  assetId: string;
  title: string;
  date: string;
  inspector: string;
  status: "pass" | "fail" | "conditional";
  findings: string;
  recommendations?: string;
}

// --------------------------------------------------
// Engineering Changes
// --------------------------------------------------
export interface EngineeringChange extends BaseEntity {
  assetId: string;
  title: string;
  description: string;
  status: "proposed" | "approved" | "implemented" | "rejected";
  proposedDate: string;
  implementationDate?: string;
  author: string;
  impact?: string;
}

// --------------------------------------------------
// Documents
// --------------------------------------------------
export interface Document extends BaseEntity {
  assetId: string;
  title: string;
  type: "manual" | "schematic" | "report" | "other";
  url: string; // Local storage path or signed URL
  fileSize?: number;
  mimeType?: string;
}

// --------------------------------------------------
// Evidence (Context Retrieval)
// --------------------------------------------------
export interface Evidence extends Partial<BaseEntity> {
  assetId?: string;
  title?: string;
  type?: string;
  sourceType: string;
  content: string;
  confidence: number;
  referenceId?: string;
  referenceType?: "document" | "timeline" | "maintenance" | "inspection" | "engineering";
  createdBy?: string;
  url?: string;
  metadata?: Record<string, any>;
}

// --------------------------------------------------
// AI Investigation
// --------------------------------------------------
export interface AIInvestigationResponse {
  answer: string;
  sources: Evidence[];
  metadata?: Record<string, any>;
}
