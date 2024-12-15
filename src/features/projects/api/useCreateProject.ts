import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.projects)["$post"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.projects)["$post"]
>["json"];

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.projects.$post({ json });
      if (!response.ok)
        throw new Error("something went wrong during project creation");
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Project created succesfully");
      queryClient.invalidateQueries({
        queryKey: ["user-projects"],
      });
    },
    onError: () => {
      toast.error("Unable to create project");
    },
  });
};
