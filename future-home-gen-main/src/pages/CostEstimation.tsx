import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Footer from '@/components/Footer';

const RATE_TABLE = [
  { type: 'Budget Residential (G+0)', rate: '₹1,200–1,600', note: 'Basic finishes, standard materials' },
  { type: 'Standard Residential (G+1)', rate: '₹1,600–2,200', note: 'Good quality, OPC cement, Fe415 steel' },
  { type: 'Premium Residential (G+2)', rate: '₹2,200–3,000', note: 'Italian tiles, branded fixtures, good finishes' },
  { type: 'Commercial (Office/Shop)', rate: '₹2,000–2,800', note: 'Depends on interior fit-out level' },
  { type: 'Villa / Luxury', rate: '₹3,000–5,000+', note: 'High-end materials, landscaping, pool' },
];

const COST_SPLITS = [
  { label: 'Structure (foundation, slabs, columns)', pct: 35 },
  { label: 'Brickwork & Plastering', pct: 15 },
  { label: 'Flooring & Tiling', pct: 10 },
  { label: 'Doors, Windows & Grills', pct: 8 },
  { label: 'Electrical Works', pct: 8 },
  { label: 'Plumbing & Sanitary', pct: 7 },
  { label: 'Paint & Finishing', pct: 7 },
  { label: 'Contractor Margin & Contingency', pct: 10 },
];

const CostEstimation = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 text-sm font-medium mb-4 border border-green-500/20">
            <DollarSign className="h-3.5 w-3.5" /> Cost & Material Estimation
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Construction Cost Estimator</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">Get a detailed AI-powered cost estimate with material breakdown. Enter your plot details in the House Planning tool to generate a personalised estimate.</p>
        </motion.div>

        <Card className="p-6 mb-6 border-green-500/20 bg-green-500/5">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-green-300 mb-1">Get a Personalised Estimate</p>
              <p className="text-sm text-muted-foreground mb-3">For a full itemised material breakdown tailored to your plot size, budget, location, and building type, use the Smart House Planning tool.</p>
              <Button onClick={() => navigate('/house-planning')} className="bg-green-600 hover:bg-green-700 text-white">
                Go to House Planning <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h2 className="font-semibold text-lg mb-4">📊 India Construction Rate Reference (per sq ft)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">Building Type</th>
                  <th className="text-right py-2 px-3 text-muted-foreground font-medium">Rate Range</th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium hidden sm:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {RATE_TABLE.map((r, i) => (
                  <tr key={i} className="border-b border-border/30 hover:bg-secondary/30 transition">
                    <td className="py-3 px-3 font-medium">{r.type}</td>
                    <td className="py-3 px-3 text-right text-green-400 font-medium">{r.rate}</td>
                    <td className="py-3 px-3 text-muted-foreground hidden sm:table-cell text-xs">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3 flex gap-2"><Info className="h-4 w-4 shrink-0" />Rates are indicative for 2024 and vary by city, material quality, and labour availability. Add 15–20% for metro cities like Mumbai and Delhi.</p>
        </Card>

        <Card className="p-6 mb-6">
          <h2 className="font-semibold text-lg mb-4">🏗️ Typical Cost Breakdown (% of Total)</h2>
          <div className="space-y-3">
            {COST_SPLITS.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.pct}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.pct * 2.5}%` }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 border-amber-500/20 bg-amber-500/5">
          <p className="text-xs text-amber-300/80 flex gap-2">
            <Info className="h-4 w-4 shrink-0 mt-0.5 text-amber-400" />
            ⚠️ All figures are estimates only. Actual costs depend on site conditions, material quality chosen, local labour rates, and contractor margins. Always get 3+ contractor quotes before committing.
          </p>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default CostEstimation;
