import { Navigate } from "react-router-dom";
import usePremium from "../../Hooks/usePremium";
import PropTypes from "prop-types";
import useAuth from "../../Hooks/useAuth";
const PremiumRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isPremium, premiumLoading] = usePremium();

  if (premiumLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity loading-lg text-primary"></span>
      </div>
    );
  }
  if (!isPremium && !user) {
    return <Navigate to="/expiredSubscription" />;
  }
  // Redirect to subscription page if the user doesn't have access
  return children;
};
PremiumRoute.propTypes = { children: PropTypes.node.isRequired };
export default PremiumRoute;
