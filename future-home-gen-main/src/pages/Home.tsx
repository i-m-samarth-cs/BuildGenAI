import { motion } from "framer-motion";
import {
  Sparkles,
  Home as HomeIcon,
  DollarSign,
  FileText,
  CheckSquare,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { getCurrentUser } from "@/lib/auth";
import { getUserPlanningResults } from "@/lib/housePlanningService";

const features = [
  {
    icon: HomeIcon,
    title: "Smart House Planning",
    desc: "Enter plot size, budget, location, and room requirements — get a structured layout plan, material list, and compliance guidance.",
    to: "/house-planning",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: DollarSign,
    title: "Cost & Material Estimation",
    desc: "Reference construction rates across India with a typical cost breakdown. Get a personalised estimate via the planning wizard.",
    to: "/cost-estimation",
    gradient: "from-green-500 to-green-600",
  },
  {
    icon: FileText,
    title: "Contract & Tender Review",
    desc: "Paste your construction agreement and get plain-English summaries, risk flags, and recommended negotiation points.",
    to: "/contract-review",
    gradient: "from-amber-500 to-amber-600",
  },
  {
    icon: CheckSquare,
    title: "Building Compliance Guide",
    desc: "Ask questions grounded in NBC 2016 and state building bye-laws. Browse regulations by category with a pre-construction checklist.",
    to: "/compliance-guide",
    gradient: "from-purple-500 to-purple-600",
  },
];

const stats = [
  { value: "4", label: "AI Features" },
  { value: "29", label: "India States" },
  { value: "100%", label: "Free" },
  { value: "~2min", label: "Setup Time" },
];

const HomePage = () => {
  const user = getCurrentUser();
  const recentPlans = user ? getUserPlanningResults(user.id) : [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-blue blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-brand-purple blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground/80 text-sm font-medium mb-6 border border-primary/30">
              <Zap className="h-3.5 w-3.5" /> Construction Assistant Powered by AI
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6">
              Plan, Estimate & Build{" "}
              <span className="text-brand-green">with Confidence.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto">
              Future Home Gen helps Indian builders, contractors, and homeowners with AI-powered house planning, cost estimation, contract review, and building compliance guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/house-planning">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 brand-glow px-8 text-base"
                >
                  Start Planning <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 text-base"
                >
                  Learn More
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">
                  {s.value}
                </div>
                <div className="text-sm text-primary-foreground/50 mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Everything for Construction Planning
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              From layout suggestions to compliance checks — all the tools you need for smart construction planning.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={f.to} className="group">
                  <div className="glass-card-hover h-full p-6 flex flex-col gap-4 transition hover:shadow-lg">
                    <div
                      className={`h-12 w-12 rounded-lg bg-gradient-to-br ${f.gradient} flex items-center justify-center group-hover:scale-110 transition`}
                    >
                      <f.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground mb-2">{f.title}</h3>
                      <p className="text-sm text-muted-foreground">{f.desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition self-start mt-auto" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Plans Section (if logged in) */}
      {user && recentPlans.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="font-display text-2xl font-bold mb-2">Your Recent Plans</h2>
              <p className="text-muted-foreground">
                Quick access to your saved planning results
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {recentPlans.slice(0, 3).map((plan: any, i: number) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-4 hover:shadow-lg transition"
                >
                  <p className="font-semibold text-sm text-foreground mb-2 line-clamp-2">
                    {plan.title}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    {new Date(plan.createdAt).toLocaleDateString()}
                  </p>
                  <Link to="/house-planning">
                    <Button size="sm" variant="outline" className="w-full text-xs">
                      View Plan
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link to="/dashboard">
                <Button variant="outline">View All Plans</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-primary/10 to-brand-green/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to plan your perfect home?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Start with our AI-powered house planning assistant. Get layout suggestions, cost estimates, and compliance guidance in minutes.
            </p>
            <Link to="/house-planning">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 text-base"
              >
                <Sparkles className="h-4 w-4 mr-2" /> Start Planning Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
