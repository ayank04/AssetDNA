import { AIInvestigationResponse, Evidence } from "@/types/models"

export const getDemoAiResponse = (query: string): AIInvestigationResponse => {
  const normalizedQuery = query.toLowerCase()
  
  if (normalizedQuery.includes("px-100 fail") || normalizedQuery.includes("why did this asset fail")) {
    return {
      answer: "Based on the telemetry from the last 72 hours and cross-referencing with historical maintenance logs, Pump PX-100 failed due to **excessive radial vibration** exceeding 4.5 mm/s. This directly caused the mechanical seal to degrade prematurely. This pattern matches a failure mode documented in the OEM manual for high-load operations.",
      sources: [
        {
          id: "e1",
          sourceType: "Telemetry Anomaly",
          content: "Vibration sensor NDE-VIB logged sustained 4.8 mm/s for 3 hours prior to shutdown.",
          confidence: 0.98
        },
        {
          id: "e2",
          sourceType: "OEM Manual",
          content: "Section 4.2: Sustained vibration above 4.0 mm/s will lead to accelerated seal degradation.",
          confidence: 0.95
        }
      ],
      metadata: { recommendedAction: "Replace mechanical seal and realign pump shaft." }
    }
  }

  if (normalizedQuery.includes("overdue maintenance") || normalizedQuery.includes("require maintenance")) {
    return {
      answer: "Currently, **2 assets** have overdue maintenance tasks across the fleet:\n\n1. **HVAC Unit 3**: Filter Replacement (14 Days Overdue)\n2. **Boiler Feed Pump P-101**: Bearing Inspection (Critical Priority, Due Today)\n\nI recommend addressing P-101 immediately to prevent unplanned downtime.",
      sources: [
        {
          id: "e3",
          sourceType: "Maintenance Schedule",
          content: "Work Order WO-4492: HVAC Unit 3 Filter Replacement.",
          confidence: 1.0
        }
      ]
    }
  }

  if (normalizedQuery.includes("highest risk") || normalizedQuery.includes("risk analysis")) {
    return {
      answer: "**Pump PX-100** and **Boiler Feed Pump P-101** currently carry the highest risk profiles. PX-100 is already in a failed state due to seal degradation, while P-101 is exhibiting early warning signs of bearing failure (high frequency vibration spikes).",
      sources: [
        {
          id: "e4",
          sourceType: "Risk Model",
          content: "P-101 Failure Probability: 92% within 7 days.",
          confidence: 0.92
        }
      ]
    }
  }

  if (normalizedQuery.includes("compare px-100 and px-101")) {
    return {
      answer: "Both are centrifugal pumps used in the primary coolant loop.\n\n- **PX-100**: Currently offline (maintenance status) due to seal failure. Has a history of high vibration under peak load.\n- **PX-101**: Currently active and nominal. It serves as the backup and received quarterly lubrication last week. Its vibration profile is stable at 1.2 mm/s.",
      sources: [
        {
          id: "e5",
          sourceType: "Asset Registry",
          content: "PX-100 Status: Maintenance. PX-101 Status: Active.",
          confidence: 1.0
        }
      ]
    }
  }

  if (normalizedQuery.includes("documents mention vibration") || normalizedQuery.includes("vibration")) {
    return {
      answer: "I found **3 documents** referencing vibration thresholds for your assets:\n\n1. **OEM Manual - PX Series** (Section 4 covers vibration limits)\n2. **Vibration Baseline Report** (Q1 2024)\n3. **Engineering Change Proposal EC-101** (Upgrading to ceramic bearings to mitigate vibration damage)",
      sources: [
        {
          id: "e6",
          sourceType: "Vector Search",
          content: "Matched 'vibration' in 14 paragraphs across 3 documents.",
          confidence: 0.99
        }
      ]
    }
  }
  
  if (normalizedQuery.includes("evidence") || normalizedQuery.includes("citation")) {
    return {
      answer: "The investigation pulled evidence from three primary systems:\n\n1. **SCADA Historian**: Detected the initial vibration spikes.\n2. **CMMS**: Verified the maintenance logs showing a similar failure 6 months ago.\n3. **Document Repository**: Matched the symptoms against the OEM troubleshooting guide.",
      sources: [
        {
          id: "e7",
          sourceType: "System Audit",
          content: "Cross-referenced SCADA, CMMS, and DocDB.",
          confidence: 1.0
        }
      ]
    }
  }

  // Fallback generic response
  return {
    answer: "Based on the available data, I've analyzed the request. The telemetry and historical records indicate standard operational parameters, but I recommend verifying the physical sensor alignments. If you need specific diagnostics, try asking about 'Pump PX-100' or 'overdue maintenance'.",
    sources: [
      {
        id: "e8",
        sourceType: "Knowledge Base",
        content: "General query processed against industrial data lake.",
        confidence: 0.75
      }
    ]
  }
}
