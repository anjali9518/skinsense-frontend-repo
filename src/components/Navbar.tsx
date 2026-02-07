import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "SkinSense", to: "/skinsense" },
  { label: "Learn", to: "/learn" },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold font-display text-foreground">
            Skin<span className="text-gradient">Cancer</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {location.pathname === link.to && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-lg bg-accent"
                  transition={{ type: "spring", duration: 0.4 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button asChild className="bg-gradient-primary text-primary-foreground hover:opacity-90 border-0">
            <Link to="/skinsense">Get Started</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-card border-t border-border px-4 pb-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block py-3 text-sm font-medium transition-colors ${
                location.pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild className="w-full mt-2 bg-gradient-primary text-primary-foreground border-0">
            <Link to="/skinsense" onClick={() => setOpen(false)}>Get Started</Link>
          </Button>
        </motion.div>
      )}
    </nav>
  );
}
