import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ImagePlus, CheckCircle, XCircle, AlertTriangle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const guidelines = {
  dos: [
    "Image should be high resolution",
    "Lesion should be centered in the picture",
    "Lesion should cover ~50% of the image area",
    "Only the lesion and surrounding skin should be visible",
  ],
  donts: [
    "Avoid low resolution or distorted images",
    "Don't place the lesion on the edge",
    "Don't let it cover more than 50% of the image",
    "Avoid jewelry, clothing, markings, or tattoos",
  ],
};

export default function SkinSense() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
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

  return (
    <main className="pt-24 pb-16 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-3">
            Skin<span className="text-gradient">Sense</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Upload an image of your skin lesion to get an AI-powered analysis. Follow the guidelines for the best results.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Upload panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-card border border-border p-8"
          >
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Step 1</span>
                <p className="text-sm text-muted-foreground mt-1">Read the image upload guidelines before uploading.</p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Step 2</span>
                <p className="text-sm text-muted-foreground mt-1 mb-3">Choose an image of your skin lesion.</p>

                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  onClick={() => inputRef.current?.click()}
                  className={`relative cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
                    dragging ? "border-primary bg-accent/50" : "border-border hover:border-primary/50"
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
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="space-y-3"
                      >
                        <img src={preview} alt="Preview" className="mx-auto max-h-48 rounded-lg object-contain" />
                        <p className="text-sm text-muted-foreground">{file?.name}</p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <ImagePlus className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
                        <p className="text-sm text-muted-foreground">
                          Drag & drop or click to upload
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Step 3</span>
                <p className="text-sm text-muted-foreground mt-1 mb-3">Analyze your image.</p>
                <div className="flex gap-3">
                  <Button
                    disabled={!file}
                    className="flex-1 bg-gradient-primary text-primary-foreground hover:opacity-90 border-0"
                  >
                    <Upload className="mr-2 h-4 w-4" /> Analyze Image
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
          </motion.div>

          {/* Guidelines panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl bg-card border border-border p-8"
          >
            <h2 className="text-xl font-bold font-display mb-6">Image Upload Guidelines</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-sm">Ideal Image</span>
                </div>
                <ul className="space-y-3">
                  {guidelines.dos.map((g, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-2xl font-bold font-display text-primary/30 leading-none">{i + 1}</span>
                      <span className="pt-1">{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="h-5 w-5 text-destructive" />
                  <span className="font-semibold text-sm">Avoid</span>
                </div>
                <ul className="space-y-3">
                  {guidelines.donts.map((g, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-2xl font-bold font-display text-destructive/30 leading-none">{i + 1}</span>
                      <span className="pt-1">{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-accent/50 p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-accent-foreground shrink-0 mt-0.5" />
              <p className="text-sm text-accent-foreground">
                This tool is for educational purposes only and is not a substitute for professional medical advice. Always consult a dermatologist.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
