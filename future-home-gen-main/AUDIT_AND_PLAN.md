# Future Home Gen: Project Audit & Revival Plan

**Project Status**: Abandoned prototype → MVP revival for hackathon  
**Challenge Goal**: Before/after showcase with polished, complete product  
**Target Users**: Builders, contractors, homeowners, civil engineering students (India-focused)

---

## PHASE 1: REPOSITORY AUDIT

### 1.1 Current Project Assessment

**Project Name & Confusion**
- Repository: `future-home-gen-main`
- App branded as: "BuildGenAI"
- Recommendation: Rebrand to "**Future Home Gen**" (clearer, matches folder name)

**Technology Stack**
```
Frontend: React 18 + TypeScript + Vite
Styling: Tailwind CSS + shadcn/ui (Radix UI components)
AI: Google Gemini 2.5-flash API
State: TanStack Query + React Router
Animations: Framer Motion
Storage: Browser localStorage only (no backend)
Build: Vite with PostCSS, ESLint, Vitest
```

**Current Architecture**
- **Single-page app** with client-side routing
- **Simple local auth**: Email → username mapping stored in localStorage
- **Basic CRUD**: Save/retrieve designs from localStorage
- **No backend**: Everything runs in browser
- **No database**: Mockdata only (professionals marketplace)

---

### 1.2 Existing Features (What Works)

✅ **Landing Page**
- Hero section with stats and CTA
- Feature cards grid
- Responsive design
- Framer motion animations

✅ **AI Generator Page**
- Input form (location, land size, budget, building type)
- Gemini API integration
- Loading state with spinner
- Result display (plain text output)
- Save design to localStorage

✅ **Dashboard**
- Shows user's generated designs
- Expandable design detail view
- Stats cards (total, account type, joined date)
- "New Design" CTA
- Empty state message

✅ **Marketplace Page (Partial)**
- Static list of 6 verified professionals
- Search by name/role/location
- Filter dropdowns (placeholders)
- Professional card with avatar, rating, verified badge
- Profile link routing

✅ **Login Page**
- Email/name input
- Simple local auth (no validation)
- Toggle between signup/signin
- Redirects to dashboard

✅ **Authentication System (Minimal)**
- Email-based login with username
- localStorage persistence
- getCurrentUser / logout functions

✅ **UI Components**
- 30+ shadcn/ui components pre-installed (button, input, select, dialog, etc.)
- Tailwind utilities
- Dark mode support via css-in-js

---

### 1.3 Broken / Incomplete Areas

❌ **AI Generator Output**
- Plain text response (not structured)
- No cost breakdown
- No material itemization
- No orientation/ventilation/lighting recommendations
- No output parsing or formatting

❌ **Cost & Material Estimation**
- Feature promised but not implemented
- No data source for material prices
- No itemized breakdown

❌ **Contract/Tender Explanation**
- Feature promised but not implemented
- No file upload handling
- No contract parsing logic

❌ **Compliance & Regulation Guidance**
- Feature promised but not implemented
- No knowledge base or rule data
- No retrieval system

❌ **Marketplace**
- Hardcoded mock professionals (no real data)
- Filter dropdowns don't work
- Professional Profile page exists but is empty
- No real connection to marketplace functionality

❌ **Dashboard**
- Only shows past generations, not a control hub
- No task-based workflow
- No quick-start templates or scenarios

❌ **Data Layer**
- No retrieval-backed answers
- No grounded knowledge base
- No sample dataset for India-specific rules, materials, costs

❌ **User Experience**
- No guided workflow (just raw input → text output)
- No step-by-step guidance
- No empty states or loading indicators (except one)
- No validation error messages
- No output cards with sections/bullets
- No disclaimers or confidence labels

❌ **Demo Readiness**
- No sample prompts
- No prefilled demo mode
- No example scenario
- No mock file uploads for testing
- App breaks if Gemini API key missing (no graceful fallback)

---

### 1.4 What Blocks a Production-Style Demo

1. **Narrow Feature Scope**: Only building layout generation works; everything else is promised but missing
2. **Plain Text Outputs**: Not structured/formatted for construction professionals
3. **No Retrieval System**: Claims "grounded answers" but pulls random LLM output
4. **No Demo Data**: App requires live API key; judges can't test without credentials
5. **No Disclaimers**: Outputs presented as fact without caveats
6. **Generic Chatbot UX**: Looks like a generic AI tool, not construction-specific
7. **Incomplete Features**: Cost estimation, contract parsing, compliance all half-built
8. **No Workflow**: One big prompt box; not task-guided

---

### 1.5 Code Organization Review

**Strengths**
- Clean folder structure (components/, pages/, lib/)
- Separation of concerns (auth.ts, storage.ts, gemini.ts)
- TypeScript interfaces for data
- Consistent component naming
- Good use of shadcn/ui primitives

