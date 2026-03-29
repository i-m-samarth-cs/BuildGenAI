import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Users, Leaf, Shield, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const features = [
  { icon: Cpu, title: "AI Design Engine", desc: "Generate sustainable building layouts with intelligent cost estimation." },
  { icon: Leaf, title: "Green Score", desc: "Every design rated on energy efficiency and eco-friendly materials." },
  { icon: Users, title: "Verified Pros", desc: "Connect with architects and contractors — all verified and rated." },
  { icon: Shield, title: "Secure Projects", desc: "Your designs and data stay private and protected." },
  { icon: Zap, title: "Smart Matching", desc: "AI matches you with the best professionals for your project." },
  { icon: BarChart3, title: "Cost Insights", desc: "Transparent budget breakdowns and material cost analytics." },
];

const stats = [
  { value: "2,400+", label: "Designs Generated" },
  { value: "850+", label: "Verified Pros" },
  { value: "94%", label: "Satisfaction Rate" },
  { value: "12", label: "Countries" },
];

const Landing = () => (
  <div className="min-h-screen">
    {/* Hero */}
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
            <Cpu className="h-3.5 w-3.5" /> AI-Powered Architecture
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6">
            Build Smarter.{" "}
            <span className="text-brand-green">Build Perfect.</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto">
            Generate comprehensive building layouts, get practical material estimates, and connect with top-tier professionals — all in one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/generator">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 brand-glow px-8 text-base">
                Start Designing <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 text-base">
                Browse Professionals
              </Button>
            </Link>
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
              <div className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">{s.value}</div>
              <div className="text-sm text-primary-foreground/50 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* Features */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to <span className="gradient-text">Build Better</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            From AI-generated blueprints to connecting with top professionals — all on one platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-6"
            >
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="hero-gradient rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-orange blur-[80px]" />
          </div>
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Design Your Future?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
              Join thousands of users conceptualizing their next major project with BuildGen AI.
            </p>
            <Link to="/generator">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-10">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Landing;
