import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, DollarSign, FileText, Shield, Building2, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentUser, logout } from "@/lib/auth";

const NAV_TOOLS = [
  { to: "/house-planning", label: "House Planning", icon: Home },
  { to: "/cost-estimation", label: "Cost Estimation", icon: DollarSign },
  { to: "/contract-review", label: "Contract Review", icon: FileText },
  { to: "/compliance-guide", label: "Compliance", icon: Shield },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const isActive = (to: string) => location.pathname === to;

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/70 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-foreground shrink-0">
          <div className="h-8 w-8 rounded-lg overflow-hidden flex items-center justify-center bg-transparent">
            <img src="/logo.png" alt="Future Home Gen" className="object-contain w-full h-full" />
          </div>
          <span className="hidden sm:block">Future Home Gen</span>
        </Link>

        {/* Desktop nav — tools */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_TOOLS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <link.icon className="h-3.5 w-3.5" />
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <Link to="/dashboard" className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/dashboard') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
                <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
              </Link>
              <span className="text-sm text-muted-foreground px-2 hidden lg:block">Hi, {user.username}</span>
              <Button onClick={handleLogout} variant="ghost" size="sm">Log Out</Button>
            </>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost" size="sm">Log In</Button></Link>
              <Link to="/login"><Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">Get Started</Button></Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-card border-b border-border"
          >
            <div className="p-4 flex flex-col gap-1">
              <Link to="/" onClick={() => setOpen(false)} className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium ${isActive('/') ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
                <Building2 className="h-4 w-4" /> Home
              </Link>
              {NAV_TOOLS.map(link => (
                <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium ${isActive(link.to) ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
                  <link.icon className="h-4 w-4" /> {link.label}
                </Link>
              ))}
              {user && (
                <Link to="/dashboard" onClick={() => setOpen(false)} className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium ${isActive('/dashboard') ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
              )}
              <div className="mt-2 pt-2 border-t border-border">
                {user ? (
                  <Button onClick={handleLogout} variant="destructive" className="w-full">Log Out</Button>
                ) : (
                  <Link to="/login" onClick={() => setOpen(false)}>
                    <Button className="w-full bg-primary text-primary-foreground">Get Started</Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