**Weaknesses**
- No data folder or constants
- No service layer for centralized API calls
- No error boundary or global error handling
- No logging or debugging utilities
- No custom hooks for repeated logic
- Prompts hardcoded in components (not centralized)
- No input validation utilities
- No response parsing layer

---

## PHASE 2: MVP COMPLETION ROADMAP

### Priority Buckets

#### 🔴 **MUST FINISH FOR MVP**
1. **Guided Workflow** - Replace raw prompt box with step-by-step form
2. **Structured Output** - Parse/format Gemini response into sections (Assumptions, Estimated Cost, Material Breakdown, Recommendations)
3. **Sample Dataset** - Create mock data for costs, materials, and regulations (so demo works without external API)
4. **Disclaimers & Guardrails** - Add confidence labels, assumptions, "local verification needed" warnings
5. **Better Home Screen** - Replace generic landing with construction-tech feel
6. **Output Cards** - Format results as professional cards, not raw text
7. **Demo Mode** - Add "Load Example" with prefilled scenario

#### 🟡 **SHOULD IMPROVE FOR USABILITY**
1. **Form Validation** - Real input validation with error messages
2. **Cost Estimator** (light) - Rough calculation based on area × rates
3. **Material Breakdown** - Itemized list with quantities
4. **Loading/Empty States** - Professional skeletons and states
5. **Mobile Responsiveness** - Currently decent, but needs polish
6. **README Rewrite** - Clear setup, problem statement, demo flow

#### 🟢 **NICE-TO-HAVE IF TIME PERMITS**
1. **Contract Parser** (basic) - Text extraction and risk flagging
2. **Compliance Checker** (mock) - Rule matching against India building codes
3. **Export to PDF** - Download results
4. **Favorites/Bookmarks** - Save favorite designs
5. **Voice Input** (optional) - Simple browser API
6. **Dark/Light Mode Toggle** - Already in UI kit, just activate

---

## PHASE 3: UX REDESIGN PROPOSAL

### User Journeys to Support

**Journey 1: Quick House Planning**
```
Home → "Start Planning" → Step 1 (Plot & Budget) → 
Step 2 (Preferences) → Step 3 (Review & Generate) → 
Results Card (Layout + Recommendations) → Save
```

**Journey 2: Cost Estimation**
```
Home → "Estimate Costs" → Input (Area, Type, Region) → 
Results Card (Itemized Breakdown) → Download/Save
```

**Journey 3: Contract Review**
```
Home → "Review Tender" → Upload/Paste Text → 
Parse & Summary → Risk Flags → Save
```

**Journey 4: Check Compliance**
```
Home → "Building Rules" → Ask Question → 
Results (General Guidance + "Verify Locally") → Next Steps
```

### Screen Redesign

**1. New Home Screen (Dashboard replacement)**
- Hero section: "Plan. Estimate. Comply." tagline
- 4 main task cards:
  - 🏗️ Start House Planning
  - 💰 Estimate Costs & Materials
  - 📋 Review Contract/Tender
  - ✅ Check Building Compliance
- Recent projects sidebar
- Quick stats

**2. House Planning Wizard**
- Step 1: Plot & Budget
  - Plot size (input)
  - Location/State (dropdown with India states)
  - Budget (input, currency selector)
- Step 2: Requirements
  - Number of bedrooms/bathrooms (slider)
  - Building type (residential/commercial/mixed)
  - Orientation preference (cardinal)
- Step 3: Preferences
  - Must-haves (natural light, ventilation, etc.)
  - Constraints (corner plot, slope, etc.)
- Step 4: Review & Generate
  - Summary of inputs
  - "Generate Plan" button

**3. Results Card (Structured Output)**
```
┌─ House Planning Result ─────────────────────┐
│ Plot: 2500 sq ft, Bangalore, ₹50L budget    │
│                                              │
│ Assumptions & Limitations                   │
│ ├─ Based on avg rates for Bangalore         │
│ ├─ Local regulations may vary               │
│ └─ Get official approval from municipality │
│                                              │
│ Recommended Layout                          │
│ ├─ Ground Floor: Hall + Kitchen + 1 BHK   │
│ ├─ First Floor: 2 BHK + Terrace           │
│ └─ Orientation: North-South for light       │
│                                              │
│ Material Breakdown                          │
│ ├─ Cement: 300 bags (₹500/bag = ₹1.5L)    │
│ ├─ Steel: 50 tonnes (₹80K/tonne = ₹4L)    │
│ └─ Bricks: 50K units (₹3K/1K = ₹1.5L)     │
│                                              │
│ Estimated Total: ₹25-30L                    │
│ Confidence: Medium (±20%)                   │
│                                              │
│ ⚠️ Risk Flags                                │
│ └─ Budget tight - may need to reduce scope │
│                                              │
│ Recommended Next Steps                      │
│ ├─ Consult local architect                  │
│ ├─ Get municipal approval                   │
│ └─ Verify material rates with suppliers     │
└─────────────────────────────────────────────┘
```

