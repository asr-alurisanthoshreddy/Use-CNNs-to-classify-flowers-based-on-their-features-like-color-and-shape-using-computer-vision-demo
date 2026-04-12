import { z } from "zod";

export const predictionResultSchema = z.object({
  species: z.string(),
  confidence: z.number(),
  phytochemicals: z.array(z.string()),
  geoDistribution: z.array(z.string()),
});

export type PredictionResult = z.infer<typeof predictionResultSchema>;
