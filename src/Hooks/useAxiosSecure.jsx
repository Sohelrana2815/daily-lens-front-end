import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";

export const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  // Auth info
  const navigate = useNavigate();
  const { signOutUser } = useAuth();

  useEffect(() => {
    // 1. Request interceptors
    const requestInterceptors = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // 2. Response interceptors
    const responseInterceptors = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          await signOutUser();
          navigate("/signIn");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on component unmount

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptors);
      axiosSecure.interceptors.response.eject(responseInterceptors);
    };
  }, [navigate, signOutUser]);

  return axiosSecure;
};

export default useAxiosSecure;
