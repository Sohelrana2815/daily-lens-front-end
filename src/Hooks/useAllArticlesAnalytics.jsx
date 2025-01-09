import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllArticlesAnalytics = () => {
  const axiosSecure = useAxiosSecure();
  const { data: articles = [], isPending } = useQuery({
    queryKey: ["analyticsArticles"],
    queryFn: async () => {
      const response = await axiosSecure.get("/analyticsArticles");
      return response.data;
    },
  });

  return { articles, isPending };
};

export default useAllArticlesAnalytics;
