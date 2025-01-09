import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";
import { useEffect } from "react";

export const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Add a request interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        let token = localStorage.getItem("access-token");

        // Retry logic to ensure the token is available
        if (!token) {
          let retries = 0;
          const maxRetries = 10; // Retry up to 10 times
          while (!token && retries < maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, 100)); // Wait 100ms
            token = localStorage.getItem("access-token");
            retries++;
          }

          if (!token) {
            console.warn("Token not found after retries.");
            throw new Error("Authorization token is missing.");
          }
        }

        config.headers.authorization = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add a response interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
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

    // Cleanup interceptors when component unmounts
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, signOutUser]);

  return axiosSecure;
};

export default useAxiosSecure;
