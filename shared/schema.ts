import { z } from "zod";

const phytochemicalSchema = z.union([
  z.string(),
  z.object({
    name: z.string(),
    benefits: z.string(),
  }),
]);

const metricsSchema = z.object({
  accuracy: z.number().min(0).max(100),
  precision: z.number().min(0).max(100),
  recall: z.number().min(0).max(100),
  f1Score: z.number().min(0).max(100),
});

const confusionMatrixSchema = z.object({
  truePositive: z.number().int().nonnegative(),
  falsePositive: z.number().int().nonnegative(),
  falseNegative: z.number().int().nonnegative(),
  trueNegative: z.number().int().nonnegative(),
  totalSamples: z.number().int().positive(),
});

export const predictionResultSchema = z.object({
  species: z.string(),
  confidence: z.number(),
  phytochemicals: z.array(phytochemicalSchema),
  geoDistribution: z.array(z.string()),
  metrics: metricsSchema,
  confusionMatrix: confusionMatrixSchema,
});

export type PredictionResult = z.infer<typeof predictionResultSchema>;
