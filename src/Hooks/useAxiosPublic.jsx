import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://daily-lens-backend.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
