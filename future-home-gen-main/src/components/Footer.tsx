import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display text-lg font-bold mb-3">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <Leaf className="h-4 w-4 text-primary-foreground" />
            </div>
            BuildGenAI
          </div>
          <p className="text-muted-foreground text-sm max-w-sm">
            AI-powered sustainable building design platform connecting visionaries with verified professionals.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3 text-sm">Platform</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/generator" className="hover:text-foreground transition-colors">AI Generator</Link>
            <Link to="/marketplace" className="hover:text-foreground transition-colors">Marketplace</Link>
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3 text-sm">Company</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span className="hover:text-foreground transition-colors cursor-pointer">About</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        © 2026 BuildGenAI. Designing a sustainable future.
      </div>
    </div>
  </footer>
);

export default Footer;
