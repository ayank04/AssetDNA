import { createService } from "./base.service"
import { API_CONFIG } from "@/config/api"
import { Asset, Document, MaintenanceRecord, Inspection, EngineeringChange, Evidence } from "@/types/models"
import { TimelineService } from "./timeline.service"
import { AIService } from "./ai.service"

// Generate standard CRUD services dynamically based on type and endpoint
export const AssetService = createService<Asset>(API_CONFIG.ENDPOINTS.ASSETS)
export const DocumentService = createService<Document>(API_CONFIG.ENDPOINTS.DOCUMENTS)
export const MaintenanceService = createService<MaintenanceRecord>(API_CONFIG.ENDPOINTS.MAINTENANCE)
export const InspectionService = createService<Inspection>(API_CONFIG.ENDPOINTS.INSPECTION)
export const EngineeringService = createService<EngineeringChange>(API_CONFIG.ENDPOINTS.ENGINEERING)
export const EvidenceService = createService<Evidence>(API_CONFIG.ENDPOINTS.EVIDENCE)

// Re-export custom services that don't fit the generic CRUD pattern
export { TimelineService, AIService }
