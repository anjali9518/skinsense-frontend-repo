import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ImagePlus, CheckCircle2, XCircle, AlertTriangle, Trash2, Sparkles, ArrowRight, AlertCircle, Activity, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiService } from "@/services/api.service";
import { validateFile, API_CONFIG } from "@/config/api";
import type { AnalysisResult, UploadProgress } from "@/types/api.types";

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
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((f: File) => {
    // Validate file before processing
    const validation = validateFile(f);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setFile(f);
    setResult(null); // Clear previous results
    setError(null); // Clear previous errors
    
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

  const handleAnalyze = async () => {
    if (!file) return;

    setAnalyzing(true);
    setError(null);
    setResult(null);
    setUploadProgress(0);

    try {
      // Call the API to analyze the image
      const analysisResult = await apiService.analyzeImage(
        file,
        (progress: UploadProgress) => {
          setUploadProgress(progress.percentage);
        }
      );

      if (analysisResult.success) {
        setResult(analysisResult);
        toast.success('Analysis complete!', {
          description: `Diagnosis: ${analysisResult.diagnosis}`,
        });
      } else {
        const errorMsg = 'Analysis failed. Please try again.';
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to analyze image. Please try again.';
      setError(errorMessage);
      toast.error('Analysis Failed', {
        description: errorMessage,
      });
      console.error('Analysis error:', err);
    } finally {
      setAnalyzing(false);
      setUploadProgress(0);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setUploadProgress(0);
  };

  const getSeverityColors = (severity: string) => {
    return API_CONFIG.SEVERITY_COLORS[severity as keyof typeof API_CONFIG.SEVERITY_COLORS] || API_CONFIG.SEVERITY_COLORS.moderate;
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
                          {uploadProgress > 0 ? `Uploading ${uploadProgress}%` : 'Analyzing...'}
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4" /> Analyze Image <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                    {file && !analyzing && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleReset}
                        title="Clear"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Error Display */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-xl glass border-destructive/30 p-4 flex items-start gap-3"
                  >
                    <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-destructive mb-1">Analysis Error</p>
                      <p className="text-xs text-muted-foreground">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results Display */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="space-y-4 pt-4 border-t border-border/50"
                  >
                    {/* Result Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold font-display text-lg flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        Analysis Results
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                      >
                        New Analysis
                      </Button>
                    </div>

                    {/* Diagnosis Card */}
                    <div className={`rounded-xl p-6 border-2 ${getSeverityColors(result.severity).border} ${getSeverityColors(result.severity).bg} shadow-lg ${getSeverityColors(result.severity).glow}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1 mono">DIAGNOSIS</p>
                          <h4 className={`text-2xl font-bold font-display ${getSeverityColors(result.severity).text}`}>
                            {result.diagnosis}
                          </h4>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground mb-1 mono">CONFIDENCE</p>
                          <p className={`text-2xl font-bold font-display ${getSeverityColors(result.severity).text}`}>
                            {(result.confidence * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getSeverityColors(result.severity).bg} ${getSeverityColors(result.severity).text} border ${getSeverityColors(result.severity).border}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {result.severity.toUpperCase()} SEVERITY
                      </div>
                    </div>

                    {/* Uploaded Image */}
                    {result.image && (
                      <div className="rounded-xl overflow-hidden border border-border">
                        <img
                          src={apiService.getImageUrl(result.image.filename)}
                          alt="Analyzed skin lesion"
                          className="w-full h-auto"
                          onError={(e) => {
                            // Fallback if API image fails
                            e.currentTarget.src = preview || '';
                          }}
                        />
                      </div>
                    )}

                    {/* Description */}
                    <div className="rounded-xl glass p-4">
                      <div className="flex items-start gap-3">
                        <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold mb-2">Description</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {result.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className={`rounded-xl p-4 border ${getSeverityColors(result.severity).border} ${getSeverityColors(result.severity).bg}`}>
                      <div className="flex items-start gap-3">
                        <AlertTriangle className={`h-4 w-4 shrink-0 mt-0.5 ${getSeverityColors(result.severity).text}`} />
                        <div>
                          <p className="text-sm font-semibold mb-2">Recommendation</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {result.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* All Probabilities (Collapsible) */}
                    <details className="rounded-xl glass overflow-hidden">
                      <summary className="px-4 py-3 cursor-pointer hover:bg-secondary/30 transition-colors flex items-center justify-between">
                        <span className="text-sm font-semibold">View All Probabilities</span>
                        <span className="text-xs text-muted-foreground mono">
                          {Object.keys(result.probabilities).length} classes
                        </span>
                      </summary>
                      <div className="px-4 pb-4 pt-2 space-y-2">
                        {Object.entries(result.probabilities)
                          .sort(([, a], [, b]) => b - a)
                          .map(([className, probability]) => (
                            <div key={className} className="flex items-center gap-3">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-medium">{className}</span>
                                  <span className="text-xs text-muted-foreground mono">
                                    {(probability * 100).toFixed(2)}%
                                  </span>
                                </div>
                                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${probability * 100}%` }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </details>
                  </motion.div>
                )}
              </AnimatePresence>
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
