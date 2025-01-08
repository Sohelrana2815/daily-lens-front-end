import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, adminLoading] = useAdmin();

  if (loading || adminLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-success">
        <span className="loading loading-ball loading-lg"></span>
      </div>
    );
  }

  if (!user && !isAdmin) {
    return <Navigate to="/" state={location.pathname} />;
  }
  return children;
};
AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AdminRoute;
