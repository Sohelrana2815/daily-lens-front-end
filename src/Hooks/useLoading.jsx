import { useEffect, useState } from "react";

const useLoading = (delay = 800) => {
  const [skeletonLoading, setSkeletonLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSkeletonLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return skeletonLoading;
};

export default useLoading;
