import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Beaker, MapPin } from "lucide-react";
import type { Prediction } from "@shared/routes"; // Note: this might import the Drizzle type depending on setup, but typically we want the inferred type.

// We will use the inline type mapped from the schema for safety.
interface PredictionCardProps {
  prediction: {
    id: number;
    imageUrl: string;
    species: string;
    confidence: string;
    phytochemicals: (string | { name: string; benefits: string })[];
    geoDistribution: string[];
    attentionMapUrl?: string | null;
  };
  index: number;
}

export function PredictionCard({ prediction, index }: PredictionCardProps) {
  // Parse confidence for the progress bar
  const confidenceValue = parseFloat(prediction.confidence);
  const confidencePercent = isNaN(confidenceValue) ? 0 : confidenceValue * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/prediction/${prediction.id}`}>
        <div className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-white transition-all duration-500 premium-shadow border border-border/50 hover:border-primary/20 dark:bg-card">
          <div className="aspect-[4/3] w-full overflow-hidden bg-muted relative">
            <img 
              src={prediction.imageUrl} 
              alt={prediction.species}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 text-white flex items-center gap-2 font-medium">
              View details <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)' }} className="text-xl font-bold text-foreground line-clamp-1">
                  {prediction.species}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{confidencePercent.toFixed(1)}% Confidence</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-auto pt-4 border-t border-border/60">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                <span className="line-clamp-1">
                  {prediction.geoDistribution.slice(0, 2).join(', ')}
                  {prediction.geoDistribution.length > 2 && '...'}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {prediction.phytochemicals.slice(0, 2).map((chemical, i) => (
                  <span 
                    key={i} 
                    className="inline-flex items-center rounded-lg bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    <Beaker className="mr-1.5 h-3 w-3 opacity-50" />
                    {chemical}
                  </span>
                ))}
                {prediction.phytochemicals.length > 2 && (
                  <span className="inline-flex items-center rounded-lg bg-secondary/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                    +{prediction.phytochemicals.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function SkeletonCard() {
  return (
    <div className="flex h-[420px] flex-col overflow-hidden rounded-3xl border border-border/50 bg-white/50 dark:bg-card">
      <div className="aspect-[4/3] w-full animate-pulse bg-muted" />
      <div className="flex flex-1 flex-col p-6 gap-4">
        <div className="h-7 w-2/3 animate-pulse rounded-lg bg-muted" />
        <div className="h-4 w-1/3 animate-pulse rounded-lg bg-muted" />
        <div className="mt-auto space-y-3 pt-4">
          <div className="h-4 w-full animate-pulse rounded-lg bg-muted" />
          <div className="flex gap-2">
            <div className="h-6 w-20 animate-pulse rounded-lg bg-muted" />
            <div className="h-6 w-24 animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
