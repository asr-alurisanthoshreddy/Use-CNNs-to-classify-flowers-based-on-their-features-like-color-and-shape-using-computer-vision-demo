import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, Share2, Map, Beaker, Zap, Image as ImageIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { usePrediction } from "@/hooks/use-predictions";

export default function PredictionDetail() {
  const params = useParams();
  const id = parseInt(params.id || "0", 10);
  const { data: prediction, isLoading, isError } = usePrediction(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-background">
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 w-32 bg-muted rounded-md" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-muted rounded-3xl" />
              <div className="space-y-6 pt-8">
                <div className="h-12 w-3/4 bg-muted rounded-xl" />
                <div className="h-6 w-1/4 bg-muted rounded-md" />
                <div className="h-32 w-full bg-muted rounded-2xl" />
                <div className="h-32 w-full bg-muted rounded-2xl" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (isError || !prediction) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-background">
        <Navbar />
        <main className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-32 lg:px-8 text-center">
          <div className="rounded-full bg-destructive/10 p-4 mb-6">
            <span className="text-3xl text-destructive">🥀</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-4">Specimen Not Found</h1>
          <p className="text-muted-foreground mb-8">We couldn't locate this analysis record in our archives.</p>
          <Link href="/">
            <a className="rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-foreground/90 transition-colors">
              Return to Archives
            </a>
          </Link>
        </main>
      </div>
    );
  }

  const confidenceValue = parseFloat(prediction.confidence);
  const confidencePercent = isNaN(confidenceValue) ? 0 : confidenceValue * 100;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-background">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
              Back to Discoveries
            </a>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Imagery */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 xl:col-span-6 space-y-6"
          >
            <div className="group relative overflow-hidden rounded-[2rem] glass-card premium-shadow p-2">
              <div className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden rounded-[1.5rem] bg-muted">
                <img 
                  src={prediction.imageUrl} 
                  alt={prediction.species}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {prediction.attentionMapUrl && (
              <div className="rounded-[2rem] glass-card p-6 premium-shadow">
                <div className="flex items-center gap-3 mb-4 text-sm font-semibold text-foreground">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>AI Attention Map</span>
                </div>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black/5">
                  <img 
                    src={prediction.attentionMapUrl} 
                    alt="Attention Map"
                    className="h-full w-full object-cover opacity-90 mix-blend-multiply dark:mix-blend-screen"
                  />
                </div>
                <p className="mt-4 text-xs text-muted-foreground text-balance">
                  Visual representation of regions the AI model focused on during classification.
                </p>
              </div>
            )}
          </motion.div>

          {/* Right Column: Data */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 xl:col-span-6 flex flex-col pt-4 lg:pt-10"
          >
            <div className="mb-2 flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                Analysis Complete
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                ID: #{prediction.id.toString().padStart(4, '0')}
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-display)' }} className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
              {prediction.species}
            </h1>

            <div className="flex items-center gap-4 mb-10">
              <div className="h-2 w-32 rounded-full bg-muted overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${confidencePercent}%` }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {confidencePercent.toFixed(1)}% Confidence Match
              </span>
            </div>

            <div className="space-y-6">
              {/* Combined Phytochemicals & Geography */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Phytochemical Profile */}
                <div className="rounded-3xl border border-border/60 bg-white/50 dark:bg-card/50 p-6 sm:p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="rounded-xl bg-secondary p-2 text-secondary-foreground">
                      <Beaker className="h-5 w-5" />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-xl font-bold text-foreground">
                      Phytochemical Profile
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {prediction.phytochemicals && prediction.phytochemicals.length > 0 ? (
                      prediction.phytochemicals.map((chemical: any, idx: number) => {
                        const name = typeof chemical === 'string' ? chemical : chemical.name;
                        const benefits = typeof chemical === 'string' ? 'Traditional medicinal uses' : (chemical.benefits || 'Traditional medicinal uses');
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="rounded-xl border border-border/40 bg-gradient-to-br from-primary/5 to-primary/2 p-4 hover:border-primary/30 transition-all"
                          >
                            <div className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
                              <span className="text-xs font-bold bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                                {idx + 1}
                              </span>
                              {name}
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {benefits}
                            </p>
                          </motion.div>
                        );
                      })
                    ) : (
                      <span className="text-sm text-muted-foreground italic">No phytochemical data available</span>
                    )}
                  </div>
                </div>

                {/* Native Geography */}
                <div className="rounded-3xl border border-border/60 bg-white/50 dark:bg-card/50 p-6 sm:p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="rounded-xl bg-secondary p-2 text-secondary-foreground">
                      <Map className="h-5 w-5" />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-xl font-bold text-foreground">
                      Native Geography
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {prediction.geoDistribution && prediction.geoDistribution.length > 0 ? (
                      prediction.geoDistribution.map((region: string, idx: number) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-3 text-sm text-foreground p-3 rounded-lg bg-gradient-to-r from-primary/5 to-transparent hover:from-primary/10 transition-all"
                        >
                          <div className="h-2 w-2 rounded-full bg-primary/60 flex-shrink-0" />
                          {region}
                        </motion.li>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground italic">No geographic data available</span>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
