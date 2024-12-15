import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGenerateImage = () => {
  return useMutation({
    mutationFn: async (json: { prompt: string }) => {
      const response = await client.api.ai["generate-image"].$post({ json });
      return await response.json();
    },
    onError: () => {
      toast.error("There was a problem generating image");
    },
  });
};
