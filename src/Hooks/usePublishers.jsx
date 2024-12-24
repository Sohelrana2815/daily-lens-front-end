import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePublishers = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: publishers = [],
    refetch,
    isPending,
    error,
  } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const response = await axiosPublic.get("/publishers");
      return response.data;
    },
  });
  return { publishers, refetch, isPending, error };
};

export default usePublishers;
