import { Navigate } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const [isAdmin, adminLoading] = useAdmin();

  if (adminLoading) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  return isAdmin ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
