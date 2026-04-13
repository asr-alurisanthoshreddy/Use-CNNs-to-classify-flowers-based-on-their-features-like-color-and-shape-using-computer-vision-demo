import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { UploadZone } from "@/components/UploadZone";
import { useAnalyze } from "@/hooks/use-predictions";
import { Beaker, Map, RotateCcw, CheckCircle2, BarChart3, Grid3X3 } from "lucide-react";
import type { PredictionResponse } from "@shared/routes";

export default function Home() {
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { mutate: analyze, isPending } = useAnalyze();

  const handleUpload = (base64: string) => {
    setUploadedImage(base64);
    analyze(base64, {
      onSuccess: (data) => setResult(data),
    });
};

  const handleReset = () => {
    setResult(null);
    setUploadedImage(null);
  };

  const confusionMatrixRows = result
    ? [
        {
          label: "Positive",
          cells: [
            { label: "Predicted Positive", metricLabel: "True Positive", value: result.confusionMatrix.truePositive },
            { label: "Predicted Negative", metricLabel: "False Negative", value: result.confusionMatrix.falseNegative },
          ],
        },
        {
          label: "Negative",
          cells: [
            { label: "Predicted Positive", metricLabel: "False Positive", value: result.confusionMatrix.falsePositive },
            { label: "Predicted Negative", metricLabel: "True Negative", value: result.confusionMatrix.trueNegative },
          ],
        },
      ]
    : [];

  const confusionMatrixMaxValue = confusionMatrixRows.length
    ? Math.max(...confusionMatrixRows.flatMap((row) => row.cells.map((cell) => cell.value)))
    : 0;

  const getConfusionCellStyle = (value: number) => {
    const intensity = confusionMatrixMaxValue === 0 ? 0 : value / confusionMatrixMaxValue;
    const lightness = 92 - intensity * 48;
    return {
      backgroundColor: `hsl(216 92% ${lightness}%)`,
      color: intensity > 0.55 ? "hsl(0 0% 100%)" : "hsl(222 47% 11%)",
    };
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Hero */}
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <section className="mx-auto max-w-3xl text-center mb-16">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
                  Hybrid Spectral-Spatial Attention Network
                </span>
                <h1
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl text-balance mb-6"
                >
                  Botanical Intelligence at Scale.
                </h1>
                <p className="text-lg leading-relaxed text-muted-foreground text-balance">
                  Upload a flower image. HSSAN analyzes visual features like color
                  and shape to identify the flower species using computer vision.
                </p>
              </section>

              <section className="mb-24">
                <UploadZone onUpload={handleUpload} isProcessing={isPending} />
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Result Header */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Analysis Complete
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  data-testid="button-reset"
                  className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:border-foreground/30 hover:bg-muted/40"
                >
                  <RotateCcw className="h-4 w-4" />
                  Analyze Another
                </button>
              </div>

              {/* Result Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left: Image */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="lg:col-span-5"
                >
                  <div className="overflow-hidden rounded-[2rem] border border-border/50 bg-white dark:bg-card shadow-sm">
                    <div className="aspect-square w-full overflow-hidden bg-muted">
                      {uploadedImage && (
                        <img
                          src={uploadedImage}
                          alt={result.species}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Right: Data */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-7 flex flex-col justify-center space-y-6"
                >
                  {/* Species + Confidence */}
                  <div>
                    <h1
                      style={{ fontFamily: "var(--font-display)" }}
                      className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4"
                    >
                      {result.species}
                    </h1>
                    <div className="flex items-center gap-4">
                      <div className="h-2 w-36 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence}%` }}
                          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                          className="h-full bg-primary rounded-full"
                        />
                      </div>
                      <span
                        data-testid="text-confidence"
                        className="text-sm font-semibold text-foreground"
                      >
                        {result.confidence}% Confidence
                      </span>
                    </div>
                  </div>

                  {/* Combined Phytochemical & Geography - Side by Side */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Phytochemical Profile */}
                    <div className="rounded-3xl border border-border/60 bg-white/60 dark:bg-card/60 p-6 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="rounded-xl bg-secondary p-2 text-secondary-foreground">
                          <Beaker className="h-5 w-5" />
                        </div>
                        <h3
                          style={{ fontFamily: "var(--font-display)" }}
                          className="text-lg font-bold text-foreground"
                        >
                          Phytochemical Profile
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {result.phytochemicals && result.phytochemicals.length > 0 ? (
                          result.phytochemicals.map((compound: any, idx: number) => {
                            const name = typeof compound === 'string' ? compound : compound.name;
                            const benefits = typeof compound === 'string' ? 'Traditional medicinal uses' : (compound.benefits || 'Traditional medicinal uses');
                            return (
                              <div
                                key={idx}
                                data-testid={`badge-compound-${idx}`}
                                className="rounded-xl border border-border/40 bg-gradient-to-br from-primary/5 to-primary/2 p-3 hover:border-primary/30 transition-all"
                              >
                                <div className="font-semibold text-foreground text-sm mb-1 flex items-center gap-2">
                                  <span className="text-xs font-bold bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">
                                    {idx + 1}
                                  </span>
                                  {name}
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                  {benefits}
                                </p>
                              </div>
                            );
                          })
                        ) : (
                          <span className="text-sm text-muted-foreground italic">
                            No phytochemical data available
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Geographic Distribution */}
                    <div className="rounded-3xl border border-border/60 bg-white/60 dark:bg-card/60 p-6 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="rounded-xl bg-secondary p-2 text-secondary-foreground">
                          <Map className="h-5 w-5" />
                        </div>
                        <h3
                          style={{ fontFamily: "var(--font-display)" }}
                          className="text-lg font-bold text-foreground"
                        >
                          Native Geography
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {result.geoDistribution && result.geoDistribution.length > 0 ? (
                          result.geoDistribution.map((region: string, idx: number) => (
                            <li
                              key={idx}
                              data-testid={`text-region-${idx}`}
                              className="flex items-center gap-3 text-sm text-foreground p-2 rounded-lg bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-all"
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                              {region}
                            </li>
                          ))
                        ) : (
                          <span className="text-sm text-muted-foreground italic">
                            No geographic data available
                          </span>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Evaluation Metrics + Confusion Matrix */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="rounded-3xl border border-border/60 bg-white/60 dark:bg-card/60 p-6 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="rounded-xl bg-secondary p-2 text-secondary-foreground">
                          <BarChart3 className="h-5 w-5" />
                        </div>
                        <h3
                          style={{ fontFamily: "var(--font-display)" }}
                          className="text-lg font-bold text-foreground"
                        >
                          Model Metrics
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: "Accuracy", value: result.metrics.accuracy },
                          { label: "Precision", value: result.metrics.precision },
                          { label: "Recall", value: result.metrics.recall },
                          { label: "F1-Score", value: result.metrics.f1Score },
                        ].map((metric) => (
                          <div
                            key={metric.label}
                            className="rounded-xl border border-border/40 bg-gradient-to-br from-primary/5 to-primary/2 p-3"
                          >
                            <p className="text-xs font-medium text-muted-foreground">{metric.label}</p>
                            <p className="text-lg font-bold text-foreground">{metric.value.toFixed(1)}%</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-3xl border border-border/60 bg-white/60 dark:bg-card/60 p-6 backdrop-blur-sm">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="rounded-xl bg-secondary p-2 text-secondary-foreground">
                          <Grid3X3 className="h-5 w-5" />
                        </div>
                        <h3
                          style={{ fontFamily: "var(--font-display)" }}
                          className="text-lg font-bold text-foreground"
                        >
                          Confusion Matrix
                        </h3>
                      </div>
                      <div className="rounded-xl border border-border/50 bg-background/40 p-3">
                        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Predicted Class
                        </p>
                        <div
                          aria-label="Confusion matrix where rows represent actual class and columns represent predicted class"
                          className="grid grid-cols-[auto_repeat(2,minmax(0,1fr))] gap-2"
                        >
                          <div className="flex items-center pr-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Actual
                          </div>
                          <div className="text-center text-xs font-semibold text-muted-foreground">Positive</div>
                          <div className="text-center text-xs font-semibold text-muted-foreground">Negative</div>

                          {confusionMatrixRows.map((row) => (
                            <div key={row.label} className="contents">
                              <div
                                aria-label={`Actual Class: ${row.label}`}
                                className="flex items-center pr-1 text-xs font-semibold text-muted-foreground"
                              >
                                {row.label}
                              </div>
                              {row.cells.map((cell) => (
                                <div
                                  key={`${row.label}-${cell.label}`}
                                  style={getConfusionCellStyle(cell.value)}
                                  aria-label={`${cell.metricLabel}: ${cell.value}. Actual ${row.label}, ${cell.label}`}
                                  className="flex h-16 items-center justify-center rounded-lg border border-white/40 text-lg font-bold shadow-sm"
                                >
                                  {cell.value}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                        <div className="mt-3">
                          <div
                            aria-hidden="true"
                            className="h-2 rounded-full bg-gradient-to-r from-primary/10 via-primary/50 to-primary"
                          />
                          <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                            <span>0</span>
                            <span>{confusionMatrixMaxValue}</span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground">
                        Total Samples: {result.confusionMatrix.totalSamples}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
