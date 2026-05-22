/**
 * Mock Compliance & Regulatory Database
 * India-focused building codes, setback rules, and compliance requirements
 * This data is for demonstration; always verify with local authorities
 */

export interface RegulationItem {
  id: string;
  title: string;
  category: "setback" | "height" | "parking" | "drainage" | "material" | "safety" | "other";
  description: string;
  applicableRegions: string[]; // e.g., ["Delhi", "National Code"]
  requirement: string;
  riskLevel: "low" | "medium" | "high";
  source: string; // e.g., "NBC 2016", "NAREDCO", "Local Authority"
}

export const regulations: RegulationItem[] = [
  {
    id: "reg-001",
    title: "Front Setback (Residential)",
    category: "setback",
    description: "Minimum distance from road boundary",
    applicableRegions: ["Delhi", "Bangalore", "Mumbai", "Pan-India"],
    requirement: "Front setback: 6-10m from road (varies by road width and zone)",
    riskLevel: "high",
    source: "NBC 2016 & Local Authority Rules",
  },
  {
    id: "reg-002",
    title: "Side & Rear Setback",
    category: "setback",
    description: "Clearance from side and rear boundaries",
    applicableRegions: ["Delhi", "Bangalore", "Mumbai", "Pan-India"],
    requirement: "Side: 3-5m, Rear: 6-10m (check zone-specific rules)",
    riskLevel: "high",
    source: "Master Plan Regulations",
  },
  {
    id: "reg-003",
    title: "Ground Coverage Ratio (GCR)",
    category: "material",
    description: "Maximum percentage of plot that can be built on ground floor",
    applicableRegions: ["Pan-India"],
    requirement: "Typically 40-60% for residential (varies by zone)",
    riskLevel: "medium",
    source: "Zoning Regulations",
  },
  {
    id: "reg-004",
    title: "Floor Space Index (FSI)",
    category: "height",
    description: "Ratio of total built-up area to plot area",
    applicableRegions: ["Pan-India"],
    requirement: "FSI 1.5-2.5 for residential (higher in commercial zones)",
    riskLevel: "high",
    source: "Master Plan",
  },
  {
    id: "reg-005",
    title: "Building Height Limits",
    category: "height",
    description: "Maximum height from ground level",
    applicableRegions: ["Pan-India"],
    requirement: "Typically 9-21m (±1m for pitched roof); depends on zone",
    riskLevel: "high",
    source: "Zoning Bye-laws",
  },
  {
    id: "reg-006",
    title: "Parking Requirements",
    category: "parking",
    description: "Minimum parking spaces based on plot size / built area",
    applicableRegions: ["Delhi", "Bangalore", "Mumbai"],
    requirement: "1 space per 100-150 sq.m built area (varies by city)",
    riskLevel: "medium",
    source: "Parking Norms",
  },
  {
    id: "reg-007",
    title: "Rainwater Harvesting",
    category: "drainage",
    description: "Mandatory water conservation system",
    applicableRegions: ["Pan-India"],
    requirement: "Every building >500 sq.m must have RWH system",
    riskLevel: "medium",
    source: "Water Conservation Act",
  },
  {
    id: "reg-008",
    title: "Fire Safety (NBC Code)",
    category: "safety",
    description: "Fire egress, alarm systems, sprinklers",
    applicableRegions: ["Pan-India"],
    requirement: "Min. 1 staircase for buildings ≤7 levels; dual staircase for higher",
    riskLevel: "high",
    source: "NBC 2016 - Fire Code",
  },
  {
    id: "reg-009",
    title: "Sanitation & Waste Management",
    category: "drainage",
    description: "Sewage treatment and waste segregation",
    applicableRegions: ["Pan-India"],
    requirement: "STP required if plot >2000 sq.m; waste bins segregation mandatory",
    riskLevel: "medium",
    source: "Solid Waste Management Rules",
  },
  {
    id: "reg-010",
    title: "Environmental Clearance (EC)",
    category: "other",
    description: "Permission for projects affecting environment",
    applicableRegions: ["Pan-India"],
    requirement: "EC required for buildings >20,000 sq.m; industrial >40 hectares",
    riskLevel: "high",
    source: "EIA Notification 2006",
  },
];

