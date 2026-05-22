import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Ruler,
  DollarSign,
  Building2,
  Layers,
  Home,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { validateHousePlanningInput, getErrorMessage } from "@/lib/validationService";

interface HousePlanningWizardProps {
  onSubmit: (data: any) => void;
  onLoadDemo?: (scenarioId: string) => void;
  isLoading?: boolean;
}

const INDIA_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const BUILDING_TYPES = [
  { value: "residential", label: "Residential (Home)" },
  { value: "commercial", label: "Commercial (Office/Shop)" },
  { value: "mixed-use", label: "Mixed-Use (Residential + Commercial)" },
  { value: "industrial", label: "Industrial (Factory/Warehouse)" },
];

const ORIENTATIONS = [
  { value: "north", label: "North-facing (Best for light)" },
  { value: "east", label: "East-facing (Morning sun)" },
  { value: "south", label: "South-facing (Maximum light)" },
  { value: "west", label: "West-facing (Evening sun)" },
  { value: "northeast", label: "Northeast-facing (Excellent)" },
  { value: "southeast", label: "Southeast-facing (Good)" },
  { value: "northwest", label: "Northwest-facing" },
  { value: "southwest", label: "Southwest-facing" },
];

interface FormData {
  location: string;
  state: string;
  plotSize: string;
  budget: string;
  buildingType: string;
  bedrooms: string;
  bathrooms: string;
  orientation: string;
}

