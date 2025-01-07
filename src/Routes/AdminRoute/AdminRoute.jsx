import useAuth from "../../Hooks/useAuth";
import useAdmin from "../../Hooks/useAdmin";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, adminLoading] = useAdmin();

  if (loading || adminLoading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" state={location.pathname} />;
  }
  return children;
};
AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AdminRoute;
