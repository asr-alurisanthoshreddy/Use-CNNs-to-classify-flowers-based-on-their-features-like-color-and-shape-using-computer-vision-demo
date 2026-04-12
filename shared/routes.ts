import { z } from "zod";
import { predictionResultSchema } from "./schema";

export const errorSchemas = {
  validation: z.object({ message: z.string(), field: z.string().optional() }),
  internal: z.object({ message: z.string() }),
};

export const api = {
  predictions: {
    create: {
      method: "POST" as const,
      path: "/api/predict" as const,
      input: z.object({ image: z.string() }),
      responses: {
        200: predictionResultSchema,
        500: errorSchemas.internal,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type PredictionResponse = z.infer<typeof api.predictions.create.responses[200]>;
