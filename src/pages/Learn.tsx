import { motion } from "framer-motion";
import { Eye, Search, Stethoscope, Sun, ShieldAlert, CircleDot, Scaling, Palette, Move } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  }),
};

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
  { letter: "A", label: "Asymmetry", icon: Scaling, desc: "One half doesn't match the other half." },
  { letter: "B", label: "Border", icon: CircleDot, desc: "Irregular, ragged, notched, or blurred edges." },
  { letter: "C", label: "Color", icon: Palette, desc: "Uneven color—shades of brown, black, tan, red, white, or blue." },
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
  return (
    <main className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <p className="text-sm text-primary font-semibold uppercase tracking-wider mb-2">Education</p>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-3">
            Learn About <span className="text-gradient">Skin Cancer</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Everything you need to know about skin cancer—from identification and prevention to early detection.
          </p>
        </motion.div>

        {/* 101 */}
        <section className="mb-20">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-2xl font-bold font-display mb-8">
            Skin Cancer 101
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {skinCancer101.map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1} className="rounded-2xl bg-card border border-border p-6 hover:shadow-glow transition-shadow">
                <h3 className="font-semibold font-display mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Early Detection */}
        <section className="mb-20">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-2xl font-bold font-display mb-8">
            Early Detection
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {earlyDetection.map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1} className="text-center rounded-2xl bg-card border border-border p-8">
                <div className="w-14 h-14 mx-auto rounded-full bg-accent flex items-center justify-center mb-4">
                  <item.icon className="h-7 w-7 text-accent-foreground" />
                </div>
                <h3 className="font-semibold font-display mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ABCDE */}
        <section className="mb-20">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-2xl font-bold font-display mb-8">
            The ABCDEs of Skin Cancer
          </motion.h2>
          <div className="space-y-4">
            {abcde.map((item, i) => (
              <motion.div key={item.letter} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1} className="flex items-start gap-5 rounded-xl bg-card border border-border p-5 hover:shadow-glow transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-primary-foreground font-display">{item.letter}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <item.icon className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold font-display">{item.label}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Prevention */}
        <section className="mb-10">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-2xl font-bold font-display mb-2">
            Prevention Tips
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="text-muted-foreground mb-8">
            Protect yourself with a complete approach to reducing UV exposure.
          </motion.p>
          <div className="grid sm:grid-cols-2 gap-4">
            {prevention.map((tip, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 2} className="flex items-start gap-3 rounded-xl bg-card border border-border p-4">
                <ShieldAlert className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{tip}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