**4. Cost Estimator Page**
- Simple form (area, building type, quality level)
- Breakdown table with rates
- Total cost and ±% confidence
- Notes on what's included/excluded

---

## PHASE 4: IMPLEMENTATION ROADMAP

### Step 1: Create Data Layer (New Files)
```
src/
  data/
    ├── materials.ts (material rates by region)
    ├── regulations.ts (India building codes samples)
    ├── costs.ts (estimation formulas)
    └── sampleScenarios.ts (demo data)
```

### Step 2: Create Service Layer
```
src/lib/
  ├── housePlanningService.ts (structured generation)
  ├── costEstimator.ts (calculation logic)
  ├── contractParser.ts (text extraction)
  ├── complianceChecker.ts (rule matching)
  └── responseFormatter.ts (output structuring)
```

### Step 3: Create New Components
```
src/components/
  ├── HousePlanningWizard.tsx (multi-step form)
  ├── ResultCard.tsx (structured output display)
  ├── CostBreakdown.tsx (material + cost table)
  ├── RiskFlags.tsx (warning display)
  ├── LoadingState.tsx (skeleton screens)
  └── EmptyState.tsx (no results)
```

### Step 4: Redesign Pages
- Home → Task-based dashboard
- Generator → Step-by-step wizard
- Results → Structured card view

### Step 5: Polish
- Add validation
- Improve error handling
- Add disclaimers
- Create README
- Add sample data

---

## PHASE 5: DEMO POLISH

### Sample Scenario (Pre-loaded Demo)
```
Input:
- Plot: 2500 sq ft, Bangalore, ₹50 Lakhs budget
- 3 BHK residential, north-facing plot
- Needs natural light and good ventilation

Output: (Structured card with layout sketch idea, materials, costs, next steps)
```

### Before → After Highlights

**Before**
- ❌ Generic prompt box
- ❌ Plain text response
- ❌ No structure or formatting
- ❌ One feature (layouts only)
- ❌ No disclaimers
- ❌ Looks like ChatGPT clone
- ❌ Requires API key to demo
- ❌ No task guidance

**After**
- ✅ Task-based home screen
- ✅ Step-by-step wizard
- ✅ Structured output cards
- ✅ Multiple features (layout, cost, contract, compliance)
- ✅ Clear disclaimers and confidence levels
- ✅ Construction-tech feel
- ✅ Works with demo mode
- ✅ Guided workflows

---

## FILES TO CREATE / MODIFY

### New Files (Priority Order)

1. **src/data/sampleScenarios.ts** - Demo data (3-5 scenarios)
2. **src/data/materials.ts** - Material rates by region
3. **src/data/regulations.ts** - Building code samples
4. **src/lib/responseFormatter.ts** - Output structuring
5. **src/lib/housePlanningService.ts** - Structured generation
6. **src/components/HousePlanningWizard.tsx** - Multi-step form
7. **src/components/ResultCard.tsx** - Formatted output display
8. **src/pages/Home.tsx** - New task-based home screen
9. **README.md** - Complete rewrite

### Modify Files

1. **src/pages/Landing.tsx** → Rename to Home.tsx or merge with Dashboard
2. **src/pages/AIGenerator.tsx** → Integrate wizard component
3. **src/App.tsx** → Update routes
4. **src/lib/gemini.ts** → Add response parsing
5. **.env.example** → Add with instructions

---

## ESTIMATED EFFORT

| Phase | Files | Complexity | Time |
|-------|-------|-----------|------|
| Data Layer | 4 new | Low | 1-2h |
| Service Layer | 4 new | Medium | 2-3h |
| UI Components | 3 new | Medium | 3-4h |
| Page Redesigns | 3 modified | High | 4-6h |
| Polish & Testing | Varies | Low | 2-3h |
| **TOTAL** | | | **12-18 hours** |

---

## Success Criteria

✅ MVP should demonstrate:
1. Clear before/after UX improvement
2. Multiple construction-specific features (not just layout)
3. Structured, professional output (not raw text)
4. Works without external API (demo mode)
5. Clear disclaimers and guardrails
6. Professional construction-tech feel
7. Polished, complete package (not prototype)
8. Quick 2-3 minute demo flow
9. Good README explaining problem & solution
10. Honest about mock vs. real components

---

## Next Steps

1. ✅ Complete Audit (THIS DOCUMENT)
2. 🔄 Architecture Proposal (next: detail each service layer)
3. 🔄 Create Data Layer (sampleScenarios, materials, regulations)
4. 🔄 Build Service Layer (response formatting, estimation)
5. 🔄 Redesign UX (wizard, result cards)
6. 🔄 Polish & Test (error handling, validation, demo mode)
7. 🔄 Update README & Create Before/After Showcase
8. ⏸️ Create Demo Recording (judge-facing)

---

**Status**: Phase 1 Complete. Ready for Phase 2 Architecture Proposal.
