import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.projects)[":id"]["$patch"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.projects)[":id"]["$patch"]
>["json"];

export const useUpdateProject = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["updated-project", { id }],
    mutationFn: async (json) => {
      const response = await client.api.projects[":id"].$patch({
        json,
        param: { id },
      });

      if (!response.ok)
        throw new Error("something went wrong updating project");

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["project", { id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-projects"],
      });
    },
    onError: () => {
      toast.error("Unable to update project");
    },
  });
};
