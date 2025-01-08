import Skeleton from "react-loading-skeleton";
const SkeletonWrapper = ({ loading, children, width, height }) => {
  return loading ? <Skeleton width={width} height={height} /> : children;
};

export default SkeletonWrapper;
