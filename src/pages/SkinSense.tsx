import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ImagePlus, CheckCircle2, XCircle, AlertTriangle, Trash2, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const guidelines = {
  dos: [
    "Use high resolution images",
    "Center the lesion in the picture",
    "Lesion should cover ~50% of the area",
    "Only show lesion and surrounding skin",
  ],
  donts: [
    "Avoid blurry or distorted images",
    "Don't place lesion on the edge",
    "Don't exceed 50% image coverage",
    "Remove jewelry, clothing or tattoos",
  ],
};

export default function SkinSense() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files[0];
      if (f && f.type.startsWith("image/")) handleFile(f);
    },
    [handleFile]
  );

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => setAnalyzing(false), 3000);
  };

  return (
    <main className="pt-24 pb-16 min-h-screen relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-primary mono mb-4">
            <Sparkles className="h-3 w-3" /> AI Analysis
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
            Skin<span className="text-gradient">Sense</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Upload an image of your skin lesion for instant AI-powered analysis.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Upload Panel - 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 rounded-2xl surface-elevated border-glow card-shine p-8"
          >
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0 text-sm font-bold text-accent-foreground mono">
                  1
                </div>
                <div>
                  <h3 className="font-semibold font-display text-sm mb-1">Read Guidelines</h3>
                  <p className="text-xs text-muted-foreground">Review the upload guidelines on the right for best results.</p>
                </div>
              </div>

              {/* Step 2 - Upload */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0 text-sm font-bold text-accent-foreground mono">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold font-display text-sm mb-3">Upload Image</h3>

                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    onClick={() => inputRef.current?.click()}
                    className={`relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
                      dragging
                        ? "border-primary bg-accent/30 glow-sm"
                        : "border-border hover:border-primary/40 hover:bg-secondary/30"
                    }`}
                  >
                    <input
                      ref={inputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFile(f);
                      }}
                    />
                    <AnimatePresence mode="wait">
                      {preview ? (
                        <motion.div
                          key="preview"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="space-y-3"
                        >
                          <div className="relative inline-block">
                            <img src={preview} alt="Preview" className="mx-auto max-h-56 rounded-xl object-contain" />
                            <div className="absolute inset-0 rounded-xl ring-1 ring-primary/20" />
                          </div>
                          <p className="text-xs text-muted-foreground mono">{file?.name}</p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="placeholder"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className="w-16 h-16 rounded-2xl glass mx-auto flex items-center justify-center mb-4">
                            <ImagePlus className="h-7 w-7 text-muted-foreground/40" />
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Drag & drop your image here
                          </p>
                          <p className="text-xs text-muted-foreground/50">
                            or click to browse • PNG, JPG up to 10MB
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Step 3 - Analyze */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0 text-sm font-bold text-accent-foreground mono">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold font-display text-sm mb-3">Analyze</h3>
                  <div className="flex gap-3">
                    <Button
                      disabled={!file || analyzing}
                      onClick={handleAnalyze}
                      variant="glow"
                      className="flex-1"
                    >
                      {analyzing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                          />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4" /> Analyze Image <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                    {file && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Guidelines Panel - 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="rounded-2xl surface-elevated border-glow p-6">
              <h3 className="font-bold font-display text-sm mb-5 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Ideal Image
              </h3>
              <div className="space-y-4">
                {guidelines.dos.map((g, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-lg font-bold font-display text-primary/20 mono leading-none w-5 shrink-0">{i + 1}</span>
                    <p className="text-sm text-muted-foreground">{g}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl surface-elevated border-glow p-6">
              <h3 className="font-bold font-display text-sm mb-5 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-destructive" />
                Avoid
              </h3>
              <div className="space-y-4">
                {guidelines.donts.map((g, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-lg font-bold font-display text-destructive/20 mono leading-none w-5 shrink-0">{i + 1}</span>
                    <p className="text-sm text-muted-foreground">{g}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-xl glass p-4 flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-accent-foreground shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                For educational purposes only. Not a substitute for professional medical advice.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
