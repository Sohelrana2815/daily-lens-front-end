import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SkeletonWrapper = ({
  loading,
  children,
  width,
  height,
  count,
  circle,
}) => {
  return loading ? (
    <Skeleton width={width} height={height} count={count} circle={circle} />
  ) : (
    children
  );
};
export default SkeletonWrapper;
