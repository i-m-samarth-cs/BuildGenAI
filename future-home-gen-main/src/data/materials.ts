/**
 * Materials Database
 * Contains material types, rates, and quantities for Indian construction
 */

export interface Material {
  id: string;
  name: string;
  category: "structural" | "finishing" | "mechanical" | "utility";
  unit: string;
  unitRate: number; // in rupees
  description: string;
  regions: {
    [key: string]: number; // region-specific rate multiplier
  };
  typical: {
    min: number;
    max: number;
    description: string;
  };
}

export const MATERIALS: Material[] = [
  {
    id: "cement",
    name: "Cement (50kg bag)",
    category: "structural",
    unit: "bag",
    unitRate: 450,
    description: "Portland Pozzolana Cement (PPC) for concrete",
    regions: {
      "Delhi": 1.0,
      "Mumbai": 1.05,
      "Bangalore": 0.95,
      "Hyderabad": 0.9,
      "Pune": 0.95,
      "Chennai": 1.05,
      "Kolkata": 0.95,
      "Delhi-NCR": 1.0,
    },
    typical: {
      min: 400,
      max: 550,
      description: "For 1,000 sq ft residential: 350-400 bags",
    },
  },
  {
    id: "steel",
    name: "Steel Reinforcement (TMT bars)",
    category: "structural",
    unit: "tonne",
    unitRate: 85000,
    description: "Thermo Mechanically Treated (TMT) bars for RCC",
    regions: {
      "Delhi": 1.0,
      "Mumbai": 1.08,
      "Bangalore": 0.98,
      "Hyderabad": 0.96,
      "Pune": 0.98,
      "Chennai": 1.06,
      "Kolkata": 0.98,
    },
    typical: {
      min: 70000,
      max: 100000,
      description: "For 1,000 sq ft: 40-50 tonnes at ₹85K/tonne",
    },
  },
  {
    id: "bricks",
    name: "Clay Bricks",
    category: "structural",
    unit: "1000 units",
    unitRate: 3500,
    description: "Standard 9x4.5x3 inch clay bricks for masonry",
    regions: {
      "Delhi": 1.0,
      "Mumbai": 1.1,
      "Bangalore": 0.95,
      "Hyderabad": 0.85,
      "Pune": 0.9,
      "Chennai": 1.08,
      "Kolkata": 0.92,
    },
    typical: {
      min: 3000,
      max: 4500,
      description: "For 1,000 sq ft: 60-80K bricks needed",
    },
  },
  {
    id: "sand",
    name: "River Sand (M-Sand)",
    category: "structural",
    unit: "cubic feet",
    unitRate: 20,
    description: "Machine-made sand for construction (fine grade)",
    regions: {
      "Delhi": 1.0,
      "Mumbai": 1.3,
      "Bangalore": 1.1,
      "Hyderabad": 0.9,
      "Pune": 1.0,
      "Chennai": 1.2,
      "Kolkata": 1.1,
    },
    typical: {
      min: 15,
      max: 30,
      description: "For 1,000 sq ft: 800-1,000 cubic ft needed",
    },
  },
  {
    id: "tiles-floor",
    name: "Floor Tiles (Vitrified)",
    category: "finishing",
    unit: "sq ft",
    unitRate: 30,
    description: "60x60 cm vitrified tiles (includes wastage)",
    regions: {
      "Delhi": 1.0,
      "Mumbai": 1.05,
      "Bangalore": 1.0,
      "Hyderabad": 0.95,
      "Pune": 0.98,
      "Chennai": 1.08,
      "Kolkata": 0.96,
    },
    typical: {
      min: 25,
      max: 50,
      description: "Quality varies: Budget ₹25-30, Premium ₹40-50",
    },
  },
  {
    id: "tiles-wall",
    name: "Wall Tiles (Ceramic)",
    category: "finishing",
    unit: "sq ft",
    unitRate: 40,
    description: "30x45 cm ceramic tiles for walls (kitchen, bathroom)",
    regions: {
      "Delhi": 1.0,
      "Mumbai": 1.08,
      "Bangalore": 1.02,
      "Hyderabad": 0.98,
      "Pune": 1.0,
      "Chennai": 1.1,
      "Kolkata": 0.97,
    },
    typical: {
      min: 35,
      max: 60,
      description: "For kitchens & bathrooms: ₹35-50/sq ft",
    },
  },
  {
    id: "paint-interior",
    name: "Interior Paint",
    category: "finishing",
    unit: "sq ft",
    unitRate: 8,
    description: "Emulsion/acrylic paint for interior walls (2 coats)",
    regions: {
      "Delhi": 1.0,
      "Mumbai": 1.05,
      "Bangalore": 0.98,
      "Hyderabad": 0.95,
      "Pune": 0.97,
      "Chennai": 1.03,
      "Kolkata": 0.96,
    },
    typical: {
      min: 6,
      max: 12,
      description: "Budget ₹6-8, Premium ₹10-12",
    },
  },
  {
    id: "paint-exterior",
    name: "Exterior Paint",
    category: "finishing",
    unit: "sq ft",
    unitRate: 10,
    description: "Weather-resistant exterior paint (2 coats + primer)",
    regions: {
      "Delhi": 1.0,
      "Mumbai": 1.1,
      "Bangalore": 0.98,
      "Hyderabad": 0.96,
      "Pune": 0.98,
      "Chennai": 1.05,
      "Kolkata": 0.97,
    },
    typical: {
      min: 8,
      max: 15,
      description: "Budget ₹8-10, Premium ₹12-15",
    },
  },
  {
    id: "doors",
    name: "Wooden Door Frame & Shutter",
    category: "finishing",
    unit: "unit",
    unitRate: 8000,
    description: "Complete door set: frame, shutter, hinges (size: ~3.5x7 ft)",
    regions: {
      "Delhi": 1.0,
      "Mumbai": 1.1,
      "Bangalore": 1.05,
      "Hyderabad": 0.95,
      "Pune": 1.0,
      "Chennai": 1.08,
      "Kolkata": 0.98,
    },
    typical: {
      min: 6000,
      max: 12000,
      description: "Budget: ₹6-8K, Premium: ₹10-12K per door",
    },
  },
  {
    id: "windows",
    name: "Aluminum Window Frame & Shutter",
    category: "finishing",
    unit: "unit",
    unitRate: 3000,
    description: "Aluminum window with glass and grille (typical: 3x4 ft)",
    regions: {
      "Delhi": 1.0,
      "Mumbai": 1.08,
      "Bangalore": 1.02,
      "Hyderabad": 0.97,
      "Pune": 0.99,
      "Chennai": 1.06,
      "Kolkata": 0.98,
    },
    typical: {
      min: 2500,
      max: 5000,
      description: "Budget ₹2.5K, Premium ₹4-5K",
    },
  },
  {
    id: "pipes-pvc",
    name: "PVC Plumbing Pipes (1 inch)",
    category: "utility",
    unit: "meter",
    unitRate: 80,
    description: "PVC pressure pipes for water supply (1 inch diameter)",
    regions: {
      "Delhi": 1.0,
      "Mumbai": 1.05,
      "Bangalore": 0.98,
      "Hyderabad": 0.95,
      "Pune": 0.97,
      "Chennai": 1.04,
      "Kolkata": 0.96,
    },
    typical: {
      min: 70,
      max: 100,
      description: "For 1,000 sq ft: 300-400 meters needed",
    },
  },
  {
    id: "electrical-wire",
    name: "Electrical Wire (2.5 sq mm)",
    category: "utility",
    unit: "meter",
    unitRate: 15,
    description: "Copper electrical wire for circuits (2.5 sq mm cross-section)",
    regions: {
      "Delhi": 1.0,
      "Mumbai": 1.04,
      "Bangalore": 0.98,
      "Hyderabad": 0.95,
      "Pune": 0.97,
      "Chennai": 1.03,
      "Kolkata": 0.96,
    },
    typical: {
      min: 12,
      max: 20,
      description: "For 1,000 sq ft: 800-1,000 meters",
    },
  },
  {
    id: "rcc-ready-mix",
    name: "Ready Mix Concrete (M20)",
    category: "structural",
    unit: "cubic meter",
    unitRate: 3500,
    description: "Ready-mix concrete delivered to site (M20 grade)",
    regions: {
      "Delhi": 1.0,
      "Mumbai": 1.08,
      "Bangalore": 0.95,
      "Hyderabad": 0.92,
      "Pune": 0.95,
      "Chennai": 1.05,
      "Kolkata": 0.98,
    },
    typical: {
      min: 3000,
      max: 4000,
      description: "For 1,000 sq ft: 80-100 cubic meters total",
    },
  },
  {
    id: "waterproofing",
    name: "Waterproofing Membrane",
    category: "finishing",
    unit: "sq ft",
    unitRate: 35,
    description: "Bituminous/polymer waterproofing for terrace",
    regions: {
      "Delhi": 1.0,
      "Mumbai": 1.1,
      "Bangalore": 0.98,
      "Hyderabad": 0.95,
      "Pune": 0.97,
      "Chennai": 1.08,
      "Kolkata": 0.96,
    },
    typical: {
      min: 30,
      max: 50,
      description: "Premium membrane: ₹40-50/sq ft",
    },
  },
];

export const getMaterialById = (id: string): Material | undefined => {
  return MATERIALS.find(m => m.id === id);
};

export const getMaterialsByCategory = (category: string): Material[] => {
  return MATERIALS.filter(m => m.category === category);
};

export const getRegionalRate = (materialId: string, region: string): number => {
  const material = getMaterialById(materialId);
  if (!material) return 0;
  const multiplier = material.regions[region] || 1.0;
  return Math.round(material.unitRate * multiplier);
};
