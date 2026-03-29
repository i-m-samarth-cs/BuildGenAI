import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, MapPin, BadgeCheck, Briefcase, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const professionals = [
  { id: "BGA-1001", name: "Amara Osei", role: "Architect", location: "Accra, Ghana", rating: 4.9, reviews: 127, experience: "12 years", speciality: "Sustainable Housing", verified: true, avatar: "AO" },
  { id: "BGA-1002", name: "Carlos Rivera", role: "Contractor", location: "Austin, TX", rating: 4.7, reviews: 89, experience: "8 years", speciality: "Green Commercial", verified: true, avatar: "CR" },
  { id: "BGA-1003", name: "Priya Sharma", role: "Architect", location: "Mumbai, India", rating: 4.8, reviews: 201, experience: "15 years", speciality: "Net-Zero Design", verified: true, avatar: "PS" },
  { id: "BGA-1004", name: "Lena Müller", role: "Interior Designer", location: "Berlin, Germany", rating: 4.6, reviews: 64, experience: "6 years", speciality: "Eco Interiors", verified: false, avatar: "LM" },
  { id: "BGA-1005", name: "James Okafor", role: "Contractor", location: "Lagos, Nigeria", rating: 4.8, reviews: 152, experience: "10 years", speciality: "Affordable Housing", verified: true, avatar: "JO" },
  { id: "BGA-1006", name: "Sofia Chen", role: "Architect", location: "Singapore", rating: 5.0, reviews: 310, experience: "18 years", speciality: "Biophilic Design", verified: true, avatar: "SC" },
];

const Marketplace = () => {
  const [search, setSearch] = useState("");
  const filtered = professionals.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.role.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Professional Marketplace</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Find verified architects, contractors, and designers for your sustainable project.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="glass-card p-4 mb-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, role, or location…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-secondary/50"
            />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-44 bg-secondary/50"><SelectValue placeholder="Role" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="architect">Architect</SelectItem>
              <SelectItem value="contractor">Contractor</SelectItem>
              <SelectItem value="designer">Designer</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-44 bg-secondary/50"><SelectValue placeholder="Rating" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="4.5">4.5+ Stars</SelectItem>
              <SelectItem value="4.8">4.8+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card-hover p-6"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center font-display font-bold text-primary text-lg shrink-0">
                  {p.avatar}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-semibold truncate">{p.name}</h3>
                    {p.verified && <BadgeCheck className="h-4 w-4 text-brand-blue shrink-0" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{p.role}</p>
                  <p className="text-xs text-muted-foreground/70 font-mono">ID: {p.id}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {p.location}</span>
                <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {p.experience}</span>
                <span className="flex items-center gap-1"><Star className="h-3 w-3 text-primary fill-primary" /> {p.rating} ({p.reviews})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">{p.speciality}</span>
                <Link to={`/professional/${p.id}`}>
                  <Button size="sm" variant="outline" className="text-xs">View Profile</Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Marketplace;
