// axiosSecure future

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
// import useAxiosPublic from "./useAxiosPublic";

const useAllArticles = () => {
  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const {
    data: articles = [],
    refetch,
    isPending,
    error,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await axiosSecure.get("/articles");
      return response.data;
    },
  });

  return { allArticles: articles, refetch, isPending, error };
};

export default useAllArticles;