export interface ComplianceQuestion {
  id: string;
  question: string;
  answer: string;
  relatedRegulations: string[]; // IDs of related regulation items
  location?: string; // specific state/city if applicable
}

export const complianceQA: ComplianceQuestion[] = [
  {
    id: "qa-001",
    question: "What is the minimum plot size for residential construction?",
    answer:
      "Plot sizes vary by location and zoning. Typical minimum is 100-150 sq.m in residential zones. Check with your local municipal corporation for exact requirements.",
    relatedRegulations: ["reg-001", "reg-002"],
    location: "General",
  },
  {
    id: "qa-002",
    question: "How much clearance do I need from the road?",
    answer:
      "Front setback is typically 6-10m from the road, depending on road width and zone classification. Narrower roads may have lower requirements (6m), while major roads require 10m+. Verify with local authority.",
    relatedRegulations: ["reg-001"],
    location: "Pan-India",
  },
  {
    id: "qa-003",
    question: "What is FSI and how does it affect my building?",
    answer:
      "FSI (Floor Space Index) is the total built-up area divided by plot area. If your plot is 500 sq.m and FSI is 2, max built-up area is 1000 sq.m. This determines how many floors you can build. Higher zones allow higher FSI.",
    relatedRegulations: ["reg-004", "reg-005"],
    location: "Pan-India",
  },
  {
    id: "qa-004",
    question: "Do I need parking spaces?",
    answer:
      "Yes. Most cities require 1 parking space per 100-150 sq.m of built area. This can be on-plot or in a nearby society garage. Verify exact norms with your city planning authority.",
    relatedRegulations: ["reg-006"],
    location: "Delhi, Bangalore, Mumbai",
  },
  {
    id: "qa-005",
    question: "Is rainwater harvesting mandatory?",
    answer:
      "Yes, rainwater harvesting is mandatory for buildings with built-up area >500 sq.m. You must design a system to collect and store roof runoff. Check local norms for tank size and placement.",
    relatedRegulations: ["reg-007"],
    location: "Pan-India",
  },
  {
    id: "qa-006",
    question: "What fire safety requirements apply to my home?",
    answer:
      "Residential buildings ≤7 floors need at least 1 staircase with emergency exit. All buildings need fire extinguishers, alarms, and emergency lighting. Taller buildings (>7 floors) require 2 staircases.",
    relatedRegulations: ["reg-008"],
    location: "Pan-India",
  },
  {
    id: "qa-007",
    question: "When do I need Environmental Clearance?",
    answer:
      "Environmental Clearance (EC) is required for buildings with built-up area >20,000 sq.m in sensitive zones. Most residential plots <20,000 sq.m don't require EC. Check if your location is in a sensitive zone.",
    relatedRegulations: ["reg-010"],
    location: "Pan-India",
  },
  {
    id: "qa-008",
    question: "What documents do I need for approval?",
    answer:
      "Typically: site plan, floor plans, elevation, section, parking layout, FSI calculation, compliance checklist. Some authorities require energy audit, environmental report, or heritage clearance. List varies by location.",
    relatedRegulations: ["reg-001", "reg-004", "reg-006"],
    location: "Pan-India",
  },
];

export function getRegulationsByCategory(category: RegulationItem["category"]): RegulationItem[] {
  return regulations.filter((r) => r.category === category);
}

export function getRegulationsByRegion(region: string): RegulationItem[] {
  return regulations.filter((r) => r.applicableRegions.includes(region) || r.applicableRegions.includes("Pan-India"));
}

export function getComplianceQAByLocation(location: string): ComplianceQuestion[] {
  return complianceQA.filter((q) => !q.location || q.location === location || q.location === "General");
}
