import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.subscribe)["checkout"]["$post"],
  200
>;

export const useCheckout = () => {
  return useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.subscribe["checkout"].$post();

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
