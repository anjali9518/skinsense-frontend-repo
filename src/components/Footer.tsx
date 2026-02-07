import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-surface-dark py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold font-display text-primary-foreground">
            SkinCancer
          </span>
        </div>
        <p className="text-sm italic" style={{ color: "hsl(var(--surface-dark-foreground))" }}>
          Our technology at your service on your fingertips
        </p>
        <div className="flex justify-center gap-6 mt-6 text-sm" style={{ color: "hsl(var(--surface-dark-foreground) / 0.6)" }}>
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/skinsense" className="hover:text-primary transition-colors">SkinSense</Link>
          <Link to="/learn" className="hover:text-primary transition-colors">Learn</Link>
        </div>
        <p className="mt-8 text-xs" style={{ color: "hsl(var(--surface-dark-foreground) / 0.4)" }}>
          © 2026 SkinCancer Detection. For educational purposes only. Not a substitute for professional medical advice.
        </p>
      </div>
    </footer>
  );
}
