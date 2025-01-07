import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = () => {
  const axiosSecure = useAxiosSecure();
  // const axiosPublic = useAxiosPublic();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users");
      return response.data;
    },
  });
  return { allUsers: users, refetch };
};

export default useUsers;
