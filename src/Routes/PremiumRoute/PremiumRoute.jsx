import useAuth from "../../Hooks/useAuth";
import useUsers from "../../Hooks/useUsers";
import { Navigate } from "react-router-dom";

const PremiumRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { allUsers } = useUsers();

  if (loading) {
    return (
      <span className="loading loading-spinner loading-lg text-[#e04d20]"></span>
    );
  }

  if (user) {
    const currentUser = allUsers.find((u) => u.email === user.email);

    const hasActiveSubscription =
      currentUser && currentUser.subscriptionPeriod !== null;

    if (hasActiveSubscription) {
      return children;
    }
  }

  // Redirect to expiredSubscription page if subscription is null
  return <Navigate to="/expiredSubscription" />;
};

export default PremiumRoute;
