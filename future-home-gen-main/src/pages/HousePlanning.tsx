import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import HousePlanningWizard from "@/components/HousePlanningWizard";
import ResultCard from "@/components/ResultCard";
import {
  generateHousePlanningResponse,
  loadDemoScenario,
  savePlanningResult,
  HousePlanningInput,
} from "@/lib/housePlanningService";
import { StructuredResult } from "@/lib/responseFormatter";
import { getCurrentUser } from "@/lib/auth";

interface PlanningState {
  step: "input" | "loading" | "result";
  input?: HousePlanningInput;
  result?: StructuredResult;
  error?: string;
}

const HousePlanning = () => {
  const user = getCurrentUser();
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  const [state, setState] = useState<PlanningState>({ step: "input" });

  const handleWizardSubmit = async (formData: any) => {
    setState({ step: "loading", input: formData });

    try {
      const result = await generateHousePlanningResponse(formData, apiKey);
      setState({
        step: "result",
        input: formData,
        result,
      });

      // Auto-save if user is logged in
      if (user) {
        savePlanningResult(user.id, formData, result);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to generate plan");
      setState({
        step: "input",
        error: error.message,
      });
    }
  };

  const handleLoadDemo = (scenarioId: string) => {
    const demoInput = loadDemoScenario(scenarioId);
    if (demoInput) {
      handleWizardSubmit(demoInput);
    }
  };

  const handleSaveResult = () => {
    if (!user) {
      toast.error("Please log in to save your plans");
      return;
    }

    if (state.input && state.result) {
      savePlanningResult(user.id, state.input, state.result);
      toast.success("Plan saved to your dashboard!");
    }
  };

  const handleNewPlan = () => {
    setState({ step: "input" });
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10">
        {state.step === "input" && (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles className="h-3.5 w-3.5" /> Smart House Planning
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
                Plan Your Perfect Home
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Answer a few simple questions about your plot and budget, and get AI-powered layout suggestions, material estimates, and building compliance guidance specific to {user ? user.username : "your region"}.
              </p>
            </motion.div>

            {/* Wizard Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <HousePlanningWizard
                onSubmit={handleWizardSubmit}
                onLoadDemo={handleLoadDemo}
                isLoading={state.step === "loading"}
              />
            </motion.div>

            {/* Info Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              {[
                {
                  icon: "📋",
                  title: "Structured Output",
                  desc: "Get organized layout suggestions, not just plain text",
                },
                {
                  icon: "💰",
                  title: "Cost Estimation",
                  desc: "Itemized material breakdown with regional rates",
                },
                {
                  icon: "✅",
                  title: "Compliance Check",
                  desc: "Building regulations specific to your state",
                },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          </>
        )}

        {state.step === "loading" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="space-y-4 text-center">
              <Sparkles className="h-12 w-12 text-primary mx-auto animate-spin" />
              <h2 className="font-display text-2xl font-bold">Generating your plan...</h2>
              <p className="text-muted-foreground">
                Our AI is analyzing your requirements and creating a customized layout plan with material estimates and compliance guidance.
              </p>
            </div>
          </motion.div>
        )}

        {state.step === "result" && state.result && (
          <>
            {/* Result Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex items-center justify-between gap-4 flex-wrap"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold">Your Planning Result</h1>
                  <p className="text-sm text-muted-foreground">
                    Generated for {state.input?.location}, {state.input?.state}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleNewPlan}>
                  ← New Plan
                </Button>
                {!user && (
                  <Link to="/login">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Log In to Save
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>

            {/* Result Display */}
            <div className="max-w-4xl mx-auto mb-12">
              <ResultCard
                result={state.result}
                onSave={handleSaveResult}
              />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HousePlanning;
