import { motion } from "framer-motion";
import { BadgeCheck, MapPin, Star, Briefcase, Mail, Phone, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "react-router-dom";
import Footer from "@/components/Footer";

const proData: Record<string, any> = {
  "BGA-1001": { name: "Amara Osei", role: "Architect", location: "Accra, Ghana", rating: 4.9, reviews: 127, experience: "12 years", speciality: "Sustainable Housing", verified: true, avatar: "AO", bio: "Award-winning architect specializing in sustainable residential design across West Africa. Passionate about blending local materials with modern green technology.", portfolio: ["Eco Village — Kumasi", "Solar Community Center — Accra", "Bamboo Residence — Cape Coast"] },
  "BGA-1006": { name: "Sofia Chen", role: "Architect", location: "Singapore", rating: 5.0, reviews: 310, experience: "18 years", speciality: "Biophilic Design", verified: true, avatar: "SC", bio: "Internationally recognized for biophilic architecture. Featured in ArchDaily and Dezeen. Designs that breathe.", portfolio: ["Vertical Forest Tower — Singapore", "Healing Garden Hospital — KL", "Living Wall Office — Tokyo"] },
};

const fallback = { name: "Professional", role: "Architect", location: "Global", rating: 4.8, reviews: 100, experience: "10 years", speciality: "Sustainable Design", verified: true, avatar: "?", bio: "Experienced professional dedicated to sustainable building practices.", portfolio: ["Project Alpha", "Project Beta", "Project Gamma"] };

const ProfessionalProfile = () => {
  const { id } = useParams<{ id: string }>();
  const p = proData[id || ""] || fallback;

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <Link to="/marketplace" className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block">← Back to Marketplace</Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
            <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center font-display font-bold text-primary text-2xl shrink-0">
              {p.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-display text-2xl font-bold">{p.name}</h1>
                {p.verified && <BadgeCheck className="h-5 w-5 text-eco-blue" />}
              </div>
              <p className="text-muted-foreground">{p.role} · <span className="font-mono text-xs">{id}</span></p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {p.location}</span>
                <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {p.experience}</span>
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-primary fill-primary" /> {p.rating} ({p.reviews} reviews)</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6">{p.bio}</p>

          <div className="mb-6">
            <h3 className="font-display font-semibold text-sm mb-3 flex items-center gap-1.5"><Award className="h-4 w-4 text-primary" /> Portfolio</h3>
            <div className="space-y-2">
              {p.portfolio.map((item: string) => (
                <div key={item} className="p-3 rounded-lg bg-secondary/50 text-sm">{item}</div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1">
              <Mail className="h-4 w-4 mr-2" /> Send Contact Request
            </Button>
            <Button variant="outline" className="flex-1">
              <Phone className="h-4 w-4 mr-2" /> Schedule Call
            </Button>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfessionalProfile;
