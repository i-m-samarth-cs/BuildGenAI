/**
 * Response Formatter Service
 * Converts raw Gemini API responses or demo text into structured output
 * Provides consistent formatting for all output types
 */

export interface StructuredResult {
  title: string;
  summary: string;
  assumptions: string[];
  limitations: string[];
  layout?: string;
  breakdown?: BreakdownItem[];
  totalEstimate?: {
    amount: number;
    currency: string;
    confidence: "low" | "medium" | "high";
    confidenceNote: string;
  };
  riskFlags?: RiskFlag[];
  recommendations?: string[];
  disclaimers?: string[];
  nextSteps?: string[];
  sourceNote?: string;
}

export interface BreakdownItem {
  category: string;
  items: {
    name: string;
    quantity?: number;
    unit?: string;
    rate?: number;
    amount?: number;
  }[];
  subtotal?: number;
}

export interface RiskFlag {
  severity: "low" | "medium" | "high";
  title: string;
  description: string;
  recommendation: string;
}

/**
 * Format response from Gemini or demo data into structured result
 */
export const formatHousePlanningResponse = (
  rawText: string,
  inputData: {
    location: string;
    state: string;
    plotSize: number;
    budget: number;
    buildingType: string;
  }
): StructuredResult => {
  // This would parse the raw Gemini response and extract sections
  // For demo purposes, if the text already has proper structure (like our sample scenarios),
  // we can return it as-is with proper formatting

  return {
    title: `House Planning Result: ${inputData.buildingType.charAt(0).toUpperCase() + inputData.buildingType.slice(1)} in ${inputData.location}`,
    summary: `Planning for ${inputData.plotSize} sq ft plot in ${inputData.location}, ${inputData.state} with ₹${inputData.budget / 100000} Lakh budget`,
    assumptions: [
      `Based on average construction rates for ${inputData.location}`,
      "Material costs are estimates and may vary by supplier and market conditions",
      "Labour rates subject to market changes and availability",
      "This is general guidance for planning purposes only",
      `Local building codes and regulations for ${inputData.state} apply`,
    ],
    limitations: [
      `Site-specific factors (terrain, soil, utilities) not included in this estimate`,
      "Actual costs will depend on quality of materials selected",
      "Labour costs vary based on project complexity",
      "Local taxes and levies not included",
      "Assumes standard construction methods",
    ],
    disclaimers: [
      `⚠️ This is NOT official advice or professional design`,
      `🔍 You MUST get approval from: Municipal Corporation, Registered Architect, Structural Engineer`,
      `✅ Verify all details with local building authorities in ${inputData.state}`,
      `💼 Hire a qualified architect before actual construction`,
      `📋 This estimate has ±20-30% variance. Get contractor quotes for accuracy`,
    ],
    nextSteps: [
      `1. Hire a Registered Architect (typical fee: ₹${Math.round(inputData.budget * 0.05)}-${Math.round(inputData.budget * 0.07)}  or 5-7% of project cost)`,
      `2. Get design and layout approved by ${inputData.state} municipal authorities`,
      `3. Get structural design by licensed structural engineer`,
      `4. Get cost quotes from 3+ local contractors`,
      `5. Verify material rates with local suppliers`,
      `6. Check building regulations for setbacks, FSI, height limits`,
      `7. If taking home loan, inform bank early for their checks`,
    ],
    sourceNote: "Demo Scenario | For planning and educational purposes only",
  };
};

/**
 * Create a structured output with all required sections
 */
export const createStructuredOutput = (
  override: Partial<StructuredResult>,
  base: StructuredResult = createDefaultStructuredOutput()
): StructuredResult => {
  return { ...base, ...override };
};

/**
 * Default structured output template
 */
export const createDefaultStructuredOutput = (): StructuredResult => {
  return {
    title: "Planning Result",
    summary: "Awaiting input...",
    assumptions: [],
    limitations: [],
    disclaimers: [
      "⚠️ This is for planning purposes only",
      "✅ Always verify with local authorities",
    ],
    nextSteps: [],
  };
};

/**
 * Parse cost breakdown from text
 */
export const parseBreakdown = (text: string): BreakdownItem[] => {
  const breakdown: BreakdownItem[] = [];

  // This is a simplified parser
  // In a real scenario, you'd use more sophisticated parsing
  const lines = text.split("\n");
  let currentCategory: BreakdownItem | null = null;

  for (const line of lines) {
    if (line.includes("Category") || line.includes("Breakdown")) {
      currentCategory = {
        category: line.trim(),
        items: [],
      };
      breakdown.push(currentCategory);
    }
  }

  return breakdown;
};

/**
 * Add risk flag to result
 */
export const addRiskFlag = (
  result: StructuredResult,
  flag: RiskFlag
): StructuredResult => {
  if (!result.riskFlags) {
    result.riskFlags = [];
  }
  result.riskFlags.push(flag);
  return result;
};

/**
 * Format currency in rupees
 */
export const formatCurrency = (amount: number): string => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Crore`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakh`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return `₹${amount}`;
};

/**
 * Calculate confidence percentage
 */
export const calculateConfidence = (data: {
  hasExactMeasurements?: boolean;
  hasMarketRates?: boolean;
  isRegionalData?: boolean;
  includedContingency?: number;
}): { level: "low" | "medium" | "high"; percentage: number; note: string } => {
  let confidence = 50; // Base

  if (data.hasExactMeasurements) confidence += 15;
  if (data.hasMarketRates) confidence += 20;
  if (data.isRegionalData) confidence += 10;
  if (data.includedContingency && data.includedContingency >= 10) confidence += 5;

  let level: "low" | "medium" | "high" = "low";
  let note = "Very uncertain. Get professional quotes.";

  if (confidence >= 75) {
    level = "high";
    note = "Good confidence. Contractor quotes recommended.";
  } else if (confidence >= 55) {
    level = "medium";
    note = "Medium confidence. May vary ±15-20%.";
  }

  return { level, percentage: confidence, note };
};

/**
 * Generate next steps based on input
 */
export const generateNextSteps = (data: {
  projectType: string;
  state: string;
  needsDesign?: boolean;
  needsStructural?: boolean;
}): string[] => {
  const steps: string[] = [];

  if (data.needsDesign) {
    steps.push("1. Hire Registered Architect for detailed design");
  }

  steps.push(`2. Submit layout to ${data.state} municipal authorities`);

  if (data.needsStructural) {
    steps.push("3. Get structural design from licensed structural engineer");
  }

  steps.push("4. Get construction cost quotes from contractors");
  steps.push("5. Verify compliance with local building bye-laws");
  steps.push("6. Arrange finance (home loan processing: 30-45 days)");

  return steps;
};

/**
 * Create disclaimer text with context
 */
export const createDisclaimer = (context: {
  location: string;
  state: string;
  projectType: string;
}): string => {
  return `⚠️ **IMPORTANT DISCLAIMERS**

This output is for planning and educational purposes ONLY. It is NOT official architectural or engineering advice.

**You MUST:**
✅ Hire a registered architect or structural engineer
✅ Get municipal approval from ${context.state} authorities
✅ Verify all building regulations for your location
✅ Get competitive cost quotes before starting work
✅ Comply with local zoning and FSI regulations

**This does NOT include:**
- Site-specific soil/geological analysis
- Structural design or calculations
- Legal documentation or contracts
- Municipal approval or permits
- Labor and equipment hire details

**Estimated Cost Accuracy**: ±20-30% (get contractor quotes for actual costs)

Always consult with professionals in your area before making construction decisions.`;
};
