import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUsers = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: users = [],
    refetch,
    isPending,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosPublic.get("/users");
      return response.data;
    },
  });
  return { allUsers: users, refetch, isPending, error };
};

export default useUsers;
