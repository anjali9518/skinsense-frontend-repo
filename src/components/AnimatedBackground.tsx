import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-background" />

      {/* Mesh gradient orbs */}
      <motion.div
        className="absolute -top-[40%] -left-[20%] w-[80vw] h-[80vw] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, hsl(168 80% 50%) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-[30%] -right-[20%] w-[70vw] h-[70vw] rounded-full opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, hsl(210 80% 55%) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 30, -50, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-[30%] right-[10%] w-[50vw] h-[50vw] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, hsl(190 70% 45%) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -30, 40, 0],
          y: [0, 40, -20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground) / 0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
