import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Sparkles, X, Image as ImageIcon, CheckCircle2 } from "lucide-react";

interface UploadZoneProps {
  onUpload: (base64: string) => void;
  isProcessing: boolean;
}

export function UploadZone({ onUpload, isProcessing }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleClear = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAnalyze = () => {
    if (preview) {
      onUpload(preview);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            key="upload-zone"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative flex cursor-pointer flex-col items-center justify-center 
              overflow-hidden rounded-3xl border-2 border-dashed
              bg-white/40 backdrop-blur-md px-12 py-24 text-center transition-all duration-300
              hover:bg-white/60 hover:border-primary/50 premium-shadow
              ${isDragging ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border/60'}
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            <div className={`mb-6 rounded-full p-4 transition-all duration-300 ${isDragging ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-primary/10 text-primary'}`}>
              <UploadCloud className="h-8 w-8" />
            </div>
            
            <h3 style={{ fontFamily: 'var(--font-display)' }} className="mb-2 text-2xl font-semibold text-foreground">
              Upload a botanical specimen
            </h3>
            <p className="max-w-[280px] text-sm text-muted-foreground text-balance">
              Drag & drop a photo here, or click to browse. We support JPG, PNG, and HEIC.
            </p>

            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              accept="image/*"
              className="hidden"
            />
          </motion.div>
        ) : (
          <motion.div
            key="preview-zone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card overflow-hidden rounded-3xl premium-shadow"
          >
            <div className="relative aspect-[4/3] w-full bg-muted/30">
              <img 
                src={preview} 
                alt="Upload preview" 
                className="h-full w-full object-contain"
              />
              
              {/* Scanning Effect when processing */}
              {isProcessing && (
                <div className="absolute inset-0 overflow-hidden rounded-t-3xl z-10 pointer-events-none">
                  <div className="h-full w-full bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-scan" />
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-white/90 dark:bg-black/90 px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl"
                    >
                      <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                      <span className="font-semibold text-sm">Analyzing Specimen...</span>
                    </motion.div>
                  </div>
                </div>
              )}

              {!isProcessing && (
                <button
                  onClick={handleClear}
                  className="absolute right-4 top-4 rounded-full bg-black/40 p-2 text-white backdrop-blur-md transition-all hover:bg-black/60 hover:scale-105 active:scale-95"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/50 dark:bg-black/20">
              <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                <ImageIcon className="w-5 h-5" />
                <span>Image ready for classification</span>
              </div>
              
              <button
                onClick={handleAnalyze}
                disabled={isProcessing}
                className="
                  flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl 
                  bg-foreground px-8 py-4 text-sm font-semibold text-background 
                  transition-all duration-300 hover:bg-foreground/90 hover:shadow-xl 
                  hover:shadow-foreground/20 hover:-translate-y-0.5 active:translate-y-0
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                "
              >
                {isProcessing ? (
                  <>Processing Image...</>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Identify Species
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
