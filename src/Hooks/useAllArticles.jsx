// axiosSecure future

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
// import useAxiosPublic from "./useAxiosPublic";

const useAllArticles = (page = 1, limit = 3) => {
  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const {
    data: articlesData = { articles: [], currentPage: 1, totalPages: 1 },
    refetch,
    isPending,
    error,
  } = useQuery({
    queryKey: ["articles", page, limit],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/articles?page=${page}&limit=${limit}`
      );
      return response.data;
    },
    keepPreviousData: true, // Retains previous data while fetching new data
  });

  return {
    allArticles: articlesData.articles,
    currentPage: articlesData.currentPage,
    totalPages: articlesData.totalPages,
    refetch,
    isPending,
    error,
  };
};

export default useAllArticles;
