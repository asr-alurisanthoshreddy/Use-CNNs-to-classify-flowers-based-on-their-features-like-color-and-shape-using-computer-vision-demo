import { useMutation, useQuery } from "@tanstack/react-query";
import { type PredictionResponse } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

type PredictionErrorWithCode = Error & { code?: string };

export function useAnalyze() {
  const { toast } = useToast();

  return useMutation<PredictionResponse, PredictionErrorWithCode, string>({
    mutationFn: async (base64Image: string) => {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
        credentials: "include",
      });

      if (!res.ok) {
        let errorMessage = "Failed to analyze image.";
        let errorCode: string | undefined;
        try {
          const errorData = await res.json();
          if (errorData.message) errorMessage = errorData.message;
          if (typeof errorData.code === "string") errorCode = errorData.code;
        } catch {}
        const error = new Error(errorMessage) as PredictionErrorWithCode;
        error.code = errorCode;
        throw error;
      }

      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Analysis Complete",
        description: "Your flower has been successfully classified.",
      });
    },
    onError: (error: PredictionErrorWithCode) => {
      const isNonFlowerWarning = error.code === "NON_FLOWER_IMAGE";
      toast({
        title: isNonFlowerWarning ? "Warning" : "Classification Failed",
        description: error.message,
        variant: isNonFlowerWarning ? "default" : "destructive",
      });
    },
  });
}

export function usePrediction(id: number) {
  return useQuery({
    queryKey: [`/api/predictions/${id}`],
    queryFn: async () => {
      const res = await fetch(`/api/predictions/${id}`);
      if (!res.ok) throw new Error("Failed to fetch prediction");
      return res.json() as Promise<PredictionResponse>;
    },
  });
}
