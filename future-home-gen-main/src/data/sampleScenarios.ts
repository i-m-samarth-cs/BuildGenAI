/**
 * Sample Scenarios for Demo Mode
 * Users can load these to test the app without needing API keys
 * All data is realistic and India-focused
 */

export interface DemoScenario {
  id: string;
  name: string;
  description: string;
  inputs: {
    location: string;
    state: string;
    plotSize: number;
    budget: number;
    buildingType: string;
    bedrooms: number;
    bathrooms: number;
    orientation: string;
    constraints: string[];
  };
  expectedOutput: string;
}

export const SAMPLE_SCENARIOS: DemoScenario[] = [
  {
    id: "scenario-1",
    name: "Budget Home in Bangalore",
    description: "2500 sq ft residential plot in Bangalore with ₹50 Lakh budget",
    inputs: {
      location: "Whitefield, Bangalore",
      state: "Karnataka",
      plotSize: 2500,
      budget: 5000000,
      buildingType: "residential",
      bedrooms: 3,
      bathrooms: 2,
      orientation: "north",
      constraints: ["attached_garage", "open_kitchen"]
    },
    expectedOutput: `## 🏗️ House Planning Result: Whitefield, Bangalore

### 📋 Your Requirements
- **Location**: Whitefield, Bangalore, Karnataka
- **Plot Size**: 2,500 sq ft
- **Budget**: ₹50 Lakhs
- **Type**: 3 BHK Residential
- **Orientation**: North-facing plot
- **Preferences**: Attached garage, open kitchen

---

### ⚠️ Assumptions & Limitations
- Based on average construction rates for Bangalore (₹2,000-2,500/sq ft)
- Material costs are estimates and vary by supplier
- Labour rates subject to market changes
- This is general guidance only
- **You must get local municipal approval and verify with registered architect**
- Actual costs may vary by 20-30% based on site conditions

---

### 🎯 Recommended Layout

**Ground Floor (1,250 sq ft)**
- Living + Dining: 400 sq ft (open concept)
- Master Bedroom: 150 sq ft
- Kitchen: 120 sq ft (open to dining)
- Master Bathroom: 80 sq ft
- Common Toilet: 60 sq ft
- Garage/Parking: 200 sq ft
- Lobby + Corridors: 240 sq ft

**First Floor (1,250 sq ft)**
- Bedroom 2: 140 sq ft
- Bedroom 3: 130 sq ft
- Common Bathroom: 80 sq ft
- Terrace: 300 sq ft
- Corridors + Stairs: 200 sq ft
- Loft/Storage: 200 sq ft

---

### 💡 Design Recommendations
1. **Orientation**: Excellent north-facing - place living room on north for maximum light
2. **Ventilation**: Large windows on east + west for cross ventilation
3. **Climate**: Steep roof overhang (2 ft) to reduce heat gain in summer
4. **Lighting**: Skylights over staircase for natural light
5. **Water**: Ground floor tank (15,000L) + terrace tank (5,000L) for water security

---

### 💰 Estimated Material Breakdown

| Material | Quantity | Unit Rate | Total Cost |
|----------|----------|-----------|-----------|
| Cement | 400 bags | ₹450 | ₹1,80,000 |
| Steel/Rebar | 50 tonnes | ₹85,000 | ₹42,50,000 |
| Bricks | 60,000 units | ₹3,500/1000 | ₹2,10,000 |
| Sand | 800 cubic ft | ₹20/ft³ | ₹16,000 |
| Paint (exterior) | 2,000 sq ft | ₹10/sq ft | ₹20,000 |
| Paint (interior) | 2,500 sq ft | ₹8/sq ft | ₹20,000 |
| Tiles (floor) | 3,000 sq ft | ₹30/sq ft | ₹90,000 |
| Tiles (wall) | 400 sq ft | ₹40/sq ft | ₹16,000 |
| Doors & Frames | 15 units | ₹8,000 | ₹1,20,000 |
| Windows & Grills | 20 units | ₹3,000 | ₹60,000 |
| Electrical Fittings | - | - | ₹50,000 |
| Plumbing Fittings | - | - | ₹40,000 |
| **Materials Subtotal** | - | - | **₹8,72,000** |

---

### 📊 Cost Estimation Summary

| Category | Estimated Cost | Confidence |
|----------|----------------|-----------|
| Structural (foundation, walls, roof) | ₹22,00,000 (44%) | High |
| Materials (tiles, paint, doors) | ₹8,72,000 (17.4%) | Medium |
| Electrical & Plumbing | ₹5,00,000 (10%) | Medium |
| Labour (skilled workers) | ₹10,00,000 (20%) | Low |
| Contingency (10%) | ₹3,28,000 (6.6%) | - |
| **TOTAL ESTIMATED COST** | **₹49,00,000** | **Medium** |

**Budget Status**: ✅ Within budget with ₹1L contingency  
**Confidence Level**: Medium (±15%)  
**Why confidence is "Medium"**: Site conditions, local labour rates, and material quality can vary

---

### ⚠️ Risk Flags & Considerations

1. 🚩 **Budget Tight**: Very little contingency for site issues
   - *Recommendation*: Keep 5-10% buffer for surprises

2. 🚩 **Terrace Cost**: Waterproofing terrace adds ₹2-3 Lakhs
   - *Recommendation*: Use quality waterproofing membrane

3. 🚩 **Water Supply**: Check municipal water availability in Whitefield
   - *Recommendation*: May need borewell + tanker (₹50K-1L extra)

4. 🚩 **Parking**: Limited space for guest parking
   - *Recommendation*: Design open parking area (₹50K for paving)

---

### ✅ Recommended Next Steps

1. **Consult Registered Architect**
   - Get design finalized with local expertise
   - Estimated fee: ₹40,000-60,000 (2-5% of project cost)

2. **Get Layout Approval**
   - Apply to BBMP (Bangalore Bruhat Mahanagara Palike)
   - Processing time: 15-30 days
   - Check setback rules: Bangalore typically needs 10ft front, 7.5ft side setbacks

3. **Get Structural Design**
   - Hire structural engineer for earthquake-resistant design
   - Verify compliance with IS 13920:2016
   - Estimated fee: ₹30,000-50,000

4. **Get Cost Quote from Contractor**
   - Get 3 quotes from local contractors
   - Verify material quality and warranty
   - Finalize contract with clear payment terms

5. **Arrange Finance**
   - If taking home loan, inform builder/bank early
   - Bank may impose their own checks
   - Estimated processing: 30-45 days

---

### 📌 Important Disclaimers

⚠️ **This is not official advice**
- This output is for planning purposes only
- Material rates and estimates are from public sources and may not match your local market
- Building regulations vary by municipality - always verify with local authorities
- You must get approval from:
  - Municipal Corporation (BBMP in Bangalore)
  - Registered Architect
  - Structural Engineer
  - Any relevant local bodies

---

*Demo Scenario | Generated for planning purposes | Verify all details with local authorities*`,
  },

  {
    id: "scenario-2",
    name: "Commercial Office in Mumbai",
    description: "5000 sq ft commercial space in Mumbai with ₹1 Crore budget",
    inputs: {
      location: "Bandra, Mumbai",
      state: "Maharashtra",
      plotSize: 5000,
      budget: 10000000,
      buildingType: "commercial",
      bedrooms: 0,
      bathrooms: 4,
      orientation: "east",
      constraints: ["high_ceiling", "open_floor"]
    },
    expectedOutput: `## 🏢 Commercial Office Layout: Bandra, Mumbai

### 📋 Your Requirements
- **Location**: Bandra, Mumbai, Maharashtra
- **Space Size**: 5,000 sq ft (465 sq m)
- **Budget**: ₹1 Crore
- **Type**: Commercial Office Space
- **Orientation**: East-facing (morning light)
- **Preferences**: High ceiling (14ft), open floor plan

---

### ⚠️ Assumptions & Limitations
- Based on Mumbai commercial construction rates (₹2,500-3,000/sq ft)
- Does not include land cost (this is fit-out budget)
- Assumes Grade B+ building infrastructure
- **You must verify FSI compliance with BMC (Brihanmumbai Municipal Corporation)**
- **Get approval from building society and property owner**

---

### 🎯 Layout Plan

**Floor 1 (5,000 sq ft total)**
- Reception + Waiting: 300 sq ft
- Open Office (30 desks): 2,000 sq ft
- Meeting Rooms (4x): 600 sq ft
- Conference Room (large): 400 sq ft
- Pantry + Break Room: 250 sq ft
- Male/Female Toilets: 250 sq ft
- Staircase + Corridors: 800 sq ft
- Storage/Files: 200 sq ft
- Utility Room: 200 sq ft

---

### 💰 Cost Breakdown

| Item | Cost | Notes |
|------|------|-------|
| Structural modifications | ₹8,00,000 | Partition walls, raised floors |
| Flooring (polished concrete + carpet) | ₹15,00,000 | ₹300/sq ft |
| Ceiling & AC ducts | ₹10,00,000 | Suspended ceiling with acoustic tiles |
| Electrical (wiring, lights, outlets) | ₹8,00,000 | Heavy-duty circuits for IT equipment |
| Plumbing (restrooms, pantry) | ₹4,00,000 | - |
| Glass partitions & doors | ₹6,00,000 | Modern look, sound insulation |
| Furniture (workstations, seating) | ₹20,00,000 | Ergonomic chairs, standing desks |
| Networking (LAN, WiFi, data center) | ₹5,00,000 | Enterprise-grade infrastructure |
| Lighting (LED) | ₹8,00,000 | Energy-efficient, smart controls |
| Paint & finishing | ₹4,00,000 | Professional paint + touch-ups |
| Contingency (10%) | ₹9,00,000 | - |
| **TOTAL** | **₹98,00,000** | **98 Lakhs** |

**Status**: ✅ Within budget with ₹2L buffer

---

### ✅ Next Steps
1. Get municipal compliance check (FSI, fire safety)
2. Hire structural consultant (₹50,000)
3. Get 3 contractor quotes
4. Finalize utility capacities (power, water, sewage)

⚠️ **Verify all details with BMC and building society before proceeding**`,
  },

  {
    id: "scenario-3",
    name: "Villa in Hyderabad",
    description: "3500 sq ft villa plot in Hyderabad with ₹80 Lakh budget",
    inputs: {
      location: "Gachibowli, Hyderabad",
      state: "Telangana",
      plotSize: 3500,
      budget: 8000000,
      buildingType: "residential",
      bedrooms: 4,
      bathrooms: 3,
      orientation: "northeast",
      constraints: ["pool", "garden"]
    },
    expectedOutput: `## 🏡 Villa Layout: Gachibowli, Hyderabad

### 📋 Your Requirements
- **Location**: Gachibowli, Hyderabad, Telangana
- **Plot Size**: 3,500 sq ft
- **Budget**: ₹80 Lakhs
- **Type**: 4 BHK Luxury Villa
- **Orientation**: NE-facing (excellent)
- **Preferences**: Swimming pool, garden, modern design

---

### ⚠️ Assumptions & Limitations
- Based on Hyderabad construction rates (₹1,800-2,200/sq ft)
- Pool costs: ₹3-4 Lakhs (additional)
- Landscaping: ₹2-3 Lakhs (additional)
- **Verify pool depth regulations with local authorities**
- **Get GHMC (Greater Hyderabad Municipal Corporation) approval**

---

### 🎯 Villa Layout

**Ground Floor (1,750 sq ft)**
- Grand Living Room: 400 sq ft
- Dining: 250 sq ft
- Modern Kitchen: 150 sq ft
- Master Bedroom: 180 sq ft
- Master Bath: 100 sq ft
- Powder Room: 60 sq ft
- Foyer: 150 sq ft
- Utility + Pantry: 100 sq ft
- Corridors: 260 sq ft
- Porch + Parking: 400 sq ft

**First Floor (1,750 sq ft)**
- Bedroom 2: 160 sq ft
- Bedroom 3: 150 sq ft
- Bedroom 4: 140 sq ft
- Common Bathroom: 100 sq ft
- Connecting Bathroom: 80 sq ft
- Corridor: 240 sq ft
- Balcony (2x): 300 sq ft
- Loft/Study: 140 sq ft
- Store: 100 sq ft

**Outdoor (included in 3,500 sq ft)**
- Swimming Pool: 20x12 ft (depth 4-5 ft)
- Landscape Garden: 800 sq ft
- Parking: 400 sq ft

---

### 💰 Cost Estimation

| Category | Amount | Remarks |
|----------|--------|---------|
| **Building Construction** | | |
| Structural (foundation, columns, walls) | ₹26,00,000 | 52% of building |
| Doors, Windows, Railings | ₹6,00,000 | Quality wood + aluminum |
| Roofing + Waterproofing | ₹4,00,000 | RCC terrace with membrane |
| Flooring (Italian tiles + wood) | ₹7,50,000 | Mix of materials |
| Paint & Plaster | ₹3,50,000 | Premium finishes |
| Electrical (smart lighting) | ₹4,50,000 | Home automation ready |
| Plumbing (fixtures) | ₹3,50,000 | Imported brands |
| **Subtotal (Building)** | **₹55,00,000** | |
| **Outdoor Works** | | |
| Pool (20x12 ft) | ₹3,50,000 | Filter + pump included |
| Landscaping & Garden | ₹2,00,000 | Hardscape + plants |
| Driveway & Parking | ₹1,50,000 | Interlocking tiles |
| Boundary Wall & Gate | ₹1,50,000 | - |
| **Subtotal (Outdoor)** | **₹8,50,000** | |
| **Contingency (10%)** | **₹6,35,000** | - |
| **TOTAL ESTIMATED** | **₹70,00,000-72,00,000** | |

**Budget Status**: ✅ Under budget with ₹8-10L buffer for upgrades

---

### 🌿 Sustainability Features (Optional Add-ons)
- Solar panels: ₹4-5 Lakhs
- Rainwater harvesting: ₹1-1.5 Lakhs
- Energy-efficient AC: ₹50,000 extra
- Smart home automation: ₹1-2 Lakhs

---

### ✅ Next Steps
1. Hire architect: ₹50,000-70,000
2. Get GHMC approval: 20-30 days
3. Get pool design approval: Verify setback from main structure
4. Finalize contractor: Get 3 quotes
5. Pool contractor: Specialized contractor required

⚠️ **IMPORTANT**: Pool regulations in Hyderabad mandate safety barriers and depth compliance`,
  },
];

export const getScenarioById = (id: string): DemoScenario | undefined => {
  return SAMPLE_SCENARIOS.find(s => s.id === id);
};

export const getScenarioByName = (name: string): DemoScenario | undefined => {
  return SAMPLE_SCENARIOS.find(s => s.name === name);
};
