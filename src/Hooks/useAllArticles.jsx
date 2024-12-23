// axiosSecure future

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllArticles = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: articles = [],
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

  return { allArticles: articles, refetch, isPending, error };
};

export default useAllArticles;
