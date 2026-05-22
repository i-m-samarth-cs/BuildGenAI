import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, MapPin, BadgeCheck, Briefcase, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Footer from "@/components/Footer";

const professionals = [
  { id: "FHG-1001", name: "Ar. Kavitha Menon", role: "Architect", location: "Bangalore, Karnataka", rating: 4.9, reviews: 214, experience: "14 years", speciality: "Residential & Villas", verified: true, avatar: "KM", fee: "₹40K–80K" },
  { id: "FHG-1002", name: "Suresh Constructions", role: "Contractor", location: "Mumbai, Maharashtra", rating: 4.7, reviews: 178, experience: "12 years", speciality: "G+2 Residential", verified: true, avatar: "SC", fee: "₹1,800/sq ft" },
  { id: "FHG-1003", name: "Ar. Pradeep Nair", role: "Architect", location: "Kochi, Kerala", rating: 4.8, reviews: 132, experience: "10 years", speciality: "Vastu & Modern Fusion", verified: true, avatar: "PN", fee: "₹30K–60K" },
  { id: "FHG-1004", name: "BuildRight Infra", role: "Contractor", location: "Hyderabad, Telangana", rating: 4.6, reviews: 95, experience: "8 years", speciality: "Commercial & Office", verified: false, avatar: "BR", fee: "₹2,000/sq ft" },
  { id: "FHG-1005", name: "Ar. Sneha Desai", role: "Architect", location: "Pune, Maharashtra", rating: 4.9, reviews: 301, experience: "18 years", speciality: "Sustainable Design", verified: true, avatar: "SD", fee: "₹50K–1L" },
  { id: "FHG-1006", name: "Eng. Ramesh Gupta", role: "Structural Engineer", location: "Delhi NCR", rating: 4.8, reviews: 189, experience: "16 years", speciality: "RCC & Earthquake Design", verified: true, avatar: "RG", fee: "₹25K–50K" },
  { id: "FHG-1007", name: "Chennai HomeBuilders", role: "Contractor", location: "Chennai, Tamil Nadu", rating: 4.5, reviews: 87, experience: "7 years", speciality: "Budget Residential", verified: true, avatar: "CH", fee: "₹1,500/sq ft" },
  { id: "FHG-1008", name: "Ar. Ananya Singh", role: "Interior Designer", location: "Gurugram, Haryana", rating: 4.7, reviews: 143, experience: "9 years", speciality: "Modern Interiors", verified: true, avatar: "AS", fee: "₹800/sq ft" },
  { id: "FHG-1009", name: "Kolkata Build Co.", role: "Contractor", location: "Kolkata, West Bengal", rating: 4.4, reviews: 61, experience: "6 years", speciality: "Affordable G+1", verified: false, avatar: "KB", fee: "₹1,400/sq ft" },
];

const ROLES = ["All Roles", "Architect", "Contractor", "Structural Engineer", "Interior Designer"];

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All Roles");
  const [verified, setVerified] = useState(false);

  const filtered = professionals.filter(p => {
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.role.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()) || p.speciality.toLowerCase().includes(search.toLowerCase());
    const matchRole = role === "All Roles" || p.role === role;
    const matchVerified = !verified || p.verified;
    return matchSearch && matchRole && matchVerified;
  });

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Find Construction Professionals</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">Browse verified architects, contractors, and engineers across India. All listings are for demonstration purposes.</p>
        </motion.div>

        {/* Filters */}
        <div className="glass-card p-4 mb-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name, role, city, or speciality…" value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-secondary/50" />
          </div>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="w-full md:w-48 bg-secondary/50"><SelectValue /></SelectTrigger>
            <SelectContent>{ROLES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
          </Select>
          <button onClick={() => setVerified(!verified)} className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${verified ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:text-foreground'}`}>
            <BadgeCheck className="h-4 w-4 inline mr-1" /> Verified Only
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-6 text-center">{filtered.length} professional{filtered.length !== 1 ? 's' : ''} found</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {filtered.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card-hover p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center font-display font-bold text-primary text-lg shrink-0">{p.avatar}</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-display font-semibold">{p.name}</h3>
                    {p.verified && <BadgeCheck className="h-4 w-4 text-brand-blue shrink-0" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{p.role}</p>
                  <p className="text-xs text-muted-foreground/60 font-mono">ID: {p.id}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{p.location}</span>
                <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{p.experience}</span>
                <span className="flex items-center gap-1"><Star className="h-3 w-3 text-primary fill-primary" />{p.rating} ({p.reviews})</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">{p.speciality}</span>
                  <p className="text-xs text-muted-foreground mt-1">Fee: {p.fee}</p>
                </div>
                <Button size="sm" variant="outline" className="text-xs" onClick={() => alert(`Contact feature coming soon.\nProfessional: ${p.name}`)}>
                  <Phone className="h-3 w-3 mr-1" /> Contact
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No professionals found matching your filters.</p>
            <Button variant="ghost" onClick={() => { setSearch(''); setRole('All Roles'); setVerified(false); }} className="mt-4">Clear Filters</Button>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground mt-10">⚠️ Marketplace listings are for demo purposes. Always verify credentials independently before hiring.</p>
      </div>
      <Footer />
    </div>
  );
};

export default Marketplace;