export const HousePlanningWizard = ({
  onSubmit,
  onLoadDemo,
  isLoading = false,
}: HousePlanningWizardProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    location: "",
    state: "",
    plotSize: "",
    budget: "",
    buildingType: "residential",
    bedrooms: "3",
    bathrooms: "2",
    orientation: "north",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const totalSteps = 4;
  const progressPercentage = (step / totalSteps) * 100;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateStep = (): boolean => {
    const stepErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.location.trim()) stepErrors.location = "Location is required";
      if (!formData.state) stepErrors.state = "State is required";
    } else if (step === 2) {
      if (!formData.plotSize) stepErrors.plotSize = "Plot size is required";
      if (parseFloat(formData.plotSize) <= 0) stepErrors.plotSize = "Plot size must be positive";
      if (!formData.budget) stepErrors.budget = "Budget is required";
      if (parseFloat(formData.budget) <= 0) stepErrors.budget = "Budget must be positive";
    } else if (step === 3) {
      if (!formData.buildingType) stepErrors.buildingType = "Building type is required";
      if (formData.buildingType === "residential") {
        if (!formData.bedrooms) stepErrors.bedrooms = "Number of bedrooms is required";
        if (!formData.bathrooms) stepErrors.bathrooms = "Number of bathrooms is required";
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    } else {
      toast.error("Please fix the errors above");
    }
  };

  const handleBack = () => {
    setStep(Math.max(1, step - 1));
  };

  const handleSubmit = () => {
    if (validateStep()) {
      const validation = validateHousePlanningInput(formData);
      if (!validation.isValid) {
        toast.error(validation.errors.map(getErrorMessage).join("\n"));
        return;
      }

      if (validation.warnings.length > 0) {
        console.warn("Warnings:", validation.warnings);
      }

      onSubmit(formData);
    } else {
      toast.error("Please fix the errors above");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <h2 className="text-sm font-medium text-foreground">
            Step {step} of {totalSteps}
          </h2>
          <span className="text-xs text-muted-foreground">{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Step Indicators */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i + 1}
            className={`flex-1 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition ${
              i + 1 === step
                ? "bg-primary text-primary-foreground"
                : i + 1 < step
                ? "bg-primary/20 text-primary"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {i + 1 < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
          </div>
        ))}
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step-1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <Card className="p-6 bg-primary/5">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" /> Where is your plot located?
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Location / City *</label>
                  <Input
                    placeholder="e.g. Bangalore, Whitefield"
                    value={formData.location}
                    onChange={e => handleInputChange("location", e.target.value)}
                    className={errors.location ? "border-red-500" : ""}
                  />
                  {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">State / Region *</label>
                  <Select value={formData.state} onValueChange={val => handleInputChange("state", val)}>
                    <SelectTrigger className={errors.state ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select state..." />
                    </SelectTrigger>
                    <SelectContent>
                      {INDIA_STATES.map(state => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                </div>

                <p className="text-xs text-muted-foreground mt-4 flex gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  Building regulations vary by state and municipality. We'll provide guidance specific to {formData.state || "your state"}.
                </p>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <Card className="p-6 bg-primary/5">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Ruler className="h-5 w-5 text-primary" /> What's your plot size & budget?
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Plot Size (sq ft) *</label>
                  <Input
                    type="number"
                    placeholder="e.g. 2500"
                    value={formData.plotSize}
                    onChange={e => handleInputChange("plotSize", e.target.value)}
                    className={errors.plotSize ? "border-red-500" : ""}
                  />
                  {errors.plotSize && <p className="text-xs text-red-500 mt-1">{errors.plotSize}</p>}
                  <p className="text-xs text-muted-foreground mt-1">Typical: 1,200 - 5,000 sq ft</p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Construction Budget (₹) *</label>
                  <Input
                    type="number"
                    placeholder="e.g. 5000000"
                    value={formData.budget}
                    onChange={e => handleInputChange("budget", e.target.value)}
                    className={errors.budget ? "border-red-500" : ""}
                  />
                  {errors.budget && <p className="text-xs text-red-500 mt-1">{errors.budget}</p>}
                  <p className="text-xs text-muted-foreground mt-1">In rupees. Estimate: ₹1,500 - 3,000 per sq ft</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step-3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <Card className="p-6 bg-primary/5">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" /> What type of building?
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Building Type *</label>
                  <Select value={formData.buildingType} onValueChange={val => handleInputChange("buildingType", val)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {BUILDING_TYPES.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.buildingType && <p className="text-xs text-red-500 mt-1">{errors.buildingType}</p>}
                </div>

                {formData.buildingType === "residential" && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Bedrooms</label>
                        <Input
                          type="number"
                          placeholder="e.g. 3"
                          value={formData.bedrooms}
                          onChange={e => handleInputChange("bedrooms", e.target.value)}
                          min="0"
                          max="10"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Bathrooms</label>
                        <Input
                          type="number"
                          placeholder="e.g. 2"
                          value={formData.bathrooms}
                          onChange={e => handleInputChange("bathrooms", e.target.value)}
                          min="0"
                          max="10"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
            <Card className="p-6 bg-primary/5">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" /> Any preferences?
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Plot Orientation (Optional)</label>
                  <Select value={formData.orientation} onValueChange={val => handleInputChange("orientation", val)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ORIENTATIONS.map(orient => (
                        <SelectItem key={orient.value} value={orient.value}>
                          {orient.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">Affects natural lighting, ventilation, and passive cooling</p>
                </div>

                {/* Review Summary */}
                <div className="mt-6 pt-4 border-t border-border/50">
                  <p className="text-sm font-medium text-foreground mb-3">Summary of your inputs:</p>
                  <div className="bg-card p-3 rounded-lg space-y-1 text-sm text-muted-foreground">
                    <p>📍 {formData.location}, {formData.state}</p>
                    <p>📐 {formData.plotSize} sq ft plot</p>
                    <p>💰 ₹{parseInt(formData.budget).toLocaleString("en-IN")} budget</p>
                    <p>🏢 {BUILDING_TYPES.find(t => t.value === formData.buildingType)?.label}</p>
                    {formData.buildingType === "residential" && (
                      <p>🛏️ {formData.bedrooms} BHK + {formData.bathrooms} BTH</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <Button variant="outline" onClick={handleBack} className="flex-1">
            <ChevronLeft className="h-4 w-4 mr-2" /> Back
          </Button>
        )}

        {step < totalSteps ? (
          <Button onClick={handleNext} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            Next <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            {isLoading ? "Generating..." : "Generate Plan"}
          </Button>
        )}
      </div>

      {/* Demo Button */}
      {step === 1 && onLoadDemo && (
        <Button variant="ghost" onClick={() => onLoadDemo("scenario-1")} className="w-full mt-4 text-primary">
          ⚡ Load Demo Scenario
        </Button>
      )}
    </div>
  );
};

export default HousePlanningWizard;
