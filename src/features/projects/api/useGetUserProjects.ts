import { client } from "@/lib/hono";
import { useInfiniteQuery } from "@tanstack/react-query";
import { InferResponseType } from "hono";

export type ResponseType = InferResponseType<
  (typeof client.api.projects)["$get"],
  200
>;

export const useGetUserProjects = () => {
  const query = useInfiniteQuery<ResponseType, Error>({
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryKey: ["user-projects"],
    queryFn: async ({ pageParam }) => {
      const response = await client.api.projects.$get({
        query: {
          page: (pageParam as number).toString(),
          limit: "5",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch user projects");
      return response.json();
    },
  });
  return query;
};
