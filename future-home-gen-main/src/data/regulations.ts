/**
 * Building Regulations & Compliance Data
 * Sample regulations for India (focusing on common rules)
 * Note: This is for demonstration. Always verify with local authorities.
 */

export interface RegulationRule {
  id: string;
  title: string;
  category: "setback" | "height" | "fsi" | "parking" | "fire" | "water" | "other";
  description: string;
  applicableIn: string[];
  minValue?: number;
  maxValue?: number;
  unit?: string;
  exceptions?: string[];
  riskLevel: "low" | "medium" | "high";
  source: string;
}

export const BUILDING_REGULATIONS: RegulationRule[] = [
  {
    id: "setback-front",
    title: "Front Setback (Open Space)",
    category: "setback",
    description: "Minimum distance required from road/property boundary to building front",
    applicableIn: ["all"],
    minValue: 10,
    unit: "feet",
    exceptions: ["corner_plot_15ft", "approved_master_plan"],
    riskLevel: "high",
    source: "Indian Model Building Bye-Laws 2016",
  },
  {
    id: "setback-side",
    title: "Side Setback",
    category: "setback",
    description: "Minimum distance required from side property boundary",
    applicableIn: ["all"],
    minValue: 5,
    maxValue: 7.5,
    unit: "feet",
    exceptions: ["corner_plot_8ft", "adjoining_property_consent"],
    riskLevel: "high",
    source: "Local Municipal Regulations",
  },
  {
    id: "setback-rear",
    title: "Rear Setback",
    category: "setback",
    description: "Minimum distance required from rear property boundary",
    applicableIn: ["all"],
    minValue: 15,
    unit: "feet",
    exceptions: ["small_plot_10ft"],
    riskLevel: "high",
    source: "Municipal Building Bye-Laws",
  },
  {
    id: "height-residential",
    title: "Building Height (Residential)",
    category: "height",
    description: "Maximum number of stories and height for residential buildings",
    applicableIn: ["all"],
    maxValue: 45,
    unit: "feet",
    exceptions: ["approved_heritage", "special_zone"],
    riskLevel: "medium",
    source: "Zoning Regulations",
  },
  {
    id: "fsi-residential",
    title: "Floor Space Index (FSI)",
    category: "fsi",
    description: "Ratio of total built-up area to plot area (floor area ratio)",
    applicableIn: ["all"],
    maxValue: 2,
    unit: "ratio",
    exceptions: ["ground_floor_optional", "corner_plot_2.5"],
    riskLevel: "high",
    source: "Master Plan & Zoning Bye-Laws",
  },
  {
    id: "parking-residential",
    title: "Parking Requirement",
    category: "parking",
    description: "Minimum parking spaces required (residential: 1 space per 100 sq ft built area)",
    applicableIn: ["all"],
    minValue: 1,
    unit: "space per 100 sq ft",
    exceptions: ["below_1000_sqft_optional"],
    riskLevel: "medium",
    source: "Traffic & Parking Bye-Laws",
  },
  {
    id: "fire-safety-staircase",
    title: "Fire Safety - Staircase",
    category: "fire",
    description: "Minimum width of staircase and emergency exit requirements",
    applicableIn: ["all"],
    minValue: 3.5,
    unit: "feet",
    exceptions: [],
    riskLevel: "high",
    source: "National Building Code (NBC) 2016",
  },
  {
    id: "fire-safety-exit",
    title: "Fire Safety - Emergency Exit",
    category: "fire",
    description: "Every building must have minimum 2 independent emergency exits",
    applicableIn: ["all"],
    minValue: 2,
    unit: "exits",
    exceptions: [],
    riskLevel: "high",
    source: "NBC 2016 - Fire Safety Code",
  },
  {
    id: "water-supply",
    title: "Water Supply & Storage",
    category: "water",
    description: "Rainwater harvesting & storage capacity requirement (typically 1,000L min)",
    applicableIn: ["all"],
    minValue: 1000,
    unit: "liters",
    exceptions: ["municipal_supply_adequate"],
    riskLevel: "medium",
    source: "Water Conservation Bye-Laws",
  },
  {
    id: "electrical-safety",
    title: "Electrical Safety",
    category: "other",
    description: "All electrical installations must comply with Indian Electrical Code (IEC)",
    applicableIn: ["all"],
    exceptions: [],
    riskLevel: "high",
    source: "Indian Electrical Code & NBC 2016",
  },
  {
    id: "ventilation",
    title: "Natural Ventilation & Lighting",
    category: "other",
    description: "Minimum 10% of floor area must have external windows/ventilation",
    applicableIn: ["all"],
    minValue: 10,
    unit: "% of floor area",
    exceptions: [],
    riskLevel: "medium",
    source: "NBC 2016 - Building Planning",
  },
  {
    id: "drainage",
    title: "Drainage & Sewerage",
    category: "other",
    description: "Septic tank required if municipal sewerage unavailable",
    applicableIn: ["all"],
    exceptions: ["municipal_sewerage_available"],
    riskLevel: "medium",
    source: "Public Health & Sanitation Code",
  },
];

