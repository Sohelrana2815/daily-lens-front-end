import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePremium = () => {
  const { user } = useAuth(); // Get the logged-in user's info
  const [isPremium, setIsPremium] = useState(false);
  const [premiumLoading, setPremiumLoading] = useState(true);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const checkPremiumStatus = async () => {
      if (user?.email) {
        try {
          const response = await axiosSecure.get(
            `/users/subscription/${user.email}`
          );
          setIsPremium(response.data.isPremium);
        } catch (error) {
          console.error("Error fetching premium status:", error);
          setIsPremium(false);
        } finally {
          setPremiumLoading(false);
        }
      } else {
        setIsPremium(false);
        setPremiumLoading(false);
      }
    };

    checkPremiumStatus();
  }, [user?.email, axiosSecure]);

  return [isPremium, premiumLoading];
};

export default usePremium;
