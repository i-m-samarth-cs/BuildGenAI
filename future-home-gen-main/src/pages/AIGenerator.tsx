import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, DollarSign, MapPin, Ruler, Building2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { generateDesignLayout } from "@/lib/gemini";
import { saveDesign } from "@/lib/storage";
import { getCurrentUser } from "@/lib/auth";

const AIGenerator = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  
  // Form State
  const [location, setLocation] = useState("");
  const [size, setSize] = useState("");
  const [budget, setBudget] = useState("");
  const [buildingType, setBuildingType] = useState("");
  
  // Results
  const [resultText, setResultText] = useState("");

  const handleGenerate = async () => {
    if (!user) {
      toast.error("Please log in first to save your designs.");
      navigate("/login");
      return;
    }
    if (!apiKey) {
      toast.error("VITE_GEMINI_API_KEY is missing in your .env file.");
      return;
    }
    if (!location || !size || !budget || !buildingType) {
      toast.error("Please fill out all design requirements.");
      return;
    }

    const prompt = `Location: ${location}. Land Size: ${size} sq ft. Budget: $${budget}. Type: ${buildingType} building.`;
    
    setLoading(true);
    setResultText("");
    
    try {
      const response = await generateDesignLayout(prompt, apiKey);
      setResultText(response);
      
      const title = `${buildingType.charAt(0).toUpperCase() + buildingType.slice(1)} in ${location}`;
      saveDesign(user, title, prompt, response);
      toast.success("Design generated and saved to your dashboard!");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong generating the design.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Cpu className="h-3.5 w-3.5" /> AI-Powered Design
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Generate Your Building Design</h1>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card p-6 md:p-8 max-w-3xl mx-auto mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-primary" /> Location</label>
              <Input placeholder="e.g. Austin, TX" value={location} onChange={e => setLocation(e.target.value)} className="bg-secondary/50" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5"><Ruler className="h-3.5 w-3.5 text-primary" /> Land Size (sq ft)</label>
              <Input placeholder="e.g. 5000" type="number" value={size} onChange={e => setSize(e.target.value)} className="bg-secondary/50" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5"><DollarSign className="h-3.5 w-3.5 text-primary" /> Budget ($)</label>
              <Input placeholder="e.g. 250000" type="number" value={budget} onChange={e => setBudget(e.target.value)} className="bg-secondary/50" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5 text-primary" /> Building Type</label>
              <Select value={buildingType} onValueChange={setBuildingType}>
                <SelectTrigger className="bg-secondary/50"><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base"
          >
            {loading ? (
              <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 animate-spin" /> Generating Design Context…</span>
            ) : (
              <span className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> Generate Design</span>
            )}
          </Button>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {resultText && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto glass-card p-8 mb-12"
            >
              <h2 className="font-display text-2xl font-bold mb-6 text-brand-green flex items-center gap-2">
                <Sparkles className="h-5 w-5" /> AI Design Blueprint
              </h2>
              <div className="whitespace-pre-wrap leading-relaxed">
                {resultText}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default AIGenerator;
