import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ScanLine, BookOpen, ShieldCheck, Activity, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0, 0, 0.2, 1] as const },
  }),
};

const features = [
  {
    icon: ScanLine,
    title: "AI-Powered Detection",
    desc: "Upload a photo of your skin lesion and get an instant AI analysis powered by deep learning.",
  },
  {
    icon: BookOpen,
    title: "Learn & Prevent",
    desc: "Comprehensive guides on skin cancer types, early detection methods, and prevention tips.",
  },
  {
    icon: ShieldCheck,
    title: "Early Detection Saves Lives",
    desc: "When detected early, the 5-year survival rate for melanoma is 99%. Knowledge is power.",
  },
];

const stats = [
  { icon: Users, value: "1 in 5", label: "Americans will develop skin cancer by age 70" },
  { icon: Activity, value: "99%", label: "Survival rate when melanoma is detected early" },
  { icon: TrendingUp, value: "2+", label: "People die of skin cancer every hour in the U.S." },
];

export default function Index() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold font-display mb-6"
            style={{ color: "hsl(var(--hero-text))" }}
          >
            Intelligent Skin Cancer{" "}
            <span style={{ color: "hsl(var(--hero-accent))" }}>Detection</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl mb-10"
            style={{ color: "hsl(var(--hero-text) / 0.8)" }}
          >
            Diagnose your skin for cancer from the comfort of your home using our AI-powered analysis tool.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 border-0 text-base px-8">
              <Link to="/skinsense">
                Start Scan <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8">
              <Link to="/learn">Learn More</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-3xl md:text-4xl font-bold font-display text-center mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-center text-muted-foreground mb-16 max-w-xl mx-auto"
          >
            Our platform combines AI technology with medical knowledge to help you stay informed about your skin health.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 2}
                className="group rounded-2xl bg-card p-8 border border-border hover:shadow-glow transition-shadow duration-500"
              >
                <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <f.icon className="h-7 w-7 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold font-display mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <s.icon className="h-8 w-8 mx-auto mb-3 text-primary-foreground/80" />
                <p className="text-4xl font-bold font-display text-primary-foreground mb-2">{s.value}</p>
                <p className="text-sm text-primary-foreground/70">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="text-3xl md:text-4xl font-bold font-display mb-4"
          >
            Take Control of Your Skin Health
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="text-muted-foreground mb-8 max-w-lg mx-auto"
          >
            Early detection is the key to effective treatment. Start your free skin check today.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={2}
          >
            <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 border-0 text-base px-10">
              <Link to="/skinsense">
                Check Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
