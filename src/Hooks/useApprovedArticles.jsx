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
    queryKey: ["approvedArticles"],
    queryFn: async () => {
      const response = await axiosPublic.get("/approvedArticles");
      return response.data;
    },
  });

  return { approvedArticles, refetch, isPending, error };
};

export default useApprovedArticles;
