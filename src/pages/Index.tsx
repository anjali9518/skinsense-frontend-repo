import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ScanLine, BookOpen, ShieldCheck, Activity, Users, TrendingUp, Sparkles, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import ParticleField from "@/components/ParticleField";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: ScanLine,
    title: "AI-Powered Detection",
    desc: "Upload a photo of your skin lesion and get instant AI analysis powered by deep learning models.",
    tag: "DETECTION",
  },
  {
    icon: BookOpen,
    title: "Learn & Prevent",
    desc: "Comprehensive guides on skin cancer types, the ABCDE method, and prevention strategies.",
    tag: "EDUCATION",
  },
  {
    icon: ShieldCheck,
    title: "Early Detection Saves Lives",
    desc: "When detected early, the 5-year survival rate for melanoma is 99%. Knowledge is power.",
    tag: "PREVENTION",
  },
];

const stats = [
  { value: "1 in 5", label: "Americans will develop skin cancer by age 70", icon: Users },
  { value: "99%", label: "Survival rate when melanoma is detected early", icon: Activity },
  { value: "2+", label: "People die of skin cancer every hour in the U.S.", icon: TrendingUp },
];

const steps = [
  { num: "01", title: "Upload", desc: "Take a clear photo of your skin lesion and upload it to our platform." },
  { num: "02", title: "Analyze", desc: "Our AI model analyzes the image using advanced deep learning algorithms." },
  { num: "03", title: "Results", desc: "Get instant results with risk assessment and recommended next steps." },
];

export default function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="overflow-hidden">
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center">
        {/* Background image with parallax */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
        </motion.div>

        {/* Particles */}
        <ParticleField count={40} />

        {/* Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-4 max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 text-xs font-medium text-primary"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Skin Cancer Detection
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-8xl font-bold font-display leading-[0.9] tracking-tight mb-6"
          >
            Detect.{" "}
            <span className="text-gradient glow-text">Protect.</span>
            <br />
            Survive.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Diagnose your skin for cancer from the comfort of your home using our intelligent analysis system.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild variant="glow" size="xl">
              <Link to="/skinsense">
                Start Free Scan <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost-light" size="xl">
              <Link to="/learn">Learn More</Link>
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1"
            >
              <motion.div className="w-1 h-2 rounded-full bg-primary" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-3 mono"
            >
              How it works
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold font-display"
            >
              Three Simple Steps
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative text-center group"
              >
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-2xl glass border-glow mb-6 group-hover:glow transition-all duration-500">
                  <span className="text-3xl font-bold font-display text-gradient">{step.num}</span>
                </div>
                <h3 className="text-xl font-semibold font-display mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group relative rounded-2xl surface-elevated border-glow card-shine p-8 flex flex-col"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/60 mono mb-6">{f.tag}</span>
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-5 group-hover:glow-sm transition-all duration-500">
                  <f.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold font-display mb-3">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{f.desc}</p>
                <div className="mt-6 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Learn more <ChevronRight className="h-3 w-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 glass" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center py-8"
              >
                <s.icon className="h-6 w-6 mx-auto mb-4 text-primary/60" />
                <p className="text-4xl md:text-5xl font-bold font-display text-gradient mb-3">{s.value}</p>
                <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-radial" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-primary mono mb-6">
              <Zap className="h-3 w-3" />
              Free & instant results
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
              Take Control of Your{" "}
              <span className="text-gradient">Skin Health</span>
            </h2>
            <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
              Early detection is the key to effective treatment. Start your free skin check today — it only takes a minute.
            </p>
            <Button asChild variant="glow" size="xl">
              <Link to="/skinsense">
                Check Now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
