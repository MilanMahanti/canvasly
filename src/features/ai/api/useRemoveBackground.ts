import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRemoveBackground = () => {
  return useMutation({
    mutationFn: async (json: { image: string }) => {
      const response = await client.api.ai["remove-bg"].$post({ json });
      return await response.json();
    },
    onError: () => {
      toast.error("There was a problem while removing the background");
    },
  });
};
