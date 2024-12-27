import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";

const MyArticles = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data: myArticles = [],
    refetch,
    isPending,
    error,
  } = useQuery({
    queryKey: ["myArticles", user?.email],
    queryFn: async () => {
      const response = await axiosPublic.get(
        `/myArticles?email=${user?.email}`
      );
      return response.data;
    },
  });

  return { myArticles, refetch, isPending, error };
};

export default MyArticles;
