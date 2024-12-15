import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.subscribe)["billing"]["$post"],
  200
>;

export const useBilling = () => {
  return useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.subscribe["billing"].$post();

      if (!response.ok) throw new Error("something went wrong");
      return await response.json();
    },
    onSuccess: ({ data }) => {
      window.location.href = data;
    },
    onError: () => {
      toast.error("Unable to create session");
    },
  });
};
