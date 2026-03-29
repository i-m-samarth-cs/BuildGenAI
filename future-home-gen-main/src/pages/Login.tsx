import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/lib/auth";
import { toast } from "sonner";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter an email");
      return;
    }
    
    login(email, name);
    toast.success("Successfully logged in!");
    navigate("/dashboard");
    window.location.reload(); // Quick way to sync auth state across app
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-display text-xl font-bold mb-4">
            <div className="h-8 w-8 rounded-lg overflow-hidden flex items-center justify-center bg-transparent">
              <img src="/logo.png" alt="BuildGen AI Logo" className="object-contain w-full h-full" />
            </div>
            BuildGenAI
          </Link>
          <h1 className="font-display text-2xl font-bold mt-4">{isSignup ? "Create Account" : "Welcome Back"}</h1>
          <p className="text-sm text-muted-foreground mt-1">{isSignup ? "Start generating AI building plans" : "Sign in to your account"}</p>
        </div>

        <form onSubmit={handleAuth} className="glass-card p-6 space-y-4">
          {isSignup && (
            <div>
              <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-primary" /> Full Name</label>
              <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="bg-secondary/50" />
            </div>
          )}
          <div>
            <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-primary" /> Email</label>
            <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-secondary/50" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-primary" /> Password</label>
            <Input type="password" placeholder="••••••••" className="bg-secondary/50" />
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11">
            {isSignup ? "Create Account" : "Sign In"} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-5">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button type="button" onClick={() => setIsSignup(!isSignup)} className="text-primary font-medium hover:underline">
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
