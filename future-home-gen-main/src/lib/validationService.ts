/**
 * Validation Service
 * Validates user inputs for all forms
 */

export interface ValidationError {
  field: string;
  message: string;
  type: "error" | "warning";
}

export interface HousePlanningInput {
  location: string;
  state: string;
  plotSize: number;
  budget: number;
  buildingType: "residential" | "commercial" | "mixed-use" | "industrial";
  bedrooms?: number;
  bathrooms?: number;
  orientation?: string;
  constraints?: string[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  sanitizedData?: HousePlanningInput;
}

/**
 * Validate house planning inputs
 */
export const validateHousePlanningInput = (data: any): ValidationResult => {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Location
  if (!data.location || data.location.trim().length === 0) {
    errors.push({
      field: "location",
      message: "Location is required",
      type: "error",
    });
  }

  // State
  if (!data.state || data.state.trim().length === 0) {
    errors.push({
      field: "state",
      message: "State is required",
      type: "error",
    });
  }

  // Plot Size
  const plotSize = parseFloat(data.plotSize);
  if (isNaN(plotSize) || plotSize <= 0) {
    errors.push({
      field: "plotSize",
      message: "Plot size must be a positive number",
      type: "error",
    });
  } else if (plotSize < 500) {
    warnings.push({
      field: "plotSize",
      message: "Very small plot (< 500 sq ft). Limited design options.",
      type: "warning",
    });
  } else if (plotSize > 50000) {
    warnings.push({
      field: "plotSize",
      message: "Very large plot. Consider multiple structures.",
      type: "warning",
    });
  }

  // Budget
  const budget = parseFloat(data.budget);
  if (isNaN(budget) || budget <= 0) {
    errors.push({
      field: "budget",
      message: "Budget must be a positive number",
      type: "error",
    });
  } else if (budget < 200000) {
    warnings.push({
      field: "budget",
      message: "Budget very low. This limits material quality and design.",
      type: "warning",
    });
  }

  // Building Type
  const validTypes = ["residential", "commercial", "mixed-use", "industrial"];
  if (!data.buildingType || !validTypes.includes(data.buildingType)) {
    errors.push({
      field: "buildingType",
      message: "Invalid building type. Select residential, commercial, mixed-use, or industrial",
      type: "error",
    });
  }

  // Bedrooms (if residential)
  if (data.buildingType === "residential" && data.bedrooms) {
    const bedrooms = parseFloat(data.bedrooms);
    if (isNaN(bedrooms) || bedrooms < 0 || bedrooms > 20) {
      errors.push({
        field: "bedrooms",
        message: "Bedrooms must be between 0 and 20",
        type: "error",
      });
    }
  }

  // Bathrooms
  if (data.bathrooms) {
    const bathrooms = parseFloat(data.bathrooms);
    if (isNaN(bathrooms) || bathrooms < 0 || bathrooms > 10) {
      errors.push({
        field: "bathrooms",
        message: "Bathrooms must be between 0 and 10",
        type: "error",
      });
    }
  }

  // Check budget vs plot size ratio (rough sanity check)
  if (!isNaN(plotSize) && plotSize > 0 && !isNaN(budget) && budget > 0) {
    const costPerSqFt = budget / plotSize;
    if (costPerSqFt < 500) {
      warnings.push({
        field: "budget",
        message: `Budget appears low (₹${costPerSqFt}/sq ft). Average in India: ₹1,500-3,000/sq ft`,
        type: "warning",
      });
    } else if (costPerSqFt > 10000) {
      warnings.push({
        field: "budget",
        message: `Budget appears very high (₹${costPerSqFt}/sq ft). Average in India: ₹1,500-3,000/sq ft`,
        type: "warning",
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    sanitizedData: errors.length === 0 ? sanitizeInput(data) : undefined,
  };
};

/**
 * Sanitize and normalize input data
 */
const sanitizeInput = (data: any): HousePlanningInput => {
  return {
    location: (data.location || "").trim(),
    state: (data.state || "").trim(),
    plotSize: parseFloat(data.plotSize) || 0,
    budget: parseFloat(data.budget) || 0,
    buildingType: (data.buildingType || "residential") as any,
    bedrooms: data.bedrooms ? parseFloat(data.bedrooms) : undefined,
    bathrooms: data.bathrooms ? parseFloat(data.bathrooms) : undefined,
    orientation: (data.orientation || "").trim() || undefined,
    constraints: Array.isArray(data.constraints) ? data.constraints : [],
  };
};

/**
 * Validate cost estimator input
 */
export const validateCostEstimatorInput = (data: any): ValidationResult => {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  const area = parseFloat(data.area);
  if (isNaN(area) || area <= 0) {
    errors.push({
      field: "area",
      message: "Built-up area must be a positive number",
      type: "error",
    });
  }

  const quality = data.quality || "standard";
  const validQualities = ["budget", "standard", "premium", "luxury"];
  if (!validQualities.includes(quality)) {
    errors.push({
      field: "quality",
      message: "Invalid quality level",
      type: "error",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Validate contract text input
 */
export const validateContractInput = (text: string): ValidationResult => {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  if (!text || text.trim().length === 0) {
    errors.push({
      field: "contractText",
      message: "Please paste or upload contract text",
      type: "error",
    });
  } else if (text.trim().length < 100) {
    errors.push({
      field: "contractText",
      message: "Contract text seems too short. Please paste the full document.",
      type: "error",
    });
  }

  if (text.length > 50000) {
    warnings.push({
      field: "contractText",
      message: "Contract very long. Analysis may take longer.",
      type: "warning",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Validate compliance question
 */
export const validateComplianceQuestion = (question: string): ValidationResult => {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  if (!question || question.trim().length === 0) {
    errors.push({
      field: "question",
      message: "Please enter a question about building regulations",
      type: "error",
    });
  } else if (question.trim().length < 10) {
    errors.push({
      field: "question",
      message: "Please provide more detail in your question",
      type: "error",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Get user-friendly error message
 */
export const getErrorMessage = (error: ValidationError): string => {
  const prefix = error.type === "error" ? "❌" : "⚠️";
  return `${prefix} ${error.field}: ${error.message}`;
};

/**
 * Check if input is for demo
 */
export const shouldUseDemo = (data: any): boolean => {
  return data.useDemo === true || data.loadSample === true;
};
