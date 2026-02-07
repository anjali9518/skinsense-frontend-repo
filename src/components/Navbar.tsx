import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Dna } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "SkinSense", to: "/skinsense" },
  { label: "Learn", to: "/learn" },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong shadow-lg shadow-background/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <Dna className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-180" />
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/30 transition-colors" />
          </div>
          <span className="text-lg font-bold font-display tracking-tight">
            Skin<span className="text-gradient">Cancer</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {location.pathname === link.to && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-lg bg-secondary"
                  transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {location.pathname === link.to && (
                  <motion.span
                    layoutId="nav-dot"
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                  />
                )}
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button asChild variant="glow" size="default">
            <Link to="/skinsense">Start Scan</Link>
          </Button>
        </div>

        {/* Mobile */}
        <button
          className="md:hidden relative p-2 text-foreground"
          onClick={() => setOpen(!open)}
        >
          <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-strong border-t border-border overflow-hidden"
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {location.pathname === link.to && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button asChild variant="glow" className="w-full">
                <Link to="/skinsense" onClick={() => setOpen(false)}>Start Scan</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
