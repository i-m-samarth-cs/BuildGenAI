import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FolderOpen, Plus, Clock, Building2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/auth";
import { getUserDesigns, DesignGeneration } from "@/lib/storage";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [designs, setDesigns] = useState<DesignGeneration[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    setDesigns(getUserDesigns(user.id));
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-display text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Welcome back, {user.username}! Here are your generated designs.</p>
          </div>
          <Link to="/generator">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" /> New Design
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: FolderOpen, label: "Total Generations", value: designs.length.toString() },
            { icon: Building2, label: "Account Type", value: "Builder" },
            { icon: Clock, label: "Joined", value: new Date(user.joinedAt).toLocaleDateString() },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5 flex items-center gap-4"
            >
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Projects */}
        <div className="space-y-4">
          {designs.length === 0 ? (
            <div className="text-center py-20 glass-card">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="font-display font-semibold text-lg mb-2">No designs yet.</h3>
              <p className="text-muted-foreground text-sm mb-6">You haven't generated any AI building layouts yet.</p>
              <Link to="/generator">
                <Button>Generate First Design</Button>
              </Link>
            </div>
          ) : (
            designs.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5 flex flex-col gap-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-brand-green/20 flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-primary/60" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold">{p.title}</h3>
                      <p className="text-xs text-muted-foreground">Generated on {new Date(p.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button 
                      onClick={() => setExpandedId(expandedId === p.id ? null : p.id)} 
                      size="sm" variant="outline" className="text-xs"
                    >
                      {expandedId === p.id ? <><ChevronUp className="h-3 w-3 mr-1" /> Hide</> : <><ChevronDown className="h-3 w-3 mr-1" /> View Layout</>}
                    </Button>
                  </div>
                </div>

                {expandedId === p.id && (
                  <div className="mt-4 pt-4 border-t border-border/50 text-sm whitespace-pre-wrap leading-relaxed text-muted-foreground">
                    <div className="font-semibold text-foreground mb-2">Prompt used: <span className="text-muted-foreground font-normal">{p.prompt}</span></div>
                    {p.response}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
