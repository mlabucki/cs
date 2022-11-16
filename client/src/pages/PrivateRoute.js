import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;

  if (loading) return null;

  return userInfo ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
