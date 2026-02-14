import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Search, Stethoscope, Sun, ShieldAlert, CircleDot, Scaling, Palette, Move, BookOpen, ChevronRight, Activity, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { apiService } from "@/services/api.service";
import type { Classification } from "@/types/api.types";
import { API_CONFIG } from "@/config/api";

const skinCancer101 = [
  { title: "What Is Skin Cancer?", desc: "Skin cancer is the abnormal growth of skin cells, most often caused by ultraviolet (UV) radiation from the sun or tanning beds." },
  { title: "What Does It Look Like?", desc: "Skin cancers can appear as unusual moles, scaly patches, open sores, or raised bumps. Look for changes in size, shape, and color." },
  { title: "What Causes It?", desc: "The main causes include UV exposure, fair skin, family history, multiple moles, and a weakened immune system." },
];

const earlyDetection = [
  { icon: Eye, title: "Know How", desc: "Learn the ABCDE warning signs so you can spot changes before they become dangerous." },
  { icon: Search, title: "Examine Monthly", desc: "Do a full-body skin self-exam once a month. Check hard-to-see areas with a mirror." },
  { icon: Stethoscope, title: "See Your Dermatologist", desc: "Schedule an annual professional skin exam, especially if you have risk factors." },
];

const abcde = [
  { letter: "A", label: "Asymmetry", icon: Scaling, desc: "One half doesn't match the other half in shape." },
  { letter: "B", label: "Border", icon: CircleDot, desc: "Irregular, ragged, notched, or blurred edges." },
  { letter: "C", label: "Color", icon: Palette, desc: "Uneven color — shades of brown, black, tan, red, white, or blue." },
  { letter: "D", label: "Diameter", icon: Sun, desc: "Larger than 6mm (about the size of a pencil eraser)." },
  { letter: "E", label: "Evolving", icon: Move, desc: "A mole that is changing in size, shape, or color over time." },
];

const prevention = [
  "Seek shade, especially between 10 AM and 4 PM.",
  "Don't get sunburned.",
  "Avoid tanning and UV tanning booths.",
  "Cover up with clothing, hats, and UV-blocking sunglasses.",
  "Use broad spectrum SPF 30+ sunscreen daily. Reapply every 2 hours.",
  "Keep newborns out of the sun. Use sunscreen on children over 6 months.",
  "Examine your skin head-to-toe every month.",
  "See a dermatologist at least once a year for a professional exam.",
];

export default function Learn() {
  const [classifications, setClassifications] = useState<Classification[]>([]);
  const [loadingClassifications, setLoadingClassifications] = useState(true);

  useEffect(() => {
    apiService.getClassificationInfo()
      .then((data) => setClassifications(data.classifications))
      .catch(() => setClassifications([]))
      .finally(() => setLoadingClassifications(false));
  }, []);

  const severityColors = API_CONFIG.SEVERITY_COLORS;

  return (
    <main className="pt-24 pb-16 min-h-screen relative">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-primary mono mb-4">
            <BookOpen className="h-3 w-3" /> Education Center
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-4 leading-tight">
            Learn About{" "}
            <span className="text-gradient glow-text">Skin Cancer</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Everything you need to know — from identification and prevention to early detection.
          </p>
        </motion.div>

        {/* 101 */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="line-decoration mb-8 pl-0"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary mono mb-1 pt-5">Fundamentals</p>
            <h2 className="text-2xl md:text-3xl font-bold font-display">Skin Cancer 101</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {skinCancer101.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl surface-elevated border-glow card-shine p-7 group"
              >
                <h3 className="font-semibold font-display text-lg mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Early Detection */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="line-decoration mb-8"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary mono mb-1 pt-5">Save Your Life</p>
            <h2 className="text-2xl md:text-3xl font-bold font-display">Early Detection</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {earlyDetection.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center rounded-2xl surface-elevated border-glow p-8 group"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl glass flex items-center justify-center mb-5 group-hover:glow-sm transition-all duration-500">
                  <item.icon className="h-7 w-7 text-accent-foreground" />
                </div>
                <h3 className="font-semibold font-display mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ABCDE */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="line-decoration mb-8"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary mono mb-1 pt-5">Warning Signs</p>
            <h2 className="text-2xl md:text-3xl font-bold font-display">The ABCDEs of Skin Cancer</h2>
          </motion.div>

          <div className="space-y-3">
            {abcde.map((item, i) => (
              <motion.div
                key={item.letter}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-5 rounded-xl surface-elevated border-glow card-shine p-5 group hover:translate-x-1 transition-transform duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0 group-hover:glow-sm transition-all duration-500">
                  <span className="text-2xl font-bold text-primary-foreground font-display">{item.letter}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <item.icon className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold font-display">{item.label}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary/60 transition-colors shrink-0" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Prevention */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="line-decoration mb-8"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary mono mb-1 pt-5">Stay Safe</p>
            <h2 className="text-2xl md:text-3xl font-bold font-display">Prevention Tips</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-3">
            {prevention.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-xl surface-elevated border-glow p-4 group"
              >
                <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldAlert className="h-3.5 w-3.5 text-accent-foreground" />
                </div>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{tip}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* What Our AI Detects */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="line-decoration mb-8"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-primary mono mb-1 pt-5">AI Classifications</p>
            <h2 className="text-2xl md:text-3xl font-bold font-display">What Our AI Detects</h2>
          </motion.div>

          {loadingClassifications ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground text-sm">Loading classifications...</span>
            </div>
          ) : classifications.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {classifications.map((cls, i) => {
                const colors = severityColors[cls.severity] || severityColors.low;
                return (
                  <motion.div
                    key={cls.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="rounded-xl surface-elevated border-glow p-5 group"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0 mt-0.5">
                        <Activity className="h-4 w-4 text-accent-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold font-display text-sm mb-1">{cls.name}</h3>
                        <span className={`inline-block text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} ${colors.border} border`}>
                          {cls.severity}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{cls.description}</p>
                    <p className="text-xs text-primary/80">{cls.recommendation}</p>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              Could not load classification data. Make sure the backend is running.
            </p>
          )}
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl glass glow p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">
            Ready to Check Your Skin?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Use our AI-powered tool to analyze your skin lesions instantly.
          </p>
          <Button asChild variant="glow" size="lg">
            <Link to="/skinsense">Start Scan</Link>
          </Button>
        </motion.section>
      </div>
    </main>
  );
}
