import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FolderOpen, Plus, Clock, Building2, ChevronDown, ChevronUp, Home, DollarSign, FileText, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/auth";
import { getUserDesigns, DesignGeneration } from "@/lib/storage";
import { getUserPlanningResults } from "@/lib/housePlanningService";

const QUICK_ACTIONS = [
  { to: "/house-planning", label: "New House Plan", icon: Home, color: "text-blue-400", bg: "bg-blue-500/10" },
  { to: "/cost-estimation", label: "Cost Estimate", icon: DollarSign, color: "text-green-400", bg: "bg-green-500/10" },
  { to: "/contract-review", label: "Review Contract", icon: FileText, color: "text-amber-400", bg: "bg-amber-500/10" },
  { to: "/compliance-guide", label: "Check Compliance", icon: Shield, color: "text-purple-400", bg: "bg-purple-500/10" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [designs, setDesigns] = useState<DesignGeneration[]>([]);
  const [planningResults, setPlanningResults] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'plans' | 'designs'>('plans');

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    setDesigns(getUserDesigns(user.id));
    setPlanningResults(getUserPlanningResults(user.id));
  }, [user, navigate]);

  if (!user) return null;

  const tabClass = (t: string) => `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`;

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Welcome back, {user.username}!</p>
          </div>
          <Link to="/house-planning">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4 mr-2" /> New Plan</Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: FolderOpen, label: "House Plans", value: planningResults.length.toString() },
            { icon: Building2, label: "AI Designs", value: designs.length.toString() },
            { icon: Clock, label: "Joined", value: new Date(user.joinedAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) },
            { icon: Home, label: "Account", value: "Builder" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <s.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xl font-display font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="p-5 mb-8">
          <p className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {QUICK_ACTIONS.map(a => (
              <Link key={a.to} to={a.to}>
                <div className={`flex flex-col items-center gap-2 p-3 rounded-xl ${a.bg} hover:opacity-80 transition cursor-pointer`}>
                  <a.icon className={`h-5 w-5 ${a.color}`} />
                  <span className="text-xs font-medium text-center">{a.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button className={tabClass('plans')} onClick={() => setActiveTab('plans')}>House Plans ({planningResults.length})</button>
          <button className={tabClass('designs')} onClick={() => setActiveTab('designs')}>AI Designs ({designs.length})</button>
        </div>

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div className="space-y-4">
            {planningResults.length === 0 ? (
              <div className="text-center py-16 glass-card">
                <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="font-display font-semibold text-lg mb-2">No plans yet</h3>
                <p className="text-muted-foreground text-sm mb-6">Generate your first house plan to see it here.</p>
                <Link to="/house-planning"><Button>Start Planning</Button></Link>
              </div>
            ) : (
              planningResults.map((plan: any, i: number) => (
                <motion.div key={plan.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-5">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-green-500/20 flex items-center justify-center">
                        <Home className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold">{plan.title}</h3>
                        <p className="text-xs text-muted-foreground">{plan.input?.location}, {plan.input?.state} • {plan.input?.plotSize} sq ft • ₹{parseInt(plan.input?.budget || '0').toLocaleString('en-IN')}</p>
                        <p className="text-xs text-muted-foreground/60">{new Date(plan.createdAt).toLocaleDateString('en-IN')}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link to="/house-planning"><Button size="sm" variant="outline" className="text-xs">View Tool</Button></Link>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* Designs Tab */}
        {activeTab === 'designs' && (
          <div className="space-y-4">
            {designs.length === 0 ? (
              <div className="text-center py-16 glass-card">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="font-display font-semibold text-lg mb-2">No AI designs yet</h3>
                <p className="text-muted-foreground text-sm mb-6">Generate a design from the AI Generator to see it here.</p>
                <Link to="/generator"><Button>Open Generator</Button></Link>
              </div>
            ) : (
              designs.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-5">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-green-500/20 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary/60" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold">{p.title}</h3>
                        <p className="text-xs text-muted-foreground">{new Date(p.createdAt).toLocaleDateString('en-IN')}</p>
                      </div>
                    </div>
                    <Button onClick={() => setExpandedId(expandedId === p.id ? null : p.id)} size="sm" variant="outline" className="text-xs">
                      {expandedId === p.id ? <><ChevronUp className="h-3 w-3 mr-1" />Hide</> : <><ChevronDown className="h-3 w-3 mr-1" />View</>}
                    </Button>
                  </div>
                  {expandedId === p.id && (
                    <div className="mt-4 pt-4 border-t border-border/50 text-sm whitespace-pre-wrap leading-relaxed text-muted-foreground">
                      <div className="font-semibold text-foreground mb-2">Prompt: <span className="font-normal text-muted-foreground">{p.prompt}</span></div>
                      {p.response}
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
