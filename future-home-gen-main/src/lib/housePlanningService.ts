/**
 * House Planning Service
 * Orchestrates the house planning flow:
 * - Validates input
 * - Generates response (AI or demo)
 * - Formats output
 * - Handles errors
 */

import { SAMPLE_SCENARIOS } from "@/data/sampleScenarios";
import { formatHousePlanningResponse, StructuredResult } from "@/lib/responseFormatter";
import { validateHousePlanningInput } from "@/lib/validationService";

export interface HousePlanningInput {
  location: string;
  state: string;
  plotSize: string;
  budget: string;
  buildingType: string;
  bedrooms?: string;
  bathrooms?: string;
  orientation?: string;
  useDemo?: boolean;
  demoScenarioId?: string;
}

/**
 * Generate house planning response
 * First tries to use demo data if available
 * Falls back to Gemini API if configured
 */
export const generateHousePlanningResponse = async (
  input: HousePlanningInput,
  apiKey?: string
): Promise<StructuredResult> => {
  // Validate input
  const validation = validateHousePlanningInput(input);
  if (!validation.isValid) {
    throw new Error(`Validation failed: ${validation.errors.map(e => e.message).join(", ")}`);
  }

  // Check if user wants demo mode
  if (input.useDemo || input.demoScenarioId) {
    return getDemoResponse(input);
  }

  // Otherwise try to call Gemini API
  if (!apiKey) {
    // No API key provided, fall back to demo
    console.warn("No API key provided, using demo mode");
    return getDemoResponse(input);
  }

  try {
    return await callGeminiAndFormat(input, apiKey);
  } catch (error) {
    console.warn("Gemini API failed, falling back to demo mode", error);
    return getDemoResponse(input);
  }
};

/**
 * Get demo response based on input or scenario ID
 */
const getDemoResponse = (input: HousePlanningInput): StructuredResult => {
  // If specific scenario ID provided, use it
  if (input.demoScenarioId) {
    const scenario = SAMPLE_SCENARIOS.find(s => s.id === input.demoScenarioId);
    if (scenario) {
      return formatHousePlanningResponse(scenario.expectedOutput, {
        location: input.location,
        state: input.state,
        plotSize: parseFloat(input.plotSize),
        budget: parseFloat(input.budget),
        buildingType: input.buildingType,
      });
    }
  }

  // Match based on input characteristics
  // For demo, return appropriate scenario based on building type and size
  let selectedScenario = SAMPLE_SCENARIOS[0]; // Default to first

  if (
    input.buildingType === "commercial" &&
    parseFloat(input.plotSize) > 4000
  ) {
    selectedScenario = SAMPLE_SCENARIOS[1];
  } else if (
    input.buildingType === "residential" &&
    parseFloat(input.plotSize) > 3000
  ) {
    selectedScenario = SAMPLE_SCENARIOS[2];
  }

  return formatHousePlanningResponse(selectedScenario.expectedOutput, {
    location: input.location,
    state: input.state,
    plotSize: parseFloat(input.plotSize),
    budget: parseFloat(input.budget),
    buildingType: input.buildingType,
  });
};

/**
 * Call Gemini API and format response
 */
const callGeminiAndFormat = async (
  input: HousePlanningInput,
  apiKey: string
): Promise<StructuredResult> => {
  const prompt = buildHousePlanningPrompt(input);

  try {
    // Import Gemini dynamically to avoid issues if not configured
    const { generateDesignLayout } = await import("@/lib/gemini");
    const response = await generateDesignLayout(prompt, apiKey);

    return formatHousePlanningResponse(response, {
      location: input.location,
      state: input.state,
      plotSize: parseFloat(input.plotSize),
      budget: parseFloat(input.budget),
      buildingType: input.buildingType,
    });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate response from AI. Please try again or use demo mode.");
  }
};

/**
 * Build optimized prompt for Gemini
 */
const buildHousePlanningPrompt = (input: HousePlanningInput): string => {
  const plotSizeSqFt = parseFloat(input.plotSize);
  const budgetLakhs = parseFloat(input.budget) / 100000;

  let prompt = `You are an expert Indian construction and house planning consultant.

User wants to plan a ${input.buildingType} building with these details:
- Location: ${input.location}, ${input.state}
- Plot Size: ${plotSizeSqFt} sq ft
- Budget: ₹${budgetLakhs.toFixed(2)} Lakhs
- Building Type: ${input.buildingType}`;

  if (input.buildingType === "residential" && input.bedrooms) {
    prompt += `
- Required: ${input.bedrooms} BHK + ${input.bathrooms} BTH`;
  }

  if (input.orientation) {
    prompt += `
- Plot Orientation: ${input.orientation}-facing`;
  }

  prompt += `

Please provide a comprehensive house planning guide with:

1. **Layout Recommendation**
   - Ground floor and first floor breakdown
   - Suggested room dimensions
   - Special considerations for ${input.state}

2. **Material & Cost Breakdown**
   - Key materials needed (cement, steel, bricks, etc.)
   - Estimated quantities
   - Regional cost estimates for ${input.state}
   - Total estimated cost with confidence level

3. **Design Tips**
   - Ventilation and natural lighting
   - Climate considerations for ${input.location}
   - Structural recommendations

4. **Regulatory Considerations**
   - Key building bye-laws for ${input.state}
   - Typical setback and height limits
   - Any special permits or approvals needed

5. **Risk Flags**
   - Budget concerns if any
   - Common issues in ${input.location}
   - What to watch out for

6. **Next Steps**
   - Immediate action items
   - Professional consultations needed
   - Timeline expectations

IMPORTANT: Be honest about limitations. Clearly state:
- This is general guidance only
- Local verification is essential
- Professional architect approval is required
- Material rates may vary
- All figures are estimates`;

  return prompt;
};

/**
 * Get available demo scenarios
 */
export const getAvailableDemoScenarios = () => {
  return SAMPLE_SCENARIOS.map(s => ({
    id: s.id,
    name: s.name,
    description: s.description,
  }));
};

/**
 * Load a specific scenario
 */
export const loadDemoScenario = (
  scenarioId: string
): HousePlanningInput | null => {
  const scenario = SAMPLE_SCENARIOS.find(s => s.id === scenarioId);
  if (!scenario) return null;

  return {
    location: scenario.inputs.location,
    state: scenario.inputs.state,
    plotSize: scenario.inputs.plotSize.toString(),
    budget: scenario.inputs.budget.toString(),
    buildingType: scenario.inputs.buildingType,
    bedrooms: scenario.inputs.bedrooms?.toString(),
    bathrooms: scenario.inputs.bathrooms?.toString(),
    orientation: scenario.inputs.orientation,
    demoScenarioId: scenarioId,
    useDemo: true,
  };
};

/**
 * Save planning result to storage
 */
export const savePlanningResult = (
  userId: string,
  input: HousePlanningInput,
  result: StructuredResult
) => {
  const results = getUserPlanningResults(userId);
  const newResult = {
    id: `plan-${Date.now()}`,
    userId,
    title: `${input.buildingType} in ${input.location}`,
    input,
    result,
    createdAt: new Date().toISOString(),
  };
  results.unshift(newResult);
  localStorage.setItem(`buildgen_planning_${userId}`, JSON.stringify(results));
  return newResult;
};

/**
 * Get user's planning results
 */
export const getUserPlanningResults = (userId: string) => {
  const data = localStorage.getItem(`buildgen_planning_${userId}`);
  return data ? JSON.parse(data) : [];
};
