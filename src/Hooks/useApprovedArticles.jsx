import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useApprovedArticles = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: approvedArticles = [],
    refetch,
    isPending,
    error,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await axiosPublic.get("/articles");
      return response.data;
    },
  });

  return { approvedArticles, refetch, isPending, error };
};

export default useApprovedArticles;
