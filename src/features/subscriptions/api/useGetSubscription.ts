import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetSubscription = () => {
  const query = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const response = await client.api.subscribe.current.$get();
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      const { data } = await response.json();

      return data;
    },
  });
  return query;
};
