import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.users)["$post"]>;

type RequestType = InferRequestType<(typeof client.api.users)["$post"]>["json"];

export const useSignup = () => {
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.users.$post({ json });
      if (!response.ok) throw new Error("something went wrong");
      return await response.json();
    },
    onSuccess: () => {
      toast.success("user created succesfully");
    },
    onError: () => {
      toast.error("Unable to create account");
    },
  });
};
