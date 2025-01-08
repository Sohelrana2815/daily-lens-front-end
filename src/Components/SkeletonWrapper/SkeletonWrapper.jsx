import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SkeletonWrapper = ({ loading, children, width, height }) => {
  return loading ? <Skeleton width={width} height={height} /> : children;
};
export default SkeletonWrapper;