export const COMPLIANCE_CHECKLIST: {
  title: string;
  items: { id: string; text: string; critical: boolean }[];
} = {
  title: "Pre-Construction Compliance Checklist",
  items: [
    { id: "1", text: "Get plot map approved from revenue office", critical: true },
    { id: "2", text: "Verify no encroachment on boundaries", critical: true },
    { id: "3", text: "Clear municipal property tax (if applicable)", critical: false },
    { id: "4", text: "Get approval of architectural plans from municipality", critical: true },
    { id: "5", text: "Get structural design approved by municipal engineer", critical: true },
    { id: "6", text: "Check for utility lines (electricity, water, drainage)", critical: false },
    { id: "7", text: "Verify FSI and height compliance", critical: true },
    { id: "8", text: "Get fire safety clearance", critical: true },
    { id: "9", text: "Get NOC from Water & Sewerage Board", critical: false },
    { id: "10", text: "Get NOC from Electricity Board", critical: false },
    { id: "11", text: "Environmental clearance (if required)", critical: false },
    { id: "12", text: "Contractor registration (Class A/B)", critical: false },
  ],
};

export const STATE_SPECIFIC_RULES: {
  [key: string]: { setback: string; height: string; fsi: string; notes: string };
} = {
  "Karnataka": {
    setback: "10ft (front), 5ft (side), 15ft (rear)",
    height: "45 ft (single plot)",
    fsi: "2.0 (residential)",
    notes: "Bangalore BBMP has specific rules for different zones. Check zoning first.",
  },
  "Maharashtra": {
    setback: "10ft (front), 5ft (side), 15ft (rear) - varies by municipal zone",
    height: "45 ft (standard)",
    fsi: "1.5-2.5 (depends on zone)",
    notes: "BMC & other municipal corporations have different rules. Very strict in Mumbai.",
  },
  "Telangana": {
    setback: "10-15ft (front), 5-7.5ft (side), 15ft (rear)",
    height: "43 ft typical",
    fsi: "2.0-2.5",
    notes: "GHMC rules for Hyderabad. Check master plan zoning.",
  },
  "Delhi": {
    setback: "7.5-10ft (front), 4-5ft (side), 10-15ft (rear) - varies by zone",
    height: "30-45 ft (varies by zone)",
    fsi: "1.75-2.5 (varies by zone)",
    notes: "Very strict regulations. Delhi Master Plan 2021 in effect. Multiple zones.",
  },
  "Tamil Nadu": {
    setback: "10ft (front), 5ft (side), 15ft (rear)",
    height: "45 ft",
    fsi: "2.0",
    notes: "CMC rules for Chennai. Additional regulations for heritage areas.",
  },
  "Punjab": {
    setback: "10ft (front), 5ft (side), 15ft (rear)",
    height: "43 ft",
    fsi: "2.0",
    notes: "Municipal Corporation rules. Varies by city.",
  },
};

export const getRegulatiosByCategory = (category: string): RegulationRule[] => {
  return BUILDING_REGULATIONS.filter(r => r.category === category);
};

export const getRulesByState = (state: string) => {
  return STATE_SPECIFIC_RULES[state] || null;
};

export const getCriticalChecks = () => {
  return COMPLIANCE_CHECKLIST.items.filter(item => item.critical);
};
