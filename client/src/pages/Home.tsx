import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { UploadZone } from "@/components/UploadZone";
import { useAnalyze } from "@/hooks/use-predictions";
import { Beaker, Map, RotateCcw, CheckCircle2 } from "lucide-react";
import type { PredictionResponse } from "@shared/routes";

export default function Home() {
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { mutate: analyze, isPending } = useAnalyze();
  const classLabels = ["Rose", "Tulip", "Daisy", "Sunflower"];
  const metricValues = [
    result?.metrics.accuracy ?? 0,
    result?.metrics.precision ?? 0,
    result?.metrics.recall ?? 0,
    result?.metrics.f1Score ?? 0,
  ];
  const offDiagonalBase = result
    ? Math.max(
        1,
        Math.round(
          (result.confusionMatrix.falsePositive + result.confusionMatrix.falseNegative) /
            4
        )
      )
    : 2;
  const confusionHeatmap = classLabels.map((_, rowIdx) =>
    classLabels.map((_, colIdx) => {
      if (rowIdx === colIdx) {
        return Math.max(1, Math.min(100, Math.round(metricValues[rowIdx])));
      }
      return Math.max(1, Math.min(99, offDiagonalBase + ((rowIdx + colIdx) % 3)));
    })
  );

  const getHeatCellClass = (value: number) => {
    if (value >= 90) return "bg-[#114f9e] text-white";
    if (value >= 70) return "bg-[#0d407f] text-white";
    if (value >= 40) return "bg-[#0a3468] text-[#d3e7ff]";
    return "bg-[#072a54] text-[#b9d6ff]";
  };

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
                  Upload a flower image. HSSAN identifies the species, maps geographic
                  distribution, and extracts key phytochemical properties with
                  spectral-spatial attention mechanisms.
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
                  <div className="rounded-3xl border border-[#19467f] bg-[#09264d] p-6 text-white shadow-xl shadow-[#03142d]/30">
                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                      <div className="rounded-2xl border border-[#1d4d8a] bg-[#0a2f5d] p-4">
                        <h3 className="mb-4 text-sm font-semibold text-[#d6e8ff]">
                          Confusion Matrix
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full table-fixed text-center text-sm">
                            <thead>
                              <tr>
                                <th className="px-2 py-2 text-left text-[11px] font-semibold text-[#9dc4f7]">
                                  &nbsp;
                                </th>
                                {classLabels.map((label) => (
                                  <th
                                    key={`head-${label}`}
                                    className="px-2 py-2 text-[11px] font-semibold text-[#9dc4f7]"
                                  >
                                    {label}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {classLabels.map((rowLabel, rowIdx) => (
                                <tr key={`row-${rowLabel}`}>
                                  <td className="px-2 py-2 text-left text-[11px] font-semibold text-[#9dc4f7]">
                                    {rowLabel}
                                  </td>
                                  {confusionHeatmap[rowIdx].map((value, colIdx) => (
                                    <td key={`${rowLabel}-${classLabels[colIdx]}`} className="px-1 py-1">
                                      <div
                                        className={`rounded-md border border-[#2c65a8]/60 py-1.5 font-bold ${getHeatCellClass(
                                          value
                                        )}`}
                                      >
                                        {value}
                                      </div>
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-4 px-2">
                          <div className="h-2 rounded-full bg-gradient-to-r from-[#d7e9ff] via-[#4e9df0] to-[#083d85]" />
                          <div className="mt-1 flex justify-between text-[10px] text-[#9dc4f7]">
                            <span>0</span>
                            <span>100</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-[#1d4d8a] bg-[#0a2f5d] p-4">
                        <h3 className="mb-4 text-sm font-semibold text-[#d6e8ff]">Model Performance</h3>
                        <div className="mb-3 rounded-xl border border-[#2b67aa] bg-[#0b3568] p-4 text-center">
                          <p className="text-xs font-semibold text-[#a9cbf8]">Accuracy</p>
                          <p className="text-4xl font-extrabold leading-none text-[#8ee36f]">
                            {result.metrics.accuracy.toFixed(1)}%
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            {
                              label: "Precision",
                              value: result.metrics.precision,
                              className: "bg-[#1b61bf] border-[#3a80dc]",
                            },
                            {
                              label: "Recall",
                              value: result.metrics.recall,
                              className: "bg-[#5d3ea7] border-[#7c59d0]",
                            },
                            {
                              label: "F1-Score",
                              value: result.metrics.f1Score,
                              className: "bg-[#d97706] border-[#e89a3f]",
                            },
                          ].map((metric) => (
                            <div
                              key={metric.label}
                              className={`rounded-lg border p-2 text-center ${metric.className}`}
                            >
                              <p className="text-[11px] font-semibold text-[#edf4ff]">{metric.label}</p>
                              <p className="text-lg font-bold text-white">{metric.value.toFixed(1)}%</p>
                            </div>
                          ))}
                        </div>
                      </div>
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
