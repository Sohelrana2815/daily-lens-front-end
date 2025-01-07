import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserHome = () => {
  const axiosPublic = useAxiosSecure();
  const { data: usersHome = [], refetch } = useQuery({
    queryKey: ["users-home"],
    queryFn: async () => {
      const response = await axiosPublic.get("/users-home");
      return response.data;
    },
  });
  return { usersHome, refetch };
};

export default useUserHome;
